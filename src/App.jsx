import { useState, useEffect, useRef } from "react";

// ── Palette & tokens ────────────────────────────────────────────────────────
const THEME = {
  dark: {
    bg: "#080c10",
    surface: "#0e1419",
    surfaceAlt: "#131c24",
    border: "#1e2d3d",
    borderMid: "#243344",
    text: "#e8edf2",
    muted: "#7a8fa0",
    dim: "#3d5468",
    accent: "#00c2ff",
    accentGlow: "rgba(0,194,255,0.15)",
    accentSoft: "rgba(0,194,255,0.08)",
    gold: "#f0b429",
    green: "#3ecf8e",
    tag: "#0f1e2c",
    tagBorder: "#1e3548",
  },
  light: {
    bg: "#f4f7fb",
    surface: "#ffffff",
    surfaceAlt: "#eef2f7",
    border: "#d4dde8",
    borderMid: "#c0cdd8",
    text: "#0d1b2a",
    muted: "#5a7080",
    dim: "#9ab0c0",
    accent: "#0077b6",
    accentGlow: "rgba(0,119,182,0.12)",
    accentSoft: "rgba(0,119,182,0.06)",
    gold: "#d4880a",
    green: "#1a9e6a",
    tag: "#e8f0f8",
    tagBorder: "#c8d8e8",
  },
};

// ── Data ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    group: "Core Languages",
    items: ["Go (Golang)", "Python", "TypeScript", "JavaScript", "Java"],
  },
  {
    group: "Backend & APIs",
    items: ["gRPC", "REST APIs", "Microservices", "Temporal Workflows", "CLI Design", "System Design"],
  },
  {
    group: "AI Engineering",
    items: ["Agentic AI", "RAG", "MCP (Model Context Protocol)", "Ollama", "LLM Orchestration", "Tool-Calling Agents", "Semantic Search", "Vector Retrieval"],
  },
  {
    group: "Messaging & Data",
    items: ["Kafka", "Kafka Connect", "Flink", "RabbitMQ", "Redis Cluster", "MySQL", "MongoDB"],
  },
  {
    group: "Cloud & DevOps",
    items: ["Kubernetes", "Docker", "Helm", "Jenkins", "GitHub Actions", "AWS Lambda", "Azure", "Flux CD"],
  },
  {
    group: "Observability",
    items: ["Grafana", "Graylog", "New Relic", "OpenTelemetry", "SonarQube"],
  },
];

const EXPERIENCE = [
  {
    company: "Maersk Global Service Centre",
    role: "Software Engineer",
    period: "Apr 2025 – Present",
    location: "Bengaluru, India",
    color: "#00c2ff",
    highlights: [
      "Administer 10K+ Kafka topics, schemas, ACLs, consumer groups, and connectors across multiple engineering teams",
      "Built Azure & Microsoft Graph API-powered daily scrum dashboard integrating 10+ operational sources",
      "Added Agentic AI, RAG, semantic retrieval, and LLM-powered ranking to reduce daily triage noise",
      "Build Go-based REST/gRPC self-service provisioning APIs for Kafka governance workflows",
      "Ship containerized services with Docker, Kubernetes, Helm across 5+ environments",
      "Develop Temporal workflows for async multi-step automation with retries, backoff, and auditability",
      "Participate in on-call rotations; investigate production incidents and maintain SLA commitments",
    ],
    tags: ["Go", "Kafka", "Kubernetes", "gRPC", "Agentic AI", "RAG", "Azure", "Temporal"],
  },
  {
    company: "Kaleyra (Now Tata Communications)",
    role: "Software Engineer Professional",
    period: "Jul 2023 – Mar 2025",
    location: "Bengaluru, India",
    color: "#3ecf8e",
    highlights: [
      "Built scalable Go microservices for the Numbers platform supporting 100K+ inventory records",
      "Developed 15+ internal/public gRPC/REST APIs with SonarQube standards and production reliability",
      "Built resilient async workflows using RabbitMQ, Kafka, Machinery consumers, and scheduled jobs",
      "Optimized services using MySQL, MongoDB, Redis Cluster/Sentinel with query tuning",
      "Deployed via Docker, Kubernetes, Jenkins, AWS Lambda with Graylog and New Relic observability",
      "Mentored 3+ junior developers on architecture, coding standards, and system understanding",
    ],
    tags: ["Go", "gRPC", "RabbitMQ", "Kafka", "Kubernetes", "MySQL", "Redis", "AWS"],
  },
  {
    company: "Kaleyra – Intern",
    role: "Software Engineer Intern",
    period: "Jan 2023 – Jul 2023",
    location: "Bengaluru, India",
    color: "#f0b429",
    highlights: [
      "Developed Go/RabbitMQ consumers, React TSX interfaces, and Node.js/Laravel services",
      "Worked with Kubernetes, Docker, AWS, Redis, Asterisk, MongoDB, and microservices patterns",
    ],
    tags: ["Go", "React", "RabbitMQ", "Node.js", "Docker", "AWS"],
  },
];

