import certifications from "../../../data/certifications.json";
import gallery from "../../../data/gallery.json";
import { VelocityHeading } from "../../common/VelocityHeading";
import { Award, Calendar, ExternalLink, Trophy } from "lucide-react";

type Certification = (typeof certifications)[number];

const CATEGORY_ORDER = ["AI & Tech", "Community"] as const;

function groupByCategory(items: Certification[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((c) => c.category === category),
  })).filter((group) => group.items.length > 0);
}

export function CertificationsWall() {
  const award = (certifications as Certification[]).find((c) => c.category === "Award");
  const groups = groupByCategory((certifications as Certification[]).filter((c) => c.category !== "Award"));

  return (
    <section id="certifications" className="section-spacer" style={{ position: "relative" }}>
      <div className="section-container">
        <VelocityHeading
          subtitle="Verified Credentials"
          title="CERTIFICATIONS &"
          highlight="CREDENTIALS"
          description="Workshops, competitions, and certifications completed across AI tooling, cloud, security, and data — plus a couple of community initiatives along the way."
          align="center"
        />

        {/* Award spotlight: set apart from the certificate grid, not lost inside it */}
        {award && (
          <a
            href={award.image}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
              marginBottom: "3.5rem",
              border: "1px solid rgba(234, 255, 138, 0.35)",
              boxShadow: "0 0 40px rgba(234, 255, 138, 0.12)",
            }}
          >
            <div className="img-zoom-wrap" style={{ position: "relative", minHeight: "260px", overflow: "hidden" }}>
              <img
                className="img-zoom"
                src={award.image}
                alt={award.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent 55%, rgba(10, 10, 10,0.55) 100%)",
                }}
              />
            </div>

            <div
              style={{
                padding: "2.25rem 2.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  alignSelf: "flex-start",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(234, 255, 138, 0.12)",
                  border: "1px solid rgba(234, 255, 138, 0.4)",
                  color: "var(--accent-secondary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                <Trophy size={13} />
                2nd Prize
              </div>

              <h3
                style={{
                  fontSize: "var(--text-xl)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.6rem",
                }}
              >
                {award.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "0.9rem",
                  fontSize: "var(--text-xs)",
                  color: "var(--text-muted)",
                }}
              >
                <span style={{ color: "var(--accent-secondary)", fontWeight: 600 }}>{award.issuer}</span>
                <span>·</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                  <Calendar size={11} />
                  {award.date}
                </span>
              </div>

              <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {award.blurb}
              </p>
            </div>
          </a>
        )}

        {groups.map((group) => (
          <div key={group.category} style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <Award size={16} color="var(--accent)" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                }}
              >
                {group.category}
              </span>
              <span style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {group.items.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    className="img-zoom-wrap"
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4 / 3",
                      background: "#000",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      className="img-zoom"
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        right: "0.75rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "28px",
                        height: "28px",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(10, 10, 10, 0.75)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                      }}
                    >
                      <ExternalLink size={13} color="#f5f5f5" />
                    </span>
                  </div>

                  <div style={{ padding: "1.25rem 1.35rem 1.5rem" }}>
                    <h3
                      style={{
                        fontSize: "var(--text-base)",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        lineHeight: 1.35,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {cert.title}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "0.85rem",
                        fontSize: "var(--text-xs)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <span style={{ color: "var(--accent-secondary)", fontWeight: 600 }}>{cert.issuer}</span>
                      <span>·</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                        <Calendar size={11} />
                        {cert.date}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: cert.credentialId ? "0.75rem" : 0,
                      }}
                    >
                      {cert.blurb}
                    </p>

                    {cert.credentialId && (
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        ID: {cert.credentialId}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Moments: event photo strip */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
              }}
            >
              Moments
            </span>
            <span style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
              scrollSnapType: "x mandatory",
            }}
          >
            {gallery.map((shot) => (
              <div
                key={shot.id}
                className="glass-panel img-zoom-wrap"
                style={{
                  position: "relative",
                  flex: "0 0 260px",
                  aspectRatio: "4 / 3",
                  overflow: "hidden",
                  scrollSnapAlign: "start",
                }}
              >
                <img
                  className="img-zoom"
                  src={shot.image}
                  alt={shot.caption}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "auto 0 0 0",
                    padding: "1.75rem 0.9rem 0.75rem",
                    background: "linear-gradient(0deg, rgba(10, 10, 10,0.92) 0%, transparent 100%)",
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.4,
                  }}
                >
                  {shot.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
