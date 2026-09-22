import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import profileData from "../../../data/profile.json";
import { CountUp } from "../../common/CountUp";
import { useMagnetic } from "../../../hooks/useMagnetic";
import { ArrowDown, MapPin, Sparkles, Trophy } from "lucide-react";

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const primaryCtaRef = useRef<HTMLButtonElement>(null);
  useMagnetic(primaryCtaRef, 0.3);

  // Load sequence: badge > name > role > bio > CTAs > metrics > status
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
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
        {/* Profile Photo */}
        <div
          data-reveal
          style={{
            width: "132px",
            height: "132px",
            margin: "0 auto 1.75rem",
            borderRadius: "var(--radius-full)",
            padding: "3px",
            background: "linear-gradient(135deg, #ccff00 0%, #eaff8a 100%)",
            boxShadow: "0 0 32px rgba(204, 255, 0, 0.25)",
          }}
        >
          <img
            src={profileData.photo}
            alt={profileData.name}
            width={126}
            height={126}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-full)",
              objectFit: "cover",
              display: "block",
              border: "3px solid var(--bg-primary)",
            }}
          />
        </div>

        {/* Role badge */}
        <div
          data-reveal
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.5rem 1.25rem",
            borderRadius: "var(--radius-full)",
            background: "rgba(204, 255, 0, 0.06)",
            border: "1px solid rgba(204, 255, 0, 0.3)",
            boxShadow: "0 0 20px rgba(204, 255, 0, 0.15)",
            marginBottom: "1.75rem",
          }}
        >
          <Sparkles size={14} color="var(--accent)" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "var(--accent)",
              textTransform: "uppercase",
            }}
          >
            {profileData.title}
          </span>
        </div>

        {/* Main Name with Velocity Tilt */}
        <h1
          data-reveal
          style={{
            fontSize: "var(--text-huge)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "1.25rem",
            textTransform: "uppercase",
            color: "var(--text-primary)",
          }}
        >
          {profileData.name}
        </h1>

        {/* Sub-Headline */}
        <div
          data-reveal
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: 700,
            color: "var(--text-primary)",
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
          data-reveal
          style={{
            fontSize: "var(--text-base)",
            color: "var(--text-secondary)",
            maxWidth: "620px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          {profileData.bio}
        </p>

        {/* Primary + secondary action */}
        <div
          data-reveal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "3.5rem",
          }}
        >
          <button
            ref={primaryCtaRef}
            onClick={() => scrollTo("projects-bento")}
            className="btn-primary"
          >
            See selected work <ArrowDown size={16} />
          </button>

          <button onClick={() => scrollTo("experience-section")} className="btn-secondary">
            Experience
          </button>
        </div>

        {/* High-Fidelity Metrics Ribbon */}
        <div
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            maxWidth: "560px",
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
                  background: "linear-gradient(90deg, transparent, #ccff00, transparent)",
                }}
              />
              <div
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: 800,
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.35rem",
                }}
              >
                <CountUp value={metric.value} triggerOnScroll={false} delay={0.5 + idx * 0.15} />
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
          data-reveal
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
          <MapPin size={14} color="var(--accent)" />
          <span>{profileData.location}</span>
          <span style={{ color: "var(--border-subtle)" }}>|</span>
          <span style={{ color: "var(--accent-emerald)", fontWeight: 600 }}>{profileData.status}</span>
        </div>

        {/* Startup Safari 2.0 — 2nd Prize highlight */}
        <button
          data-reveal
          onClick={() => scrollTo("certifications")}
          style={{
            display: "flex",
            marginTop: "1rem",
            marginInline: "auto",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.4rem 1rem",
            borderRadius: "var(--radius-full)",
            background: "rgba(234, 255, 138, 0.08)",
            border: "1px solid rgba(234, 255, 138, 0.35)",
            fontSize: "var(--text-xs)",
            color: "var(--accent-secondary)",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            letterSpacing: "0.04em",
            cursor: "pointer",
          }}
        >
          <Trophy size={13} />
          2nd Prize — Startup Safari 2.0
        </button>
      </div>
    </section>
  );
}
