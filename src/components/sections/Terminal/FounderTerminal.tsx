import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import confetti from "canvas-confetti";
import profile from "../../../data/profile.json";
import experience from "../../../data/experience.json";
import projects from "../../../data/projects.json";
import skills from "../../../data/skills.json";
import certifications from "../../../data/certifications.json";
import { VelocityHeading } from "../../common/VelocityHeading";

/**
 * Founder Terminal — the portfolio's signature interaction. Visitors explore the same
 * JSON data the rest of the site renders, but through a keyboard-first shell:
 * history (↑/↓), tab completion, `goto` navigation and a few easter eggs.
 * Press "/" or Ctrl/⌘+K anywhere on the page to jump here.
 */

type Line = { kind: "in" | "out" | "err"; body: ReactNode };

const SECTIONS: Record<string, string> = {
  top: "hero-section",
  experience: "experience-section",
  skills: "skills-circuit",
  certs: "certifications",
  projects: "projects-bento",
  telemetry: "telemetry-section",
  contact: "contact-section",
};

const COMMANDS: Record<string, string> = {
  help: "list every command",
  whoami: "the short version",
  ventures: "companies I co-founded and run",
  projects: "shipped products & case studies",
  skills: "stack, grouped by circuit",
  certs: "awards, certifications & workshops",
  contact: "ways to reach me",
  goto: "scroll to a section — goto <section>",
  why: "why work with me, in three lines",
  date: "local time in Bengaluru",
  clear: "wipe the screen",
};

const accent = (s: ReactNode) => <span style={{ color: "var(--accent)" }}>{s}</span>;
const muted = (s: ReactNode) => <span style={{ color: "var(--text-muted)" }}>{s}</span>;

