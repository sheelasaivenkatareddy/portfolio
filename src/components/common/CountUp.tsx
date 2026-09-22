import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CountUpProps {
  /** e.g. "2+", "< 450ms", "98.4%", "100%" — the leading number is animated, everything else is kept. */
  value: string;
  duration?: number;
  /** false = animate shortly after mount (use for above-the-fold values already in view, like the Hero). */
  triggerOnScroll?: boolean;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({
  value,
  duration = 1.3,
  triggerOnScroll = true,
  delay = 0,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value;
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const counter = { n: 0 };
    el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;

    const run = () =>
      gsap.to(counter, {
        n: target,
        duration,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`;
        },
      });

    if (!triggerOnScroll) {
      const id = requestAnimationFrame(run);
      return () => cancelAnimationFrame(id);
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: run,
    });
    return () => trigger.kill();
  }, [value, duration, triggerOnScroll, delay]);

  return (
    <span ref={ref} className={className} style={style}>
      {value}
    </span>
  );
}
