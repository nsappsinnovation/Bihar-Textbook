/**
 * API LOGGER — temporary debugging tool. Safe to delete.
 *
 * To remove it completely: delete this file and the single
 * `import "./apiLogger.js";` line at the top of src/main.jsx.
 *
 * It patches window.fetch and XMLHttpRequest, so every API call is logged no
 * matter which client made it (axios in src/services/api.js, raw fetch in the
 * book reader, or anything else) — no changes needed anywhere else.
 *
 * In the browser console:
 *   apiLogs.table()        // one row per call: method, url, status, duration
 *   apiLogs.last()         // full detail of the most recent call
 *   apiLogs.last(5)        // last 5 calls
 *   apiLogs.find('books')  // every call whose url matches
 *   apiLogs.errors()       // only failures (status >= 400 or network errors)
 *   apiLogs.slow(1000)     // calls slower than 1000 ms
 *   apiLogs.all()          // raw array of entries
 *   apiLogs.download()     // save everything as api-logs.json
 *   apiLogs.clear()        // empty the buffer
 *   apiLogs.off()          // stop console output (keeps recording)
 *   apiLogs.on()           // resume console output
 *   apiLogs.config         // tweak the settings below at runtime
 */

const CONFIG = {
  // Console printing. Recording into the buffer always happens while installed.
  printToConsole: true,
  // Collapse each call's console group (expand by clicking the arrow).
  collapsed: true,
  // Print request/response bodies and headers.
  logRequestBody: true,
  logResponseBody: true,
  logHeaders: true,
  // Show where in the app the call was made from (stack trace snippet).
  logCallSite: true,
  // Bodies longer than this are truncated in the console (buffer keeps the same cut).
  maxBodyChars: 5000,
  // How many calls to keep in memory.
  maxEntries: 500,
  // Replace the middle of Authorization tokens / cookies with "…".
  redactTokens: true,
  // URLs matching any of these are ignored (Vite dev server noise, assets, etc).
  ignore: [
    /\/@vite\//,
    /\/@react-refresh/,
    /\/node_modules\//,
    /\.hot-update\./,
    /^data:/,
    /^blob:/,
  ],
};

const entries = [];
let seq = 0;

/* ------------------------------------------------------------------ helpers */

const now = () =>
  typeof performance !== "undefined" ? performance.now() : Date.now();

const shouldIgnore = (url) => CONFIG.ignore.some((re) => re.test(String(url)));

const absoluteUrl = (url) => {
  try {
    return new URL(String(url), window.location.href).href;
  } catch {
    return String(url);
  }
};

const shortUrl = (url) => {
  try {
    const u = new URL(absoluteUrl(url));
    return u.pathname + u.search;
  } catch {
    return String(url);
  }
};

const redact = (name, value) => {
  if (!CONFIG.redactTokens) return value;
  const key = String(name).toLowerCase();
  if (!["authorization", "cookie", "set-cookie", "x-api-key"].includes(key))
    return value;
  const str = String(value);
  if (str.length <= 24) return str;
  return `${str.slice(0, 16)}…${str.slice(-6)} (${str.length} chars, masked)`;
};

const truncate = (str) => {
  if (typeof str !== "string") return str;
  return str.length > CONFIG.maxBodyChars
    ? `${str.slice(0, CONFIG.maxBodyChars)}\n…[truncated, ${str.length} chars total]`
    : str;
};

// Parse JSON when possible so the console shows an expandable object.
const parseBody = (raw) => {
  if (typeof raw !== "string") return raw;
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      /* fall through to plain text */
    }
  }
  return truncate(raw);
};

// Turn any request body (JSON string, FormData, URLSearchParams, Blob…) into
// something readable in the console.
const describeRequestBody = (body) => {
  if (body == null) return undefined;
  if (typeof body === "string") return parseBody(body);
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const out = {};
    for (const [k, v] of body.entries()) {
      out[k] =
        typeof File !== "undefined" && v instanceof File
          ? `[File] ${v.name} (${v.type || "unknown type"}, ${v.size} bytes)`
          : v;
    }
    return { "[FormData]": out };
  }
  if (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams)
    return Object.fromEntries(body.entries());
  if (typeof Blob !== "undefined" && body instanceof Blob)
    return `[Blob] ${body.type || "unknown type"}, ${body.size} bytes`;
  if (typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer)
    return `[ArrayBuffer] ${body.byteLength} bytes`;
  return body;
};

const isTextContentType = (contentType = "") =>
  /json|text|xml|javascript|urlencoded|html/i.test(contentType);

const headersToObject = (headers) => {
  const out = {};
  if (!headers) return out;
  if (typeof headers.forEach === "function" && !Array.isArray(headers)) {
    headers.forEach((value, key) => {
      out[key] = redact(key, value);
    });
    return out;
  }
  for (const [key, value] of Object.entries(headers)) {
    if (value != null) out[key] = redact(key, value);
  }
  return out;
};

