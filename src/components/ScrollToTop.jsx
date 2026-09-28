import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // The target may be in a section whose code is still loading: keep looking for up to 2 seconds
    const targetId = decodeURIComponent(hash.replace("#", ""));
    let tries = 0;
    const find = () => {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: "auto" });
      else if (tries++ < 20) timer = setTimeout(find, 100);
    };
    let timer = null;
    find();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
