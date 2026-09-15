import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n.js";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