// Raw "a: b\r\nc: d" string from XHR.getAllResponseHeaders().
const parseRawHeaders = (raw = "") => {
  const out = {};
  raw
    .trim()
    .split(/[\r\n]+/)
    .filter(Boolean)
    .forEach((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      out[key] = redact(key, line.slice(idx + 1).trim());
    });
  return out;
};

// Best-effort "which component fired this call".
const callSite = () => {
  if (!CONFIG.logCallSite) return undefined;
  const stack = new Error().stack || "";
  const lines = stack
    .split("\n")
    .slice(1)
    .map((l) => l.trim())
    .filter(
      (l) =>
        !l.includes("apiLogger") &&
        !/\bat (fetch|send|open|XMLHttpRequest)\b/.test(l)
    );
  return lines.slice(0, 4).join("\n") || undefined;
};

/* ------------------------------------------------------------------ logging */

const statusColor = (entry) => {
  if (entry.error || entry.status === 0) return "#e11d48"; // network failure
  if (entry.status >= 500) return "#e11d48";
  if (entry.status >= 400) return "#f59e0b";
  if (entry.status >= 300) return "#0ea5e9";
  return "#16a34a";
};

const record = (entry) => {
  entries.push(entry);
  if (entries.length > CONFIG.maxEntries) entries.shift();
  print(entry);
};

const print = (entry) => {
  if (!CONFIG.printToConsole) return;
  const color = statusColor(entry);
  const label = entry.error ? "FAILED" : entry.status;
  const group = CONFIG.collapsed ? console.groupCollapsed : console.group;

  group.call(
    console,
    `%c API %c${entry.method}%c ${shortUrl(entry.url)} %c${label}%c ${entry.durationMs} ms`,
    "background:#4338ca;color:#fff;border-radius:3px;font-weight:700",
    "color:#4338ca;font-weight:700",
    "color:inherit",
    `color:${color};font-weight:700`,
    "color:#888"
  );

  console.log("#%d  %s  %s", entry.id, entry.via, entry.startedAt);
  console.log("URL:", entry.url);
  if (entry.query && Object.keys(entry.query).length)
    console.log("Query params:", entry.query);
  if (CONFIG.logHeaders && entry.requestHeaders)
    console.log("Request headers:", entry.requestHeaders);
  if (CONFIG.logRequestBody && entry.requestBody !== undefined)
    console.log("Request body:", entry.requestBody);
  if (entry.withCredentials !== undefined)
    console.log("Sends cookies:", entry.withCredentials);

  if (entry.error) {
    console.log(
      "%cNetwork error (no response): %s",
      `color:${color};font-weight:700`,
      entry.error
    );
  } else {
    console.log(
      "%cStatus: %s %s",
      `color:${color};font-weight:700`,
      entry.status,
      entry.statusText || ""
    );
    if (CONFIG.logHeaders && entry.responseHeaders)
      console.log("Response headers:", entry.responseHeaders);
    if (CONFIG.logResponseBody && entry.responseBody !== undefined)
      console.log("Response body:", entry.responseBody);
  }

  if (entry.callSite) console.log("Called from:\n" + entry.callSite);
  console.groupEnd();
};

const baseEntry = (method, url, extra = {}) => {
  const abs = absoluteUrl(url);
  let query = {};
  try {
    query = Object.fromEntries(new URL(abs).searchParams.entries());
  } catch {
    /* ignore */
  }
  return {
    id: ++seq,
    method: String(method || "GET").toUpperCase(),
    url: abs,
    path: shortUrl(abs),
    query,
    startedAt: new Date().toISOString(),
    callSite: callSite(),
    ...extra,
  };
};

/* -------------------------------------------------------------- fetch patch */

const originalFetch = window.fetch ? window.fetch.bind(window) : null;

if (originalFetch) {
  window.fetch = async function loggedFetch(input, init = {}) {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input?.url;

    if (shouldIgnore(url)) return originalFetch(input, init);

    const request = typeof input === "object" && input?.headers ? input : null;
    const entry = baseEntry(init.method || request?.method || "GET", url, {
      via: "fetch",
      requestHeaders: CONFIG.logHeaders
        ? { ...headersToObject(request?.headers), ...headersToObject(init.headers) }
        : undefined,
      requestBody: CONFIG.logRequestBody
        ? describeRequestBody(init.body)
        : undefined,
      withCredentials:
        (init.credentials || request?.credentials || "same-origin") !== "omit",
    });

    const started = now();
    try {
      const response = await originalFetch(input, init);
      entry.durationMs = Math.round(now() - started);
      entry.status = response.status;
      entry.statusText = response.statusText;
      entry.ok = response.ok;
      if (CONFIG.logHeaders)
        entry.responseHeaders = headersToObject(response.headers);

      if (CONFIG.logResponseBody) {
        const type = response.headers.get("content-type") || "";
        if (isTextContentType(type)) {
          // Clone so the app still gets an unread body.
          try {
            entry.responseBody = parseBody(await response.clone().text());
          } catch (err) {
            entry.responseBody = `[body could not be read: ${err.message}]`;
          }
        } else {
          const size = response.headers.get("content-length");
          entry.responseBody = `[binary/stream not logged] ${type || "unknown type"}${
            size ? `, ${size} bytes` : ""
          }`;
        }
      }
      record(entry);
      return response;
    } catch (err) {
      entry.durationMs = Math.round(now() - started);
      entry.status = 0;
      entry.ok = false;
      entry.error = err?.message || String(err);
      record(entry);
      throw err;
    }
  };
}

