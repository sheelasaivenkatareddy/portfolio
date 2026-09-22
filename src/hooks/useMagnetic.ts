import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Pulls an element gently toward the cursor while hovered, then springs back on leave.
 * Fine-pointer, hover-capable devices only; no-ops under reduced motion.
 */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setX((e.clientX - (rect.left + rect.width / 2)) * strength);
      setY((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      setX(0);
      setY(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength]);
}
