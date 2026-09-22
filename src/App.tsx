import { useLenis } from "./hooks/useLenis";
import { useScrollReveal } from "./hooks/useScrollReveal";
import PosterField from "./components/canvas/PosterField";
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

  return (
    <div id="site-wrapper">
      {/* Poster-style halftone + drifting accent blobs (pure CSS, mounts instantly) */}
      <PosterField />

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
