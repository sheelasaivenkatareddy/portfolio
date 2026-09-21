import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skillsData from "../../../data/skills.json";
import { VelocityHeading } from "../../common/VelocityHeading";
import { Cpu, Terminal, Database, Wrench, Sparkles } from "lucide-react";

export function SkillsCircuit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const pathLength = path.getTotalLength();
    let lastCount = -1;

    // Set initial dash array to full length and offset to full length
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 30%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // Draw the path
        const currentOffset = pathLength * (1 - progress);
        gsap.set(path, { strokeDashoffset: currentOffset });

        // Calculate which category nodes are active based on scroll progress
        const count = skillsData.categories.length;
        let activeCount = 0;
        while (activeCount < count && progress >= (activeCount + 0.1) / count) activeCount++;
        if (activeCount !== lastCount) {
          lastCount = activeCount;
          setActiveNodes(Array.from({ length: activeCount }, (_, i) => i));
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "languages":
        return <Terminal size={20} color="#ff6a3d" />;
      case "web-frameworks":
        return <Cpu size={20} color="#e8c872" />;
      case "databases-cloud":
        return <Database size={20} color="#d9a05b" />;
      case "tools-ecosystem":
        return <Wrench size={20} color="#c98a5a" />;
      case "executive-leadership":
        return <Sparkles size={20} color="#f59e0b" />;
      default:
        return <Cpu size={20} color="#ff6a3d" />;
    }
  };

  return (
    <section
      id="skills-circuit"
      ref={sectionRef}
      className="section-spacer"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="section-container">
        <VelocityHeading
          subtitle="Architectural Competencies"
          title="TECH STACK &"
          highlight="CIRCUIT MATRIX"
          description="A multi-disciplinary ecosystem spanning low-level embedded systems (C/C++), enterprise full-stack engineering (Next.js/PostgreSQL), and executive venture operations."
          align="center"
        />

        {/* Relative Container with Central Circuit Line */}
        <div
          style={{
            position: "relative",
            maxWidth: "960px",
            margin: "0 auto",
            padding: "2rem 0",
          }}
        >
          {/* SVG Circuit Canvas Overlay */}
          <svg
            className="circuit-svg"
            viewBox="0 0 800 1200"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          >
            {/* Background static dim path */}
            <path
              d="M 400 40 Q 150 180 400 320 T 400 600 T 400 880 T 400 1160"
              className="circuit-path-bg"
            />
            {/* Dynamic scroll-drawn glowing path */}
            <path
              ref={pathRef}
              d="M 400 40 Q 150 180 400 320 T 400 600 T 400 880 T 400 1160"
              className="circuit-path"
            />
          </svg>

          {/* Categorized Circuit Clusters */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            {skillsData.categories.map((cat, idx) => {
              const isActive = activeNodes.includes(idx);
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={cat.id}
                  style={{
                    display: "flex",
                    justifyContent: isEven ? "flex-start" : "flex-end",
                    width: "100%",
                  }}
                >
                  <div
                    className="glass-panel"
                    style={{
                      width: "min(560px, 94%)",
                      padding: "2rem",
                      borderRadius: "var(--radius-lg)",
                      background: isActive
                        ? "rgba(23, 21, 19, 0.92)"
                        : "rgba(14, 13, 12, 0.75)",
                      border: isActive
                        ? "1px solid rgba(255, 106, 61, 0.45)"
                        : "1px solid var(--border-subtle)",
                      boxShadow: isActive
                        ? "0 12px 35px rgba(255, 106, 61, 0.15)"
                        : "var(--shadow-subtle)",
                      transform: isActive ? "scale(1.01)" : "scale(0.99)",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "10px",
                            background: isActive
                              ? "rgba(255, 106, 61, 0.12)"
                              : "rgba(255, 255, 255, 0.04)",
                            border: `1px solid ${isActive ? "rgba(255, 106, 61, 0.3)" : "rgba(255, 255, 255, 0.08)"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {getCategoryIcon(cat.id)}
                        </div>
                        <div>
                          <h3
                            style={{
                              fontSize: "var(--text-lg)",
                              fontWeight: 700,
                              color: "#ffffff",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {cat.name}
                          </h3>
                        </div>
                      </div>

                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: isActive ? "var(--accent)" : "var(--text-muted)",
                          border: `1px solid ${isActive ? "rgba(255, 106, 61, 0.3)" : "rgba(255, 255, 255, 0.08)"}`,
                          padding: "0.2rem 0.55rem",
                          borderRadius: "var(--radius-full)",
                          transition: "color 0.3s",
                        }}
                      >
                        {cat.circuitTag}
                      </span>
                    </div>

                    {/* Skill Pills */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.55rem",
                      }}
                    >
                      {cat.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            padding: "0.4rem 0.85rem",
                            borderRadius: "var(--radius-md)",
                            background: isActive
                              ? "rgba(255, 106, 61, 0.06)"
                              : "rgba(255, 255, 255, 0.02)",
                            border: isActive
                              ? "1px solid rgba(255, 106, 61, 0.2)"
                              : "1px solid var(--border-subtle)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 500,
                            color: isActive ? "#ffffff" : "var(--text-secondary)",
                            transition: "all 0.25s ease",
                          }}
                        >
                          <span
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: isActive ? "var(--accent)" : "var(--text-muted)",
                            }}
                          />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
