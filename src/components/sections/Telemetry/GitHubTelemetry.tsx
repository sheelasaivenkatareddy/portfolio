import telemetryData from "../../../data/telemetry.json";
import { VelocityHeading } from "../../common/VelocityHeading";
import { GithubIcon } from "../../common/BrandIcons";
import { GitBranch, Terminal, ShieldCheck, ArrowUpRight } from "lucide-react";

export function GitHubTelemetry() {
  return (
    <section id="telemetry-section" className="section-spacer" style={{ position: "relative" }}>
      <div className="section-container">
        <VelocityHeading
          subtitle="Real-Time GitHub & Production Cadence"
          title="ENGINEERING"
          highlight="TELEMETRY"
          description="Live metrics, language distributions, and commit frequency representing continuous delivery across enterprise microservices and venture platforms."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {/* Main GitHub Card */}
          <div
            className="glass-panel"
            style={{
              padding: "2.25rem",
              borderRadius: "var(--radius-xl)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(204, 255, 0, 0.1)",
                      border: "1px solid rgba(204, 255, 0, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <GithubIcon color="#ccff00" width={20} height={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "#ffffff" }}>
                      @{telemetryData.githubHandle}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      Active Public Repositories
                    </div>
                  </div>
                </div>

                <a
                  href={telemetryData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: "0.4rem 0.85rem", fontSize: "0.78rem" }}
                >
                  GitHub Profile <ArrowUpRight size={13} />
                </a>
              </div>

              {/* Stat Counters */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.75rem",
                }}
              >
                <div
                  style={{
                    padding: "1.25rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "var(--text-2xl)",
                      fontWeight: 800,
                      color: "var(--accent)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {telemetryData.stats.totalCommits}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Annual Commit Operations
                  </div>
                </div>

                <div
                  style={{
                    padding: "1.25rem",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "var(--text-2xl)",
                      fontWeight: 800,
                      color: "#ffffff",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {telemetryData.stats.publicRepos}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Production & Core Repos
                  </div>
                </div>
              </div>

              {/* Commit Activity Sparkline */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span>SPRINT CADENCE (8 WEEKS)</span>
                  <span style={{ color: "#10b981" }}>STABLE VELOCITY</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "0.5rem",
                    height: "60px",
                    padding: "0.5rem",
                    background: "rgba(0, 0, 0, 0.25)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {telemetryData.stats.activity.map((item, aIdx) => {
                    const heightPercent = (item.commits / 60) * 100;
                    return (
                      <div
                        key={aIdx}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: `${heightPercent}%`,
                            background:
                              aIdx >= 6
                                ? "linear-gradient(180deg, #ccff00 0%, #3d5c00 100%)"
                                : "rgba(255, 255, 255, 0.15)",
                            borderRadius: "3px",
                            transition: "all 0.3s ease",
                          }}
                          title={`${item.week}: ${item.commits} commits`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Language Breakdown */}
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: "0.75rem",
                }}
              >
                SYSTEM LANGUAGE PROFILE
              </div>
              <div
                style={{
                  display: "flex",
                  height: "8px",
                  borderRadius: "999px",
                  overflow: "hidden",
                  marginBottom: "0.75rem",
                }}
              >
                {telemetryData.stats.languages.map((lang, lIdx) => (
                  <div
                    key={lIdx}
                    style={{
                      width: `${lang.percent}%`,
                      background: lang.color,
                    }}
                    title={`${lang.name}: ${lang.percent}%`}
                  />
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", fontSize: "0.72rem" }}>
                {telemetryData.stats.languages.map((lang, lIdx) => (
                  <div key={lIdx} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: lang.color,
                      }}
                    />
                    <span style={{ color: "var(--text-secondary)" }}>{lang.name}</span>
                    <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      {lang.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Systems Telemetry & Recent Releases */}
          <div
            className="glass-panel"
            style={{
              padding: "2.25rem",
              borderRadius: "var(--radius-xl)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "1.5rem",
                }}
              >
                <Terminal size={20} color="#ccff00" />
                <h3
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Architectural Deliverables
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                {telemetryData.stats.recentHighlights.map((hl, hIdx) => (
                  <div
                    key={hIdx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      padding: "0.85rem 1rem",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <GitBranch
                      size={16}
                      color="#ccff00"
                      style={{ flexShrink: 0, marginTop: "0.15rem" }}
                    />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Engine Status */}
            <div
              style={{
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(204, 255, 0, 0.04)",
                border: "1px solid rgba(204, 255, 0, 0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <ShieldCheck size={16} color="#ccff00" />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    120FPS GPU COMPOSITING
                  </span>
                </div>
                <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 700 }}>
                  ACTIVE
                </span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                Lenis Smooth Scroll + GSAP ScrollTrigger synchronized via unified RAF ticker. Zero
                layout thrashing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