function run(raw: string): Line[] | "clear" {
  const [cmd = "", ...args] = raw.trim().split(/\s+/);
  const c = cmd.toLowerCase();
  const arg = args.join(" ").toLowerCase();

  switch (c) {
    case "":
      return [];
    case "help":
    case "ls":
      return [
        {
          kind: "out",
          body: (
            <div style={{ display: "grid", gridTemplateColumns: "max-content 1fr", columnGap: "1.25rem" }}>
              {Object.entries(COMMANDS).map(([k, v]) => (
                <span key={k} style={{ display: "contents" }}>
                  {accent(k)}
                  {muted(v)}
                </span>
              ))}
            </div>
          ),
        },
      ];
    case "whoami":
      return [
        { kind: "out", body: <strong style={{ color: "#fff" }}>{profile.name}</strong> },
        { kind: "out", body: profile.heroRole },
        { kind: "out", body: muted(`${profile.bio} — ${profile.location}`) },
      ];
    case "ventures":
    case "experience":
      return experience.map((e) => ({
        kind: "out" as const,
        body: (
          <>
            {accent("▸ ")}
            <strong style={{ color: "#fff" }}>{e.company}</strong> {muted(`· ${e.period}`)}
            <br />
            {"  "}
            {e.role} {muted(`— ${e.ventureType}`)}
          </>
        ),
      }));
    case "projects":
      return projects.map((p) => ({
        kind: "out" as const,
        body: (
          <>
            {accent("▸ ")}
            <strong style={{ color: "#fff" }}>{p.title}</strong> {muted(`[${p.tech.slice(0, 4).join(", ")}]`)}
          </>
        ),
      }));
    case "skills":
    case "stack":
      return skills.categories.map((cat) => ({
        kind: "out" as const,
        body: (
          <>
            {accent(cat.circuitTag)} {muted(cat.name.padEnd(20, " "))} {cat.skills.join(" · ")}
          </>
        ),
      }));
    case "certs":
    case "awards":
      return certifications.map((ce) => ({
        kind: "out" as const,
        body: (
          <>
            {ce.category === "Award" ? accent("★ ") : muted("· ")}
            {ce.title} {muted(`— ${ce.issuer}`)}
          </>
        ),
      }));
    case "contact":
    case "email":
      return [
        { kind: "out", body: <>email    {link(profile.socials.email, profile.email)}</> },
        { kind: "out", body: <>linkedin {link(profile.socials.linkedin, "sheela-saivenkata-reddy")}</> },
        { kind: "out", body: <>github   {link(profile.socials.github, "sheelasaivenkatareddy")}</> },
        { kind: "out", body: muted(`status   ${profile.status}`) },
      ];
    case "why":
      return [
        { kind: "out", body: <>{accent("1.")} I ship: two live ventures, built and operated end to end.</> },
        { kind: "out", body: <>{accent("2.")} I bridge code and company — architecture, ops and go-to-market in one head.</> },
        { kind: "out", body: <>{accent("3.")} I measure: sub-450ms AI streams, sub-120ms queries, not vibes.</> },
      ];
    case "date":
      return [
        {
          kind: "out",
          body: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" }) + " IST",
        },
      ];
    case "goto":
    case "cd": {
      const key = Object.keys(SECTIONS).find((k) => arg && k.startsWith(arg));
      const id = key && SECTIONS[key];
      if (!id) {
        return [{ kind: "err", body: `goto: unknown section "${arg}". try: ${Object.keys(SECTIONS).join(", ")}` }];
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return [{ kind: "out", body: muted(`→ jumping to ${key}…`) }];
    }
    case "sudo":
      if (arg.startsWith("hire")) {
        try {
          confetti({ particleCount: 140, spread: 80, origin: { y: 0.7 }, colors: ["#ccff00", "#eaff8a", "#ffffff"] });
        } catch {
          // confetti is decorative only
        }
        return [
          { kind: "out", body: accent("[sudo] permission granted. Excellent decision.") },
          { kind: "out", body: <>Next step: {link(profile.socials.email, profile.email)}</> },
        ];
      }
      return [{ kind: "err", body: "nice try. (hint: sudo hire sai)" }];
    case "clear":
      return "clear";
    case "rm":
      return [{ kind: "err", body: "rm: this portfolio is load-bearing. operation refused." }];
    case "exit":
      return [{ kind: "out", body: muted("there is no exit. only `contact`.") }];
    default:
      return [{ kind: "err", body: `command not found: ${cmd}. type ${"`help`"}` }];
  }
}

function link(href: string, label: string) {
  return (
    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>
      {label}
    </a>
  );
}

const BOOT: Line[] = [
  { kind: "out", body: muted("founder-os v2.0 — booted in 0.42s") },
  { kind: "out", body: <>Welcome. Type {accent("help")} to explore, or try {accent("why")}.</> },
];

const SUGGESTIONS = ["whoami", "ventures", "projects", "why", "sudo hire sai"];

export function FounderTerminal() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Global shortcut: "/" or Ctrl/⌘+K focuses the terminal from anywhere.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        document.getElementById("founder-terminal")?.scrollIntoView({ behavior: "smooth", block: "center" });
        inputRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submit = (value: string) => {
    const result = run(value);
    if (result === "clear") {
      setLines([]);
    } else {
      setLines((prev) => [...prev, { kind: "in", body: value }, ...result]);
    }
    if (value.trim()) setHistory((h) => [value, ...h].slice(0, 50));
    setCursor(-1);
    setInput("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (next >= 0) {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const [head, ...rest] = input.split(" ");
      if (rest.length === 0) {
        const match = Object.keys(COMMANDS).find((k) => k.startsWith(head.toLowerCase()));
        if (match) setInput(match + (match === "goto" ? " " : ""));
      } else if (head === "goto" || head === "cd") {
        const match = Object.keys(SECTIONS).find((k) => k.startsWith(rest.join(" ").toLowerCase()));
        if (match) setInput(`${head} ${match}`);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <section id="founder-terminal" className="section-spacer" style={{ position: "relative" }}>
      <div className="section-container">
        <VelocityHeading
          subtitle="Interactive · Keyboard-First"
          title="FOUNDER"
          highlight="TERMINAL"
          description="Skip the scrolling. Query my ventures, projects and stack directly — press / or Ctrl+K from anywhere on the page."
        />

        <div
          className="glass-panel"
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          style={{
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            maxWidth: "920px",
            margin: "0 auto",
            cursor: "text",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem 1rem",
              borderBottom: "1px solid var(--border-subtle)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.85 }} />
            ))}
            <span style={{ marginLeft: "0.75rem", color: "var(--text-muted)", fontSize: "0.75rem" }}>
              sai@founder-os: ~
            </span>
          </div>

          {/* Screen */}
          <div
            ref={screenRef}
            data-lenis-prevent
            role="log"
            aria-live="polite"
            style={{ height: "340px", overflowY: "auto", padding: "1rem 1.25rem", lineHeight: 1.65 }}
          >
            {lines.map((l, i) => (
              <div
                key={i}
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  color: l.kind === "err" ? "#ff6b6b" : "var(--text-secondary)",
                }}
              >
                {l.kind === "in" ? (
                  <>
                    {accent("❯ ")}
                    <span style={{ color: "#fff" }}>{l.body}</span>
                  </>
                ) : (
                  l.body
                )}
              </div>
            ))}

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {accent("❯")}
              <span className="sr-only">Terminal command</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                placeholder="type a command…"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  font: "inherit",
                  caretColor: "var(--accent)",
                }}
              />
            </label>
          </div>

          {/* Quick chips for touch users */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="badge-pill-neutral"
                onClick={(e) => {
                  e.stopPropagation();
                  submit(s);
                }}
                style={{ cursor: "pointer", fontFamily: "inherit", textTransform: "none" }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
