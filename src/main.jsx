import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { i18nReady } from "./i18n.js";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

// Debug logger for API calls: development only (it prints request bodies, incl. passwords)
if (import.meta.env.DEV) import("./apiLogger.js");

// After a new deploy, a tab opened earlier still asks for the old code files, which no
// longer exist, and the page goes blank. Reload to get the new files
// (at most once every 10 seconds, so a real error can't cause a reload loop).
window.addEventListener("vite:preloadError", () => {
  const lastReload = Number(sessionStorage.getItem("reloadedAfterDeploy") || 0);
  if (Date.now() - lastReload > 10000) {
    sessionStorage.setItem("reloadedAfterDeploy", String(Date.now()));
    window.location.reload();
  }
});

// Render once the starting language has loaded (or failed, then keys fall back to built-in text)
i18nReady.finally(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
});