/* ------------------------------------------------------ XMLHttpRequest patch */
/* axios uses XHR in the browser, so this is what catches src/services/*.js.   */

const XHR = window.XMLHttpRequest;

if (XHR) {
  const originalOpen = XHR.prototype.open;
  const originalSend = XHR.prototype.send;
  const originalSetHeader = XHR.prototype.setRequestHeader;

  XHR.prototype.open = function (method, url, ...rest) {
    this.__apiLog = { method, url, headers: {}, ignored: shouldIgnore(url) };
    return originalOpen.call(this, method, url, ...rest);
  };

  XHR.prototype.setRequestHeader = function (name, value) {
    if (this.__apiLog) this.__apiLog.headers[name] = redact(name, value);
    return originalSetHeader.call(this, name, value);
  };

  XHR.prototype.send = function (body) {
    const meta = this.__apiLog;
    if (!meta || meta.ignored) return originalSend.call(this, body);

    const entry = baseEntry(meta.method, meta.url, {
      via: "xhr (axios)",
      requestHeaders: CONFIG.logHeaders ? meta.headers : undefined,
      requestBody: CONFIG.logRequestBody ? describeRequestBody(body) : undefined,
      withCredentials: this.withCredentials,
    });

    const started = now();
    let done = false;

    const finish = (error) => {
      if (done) return;
      done = true;
      entry.durationMs = Math.round(now() - started);
      entry.status = this.status;
      entry.statusText = this.statusText;
      entry.ok = this.status >= 200 && this.status < 300;
      if (error) entry.error = error;

      if (CONFIG.logHeaders) {
        try {
          entry.responseHeaders = parseRawHeaders(this.getAllResponseHeaders());
        } catch {
          /* ignore */
        }
      }

      if (CONFIG.logResponseBody) {
        try {
          if (this.responseType === "" || this.responseType === "text") {
            entry.responseBody = parseBody(this.responseText);
          } else if (this.responseType === "json") {
            entry.responseBody = this.response;
          } else {
            entry.responseBody = `[${this.responseType} response not logged]`;
          }
        } catch (err) {
          entry.responseBody = `[body could not be read: ${err.message}]`;
        }
      }
      record(entry);
    };

    this.addEventListener("load", () => finish());
    this.addEventListener("error", () => finish("network error"));
    this.addEventListener("timeout", () => finish("timeout"));
    this.addEventListener("abort", () => finish("aborted"));

    return originalSend.call(this, body);
  };
}

/* ------------------------------------------------------------ console tools */

const api = {
  config: CONFIG,
  all: () => entries,
  clear: () => {
    entries.length = 0;
    console.log("[apiLogs] cleared");
  },
  on: () => {
    CONFIG.printToConsole = true;
    console.log("[apiLogs] console output on");
  },
  off: () => {
    CONFIG.printToConsole = false;
    console.log("[apiLogs] console output off (still recording)");
  },
  last: (n = 1) => {
    const slice = entries.slice(-n);
    slice.forEach(print);
    return n === 1 ? slice[0] : slice;
  },
  find: (text) => {
    const re = text instanceof RegExp ? text : new RegExp(text, "i");
    const hits = entries.filter((e) => re.test(e.url));
    hits.forEach(print);
    return hits;
  },
  errors: () => {
    const hits = entries.filter((e) => e.error || e.status === 0 || e.status >= 400);
    hits.forEach(print);
    return hits;
  },
  slow: (ms = 1000) => {
    const hits = entries.filter((e) => e.durationMs >= ms);
    hits.forEach(print);
    return hits;
  },
  table: () => {
    console.table(
      entries.map((e) => ({
        "#": e.id,
        method: e.method,
        path: e.path,
        status: e.error ? `ERR (${e.error})` : e.status,
        ms: e.durationMs,
        via: e.via,
        at: e.startedAt.slice(11, 23),
      }))
    );
  },
  download: (filename = "api-logs.json") => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  },
};

window.apiLogs = api;
window.__API_LOGS__ = entries;

console.log(
  "%c[apiLogger] active%c — every API call is logged. Type %capiLogs.table()%c in the console. Delete src/apiLogger.js and its import in main.jsx to remove.",
  "background:#4338ca;color:#fff;padding:1px 4px;border-radius:3px;font-weight:700",
  "color:inherit",
  "color:#4338ca;font-weight:700",
  "color:inherit"
);

export default api;
