import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const STICKY_NAV_OFFSET = 96;

const scrollToHashTarget = (hash) => {
  const targetId = decodeURIComponent(hash.replace("#", ""));
  if (!targetId) {
    return false;
  }

  const target = document.getElementById(targetId);
  if (!target) {
    return false;
  }

  const top =
    target.getBoundingClientRect().top + window.scrollY - STICKY_NAV_OFFSET;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth",
  });

  return true;
};

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        const foundTarget = scrollToHashTarget(hash);
        if (!foundTarget) {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
