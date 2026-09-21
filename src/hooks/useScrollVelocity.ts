import { useEffect, useRef, useState } from "react";
import { getLenis } from "../core/TickerBridge";

/**
 * Returns a smoothly interpolated (lerped) scroll velocity
 * useful for dynamic typography skewing, tilt matrices, and shader uniforms.
 */
export function useScrollVelocity(damping = 0.1) {
  const [velocity, setVelocity] = useState(0);
  const targetVelocity = useRef(0);
  const currentVelocity = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const onScroll = (e: { velocity: number }) => {
      // Clamp velocity to avoid extreme, unreadable text shears
      targetVelocity.current = Math.max(-25, Math.min(25, e.velocity));
    };

    lenis.on("scroll", onScroll);

    const updateLoop = () => {
      // Linear interpolation: current + (target - current) * damping
      currentVelocity.current += (targetVelocity.current - currentVelocity.current) * damping;
      
      // Decay target velocity back toward zero if user stopped scrolling
      targetVelocity.current *= 0.92;

      // Only update state if change is perceptible (> 0.01) to save renders
      if (Math.abs(currentVelocity.current) > 0.01) {
        setVelocity(Number(currentVelocity.current.toFixed(2)));
      } else if (velocity !== 0) {
        setVelocity(0);
      }

      rafId.current = requestAnimationFrame(updateLoop);
    };

    rafId.current = requestAnimationFrame(updateLoop);

    return () => {
      lenis.off("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [damping]);

  return velocity;
}
