import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import experienceData from "../../../data/experience.json";
import { VelocityHeading } from "../../common/VelocityHeading";
import { Calendar, MapPin, CheckCircle2, Award } from "lucide-react";

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Match media for responsive pinning
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      // Calculate total horizontal scroll distance needed
      const scrollDistance = track.scrollWidth - window.innerWidth + 120;

      const trigger = ScrollTrigger.create({
        trigger: section,
        pin: true,
        scrub: 1.1,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        anticipatePin: 1,
        onUpdate: (self) => {
          const x = -self.progress * scrollDistance;
          gsap.set(track, { x });
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="experience-section"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 50%, rgba(18, 26, 42, 0.6) 0%, #0b0f17 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "6rem 0",
      }}
    >
      <div className="section-container" style={{ width: "100%", marginBottom: "1.5rem" }}>
        <VelocityHeading
          subtitle="Venture Leadership & Milestones"
          title="EXECUTIVE"
          highlight="EXPERIENCE"
          description="Directing end-to-end technical architectures, high-velocity product roadmaps, and omni-channel growth operations across co-founded enterprises."
        />
      </div>

      {/* Horizontal Camera Track */}
      <div
        style={{
          width: "100%",
          overflow: "visible",
          position: "relative",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "2.5rem",
            paddingLeft: "calc(max(2rem, (100vw - 1280px) / 2))",
            paddingRight: "6rem",
            willChange: "transform",
          }}
          className="experience-track"
        >
          {experienceData.map((exp, idx) => (
            <div
              key={exp.id}
              className="glass-panel gpu-layer"
              style={{
                flex: "0 0 min(680px, 85vw)",
                padding: "2.5rem",
                borderRadius: "var(--radius-xl)",
                background: "rgba(17, 22, 34, 0.88)",
                border: "1px solid rgba(38, 44, 54, 0.9)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Accent Glow Line Top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "2rem",
                  right: "2rem",
                  height: "2px",
                  background:
                    idx === 0
                      ? "linear-gradient(90deg, #00f0ff, #38bdf8, transparent)"
                      : "linear-gradient(90deg, #818cf8, #a78bfa, transparent)",
                }}
              />

              <div>
                {/* Header Meta */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    <span className="badge-pill" style={{ marginBottom: "0.5rem" }}>
                      {exp.ventureType}
                    </span>
                    <h3
                      style={{
                        fontSize: "var(--text-xl)",
                        fontWeight: 700,
                        color: "#ffffff",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {exp.company}
                    </h3>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        color: "var(--accent-cyan)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                      }}
                    >
                      <Calendar size={13} />
                      {exp.period}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "0.3rem",
                        color: "var(--text-muted)",
                        fontSize: "0.75rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      <MapPin size={12} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Role Title */}
                <div
                  style={{
                    fontSize: "var(--text-base)",
                    fontWeight: 600,
                    color: "var(--accent-sky)",
                    marginBottom: "0.85rem",
                  }}
                >
                  {exp.role}
                </div>

                {/* Tagline */}
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                    marginBottom: "1.5rem",
                    borderLeft: "2px solid var(--accent-cyan)",
                    paddingLeft: "0.75rem",
                  }}
                >
                  "{exp.tagline}"
                </p>

                {/* Deliverable Highlights */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                  {exp.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        fontSize: "var(--text-sm)",
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      <CheckCircle2
                        size={16}
                        color="#00f0ff"
                        style={{ flexShrink: 0, marginTop: "0.2rem" }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics & Tech Stack */}
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    padding: "1rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(0, 0, 0, 0.35)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "var(--text-lg)",
                        fontWeight: 800,
                        color: "var(--accent-cyan)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {exp.metrics.metric1}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {exp.metrics.label1}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "var(--text-lg)",
                        fontWeight: 800,
                        color: "#ffffff",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {exp.metrics.metric2}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {exp.metrics.label2}
                    </div>
                  </div>
                </div>

                {/* Tech Chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {exp.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="badge-pill-neutral">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Closing Milestone Card */}
          <div
            className="glass-panel gpu-layer"
            style={{
              flex: "0 0 min(420px, 80vw)",
              padding: "2.5rem",
              borderRadius: "var(--radius-xl)",
              background: "rgba(17, 22, 34, 0.6)",
              border: "1px dashed rgba(0, 240, 255, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Award size={42} color="#00f0ff" style={{ marginBottom: "1.25rem" }} />
            <h4
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "0.75rem",
              }}
            >
              Enterprise Scalability
            </h4>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              Leading dual engineering & product teams from day zero to enterprise traction.
            </p>
            <span className="badge-pill">CTO • COO • CMO EXECUTION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
