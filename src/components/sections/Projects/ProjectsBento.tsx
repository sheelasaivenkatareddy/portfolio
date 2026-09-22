import { useState } from "react";
import projectsData from "../../../data/projects.json";
import { VelocityHeading } from "../../common/VelocityHeading";
import { GithubIcon } from "../../common/BrandIcons";
import { Sparkles, ArrowUpRight, X, CheckCircle2, Cpu } from "lucide-react";

type ProjectType = typeof projectsData[0];

export function ProjectsBento() {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  const openModal = (proj: ProjectType) => {
    setActiveProject(proj);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="projects-bento" className="section-spacer" style={{ position: "relative" }}>
      <div className="section-container">
        <VelocityHeading
          subtitle="Selected Systems & Architectures"
          title="FEATURED"
          highlight="VENTURE PROJECTS"
          description="A showcase of enterprise-scale full-stack portals, real-time AI audio processing pipelines, and mission-critical embedded IoT telemetry."
        />

        {/* Bento Grid Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {projectsData.map((project, idx) => {
            const isWide = idx === 0 || idx === 3;

            return (
              <div
                key={project.id}
                className="glass-panel"
                style={{
                  gridColumn: isWide ? "span 1" : "span 1",
                  padding: "2.25rem",
                  borderRadius: "var(--radius-xl)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onClick={() => openModal(project)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Ambient Top Glow Line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "2rem",
                    right: "2rem",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #ccff00, transparent)",
                    opacity: 0.7,
                  }}
                />

                <div>
                  {/* Category & Badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <span className="badge-pill">{project.badge}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    style={{
                      fontSize: "var(--text-xl)",
                      fontWeight: 700,
                      color: "#ffffff",
                      letterSpacing: "-0.02em",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {project.title}
                  </h3>

                  <div
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      color: "var(--accent-secondary)",
                      marginBottom: "1rem",
                    }}
                  >
                    {project.subtitle}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "1.75rem",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Key Metrics & Footer Bar */}
                <div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.75rem",
                      padding: "0.85rem 1rem",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {project.stats.map((st, sIdx) => (
                      <div key={sIdx}>
                        <div
                          style={{
                            fontSize: "var(--text-base)",
                            fontWeight: 700,
                            color: "var(--accent)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {st.val}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack pills & Expand trigger */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {project.tech.slice(0, 3).map((t, tIdx) => (
                        <span key={tIdx} className="badge-pill-neutral" style={{ fontSize: "0.7rem" }}>
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="badge-pill-neutral" style={{ fontSize: "0.7rem" }}>
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--accent)",
                      }}
                    >
                      Case Study <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Interactive Case-Study Modal */}
      {activeProject && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            background: "rgba(10, 10, 10, 0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
          onClick={closeModal}
        >
          <div
            className="glass-panel"
            style={{
              width: "100%",
              maxWidth: "840px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "2.5rem",
              borderRadius: "var(--radius-xl)",
              background: "#141414",
              border: "1px solid rgba(204, 255, 0, 0.3)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid var(--border-subtle)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)")}
              aria-label="Close Case Study"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <span className="badge-pill" style={{ marginBottom: "0.75rem" }}>
              {activeProject.badge}
            </span>
            <h2
              style={{
                fontSize: "var(--text-2xl)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                marginBottom: "0.35rem",
              }}
            >
              {activeProject.title}
            </h2>
            <div
              style={{
                fontSize: "var(--text-base)",
                color: "var(--accent-secondary)",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              {activeProject.subtitle}
            </div>

            {/* Narrative Overview */}
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              {activeProject.description}
            </p>

            {/* Deep-Dive Architecture Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
              <div
                style={{
                  padding: "1.5rem",
                  borderRadius: "var(--radius-lg)",
                  background: "rgba(204, 255, 0, 0.03)",
                  border: "1px solid rgba(204, 255, 0, 0.15)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Cpu size={16} /> Technical Architecture
                </div>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {activeProject.caseStudy.architecture}
                </p>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  borderRadius: "var(--radius-lg)",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  <Sparkles size={16} color="#eaff8a" /> Engineering Breakthroughs
                </div>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {activeProject.caseStudy.breakthroughs}
                </p>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  marginBottom: "0.75rem",
                }}
              >
                Key Deliverables
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {activeProject.caseStudy.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      fontSize: "var(--text-sm)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <CheckCircle2 size={16} color="#ccff00" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips & GitHub CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {activeProject.tech.map((t, tIdx) => (
                  <span key={tIdx} className="badge-pill-neutral">
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <a
                  href={activeProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: "0.65rem 1.25rem", fontSize: "0.85rem" }}
                >
                  <GithubIcon width={16} height={16} /> View Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
