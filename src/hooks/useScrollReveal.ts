import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-to-action reveals. One restrained motion for everything outside the hero:
 * a short fade-up (16px, 0.7s, power3.out), staggered 60ms when several blocks enter
 * together, played once. Only opacity and transform animate, and inline styles are
 * cleared afterwards so hover transforms keep working.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils
        .toArray<HTMLElement>("[data-scroll], main .glass-panel")
        .filter(
          (el) =>
            !el.closest("#hero-section") &&
            !el.parentElement?.closest("[data-scroll], .glass-panel"),
        );

      gsap.set(targets, { opacity: 0, y: 16 });

      ScrollTrigger.batch(targets, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            overwrite: true,
            clearProps: "transform,opacity",
          }),
      });
    });

    return () => ctx.revert();
  }, []);
}
