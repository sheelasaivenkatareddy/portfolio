import { useEffect, useState } from "react";
import { getLenis } from "../core/TickerBridge";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const onScroll = (e: { progress: number }) => {
      setProgress(e.progress);
    };

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, []);

  return progress;
}
