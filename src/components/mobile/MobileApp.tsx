import { useCallback, useEffect, useState, type ComponentType } from "react";
import { House, BriefcaseBusiness, Cpu, SquareTerminal, Mail, Download, Share, X } from "lucide-react";
import { HeroSection } from "../sections/Hero/HeroSection";
import { ExperienceTimeline } from "../sections/Experience/ExperienceTimeline";
import { ProjectsBento } from "../sections/Projects/ProjectsBento";
import { SkillsCircuit } from "../sections/Skills/SkillsCircuit";
import { CertificationsWall } from "../sections/Certifications/CertificationsWall";
import { FounderTerminal } from "../sections/Terminal/FounderTerminal";
import { GitHubTelemetry } from "../sections/Telemetry/GitHubTelemetry";
import { ContactOutro } from "../sections/Contact/ContactOutro";
import PosterField from "../canvas/PosterField";
import { setSectionNavigator } from "../../core/navigate";
import { useInstallPrompt } from "./useInstallPrompt";

/**
 * Phone/tablet layout: an app shell with a top app bar, one screen per tab and a bottom
 * tab bar — instead of one very long scrolling page. The active tab lives in the URL hash
 * (#work, #skills, …) so the back button, shared links and PWA shortcuts all work.
 */

type Tab = {
  key: string;
  label: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  screens: ComponentType[];
  sections: string[]; // section ids rendered on this tab, for cross-links
};

const TABS: Tab[] = [
  { key: "home", label: "Home", icon: House, screens: [HeroSection], sections: ["hero-section"] },
  {
    key: "work",
    label: "Work",
    icon: BriefcaseBusiness,
    screens: [ExperienceTimeline, ProjectsBento],
    sections: ["experience-section", "projects-bento"],
  },
  {
    key: "skills",
    label: "Skills",
    icon: Cpu,
    screens: [SkillsCircuit, CertificationsWall, GitHubTelemetry],
    sections: ["skills-circuit", "certifications", "telemetry-section"],
  },
  { key: "terminal", label: "Terminal", icon: SquareTerminal, screens: [FounderTerminal], sections: ["founder-terminal"] },
  {
    key: "contact",
    label: "Contact",
    icon: Mail,
    screens: [ContactOutro],
    sections: ["contact-section"],
  },
];

const tabFromHash = () => {
  const key = window.location.hash.replace("#", "");
  return TABS.some((t) => t.key === key) ? key : "home";
};

export function MobileApp() {
  const [active, setActive] = useState(tabFromHash);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const { installed, canPrompt, needsManualSteps, install } = useInstallPrompt();

  const openTab = useCallback((key: string, sectionId?: string) => {
    if (key !== tabFromHash()) {
      window.history.pushState(null, "", key === "home" ? window.location.pathname : `#${key}`);
    }
    setActive(key);
    // Wait for the tab to render, then land on the right section. A tab's first
    // section is its top, so only later sections need a scroll.
    requestAnimationFrame(() => {
      const isFirst = !sectionId || TABS.find((t) => t.key === key)?.sections[0] === sectionId;
      if (isFirst) window.scrollTo({ top: 0 });
      else document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  // Browser back/forward and PWA shortcuts change the hash.
  useEffect(() => {
    const onPop = () => {
      setActive(tabFromHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  // Cross-links inside sections (Hero buttons, terminal `goto`) switch tabs here.
  useEffect(() => {
    setSectionNavigator((sectionId) => {
      const tab = TABS.find((t) => t.sections.includes(sectionId));
      if (tab) openTab(tab.key, sectionId);
    });
    return () => setSectionNavigator(null);
  }, [openTab]);

  const current = TABS.find((t) => t.key === active) ?? TABS[0];
  const showInstall = !installed && (canPrompt || needsManualSteps);

  return (
    <div id="site-wrapper" className="app-shell">
      <PosterField />

      <header className="app-bar">
        <button type="button" className="app-bar-brand" onClick={() => openTab("home")} aria-label="Home">
          <span className="app-logo">SR</span>
          <span>
            <span className="app-bar-name">SAI VENKAT</span>
            <span className="app-bar-sub">{current.label === "Home" ? "CTO • COO • CMO" : current.label}</span>
          </span>
        </button>

        {showInstall && (
          <button
            type="button"
            className="app-install"
            onClick={() => (canPrompt ? install() : setShowIosHelp(true))}
          >
            <Download size={15} /> Install app
          </button>
        )}
      </header>

      <main key={current.key} className="app-screen">
        {current.screens.map((Screen, i) => (
          <Screen key={i} />
        ))}
      </main>

      <nav className="tab-bar" aria-label="App sections">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className={key === active ? "tab active" : "tab"}
            aria-current={key === active ? "page" : undefined}
            onClick={() => openTab(key)}
          >
            <Icon size={21} strokeWidth={key === active ? 2.4 : 1.8} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {showIosHelp && (
        <div className="sheet-backdrop" onClick={() => setShowIosHelp(false)}>
          <div className="sheet glass-panel" role="dialog" aria-label="Install this app" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="sheet-close" aria-label="Close" onClick={() => setShowIosHelp(false)}>
              <X size={18} />
            </button>
            <h3>Install on your iPhone</h3>
            <ol>
              <li>
                Tap <Share size={16} style={{ verticalAlign: "-3px", color: "var(--accent)" }} /> <strong>Share</strong> in Safari's toolbar
              </li>
              <li>
                Choose <strong>Add to Home Screen</strong>
              </li>
              <li>Open it from your home screen — it runs full-screen, like an app</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
