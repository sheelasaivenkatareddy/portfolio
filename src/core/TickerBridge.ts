import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

/**
 * Initializes Lenis smooth scrolling and establishes a unified RAF ticker bridge
 * with GSAP ScrollTrigger to guarantee locked 60/120fps and eliminate dual-loop stutter.
 */
export function initScrollEngine(): { lenis: Lenis; cleanup: () => void } {
  if (lenisInstance) {
    return { lenis: lenisInstance, cleanup: () => {} };
  }

  // Initialize Lenis with refined inertia constants
  lenisInstance = new Lenis({
    duration: 1.0,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decay curve
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Notify GSAP ScrollTrigger whenever Lenis scrolls
  lenisInstance.on("scroll", () => {
    ScrollTrigger.update();
  });

  // Pipe Lenis RAF directly into GSAP's master ticker
  tickerCallback = (time: number) => {
    if (lenisInstance) {
      lenisInstance.raf(time * 1000);
    }
  };

  gsap.ticker.add(tickerCallback);

  // Disable GSAP lag smoothing to prevent visual time-warping / jump glitches
  gsap.ticker.lagSmoothing(0);

  const cleanup = () => {
    if (tickerCallback) {
      gsap.ticker.remove(tickerCallback);
      tickerCallback = null;
    }
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };

  return { lenis: lenisInstance, cleanup };
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
