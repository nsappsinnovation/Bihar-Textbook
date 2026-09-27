// Export helpers. Heavy libraries are loaded on demand to keep the citizen
// bundle light on mobile networks.
//
// PDFs are produced by rasterising DOM nodes (html-to-image) and placing the
// images into jsPDF. This keeps Devanagari text correctly shaped, which jsPDF's
// built-in text rendering cannot do.

const TRANSPARENT_PX =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

async function renderCanvas(node) {
  const { toCanvas } = await import("html-to-image");
  return toCanvas(node, {
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    cacheBust: true,
    imagePlaceholder: TRANSPARENT_PX,
  });
}

async function newPdf(orientation) {
  const { jsPDF } = await import("jspdf");
  return new jsPDF({ orientation, unit: "mm", format: "a4", compress: true });
}

// Drops blank rows at the bottom so a few stray pixels don't add an empty page.
function trimBlankBottom(canvas) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let lastInk = 0;
  for (let y = canvas.height - 1; y >= 0 && !lastInk; y--) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;
      if (data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250) {
        lastInk = y;
        break;
      }
    }
  }
  const height = Math.min(canvas.height, lastInk + Math.round(canvas.width * 0.02));
  if (height >= canvas.height - 1) return canvas;
  const trimmed = document.createElement("canvas");
  trimmed.width = canvas.width;
  trimmed.height = Math.max(1, height);
  trimmed.getContext("2d").drawImage(canvas, 0, 0);
  return trimmed;
}

// Captures one (possibly tall) node and slices it across as many A4 pages as needed.
export async function nodeToPdf(node, filename, { orientation = "portrait", margin = 8 } = {}) {
  const canvas = trimBlankBottom(await renderCanvas(node));
  const pdf = await newPdf(orientation);
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgW = pageW - margin * 2;
  const pxPerMm = canvas.width / imgW;
  const sliceHeightPx = Math.floor((pageH - margin * 2) * pxPerMm);

  for (let y = 0, page = 0; y < canvas.height; y += sliceHeightPx, page++) {
    const h = Math.min(sliceHeightPx, canvas.height - y);
    const slice = document.createElement("canvas");
    slice.width = canvas.width;
    slice.height = h;
    slice.getContext("2d").drawImage(canvas, 0, y, canvas.width, h, 0, 0, canvas.width, h);
    if (page > 0) pdf.addPage();
    pdf.addImage(slice.toDataURL("image/jpeg", 0.92), "JPEG", margin, margin, imgW, h / pxPerMm);
  }
  pdf.save(filename);
}

// Each node becomes exactly one page (used for paginated admin reports).
export async function pagesToPdf(nodes, filename, { orientation = "landscape", margin = 6 } = {}) {
  const pdf = await newPdf(orientation);
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  for (const [i, node] of nodes.entries()) {
    const canvas = await renderCanvas(node);
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    const ratio = Math.min(maxW / canvas.width, maxH / canvas.height);
    if (i > 0) pdf.addPage();
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", margin, margin, canvas.width * ratio, canvas.height * ratio);
  }
  pdf.save(filename);
}

// sheets: [{ name, rows }] — one worksheet per entry, column widths fitted to content.
export async function exportExcel(sheets, filename) {
  const XLSX = await import("xlsx");
  const book = XLSX.utils.book_new();
  sheets.forEach(({ name, rows }) => {
    const sheet = XLSX.utils.json_to_sheet(rows);
    const headers = Object.keys(rows[0] || {});
    sheet["!cols"] = headers.map((h) => ({
      wch: Math.min(40, Math.max(h.length, ...rows.map((r) => String(r[h] ?? "").length)) + 2),
    }));
    XLSX.utils.book_append_sheet(book, sheet, name);
  });
  XLSX.writeFile(book, filename);
}
