import { useEffect, useState } from "react";
import gsap from "gsap";
import { getLenis } from "../core/TickerBridge";

/** Scroll progress (0..1). Polls Lenis on the shared ticker so mount order doesn't matter. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let last = -1;
    const tick = () => {
      const p = getLenis()?.progress ?? 0;
      if (Math.abs(p - last) > 0.002) {
        last = p;
        setProgress(p);
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return progress;
}