const PROJECTS = [
  {
    title: "Autonomous API Migration Engineer",
    subtitle: "AI-Assisted Platform Engineering · MCP Server",
    period: "May 2026",
    github: "https://github.com/ShivangiRay/autonomous-api-migration-engineer",
    color: "#00c2ff",
    glow: "rgba(0,194,255,0.2)",
    stack: ["Python", "FastAPI", "React", "gRPC", "RAG", "Agentic AI", "MCP", "Ollama"],
    description:
      "Production-grade AI platform and MCP server that analyzes legacy REST APIs and autonomously recommends migration paths to gRPC or event-driven architecture — with local LLM classification via Ollama, RAG-backed proposal memory, and a human-in-the-loop approval workflow.",
    bullets: [
      "Ships as a Model Context Protocol (MCP) server — callable from Claude Desktop, Cursor, and Gemini CLI via stdio or HTTP/SSE",
      "Local LLM integration via Ollama (llama3.2) for intelligent endpoint classification instead of deterministic rules",
      "Multi-agent pipeline: scanner → planner → contract generator → verifier → reporter → implementer",
      "RAG-backed proposal memory learns from prior approved migrations to improve future recommendations",
      "Generates .proto contracts, AsyncAPI schemas, compatibility reports, gRPC service stubs, and mapping tests",
    ],
  },
  {
    title: "Incident Commander AI",
    subtitle: "Multi-Agent SRE Assistant",
    period: "May 2026",
    github: "https://github.com/ShivangiRay",
    color: "#f0b429",
    glow: "rgba(240,180,41,0.2)",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "Redis", "RAG", "OpenTelemetry"],
    description:
      "Multi-agent SRE assistant that ingests logs, traces, metrics, alerts, deployments, and runbooks to autonomously investigate incidents, rank hypotheses, estimate blast radius, and draft postmortems.",
    bullets: [
      "Signal ingestion, correlation, hypothesis ranking, and blast-radius estimation agents",
      "Evidence graphs, signal timelines, and dependency impact maps",
      "Policy-gated action recommendations with postmortem draft generation",
      "Synthetic incident scenario generation for team training",
    ],
  },
  {
    title: "AI Scrum Dashboard & On-Call Intelligence",
    subtitle: "Operational Engineering Platform",
    period: "Apr 2025 – Present",
    github: "https://github.com/ShivangiRay",
    color: "#3ecf8e",
    glow: "rgba(62,207,142,0.2)",
    stack: ["Go", "Python", "React", "Azure", "Microsoft Graph", "Grafana", "ServiceNow"],
    description:
      "Azure & Microsoft Graph API-powered daily scrum dashboard consolidating 10+ operational sources into a unified engineering view, layered with Agentic AI and LLM-powered ranking for intelligent triage.",
    bullets: [
      "Integrates Teams, Outlook, Grafana, Kanban, GitHub, CI/CD, Vault certs, Hedwig, ServiceNow",
      "LLM-powered ranking classifies incidents and surfaces urgent operational signals",
      "Semantic retrieval over runbooks and historical incidents for faster acknowledgment",
      "Identity-scoped views reduce alert fatigue per on-call rotation",
    ],
  },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const ids = ["hero", "about", "skills", "experience", "projects", "education", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.3 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useCounter(target, visible, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return count;
}

// ── Sub-components ─────────────────────────────────────────────────────────
function Tag({ label, t }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 4,
      fontSize: 11,
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 500,
      letterSpacing: "0.02em",
      background: t.tag,
      border: `1px solid ${t.tagBorder}`,
      color: t.muted,
    }}>{label}</span>
  );
}

