import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useMagnetic } from "../../hooks/useMagnetic";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV = [
  { id: "experience-section", label: "Experience" },
  { id: "skills-circuit", label: "Skills Circuit" },
  { id: "certifications", label: "Certifications" },
  { id: "projects-bento", label: "Ventures & Projects" },
  { id: "founder-terminal", label: "Terminal" },
  { id: "telemetry-section", label: "Telemetry" },
];

export function HeaderHUD() {
  const progress = useScrollProgress();
  const connectRef = useRef<HTMLButtonElement>(null);
  useMagnetic(connectRef, 0.35);

  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on Escape or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 901px)");
    const onMq = () => mq.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
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
          background: "linear-gradient(90deg, #ccff00, #eaff8a, #8fd400)",
          zIndex: 100,
          boxShadow: "0 0 12px rgba(204, 255, 0, 0.8)",
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
            background: "rgba(10, 10, 10, 0.82)",
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
                background: "linear-gradient(135deg, #ccff00, #3d5c00)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0a0a0a",
                fontWeight: 800,
                fontSize: "0.85rem",
                boxShadow: "0 0 12px rgba(204, 255, 0, 0.4)",
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
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
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
                {item.label}
                {item.id === "founder-terminal" && (
                  <>
                    {" "}
                    <kbd style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", padding: "0.05rem 0.35rem", border: "1px solid var(--border-subtle)", borderRadius: "4px", color: "var(--text-muted)" }}>/</kbd>
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* Live Status & CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              className="nav-desktop"
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
              ref={connectRef}
              onClick={() => scrollTo("contact-section")}
              className="btn-primary"
              style={{
                padding: "0.45rem 1rem",
                fontSize: "0.8rem",
              }}
            >
              Connect <ArrowUpRight size={14} />
            </button>

            <button
              type="button"
              className="nav-mobile-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" className="glass-panel mobile-menu" aria-label="Sections">
            {NAV.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollTo(item.id)}>
                {item.label}
                <ArrowUpRight size={16} />
              </button>
            ))}
            <button type="button" onClick={() => scrollTo("contact-section")} className="btn-primary">
              Connect <ArrowUpRight size={14} />
            </button>
          </nav>
        )}
      </header>
    </>
  );
}
