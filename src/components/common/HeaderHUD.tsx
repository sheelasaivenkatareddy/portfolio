import { useScrollProgress } from "../../hooks/useScrollProgress";
import { ArrowUpRight } from "lucide-react";

export function HeaderHUD() {
  const progress = useScrollProgress();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Fixed Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${progress * 100}%`,
          height: "3px",
          background: "linear-gradient(90deg, #ff6a3d, #e8c872, #d9a05b)",
          zIndex: 100,
          boxShadow: "0 0 12px rgba(255, 106, 61, 0.8)",
          transition: "width 0.05s linear",
        }}
      />

      {/* Floating Apple-Style Glass Header */}
      <header
        style={{
          position: "fixed",
          top: "1.25rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 90,
          width: "calc(100% - 2.5rem)",
          maxWidth: "1180px",
        }}
      >
        <div
          className="glass-panel"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1.5rem",
            borderRadius: "var(--radius-full)",
            background: "rgba(14, 13, 12, 0.82)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Logo & Identity */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff6a3d, #c2410c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0e0d0c",
                fontWeight: 800,
                fontSize: "0.85rem",
                boxShadow: "0 0 12px rgba(255, 106, 61, 0.4)",
              }}
            >
              SR
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
                SAI VENKAT
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                }}
              >
                CTO • COO • CMO
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.75rem",
            }}
            className="nav-desktop"
          >
            <button
              onClick={() => scrollTo("experience-section")}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Experience
            </button>
            <button
              onClick={() => scrollTo("skills-circuit")}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Skills Circuit
            </button>
            <button
              onClick={() => scrollTo("projects-bento")}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Ventures & Projects
            </button>
            <button
              onClick={() => scrollTo("telemetry-section")}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Telemetry
            </button>
          </nav>

          {/* Live Status & CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                color: "#10b981",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                  animation: "pulse 2s infinite",
                }}
              />
              AVAILABLE
            </div>

            <button
              onClick={() => scrollTo("contact-section")}
              className="btn-primary"
              style={{
                padding: "0.45rem 1rem",
                fontSize: "0.8rem",
              }}
            >
              Connect <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
