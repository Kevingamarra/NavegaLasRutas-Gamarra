import { useEffect } from "react";

export default function useReveal(selector = ".reveal") {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { root: null, threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [selector]);
}
