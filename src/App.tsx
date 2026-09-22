import { useLenis } from "./hooks/useLenis";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { lazy, Suspense, useEffect, useState } from "react";

// Three.js is ~700kB: split it out and mount it only once the page is idle.
const ParticleField = lazy(() => import("./components/canvas/ParticleField"));
import { HeaderHUD } from "./components/common/HeaderHUD";
import { HeroSection } from "./components/sections/Hero/HeroSection";
import { ExperienceTimeline } from "./components/sections/Experience/ExperienceTimeline";
import { SkillsCircuit } from "./components/sections/Skills/SkillsCircuit";
import { CertificationsWall } from "./components/sections/Certifications/CertificationsWall";
import { ProjectsBento } from "./components/sections/Projects/ProjectsBento";
import { GitHubTelemetry } from "./components/sections/Telemetry/GitHubTelemetry";
import { ContactOutro } from "./components/sections/Contact/ContactOutro";

export default function App() {
  // Initialize Lenis smooth scroll engine
  useLenis();
  useScrollReveal();

  const [showCanvas, setShowCanvas] = useState(false);
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const id = idle(() => setShowCanvas(true));
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, []);

  return (
    <div id="site-wrapper">
      {/* Scroll-Driven WebGL Three.js Particle & Grid Mesh Layer */}
      {showCanvas && (
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      )}

      {/* Floating Glass Navigation HUD & Top Progress Bar */}
      <HeaderHUD />

      <main>
        {/* Hero with Kinetic Skew & Venture Metrics */}
        <HeroSection />

        {/* Horizontal Scroll-to-Action Experience Timeline */}
        <ExperienceTimeline />

        {/* Dynamic SVG Path Circuit Skills Matrix */}
        <SkillsCircuit />

        {/* Certifications, Workshops & Event Gallery */}
        <CertificationsWall />

        {/* Morphing Bento Grid with Interactive Case Studies */}
        <ProjectsBento />

        {/* Real-time GitHub & Systems Telemetry */}
        <GitHubTelemetry />

        {/* Executive Outreach & Perspective Outro */}
        <ContactOutro />
      </main>
    </div>
  );
}
