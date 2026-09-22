
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
  return (
    <div
      data-scroll
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
            color: "var(--accent)",
            fontSize: "var(--text-xs)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ width: "18px", height: "1px", background: "var(--accent)" }} />
          {subtitle}
        </div>
      )}

      <h2
        style={{
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
              background: "linear-gradient(135deg, #ccff00 0%, #eaff8a 50%, #8fd400 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
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
