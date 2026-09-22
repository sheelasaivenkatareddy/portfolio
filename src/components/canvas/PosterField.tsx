import { useEffect, useRef } from "react";
import { getLenis } from "../../core/TickerBridge";

/**
 * Poster-style background: a subtle halftone dot grid plus two soft, blurred
 * "spotlight" blobs in the accent colour that drift gently and track scroll.
 * Pure CSS/DOM — no WebGL — so the only per-frame cost is two transform writes
 * while scrolling or drifting, both GPU-composited.
 */
export default function PosterField() {
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const a = blobARef.current;
    const b = blobBRef.current;
    if (!a || !b) return;

    const paintAt = (t: number) => {
      const progress = getLenis()?.progress ?? 0;
      a.style.transform = `translate3d(${50 + Math.sin(t * 0.05) * 14}vw, ${
        16 + progress * 55 + Math.cos(t * 0.04) * 6
      }vh, 0)`;
      b.style.transform = `translate3d(${72 + Math.cos(t * 0.045) * 16}vw, ${
        58 - progress * 30 + Math.sin(t * 0.06) * 8
      }vh, 0)`;
    };

    if (reduceMotion) {
      paintAt(0);
      return;
    }

    const start = performance.now();
    const loop = (now: number) => {
      paintAt((now - start) / 1000);
      frameId = requestAnimationFrame(loop);
    };
    let frameId = requestAnimationFrame(loop);

    // Time keeps flowing while hidden (so the drift doesn't visibly reset on return);
    // only the wasted paint work is what gets paused.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      } else if (!frameId) {
        frameId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div id="bg-field-container" aria-hidden="true">
      <div className="bg-halftone" />
      <div ref={blobARef} className="bg-blob bg-blob-a" />
      <div ref={blobBRef} className="bg-blob bg-blob-b" />
    </div>
  );
}
