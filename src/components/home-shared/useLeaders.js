import { useEffect, useState } from "react";
import { getDirectory } from "../../services/directoryService";
import { fileUrl } from "../../services/api";

// Leaders come only from Admin → Leaders. One request is shared by every component on the page
// (the home hero and the leaders section), and retried on the next visit if it failed.
let leadersRequest = null;
const loadLeaders = () => {
  leadersRequest ??= getDirectory("leader")
    .then((rows) => rows.map((r) => ({ id: r.id, name: r.name, role: r.designation || "", image: fileUrl(r.photoUrl) || "" })))
    .catch((error) => {
      leadersRequest = null;
      throw error;
    });
  return leadersRequest;
};

/** null while loading, then the list of leaders ([] when none or on error). */
export default function useLeaders() {
  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
    let active = true;
    loadLeaders()
      .then((rows) => active && setLeaders(rows))
      .catch(() => active && setLeaders([]));
    return () => {
      active = false;
    };
  }, []);

  return leaders;
}

// "Shri Samrat Choudhary" -> "SC" (used where a leader has no photo, so no image is requested)
export const initialsOf = (name = "") =>
  name
    .replace(/^(shri|smt|shrimati|sri|dr)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