function Reveal({ children, delay = 0, t }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

// ── Stat Counter ─────────────────────────────────────────────────────────────
function StatCounter({ value, suffix, label, t, delay }) {
  const [ref, visible] = useScrollReveal(0.5);
  const count = useCounter(value, visible);
  return (
    <div ref={ref} style={{ textAlign: "center", opacity: visible ? 1 : 0, transition: `opacity 0.6s ease ${delay}s` }}>
      <div style={{ fontSize: 42, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: t.accent, lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 12, color: t.muted, marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ dark, setDark, t }) {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];
  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? (dark ? "rgba(8,12,16,0.92)" : "rgba(244,247,251,0.92)") : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
      transition: "all 0.3s ease",
      padding: "0 24px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: t.accent, letterSpacing: "-0.01em" }}>
          SR<span style={{ color: t.muted, fontWeight: 400 }}>/</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {links.map((l) => (
            <button key={l} onClick={() => scroll(l)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "6px 12px", borderRadius: 6,
                fontSize: 13, fontWeight: 500, letterSpacing: "0.02em",
                color: active === l.toLowerCase() ? t.accent : t.muted,
                transition: "color 0.2s",
                fontFamily: "'Syne', sans-serif",
              }}>{l}</button>
          ))}
          <button onClick={() => setDark(!dark)} style={{
            background: t.surfaceAlt, border: `1px solid ${t.border}`, borderRadius: 8,
            width: 36, height: 36, cursor: "pointer", marginLeft: 8, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{dark ? "☀️" : "🌙"}</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          fontSize: 22, color: t.text,
        }} className="mobile-menu-btn">{menuOpen ? "✕" : "☰"}</button>
      </div>
      {menuOpen && (
        <div style={{
          background: t.surface, borderTop: `1px solid ${t.border}`,
          padding: "12px 0", display: "flex", flexDirection: "column",
        }}>
          {links.map((l) => (
            <button key={l} onClick={() => scroll(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "12px 24px", textAlign: "left",
              fontSize: 15, color: t.text, fontFamily: "'Syne', sans-serif",
            }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ t, dark }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "120px 24px 80px",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(${t.border} 1px, transparent 1px),
          linear-gradient(90deg, ${t.border} 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        opacity: 0.4,
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
      }} />
      {/* Accent blob */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 400, borderRadius: "50%",
        background: `radial-gradient(ellipse, ${t.accentGlow} 0%, transparent 70%)`,
        zIndex: 0, pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, textAlign: "center" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: t.accentSoft, border: `1px solid ${t.accentGlow}`,
          borderRadius: 100, padding: "6px 16px", marginBottom: 32,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(-12px)",
          transition: "all 0.6s ease 0.1s",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.green, display: "inline-block", boxShadow: `0 0 8px ${t.green}` }} />
          <span style={{ fontSize: 12, color: t.muted, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}>
            OPEN TO OPPORTUNITIES
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(44px, 8vw, 88px)", lineHeight: 1.0,
          color: t.text, letterSpacing: "-0.03em", margin: "0 0 16px",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.2s",
        }}>
          Shivangi<br />
          <span style={{ color: t.accent }}>Rai</span>
        </h1>

        <p style={{
          fontSize: "clamp(15px, 2.5vw, 20px)", color: t.muted, maxWidth: 580,
          margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 400,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.35s",
        }}>
          Backend & Platform Engineer building production Kafka infrastructure, cloud-native APIs, and AI-powered operational systems at scale.
        </p>

        <div style={{
          display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.5s",
        }}>
          <a href="https://github.com/ShivangiRay" target="_blank" rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: t.accent, color: "#fff", borderRadius: 8,
              padding: "12px 24px", fontSize: 14, fontWeight: 600,
              textDecoration: "none", fontFamily: "'Syne', sans-serif",
              boxShadow: `0 0 24px ${t.accentGlow}`,
            }}>
            ↗ View GitHub
          </a>
          <a href="https://linkedin.com/in/ShivangiRai1" target="_blank" rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: t.text,
              border: `1px solid ${t.border}`, borderRadius: 8,
              padding: "12px 24px", fontSize: 14, fontWeight: 600,
              textDecoration: "none", fontFamily: "'Syne', sans-serif",
            }}>
            LinkedIn
          </a>
          <a href="mailto:shivangiray1703@gmail.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: t.muted,
              border: `1px solid ${t.border}`, borderRadius: 8,
              padding: "12px 24px", fontSize: 14, fontWeight: 500,
              textDecoration: "none", fontFamily: "'Syne', sans-serif",
            }}>
            Get in Touch
          </a>
        </div>

        {/* Scroll cue */}
        <div style={{
          marginTop: 64, opacity: mounted ? 0.5 : 0, transition: "opacity 1s ease 1s",
          animation: "bounce 2s infinite",
        }}>
          <div style={{ fontSize: 20, color: t.muted }}>↓</div>
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About({ t }) {
  const [ref, visible] = useScrollReveal();
  const c1 = useCounter(3, visible);
  const c2 = useCounter(15, visible);
  const c3 = useCounter(10000, visible, 2400);
  return (
    <section id="about" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <Reveal t={t}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 48 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.accent }}>01.</span>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: t.text, margin: 0 }}>About</h2>
          <div style={{ flex: 1, height: 1, background: t.border, marginLeft: 16 }} />
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} ref={ref}>
        <Reveal t={t} delay={0.1}>
          <div style={{ lineHeight: 1.9, color: t.muted, fontSize: 16 }}>
            <p style={{ marginTop: 0 }}>
              I'm a backend and platform engineer with a focus on building things that <span style={{ color: t.text, fontWeight: 600 }}>don't break at 3am</span> — distributed systems, Kafka platforms, cloud-native APIs, and the operational tooling that keeps engineering teams from drowning in noise.
            </p>
            <p>
              At Maersk, I work on platform engineering for a Kafka administration team, shipping Go-based provisioning APIs, managing 10K+ topics and schemas, and building the internal developer tools that other teams depend on. I've also been building an AI layer on top of that — Agentic AI, RAG, and LLM-powered ranking to help on-call engineers focus on what actually matters.
            </p>
            <p style={{ marginBottom: 0 }}>
              I care about <span style={{ color: t.text, fontWeight: 600 }}>production reliability, clean API contracts, and systems that explain themselves</span>. I graduated with a 9.91 CGPA in Computer Science — but the real education has been on-call rotations, incident timelines, and shipping things that scale.
            </p>
          </div>
        </Reveal>

        <Reveal t={t} delay={0.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { n: c1, suffix: "+", label: "Years of Production Engineering", color: t.accent },
              { n: c2, suffix: "+", label: "gRPC/REST APIs Shipped", color: t.green },
              { n: c3, suffix: "+", label: "Kafka Topics Administered", color: t.gold },
              // Counter animates from 0 to 10000
            ].map(({ n, suffix, label, color }) => (
              <div key={label} style={{
                background: t.surface, border: `1px solid ${t.border}`,
                borderRadius: 12, padding: "20px 24px",
                display: "flex", alignItems: "center", gap: 20,
              }}>
                <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Syne', sans-serif", color, lineHeight: 1, minWidth: 70 }}>
                  {n}{suffix}
                </div>
                <div style={{ fontSize: 13, color: t.muted, lineHeight: 1.5 }}>{label}</div>
              </div>
            ))}
            <div style={{
              background: t.accentSoft, border: `1px solid ${t.accentGlow}`,
              borderRadius: 12, padding: "16px 20px",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.accent, lineHeight: 1.8,
            }}>
              <span style={{ color: t.dim }}>$ </span>location: Bengaluru, India<br />
              <span style={{ color: t.dim }}>$ </span>stack: Go · Kafka · Kubernetes · AI<br />
              <span style={{ color: t.dim }}>$ </span>status: <span style={{ color: t.green }}>building</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function Skills({ t }) {
  return (
    <section id="skills" style={{ padding: "100px 24px", background: t.surfaceAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal t={t}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.accent }}>02.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: t.text, margin: 0 }}>Skills</h2>
            <div style={{ flex: 1, height: 1, background: t.border, marginLeft: 16 }} />
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {SKILLS.map((s, i) => (
            <Reveal key={s.group} t={t} delay={i * 0.06}>
              <div style={{
                background: t.surface, border: `1px solid ${t.border}`,
                borderRadius: 12, padding: "20px 24px",
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: t.accent, marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {s.group}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.items.map(item => <Tag key={item} label={item} t={t} />)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────
function Experience({ t }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal t={t}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.accent }}>03.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: t.text, margin: 0 }}>Experience</h2>
            <div style={{ flex: 1, height: 1, background: t.border, marginLeft: 16 }} />
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.company} t={t} delay={i * 0.1}>
              <div style={{
                background: t.surface, borderRadius: 16,
                border: `1px solid ${open === i ? e.color + "60" : t.border}`,
                overflow: "hidden", transition: "border-color 0.3s",
              }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  padding: "24px 28px", textAlign: "left",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 4, height: 40, borderRadius: 4, background: e.color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: t.text }}>{e.company}</div>
                      <div style={{ fontSize: 13, color: t.muted, marginTop: 2 }}>{e.role} · {e.period}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 20, color: t.muted, transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                    ↓
                  </div>
                </button>

                {open === i && (
                  <div style={{ padding: "0 28px 28px" }}>
                    <div style={{ height: 1, background: t.border, marginBottom: 24 }} />
                    <ul style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                      {e.highlights.map((h) => (
                        <li key={h} style={{ color: t.muted, fontSize: 14, lineHeight: 1.7 }}>
                          <span style={{ color: t.text }}>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20 }}>
                      {e.tags.map(tag => <Tag key={tag} label={tag} t={t} />)}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function Projects({ t }) {
  return (
    <section id="projects" style={{ padding: "100px 24px", background: t.surfaceAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal t={t}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.accent }}>04.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: t.text, margin: 0 }}>Projects</h2>
            <div style={{ flex: 1, height: 1, background: t.border, marginLeft: 16 }} />
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} t={t} delay={i * 0.1}>
              <div style={{
                background: t.surface, borderRadius: 16,
                border: `1px solid ${t.border}`, overflow: "hidden",
                transition: "border-color 0.3s, transform 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.color + "80"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Accent bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

                <div style={{ padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr auto", gap: 24 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.color, letterSpacing: "0.08em" }}>
                        {p.subtitle.toUpperCase()}
                      </span>
                      <span style={{ fontSize: 11, color: t.dim }}>· {p.period}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: t.text, margin: "0 0 12px" }}>
                      {p.title}
                    </h3>
                    <p style={{ color: t.muted, fontSize: 14, lineHeight: 1.75, margin: "0 0 16px" }}>
                      {p.description}
                    </p>
                    <ul style={{ margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                      {p.bullets.map(b => (
                        <li key={b} style={{ fontSize: 13, color: t.muted, lineHeight: 1.6 }}>{b}</li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20 }}>
                      {p.stack.map(s => <Tag key={s} label={s} t={t} />)}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", flexShrink: 0 }}>
                    <a href={p.github} target="_blank" rel="noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: t.surfaceAlt, border: `1px solid ${t.border}`,
                      borderRadius: 8, padding: "8px 14px", fontSize: 12,
                      color: t.muted, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace",
                      whiteSpace: "nowrap",
                    }}>
                      ↗ GitHub
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Education ─────────────────────────────────────────────────────────────────
function Education({ t }) {
  return (
    <section id="education" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal t={t}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 56 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.accent }}>05.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: t.text, margin: 0 }}>Education</h2>
            <div style={{ flex: 1, height: 1, background: t.border, marginLeft: 16 }} />
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              school: "New Horizon College of Engineering, VTU",
              degree: "Bachelor of Engineering — Computer Science",
              period: "2019 – 2023",
              detail: "9.91 / 10 CGPA",
              highlight: true,
            },
            {
              school: "Army Public School, Bengaluru",
              degree: "Intermediate · PCM & Information Practices",
              period: "2016 – 2019",
              detail: "95% · Matriculation 10 CGPA",
              highlight: false,
            },
          ].map((e, i) => (
            <Reveal key={e.school} t={t} delay={i * 0.1}>
              <div style={{
                background: t.surface, borderRadius: 16,
                border: `1px solid ${e.highlight ? t.gold + "50" : t.border}`,
                padding: "24px 28px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 16, flexWrap: "wrap",
              }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 4, height: 40, borderRadius: 4, background: e.highlight ? t.gold : t.dim, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: t.text }}>{e.school}</div>
                    <div style={{ fontSize: 13, color: t.muted, marginTop: 3 }}>{e.degree} · {e.period}</div>
                  </div>
                </div>
                <div style={{
                  background: e.highlight ? t.gold + "15" : t.surfaceAlt,
                  border: `1px solid ${e.highlight ? t.gold + "40" : t.border}`,
                  borderRadius: 8, padding: "8px 16px",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                  fontWeight: 700, color: e.highlight ? t.gold : t.muted,
                }}>
                  {e.detail}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact({ t }) {
  return (
    <section id="contact" style={{ padding: "100px 24px 80px", background: t.surfaceAlt }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Reveal t={t}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.accent }}>06.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: t.text, margin: 0 }}>Contact</h2>
          </div>
        </Reveal>

        <Reveal t={t} delay={0.1}>
          <p style={{ color: t.muted, fontSize: 16, lineHeight: 1.8, marginBottom: 48 }}>
            I'm currently open to backend, platform, and AI engineering roles. If you're building something ambitious and need someone who cares about production reliability and engineering craft, let's talk.
          </p>
        </Reveal>

        <Reveal t={t} delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { label: "Email", value: "shivangiray1703@gmail.com", href: "mailto:shivangiray1703@gmail.com", icon: "✉️" },
              { label: "LinkedIn", value: "ShivangiRai1", href: "https://linkedin.com/in/ShivangiRai1", icon: "💼" },
              { label: "GitHub", value: "ShivangiRay", href: "https://github.com/ShivangiRay", icon: "⚙️" },
              { label: "Phone", value: "+91 7975371751", href: "tel:+917975371751", icon: "📞" },
            ].map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                style={{
                  display: "flex", flexDirection: "column", gap: 6,
                  background: t.surface, border: `1px solid ${t.border}`,
                  borderRadius: 12, padding: "20px", textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 22 }}>{c.icon}</div>
                <div style={{ fontSize: 11, color: t.dim, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.label}</div>
                <div style={{ fontSize: 13, color: t.accent, fontWeight: 500, wordBreak: "break-all" }}>{c.value}</div>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal t={t} delay={0.3}>
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${t.border}`, color: t.dim, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
            Shivangi Rai · Bengaluru, India · {new Date().getFullYear()}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const t = dark ? THEME.dark : THEME.light;

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
    document.body.style.margin = "0";
    document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
  }, [t]);

  return (
    <div style={{ background: t.bg, color: t.text, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        .desktop-nav { display: flex; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 700px) {
          section > div { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar dark={dark} setDark={setDark} t={t} />
      <Hero t={t} dark={dark} />
      <About t={t} />
      <Skills t={t} />
      <Experience t={t} />
      <Projects t={t} />
      <Education t={t} />
      <Contact t={t} />
    </div>
  );
}