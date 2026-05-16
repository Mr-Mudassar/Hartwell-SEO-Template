"use client";
import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const sweep = () => {
      const els = document.querySelectorAll(".reveal:not(.in)");
      const vh = window.innerHeight || 800;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.95 && r.bottom > 0) el.classList.add("in");
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    };

    observeAll();
    requestAnimationFrame(() => { sweep(); observeAll(); });
    setTimeout(() => { sweep(); observeAll(); }, 200);

    const onScroll = () => { sweep(); observeAll(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const mo = new MutationObserver(() => { observeAll(); sweep(); });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
