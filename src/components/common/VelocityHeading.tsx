import { useScrollVelocity } from "../../hooks/useScrollVelocity";

interface VelocityHeadingProps {
  subtitle?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
}

export function VelocityHeading({
  subtitle,
  title,
  highlight,
  description,
  align = "left",
}: VelocityHeadingProps) {
  const velocity = useScrollVelocity();

  // Dynamic skew: clamped between -12 and 12 degrees
  const skewX = Math.max(-12, Math.min(12, velocity * -0.4));
  const skewY = Math.max(-4, Math.min(4, velocity * -0.1));

  return (
    <div
      style={{
        textAlign: align,
        marginBottom: "3.5rem",
        position: "relative",
      }}
    >
      {subtitle && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--accent-cyan)",
            fontSize: "var(--text-xs)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ width: "18px", height: "1px", background: "var(--accent-cyan)" }} />
          {subtitle}
        </div>
      )}

      <h2
        className="velocity-skew-wrap"
        style={{
          transform: `skewX(${skewX}deg) skewY(${skewY}deg)`,
          fontSize: "var(--text-3xl)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          color: "var(--text-primary)",
          display: "block",
        }}
      >
        {title}{" "}
        {highlight && (
          <span
            style={{
              background: "linear-gradient(135deg, #00f0ff 0%, #38bdf8 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(0, 240, 255, 0.4))",
            }}
          >
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          style={{
            maxWidth: "680px",
            margin: align === "center" ? "1rem auto 0" : "1rem 0 0",
            color: "var(--text-secondary)",
            fontSize: "var(--text-base)",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
