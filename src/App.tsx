import { useLenis } from "./hooks/useLenis";
import ParticleField from "./components/canvas/ParticleField";
import { HeaderHUD } from "./components/common/HeaderHUD";
import { HeroSection } from "./components/sections/Hero/HeroSection";
import { ExperienceTimeline } from "./components/sections/Experience/ExperienceTimeline";
import { SkillsCircuit } from "./components/sections/Skills/SkillsCircuit";
import { ProjectsBento } from "./components/sections/Projects/ProjectsBento";
import { GitHubTelemetry } from "./components/sections/Telemetry/GitHubTelemetry";
import { ContactOutro } from "./components/sections/Contact/ContactOutro";

export default function App() {
  // Initialize Lenis smooth scroll engine
  useLenis();

  return (
    <div id="site-wrapper">
      {/* Scroll-Driven WebGL Three.js Particle & Grid Mesh Layer */}
      <ParticleField />

      {/* Floating Glass Navigation HUD & Top Progress Bar */}
      <HeaderHUD />

      <main>
        {/* Hero with Kinetic Skew & Venture Metrics */}
        <HeroSection />

        {/* Horizontal Scroll-to-Action Experience Timeline */}
        <ExperienceTimeline />

        {/* Dynamic SVG Path Circuit Skills Matrix */}
        <SkillsCircuit />

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
