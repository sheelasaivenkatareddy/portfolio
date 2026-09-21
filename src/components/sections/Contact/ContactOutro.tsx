import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import profileData from "../../../data/profile.json";
import { VelocityHeading } from "../../common/VelocityHeading";
import { GithubIcon, LinkedinIcon } from "../../common/BrandIcons";
import { Mail, MapPin, Copy, Check, Clock, ArrowUp } from "lucide-react";

export function ContactOutro() {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Indian Standard Time (IST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);

    // Fire celebratory micro-confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 },
        colors: ["#00f0ff", "#38bdf8", "#818cf8"],
      });
    } catch {
      // Ignore if confetti fails
    }

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact-section" className="section-spacer" style={{ position: "relative", paddingBottom: "3rem" }}>
      <div className="section-container">
        <VelocityHeading
          subtitle="Strategic Advisory & Technical Leadership"
          title="INITIATE"
          highlight="CONNECTION"
          description="Open for executive discussions, technical co-founder opportunities, venture architecture, and high-impact advisory across AI, Web3, and enterprise platforms."
          align="center"
        />

        {/* Big Contact Card */}
        <div
          className="glass-panel"
          style={{
            maxWidth: "880px",
            margin: "0 auto 4rem",
            padding: "3.5rem 2.5rem",
            borderRadius: "var(--radius-xl)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top Radial Flare */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "250px",
              height: "100px",
              background: "radial-gradient(ellipse at center, rgba(0, 240, 255, 0.35) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
            }}
          >
            Ready to architect something extraordinary?
          </div>

          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: "580px",
              margin: "0 auto 2.5rem",
              fontSize: "var(--text-base)",
              lineHeight: 1.6,
            }}
          >
            Direct contact channel for investors, enterprise clients, or fellow founders.
          </p>

          {/* Email Copy Interaction */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.85rem 1.75rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(0, 0, 0, 0.45)",
              border: "1px solid rgba(0, 240, 255, 0.35)",
              boxShadow: "0 0 25px rgba(0, 240, 255, 0.15)",
              cursor: "pointer",
              transition: "all 0.25s ease",
              marginBottom: "2.5rem",
              maxWidth: "100%",
              overflow: "hidden",
            }}
            onClick={handleCopyEmail}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent-cyan)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.35)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Mail size={18} color="#00f0ff" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-sm)",
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              {profileData.email}
            </span>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.25rem 0.6rem",
                borderRadius: "var(--radius-full)",
                background: copied ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.08)",
                fontSize: "0.72rem",
                color: copied ? "#10b981" : "var(--text-secondary)",
                fontWeight: 600,
              }}
            >
              {copied ? (
                <>
                  <Check size={12} color="#10b981" /> COPIED
                </>
              ) : (
                <>
                  <Copy size={12} /> COPY
                </>
              )}
            </div>
          </div>

          {/* Direct Social Links */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <LinkedinIcon color="#00f0ff" />
              <span>Connect on LinkedIn</span>
            </a>

            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <GithubIcon />
              <span>Explore GitHub Repos</span>
            </a>

            <a
              href={profileData.socials.email}
              className="btn-primary"
            >
              <Mail size={16} />
              <span>Send Message</span>
            </a>
          </div>

          {/* Timezone & Location Metadata */}
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <MapPin size={13} color="#00f0ff" />
              <span>{profileData.location}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Clock size={13} color="#00f0ff" />
              <span>LOCAL TIME: {localTime || "IST (UTC+5:30)"}</span>
            </div>
          </div>
        </div>

        {/* Minimal Apple-Style Bottom Sub-Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-subtle)",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span>Clean Apple Minimalist • 120 FPS Locked</span>
            <button
              onClick={scrollToTop}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
              aria-label="Back to Top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
