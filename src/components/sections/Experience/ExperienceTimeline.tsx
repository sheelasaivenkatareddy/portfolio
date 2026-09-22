import experienceData from "../../../data/experience.json";
import { VelocityHeading } from "../../common/VelocityHeading";
import { Calendar, MapPin, CheckCircle2, Award } from "lucide-react";

export function ExperienceTimeline() {
  return (
    <section
      id="experience-section"
      className="section-spacer"
      style={{
        position: "relative",
        background: "radial-gradient(ellipse at 50% 50%, rgba(24, 24, 24, 0.6) 0%, #0a0a0a 100%)",
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

      {/* Stacked experience cards: every card is fully visible in normal page flow */}
      <div className="section-container">
        <div
          className="experience-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(520px, 100%), 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {experienceData.map((exp, idx) => (
            <div
              key={exp.id}
              data-scroll
              className="glass-panel"
              style={{
                padding: "2.5rem",
                borderRadius: "var(--radius-xl)",
                background: "rgba(20, 20, 20, 0.88)",
                border: "1px solid rgba(38, 38, 38, 0.9)",
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
                      ? "linear-gradient(90deg, #ccff00, #eaff8a, transparent)"
                      : "linear-gradient(90deg, #8fd400, #5c8f00, transparent)",
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
                        color: "var(--accent)",
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
                    color: "var(--accent-secondary)",
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
                    borderLeft: "2px solid var(--accent)",
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
                        color="#ccff00"
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
                        color: "var(--accent)",
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
            data-scroll
            className="glass-panel"
            style={{
              gridColumn: "1 / -1",
              padding: "2.5rem",
              borderRadius: "var(--radius-xl)",
              background: "rgba(20, 20, 20, 0.6)",
              border: "1px dashed rgba(204, 255, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Award size={42} color="#ccff00" style={{ marginBottom: "1.25rem" }} />
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
