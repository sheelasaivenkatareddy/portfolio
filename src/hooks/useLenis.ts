import { useEffect, useState } from "react";
import Lenis from "lenis";
import { initScrollEngine, getLenis } from "../core/TickerBridge";

export function useLenis() {
  const [lenis, setLenis] = useState<Lenis | null>(() => getLenis());

  useEffect(() => {
    const { lenis: instance, cleanup } = initScrollEngine();
    setLenis(instance);

    return () => {
      cleanup();
    };
  }, []);

  return lenis;
}
