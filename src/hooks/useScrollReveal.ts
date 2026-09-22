import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-to-action reveals, one style per element type (all once, outside the hero):
 *  - section headings              -> clip-reveal (wipe down from a mask)
 *  - Experience/Project cards      -> slide in from alternating sides (rise on narrow screens)
 *  - Certification/award cards     -> rise + slight scale, staggered
 *  - every other panel             -> soft fade + scale
 * Only opacity, transform and clip-path animate; inline styles are cleared afterwards so
 * hover transforms keep working. Elements entering together are staggered.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wide = window.innerWidth >= 900;

    const ctx = gsap.context(() => {
      const targets = gsap.utils
        .toArray<HTMLElement>("[data-scroll], main .glass-panel")
        .filter(
          (el) =>
            !el.closest("#hero-section") &&
            !el.parentElement?.closest("[data-scroll], .glass-panel"),
        );

      const perSection = new Map<Element, number>();

      targets.forEach((el) => {
        const section = el.closest("section");
        const isPanel = el.classList.contains("glass-panel");
        const slides = !!section && ["experience-section", "projects-bento"].includes(section.id);

        if (!isPanel) {
          // heading: clip-reveal
          gsap.set(el, { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" });
        } else if (slides) {
          const i = perSection.get(section) ?? 0;
          perSection.set(section, i + 1);
          gsap.set(el, wide ? { opacity: 0, x: i % 2 === 0 ? -56 : 56 } : { opacity: 0, y: 28 });
        } else {
          gsap.set(el, { opacity: 0, y: 20, scale: 0.96 });
        }
      });

      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.85,
            ease: "expo.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform,opacity,clipPath",
          }),
      });
    });

    return () => ctx.revert();
  }, []);
}
