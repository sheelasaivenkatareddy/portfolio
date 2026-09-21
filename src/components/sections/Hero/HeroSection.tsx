import profileData from "../../../data/profile.json";
import { useScrollVelocity } from "../../../hooks/useScrollVelocity";
import { GithubIcon, LinkedinIcon } from "../../common/BrandIcons";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";

export function HeroSection() {
  const velocity = useScrollVelocity();
  const skewX = Math.max(-10, Math.min(10, velocity * -0.3));

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "7rem",
        paddingBottom: "4rem",
        position: "relative",
      }}
    >
      <div className="section-container" style={{ width: "100%", textAlign: "center" }}>
        {/* Executive Tier Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.5rem 1.25rem",
            borderRadius: "var(--radius-full)",
            background: "rgba(0, 240, 255, 0.06)",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            boxShadow: "0 0 20px rgba(0, 240, 255, 0.15)",
            marginBottom: "1.75rem",
          }}
        >
          <Sparkles size={14} color="#00f0ff" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "var(--accent-cyan)",
              textTransform: "uppercase",
            }}
          >
            {profileData.title}
          </span>
        </div>

        {/* Main Name with Velocity Tilt */}
        <h1
          className="velocity-skew-wrap"
          style={{
            transform: `skewX(${skewX}deg)`,
            fontSize: "var(--text-huge)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "1.25rem",
            textTransform: "uppercase",
            color: "#ffffff",
          }}
        >
          {profileData.name}
        </h1>

        {/* Sub-Headline */}
        <div
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: 600,
            color: "var(--accent-sky)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.01em",
            maxWidth: "850px",
            margin: "0 auto 1.5rem",
          }}
        >
          {profileData.heroRole}
        </div>

        {/* Narrative Pitch */}
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "var(--text-secondary)",
            maxWidth: "760px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          {profileData.bio}
        </p>

        {/* Action Buttons & Direct Channels */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "3.5rem",
          }}
        >
          <button onClick={() => scrollTo("experience-section")} className="btn-primary">
            Explore Ventures <ArrowDown size={16} />
          </button>

          <button onClick={() => scrollTo("projects-bento")} className="btn-secondary">
            View Architectures
          </button>

          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: "0.85rem 1.15rem" }}
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon color="#00f0ff" />
          </a>

          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: "0.85rem 1.15rem" }}
            aria-label="GitHub Profile"
          >
            <GithubIcon />
          </a>
        </div>

        {/* High-Fidelity Metrics Ribbon */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            maxWidth: "1080px",
            margin: "0 auto",
          }}
        >
          {profileData.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: "1.5rem 1.25rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "40%",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #00f0ff, transparent)",
                }}
              />
              <div
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: 800,
                  color: "var(--accent-cyan)",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.35rem",
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Location & Status Pill */}
        <div
          style={{
            marginTop: "3rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.4rem 1rem",
            borderRadius: "var(--radius-full)",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border-subtle)",
            fontSize: "var(--text-xs)",
            color: "var(--text-secondary)",
          }}
        >
          <MapPin size={14} color="#00f0ff" />
          <span>{profileData.location}</span>
          <span style={{ color: "var(--border-subtle)" }}>|</span>
          <span style={{ color: "#10b981", fontWeight: 600 }}>{profileData.status}</span>
        </div>
      </div>
    </section>
  );
}
