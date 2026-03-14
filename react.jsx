import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const COMPASSES = [
  {
    id: "design-methodology",
    title: "Design Methodology",
    tier: 1,
    accent: "#5b8def",
    subtitle: "How you structure code and when you verify it correct",
    ax1: {
      label: "Structuring orientation",
      low: "Structure emergently",
      high: "Structure proactively",
    },
    ax2: {
      label: "Verification timing",
      low: "Verify late",
      high: "Verify early",
    },
    quads: [
      {
        label: "Proactive + Early",
        desc: "Define model AND tests before implementing",
      },
      {
        label: "Proactive + Late",
        desc: "Rich upfront model, verify the finished work",
      },
      {
        label: "Emergent + Early",
        desc: "Tests define behaviour, abstractions emerge through refactoring",
      },
      {
        label: "Emergent + Late",
        desc: "Build it, see if it works, extract patterns",
      },
    ],
    informs:
      "TDD, type-driven development, domain-driven design, exploratory development, Big Design Up Front",
    methodologyPhases: ["build", "verify"],
  },
  {
    id: "verification-motivation",
    title: "Verification Motivation",
    tier: 1,
    accent: "#4ecdc4",
    subtitle:
      "Why you verify when you do — discovery tool or confirmation tool",
    ax1: { label: "Engagement mode", low: "Experimental", high: "Reflective" },
    ax2: {
      label: "Verification timing",
      low: "Verify late",
      high: "Verify early",
    },
    quads: [
      {
        label: "Reflective + Early",
        desc: "Tests as specification — define correctness through study",
      },
      {
        label: "Reflective + Late",
        desc: "Build carefully from understanding, verify the finished work",
      },
      {
        label: "Experimental + Early",
        desc: "Tests as discovery — explore through failing assertions",
      },
      {
        label: "Experimental + Late",
        desc: "Build, run, observe, fix — REPL-driven development",
      },
    ],
    informs:
      "TDD as discipline vs exploration, REPL-driven development, spike work, proof-of-concept culture",
    methodologyPhases: ["verify", "build"],
  },
  {
    id: "process-fit-temporal",
    title: "Process Fit (Temporal)",
    tier: 1,
    accent: "#ff6b6b",
    subtitle:
      "How incubation needs interact with where your structure comes from",
    ax1: {
      label: "Incubation reliance",
      low: "Low — solve at keyboard",
      high: "High — need background processing",
    },
    ax2: {
      label: "Self-regulation",
      low: "Externally regulated",
      high: "Internally regulated",
    },
    quads: [
      {
        label: "High incubation + Internal",
        desc: "Sets own pace, builds in hammock time",
      },
      {
        label: "High incubation + External",
        desc: "Needs incubation but expected to show daily progress — friction",
      },
      {
        label: "Low incubation + Internal",
        desc: "Self-paced, solves at keyboard, steady output",
      },
      {
        label: "Low incubation + External",
        desc: "Fits sprint model naturally — solve, ship, next",
      },
    ],
    informs:
      "Scrum, sprint cadence, daily standups, velocity tracking, Hammock Driven Development",
    methodologyPhases: ["plan", "understand"],
  },
  {
    id: "process-fit-attentional",
    title: "Process Fit (Attentional)",
    tier: 1,
    accent: "#ff6b9d",
    subtitle:
      "How attention pattern interacts with regulation — neurodivergent-aware",
    ax1: {
      label: "Attention pattern",
      low: "Responsive flow",
      high: "Deep immersion",
    },
    ax2: {
      label: "Self-regulation",
      low: "Externally regulated",
      high: "Internally regulated",
    },
    quads: [
      {
        label: "Deep + Internal",
        desc: "Self-structures long focus blocks — solo deep worker",
      },
      {
        label: "Deep + External",
        desc: "Needs uninterrupted time but works within imposed structure — friction",
      },
      {
        label: "Responsive + Internal",
        desc: "Self-structures while staying available",
      },
      {
        label: "Responsive + External",
        desc: "Thrives in externally-structured, interrupt-driven environments",
      },
    ],
    informs:
      "Sprint ceremonies, open-plan offices, Slack culture, meeting-heavy schedules, pairing schedules",
    methodologyPhases: ["build", "plan"],
  },
  {
    id: "time-boxing-fit",
    title: "Time-Boxing Fit",
    tier: 1,
    accent: "#e8a838",
    subtitle: "Regulation needs × relationship to deadlines",
    ax1: {
      label: "Self-regulation",
      low: "Externally regulated",
      high: "Internally regulated",
    },
    ax2: {
      label: "Timeline ambiguity tolerance",
      low: "Need deadlines",
      high: "Comfortable without",
    },
    quads: [
      {
        label: "Internal + Need deadlines",
        desc: "Self-manages but needs temporal pressure — sets own deadlines",
      },
      {
        label: "Internal + No deadlines",
        desc: "Pure self-direction — the open-source maintainer",
      },
      {
        label: "External + Need deadlines",
        desc: "Needs both structure and time pressure — classic sprint fit",
      },
      {
        label: "External + No deadlines",
        desc: "Needs task structure but works at own pace — Kanban fit",
      },
    ],
    informs:
      "Sprints, Kanban, Shape Up, open-ended research phases, estimation practices",
    methodologyPhases: ["plan", "deliver"],
  },
  {
    id: "architecture-philosophy",
    title: "Architecture Philosophy",
    tier: 1,
    accent: "#a78bfa",
    subtitle: "Structuring orientation × design optimisation target",
    ax1: {
      label: "Structuring orientation",
      low: "Structure emergently",
      high: "Structure proactively",
    },
    ax2: {
      label: "Design value",
      low: "Favour simplicity",
      high: "Favour flexibility",
    },
    quads: [
      {
        label: "Proactive + Flexible",
        desc: "Plans for future change from day one — enterprise architect",
      },
      {
        label: "Proactive + Simple",
        desc: "Clean model, minimal implementation — domain purist",
      },
      {
        label: "Emergent + Flexible",
        desc: "Builds flexible systems iteratively — plugin architecture through refactoring",
      },
      {
        label: "Emergent + Simple",
        desc: "Simplest thing that works, only abstract when forced — YAGNI purist",
      },
    ],
    informs:
      "YAGNI, SOLID principles, design patterns, microservices vs monolith, hexagonal architecture",
    methodologyPhases: ["build", "maintain"],
  },
  {
    id: "team-formation",
    title: "Team Formation",
    tier: 1,
    accent: "#f97316",
    subtitle: "Attention pattern × peer collaboration",
    ax1: {
      label: "Attention pattern",
      low: "Responsive flow",
      high: "Deep immersion",
    },
    ax2: {
      label: "Peer collaboration",
      low: "Asynchronous / independent",
      high: "Synchronous / coupled",
    },
    quads: [
      {
        label: "Deep + Synchronous",
        desc: "Pair programming as shared deep focus — powerful when aligned",
      },
      {
        label: "Deep + Asynchronous",
        desc: "Needs uninterrupted time, syncs via PRs — the tunnel worker",
      },
      {
        label: "Responsive + Synchronous",
        desc: "Thrives in real-time collaboration — natural pair programmer",
      },
      {
        label: "Responsive + Asynchronous",
        desc: "Picks up and drops tasks efficiently — task-switcher",
      },
    ],
    informs:
      "Pair programming, mob programming, async code review, real-time collaboration tools",
    methodologyPhases: ["build", "verify"],
  },
  {
    id: "management-compatibility",
    title: "Management Compatibility",
    tier: 1,
    accent: "#22d3ee",
    subtitle: "Regulation needs × how you report progress",
    ax1: {
      label: "Self-regulation",
      low: "Externally regulated",
      high: "Internally regulated",
    },
    ax2: {
      label: "Accountability mode",
      low: "Pull — respond when asked",
      high: "Push — proactively share",
    },
    quads: [
      {
        label: "Internal + Push",
        desc: "Self-directed, documents proactively — remote-native",
      },
      {
        label: "Internal + Pull",
        desc: "Self-directed, available on request — heads-down contributor",
      },
      {
        label: "External + Push",
        desc: "Needs structure, reports diligently — good process follower",
      },
      {
        label: "External + Pull",
        desc: "Needs structure and check-ins — classic standup beneficiary",
      },
    ],
    informs:
      "Standups, sprint reviews, demo culture, written status updates, 1:1 meetings",
    methodologyPhases: ["deliver", "plan"],
  },
  {
    id: "ambiguity-response",
    title: "Ambiguity Response",
    tier: 2,
    accent: "#e879f9",
    subtitle: "How your processing mode navigates structural unknowns",
    ax1: { label: "Processing mode", low: "Holistic", high: "Analytical" },
    ax2: {
      label: "Architectural ambiguity tolerance",
      low: "Need structural clarity",
      high: "Comfortable undefined",
    },
    quads: [
      {
        label: "Analytical + Low tolerance",
        desc: "Needs well-defined inputs to decompose — can't start without them",
      },
      {
        label: "Analytical + High tolerance",
        desc: "Finds structure in chaos — decomposes vague problems systematically",
      },
      {
        label: "Holistic + Low tolerance",
        desc: "Needs a clear big picture — gaps prevent the gestalt forming",
      },
      {
        label: "Holistic + High tolerance",
        desc: "Works with partial, fuzzy wholes — comfortable with incomplete shapes",
      },
    ],
    informs:
      "Spike work, technical discovery, architecture decision records, greenfield vs brownfield",
    methodologyPhases: ["understand", "plan"],
  },
  {
    id: "comprehension-clarity",
    title: "Comprehension vs Clarity",
    tier: 2,
    accent: "#84cc16",
    subtitle:
      "Whether your comprehension drive compensates for environmental gaps",
    ax1: {
      label: "Comprehension depth",
      low: "Surface — act fast",
      high: "Deep — understand first",
    },
    ax2: {
      label: "Requirements completeness",
      low: "Need full spec",
      high: "Tolerate vague brief",
    },
    quads: [
      {
        label: "Deep + Need spec",
        desc: "Needs thorough understanding AND clear requirements",
      },
      {
        label: "Deep + Tolerate vague",
        desc: "Will dig until they find clarity — compensates for gaps",
      },
      {
        label: "Surface + Need spec",
        desc: "Needs clear tasks, executes quickly once given them",
      },
      {
        label: "Surface + Tolerate vague",
        desc: "Thrives in ambiguity — discovers through building",
      },
    ],
    informs:
      "User stories, acceptance criteria, BDD/Gherkin, specification formats, Jobs to Be Done",
    methodologyPhases: ["understand"],
  },
  {
    id: "code-quality",
    title: "Code Quality Philosophy",
    tier: 2,
    accent: "#fb7185",
    subtitle: "What you protect in design tradeoffs",
    ax1: {
      label: "Design value",
      low: "Favour simplicity",
      high: "Favour flexibility",
    },
    ax2: {
      label: "Execution value",
      low: "Favour pragmatism",
      high: "Favour elegance",
    },
    quads: [
      {
        label: "Flexible + Elegant",
        desc: "The perfectionist architect — extensible and beautiful",
      },
      {
        label: "Flexible + Pragmatic",
        desc: "Builds extensibility pragmatically — plugin points without polish",
      },
      {
        label: "Simple + Elegant",
        desc: "The minimalist craftsperson — smallest solution, beautifully executed",
      },
      {
        label: "Simple + Pragmatic",
        desc: "The shipper — whatever works, as little as possible",
      },
    ],
    informs:
      "Clean Code, refactoring practices, tech debt attitudes, code review standards",
    methodologyPhases: ["build", "maintain"],
  },
  {
    id: "delivery-philosophy",
    title: "Delivery Philosophy",
    tier: 2,
    accent: "#fbbf24",
    subtitle: "How you balance completeness with velocity",
    ax1: {
      label: "Completion drive",
      low: "Favour momentum",
      high: "Favour thoroughness",
    },
    ax2: {
      label: "Design value",
      low: "Favour simplicity",
      high: "Favour flexibility",
    },
    quads: [
      {
        label: "Thorough + Flexible",
        desc: "Every piece complete AND designed for change — slow but robust",
      },
      {
        label: "Thorough + Simple",
        desc: "Every piece complete AND minimal — the careful minimalist",
      },
      {
        label: "Momentum + Flexible",
        desc: "Ships fast with extensibility hooks — pragmatic architect",
      },
      {
        label: "Momentum + Simple",
        desc: "Ships the simplest thing fast — maximum velocity",
      },
    ],
    informs:
      "MVP, definition of done, iterative delivery, CI/CD cadence, feature flags",
    methodologyPhases: ["deliver", "build"],
  },
  {
    id: "communication-pattern",
    title: "Communication Pattern",
    tier: 2,
    accent: "#818cf8",
    subtitle: "How peer relationships interact with stakeholder relationships",
    ax1: {
      label: "Peer collaboration",
      low: "Asynchronous / independent",
      high: "Synchronous / coupled",
    },
    ax2: {
      label: "Accountability mode",
      low: "Pull — respond when asked",
      high: "Push — proactively share",
    },
    quads: [
      {
        label: "Sync + Push",
        desc: "Collaborates closely AND shares constantly — the team player",
      },
      {
        label: "Sync + Pull",
        desc: "Collaborates with peers but doesn't report up unprompted",
      },
      {
        label: "Async + Push",
        desc: "Works independently but proactively documents — good remote worker",
      },
      {
        label: "Async + Pull",
        desc: "Heads-down, available on request — the quiet contributor",
      },
    ],
    informs:
      "Retros, cross-functional meetings, documentation culture, remote vs co-located work",
    methodologyPhases: ["deliver", "plan"],
  },
  {
    id: "learning-style",
    title: "Learning Style",
    tier: 3,
    accent: "#34d399",
    subtitle:
      "How you form understanding — the cognitive basis for your practice stances",
    ax1: { label: "Representation mode", low: "Concrete", high: "Abstract" },
    ax2: { label: "Engagement mode", low: "Experimental", high: "Reflective" },
    quads: [
      {
        label: "Abstract + Reflective",
        desc: "Builds thorough mental models from observation — the theoretician",
      },
      {
        label: "Abstract + Experimental",
        desc: "Applies theory through practice — tests models by building",
      },
      {
        label: "Concrete + Reflective",
        desc: "Reflects on real code and real behaviour — the empiricist",
      },
      {
        label: "Concrete + Experimental",
        desc: "Changes things and sees what happens — learns by doing",
      },
    ],
    informs: null,
    methodologyPhases: [],
  },
  {
    id: "problem-engagement",
    title: "Problem Engagement",
    tier: 3,
    accent: "#c4b5fd",
    subtitle: "The style of your thinking when faced with something to solve",
    ax1: { label: "Processing mode", low: "Holistic", high: "Analytical" },
    ax2: { label: "Engagement mode", low: "Experimental", high: "Reflective" },
    quads: [
      {
        label: "Analytical + Reflective",
        desc: "Studies systematically — the scholar",
      },
      {
        label: "Analytical + Experimental",
        desc: "Designs experiments, analyses results — the scientist",
      },
      {
        label: "Holistic + Reflective",
        desc: "Absorbs the whole picture — the contemplative",
      },
      {
        label: "Holistic + Experimental",
        desc: "Jumps in, grasps through doing — the improviser",
      },
    ],
    informs: null,
    methodologyPhases: [],
  },
  {
    id: "problem-processing",
    title: "Problem Processing",
    tier: 3,
    accent: "#fdba74",
    subtitle:
      "How your processing mode interacts with your need for incubation",
    ax1: { label: "Processing mode", low: "Holistic", high: "Analytical" },
    ax2: {
      label: "Incubation reliance",
      low: "Low — solve at keyboard",
      high: "High — need incubation",
    },
    quads: [
      {
        label: "Analytical + Low incubation",
        desc: "Works through problems step by step in real time — the debugger",
      },
      {
        label: "Analytical + High incubation",
        desc: "Decomposes analytically, then incubates — the architect",
      },
      {
        label: "Holistic + Low incubation",
        desc: "Grasps the whole shape and builds immediately — the intuitive",
      },
      {
        label: "Holistic + High incubation",
        desc: "Absorbs the whole problem and lets it cook — the marinator",
      },
    ],
    informs: null,
    methodologyPhases: [],
  },
  {
    id: "creative-workflow",
    title: "Creative Workflow",
    tier: 3,
    accent: "#86efac",
    subtitle: "How incubation needs interact with when you impose structure",
    ax1: {
      label: "Incubation reliance",
      low: "Low — solve at keyboard",
      high: "High — need incubation",
    },
    ax2: {
      label: "Structuring orientation",
      low: "Structure emergently",
      high: "Structure proactively",
    },
    quads: [
      {
        label: "High incubation + Proactive",
        desc: "Load the problem, incubate, build the right thing — Hickey's ideal",
      },
      {
        label: "High incubation + Emergent",
        desc: "Let it marinate, discover structure through building",
      },
      {
        label: "Low incubation + Proactive",
        desc: "Plan carefully, execute at the keyboard — steady producer",
      },
      {
        label: "Low incubation + Emergent",
        desc: "Just build — fastest path from problem to solution",
      },
    ],
    informs: null,
    methodologyPhases: [],
  },
];

// Dimension consistency
function quadToAxes(q) {
  return { ax1: q <= 1 ? "high" : "low", ax2: q % 2 === 0 ? "high" : "low" };
}

function getDimPositions(cd) {
  const dims = {};
  COMPASSES.forEach((c) => {
    const d = cd[c.id];
    if (d.quadrant === null || d.quadrant === undefined) return;
    const axes = quadToAxes(d.quadrant);
    [
      ["ax1", axes.ax1],
      ["ax2", axes.ax2],
    ].forEach(([k, dir]) => {
      const lbl = c[k].label;
      if (!dims[lbl]) dims[lbl] = [];
      dims[lbl].push({ cId: c.id, cTitle: c.title, dir, accent: c.accent });
    });
  });
  return dims;
}

function getConstraints(compass, cd) {
  const dims = getDimPositions(cd);
  const con = { conflicts: [false, false, false, false], reasons: [] };
  ["ax1", "ax2"].forEach((k) => {
    const lbl = compass[k].label;
    const others = (dims[lbl] || []).filter((p) => p.cId !== compass.id);
    if (!others.length) return;
    const dirs = [...new Set(others.map((o) => o.dir))];
    if (dirs.length !== 1) return;
    const est = dirs[0],
      src = others[0];
    if (k === "ax1") {
      if (est === "high") {
        con.conflicts[2] = true;
        con.conflicts[3] = true;
      } else {
        con.conflicts[0] = true;
        con.conflicts[1] = true;
      }
    } else {
      if (est === "high") {
        con.conflicts[1] = true;
        con.conflicts[3] = true;
      } else {
        con.conflicts[0] = true;
        con.conflicts[2] = true;
      }
    }
    con.reasons.push({
      dim: lbl,
      est: est === "high" ? compass[k].high : compass[k].low,
      from: src.cTitle,
      accent: src.accent,
    });
  });
  return con;
}

// Hooks
function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setV(true);
      },
      { threshold: t },
    );
    o.observe(el);
    return () => o.disconnect();
  }, [t]);
  return [ref, v];
}
function FadeIn({ children, delay = 0, from = "below", style = {} }) {
  const [ref, vis] = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis
          ? "translate(0,0)"
          : `translate(${from === "left" ? "-30px" : "0"},${from === "below" ? "30px" : "0"})`,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Grid
function CompassGrid({ compass, data, onChange, cd }) {
  const { accent, quads } = compass;
  const { quadrant: q, intensity: int } = data;
  const con = getConstraints(compass, cd);
  const HATCH = `repeating-linear-gradient(-45deg,transparent,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 4px)`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "3px",
            color: "#999",
          }}
        >
          {compass.ax2.high}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#999",
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            minWidth: "16px",
            textAlign: "center",
          }}
        >
          {compass.ax1.high}
        </span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3px",
            flex: 1,
            maxWidth: "420px",
          }}
        >
          {quads.map((qd, i) => {
            const sel = q === i,
              cf = con.conflicts[i];
            return (
              <button
                key={i}
                onClick={() =>
                  onChange({
                    quadrant: q === i ? null : i,
                    intensity: q === i ? 0 : int || 1,
                  })
                }
                style={{
                  background: sel
                    ? `${accent}18`
                    : cf
                      ? HATCH
                      : "rgba(255,255,255,0.02)",
                  border: sel
                    ? `1px solid ${accent}55`
                    : cf
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "16px 12px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: sel ? accent : cf ? "#666" : "#bbb",
                    marginBottom: "6px",
                    fontWeight: sel ? "bold" : "normal",
                  }}
                >
                  {qd.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    color: sel ? "#ddd" : cf ? "#555" : "#888",
                    lineHeight: 1.5,
                  }}
                >
                  {qd.desc}
                </div>
              </button>
            );
          })}
        </div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#999",
            writingMode: "vertical-lr",
            minWidth: "16px",
            textAlign: "center",
          }}
        >
          {compass.ax1.low}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "3px",
            color: "#999",
          }}
        >
          {compass.ax2.low}
        </span>
      </div>
      {con.reasons.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginTop: "4px",
          }}
        >
          {con.reasons.map((r, i) => (
            <div
              key={i}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                color: "#777",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: r.accent,
                  flexShrink: 0,
                }}
              />
              <span>
                <span style={{ color: "#999" }}>{r.dim}</span> established as{" "}
                <span style={{ color: r.accent }}>{r.est}</span> in {r.from}
              </span>
            </div>
          ))}
        </div>
      )}
      {q !== null && q !== undefined && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#999",
            }}
          >
            Intensity
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Centre", "Moderate", "Strong"].map((l, idx) => (
              <button
                key={idx}
                onClick={() => onChange({ ...data, intensity: idx })}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  padding: "6px 14px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  border:
                    int === idx
                      ? `1px solid ${accent}`
                      : "1px solid rgba(255,255,255,0.12)",
                  background: int === idx ? `${accent}22` : "transparent",
                  color: int === idx ? accent : "#999",
                  transition: "all 0.2s ease",
                  outline: "none",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Card
function CompassCard({ compass, data, onChange, index, cd }) {
  const [exp, setExp] = useState(false);
  const { accent, title, subtitle, tier, informs } = compass;
  const has = data.quadrant !== null && data.quadrant !== undefined;
  return (
    <FadeIn delay={index * 0.06} from="left">
      <div
        style={{
          background: exp ? "rgba(255,255,255,0.015)" : "transparent",
          borderRadius: "16px",
          transition: "background 0.4s ease",
          marginBottom: "8px",
        }}
      >
        <button
          onClick={() => setExp(!exp)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "20px 24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            outline: "none",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: has ? accent : "rgba(255,255,255,0.15)",
              boxShadow: has ? `0 0 12px ${accent}44` : "none",
              flexShrink: 0,
              transition: "all 0.3s ease",
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(20px, 3vw, 28px)",
                color: exp ? accent : "#f0f0f0",
                transition: "color 0.3s ease",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                color: "#777",
                marginTop: "2px",
              }}
            >
              {subtitle}
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#555",
            }}
          >
            T{tier}
          </div>
          <div
            style={{
              color: "#777",
              fontSize: "18px",
              transition: "transform 0.3s ease",
              transform: exp ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            +
          </div>
        </button>
        {exp && (
          <div
            style={{ padding: "0 24px 24px", animation: "fadeIn 0.4s ease" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: "16px",
                }}
              >
                {["ax1", "ax2"].map((k) => (
                  <div key={k}>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        color: "#777",
                        marginBottom: "4px",
                      }}
                    >
                      {k === "ax1" ? "Axis 1" : "Axis 2"}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "12px",
                        color: "#bbb",
                      }}
                    >
                      {compass[k].label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "10px",
                        color: "#777",
                        marginTop: "2px",
                      }}
                    >
                      {compass[k].low} ←→ {compass[k].high}
                    </div>
                  </div>
                ))}
              </div>
              <CompassGrid
                compass={compass}
                data={data}
                onChange={(d) => onChange(compass.id, d)}
                cd={cd}
              />
              <textarea
                value={data.notes || ""}
                onChange={(e) =>
                  onChange(compass.id, { ...data, notes: e.target.value })
                }
                placeholder="Your explanation — how these two dimensions interact for you..."
                style={{
                  width: "100%",
                  minHeight: "100px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "14px",
                  color: "#bbb",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  lineHeight: 1.7,
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {informs && (
                <div
                  style={{
                    borderLeft: `2px solid ${accent}`,
                    background: `${accent}0f`,
                    borderRadius: "0 6px 6px 0",
                    padding: "12px 16px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      color: "#999",
                      marginBottom: "6px",
                    }}
                  >
                    This informs how I relate to
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "12px",
                      color: "#bbb",
                      lineHeight: 1.6,
                    }}
                  >
                    {informs}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

const ESTABLISHED_METHODS = [
  {
    id: "tdd",
    name: "Test-Driven Development",
    brief:
      "Write tests before implementation. Red-green-refactor. Tests drive design.",
    evaluators: {
      "design-methodology": {
        0: {
          fit: "adapt",
          text: "You already verify early, but through types and models — not test cases. TDD's test-first timing aligns with yours, but your structuring is proactive where TDD expects design to emerge from tests.",
        },
        1: {
          fit: "friction",
          text: "You invest in upfront domain models and verify the finished work. TDD's incremental test-first cycle fragments your natural design process — you want the whole shape before asserting against parts of it.",
        },
        2: {
          fit: "natural",
          text: "You let design emerge through failing tests, using assertions as discovery tools. This is TDD's intended mode of operation.",
        },
        3: {
          fit: "friction",
          text: "You build first and extract patterns after. Writing tests before code inverts your entire flow — you need to see something working before you can specify what 'working' means.",
        },
      },
      "verification-motivation": {
        0: {
          fit: "adapt",
          text: "You treat tests as specifications from study — aligned with test-first thinking, though your tests formalise understanding rather than driving discovery.",
        },
        1: {
          fit: "friction",
          text: "You build from deep understanding and verify at the end. TDD's tight feedback loop feels redundant — you trust your comprehension to prevent most defects.",
        },
        2: {
          fit: "natural",
          text: "You use tests as exploration instruments — writing failing assertions to discover what the system should do. TDD's experimental mode fits you.",
        },
        3: {
          fit: "friction",
          text: "You verify by running, observing, and fixing. TDD's formality clashes with your REPL-driven, immediate-feedback style.",
        },
      },
    },
    alternatives: [
      {
        name: "Type-Driven Development",
        desc: "Let the type system prove correctness at compile time. Types as specifications, not test cases.",
        relevant: ["design-methodology-0", "design-methodology-1"],
      },
      {
        name: "REPL-Driven Development",
        desc: "Explore interactively, extract tests from observed behaviour. Rich Hickey's preferred workflow.",
        relevant: ["verification-motivation-3"],
      },
      {
        name: "Property-Based Testing",
        desc: "Define invariants rather than examples. Aligns with model-first thinking — test the properties, not the cases.",
        relevant: [
          "design-methodology-0",
          "design-methodology-1",
          "verification-motivation-0",
        ],
      },
      {
        name: "Characterisation Testing",
        desc: "Write tests after implementation to lock existing behaviour. Useful when discovery comes before specification.",
        relevant: ["design-methodology-3", "verification-motivation-3"],
      },
      {
        name: "TCR (test && commit || revert)",
        desc: "Kent Beck's extreme variant — forces even smaller steps than classic TDD. Worth trying if the cycle appeals but the granularity doesn't.",
        relevant: [],
      },
    ],
    sources: [
      {
        author: "DHH",
        work: "TDD is Dead",
        year: 2014,
        note: "Argued TDD had become a cargo cult that prioritised unit test coverage over software design quality.",
      },
      {
        author: "Kent Beck, Martin Fowler & DHH",
        work: "Is TDD Dead? (conversation series)",
        year: 2014,
        note: "Beck distinguished TDD as one tool among many — appropriate for some contexts, not a universal rule.",
      },
      {
        author: "Gary Bernhardt",
        work: "Boundaries (talk)",
        year: 2012,
        note: "Challenged the assumption that all tests should be unit tests. Separated 'core' (functional, fast) from 'boundary' (integration, slow) testing.",
      },
      {
        author: "Rich Hickey",
        work: "Simple Made Easy (talk)",
        year: 2011,
        note: "Argued simplicity is about disentangling concepts, not about process discipline. Implicitly challenges test-first as the path to good design.",
      },
    ],
  },
  {
    id: "scrum",
    name: "Scrum",
    brief:
      "Fixed-length sprints. Ceremonies (standup, retro, planning, review). Incremental delivery at sprint boundaries.",
    evaluators: {
      "process-fit-temporal": {
        0: {
          fit: "friction",
          text: "You need background processing time on your own schedule. Scrum's expectations for visible daily progress and fixed sprint boundaries cut across your incubation cycles.",
        },
        1: {
          fit: "friction",
          text: "You need incubation time but already face external regulation pressure. Scrum adds another layer of imposed cadence that directly conflicts with how your cognition processes complex problems.",
        },
        2: {
          fit: "adapt",
          text: "You solve at the keyboard and self-direct. Scrum's ceremonies are overhead for someone who doesn't need the structure, but the sprint rhythm doesn't actively harm your process.",
        },
        3: {
          fit: "natural",
          text: "You solve quickly and work well within externally-imposed cycles. Scrum's pick-up-solve-ship-next model suits your tempo.",
        },
      },
      "time-boxing-fit": {
        0: {
          fit: "adapt",
          text: "You understand the value of deadlines but want to set them yourself. Scrum provides temporal pressure — but removes your control over when and how it's applied.",
        },
        1: {
          fit: "friction",
          text: "You self-direct without time pressure, following the work wherever it leads. Sprint boundaries are an unwelcome constraint on your natural flow.",
        },
        2: {
          fit: "natural",
          text: "You need both external structure and time pressure. Scrum's sprint model gives you exactly that.",
        },
        3: {
          fit: "adapt",
          text: "You need task structure but not time pressure. Scrum gives you structure, but the sprint deadline adds stress that Kanban wouldn't.",
        },
      },
      "management-compatibility": {
        0: {
          fit: "adapt",
          text: "You already communicate proactively. Scrum's ceremonies are redundant reporting — you'd share this information anyway without the overhead.",
        },
        1: {
          fit: "friction",
          text: "You self-direct and make yourself available when asked. Scrum's mandatory daily broadcasting disrupts your heads-down workflow.",
        },
        2: {
          fit: "natural",
          text: "You follow established reporting structures well. Scrum's ceremonies give you a framework for the communication you naturally want to do.",
        },
        3: {
          fit: "natural",
          text: "You benefit from regular check-ins and structured accountability. Standups and reviews provide the external rhythm you work well within.",
        },
      },
    },
    alternatives: [
      {
        name: "Shape Up",
        desc: "Basecamp's method: 6-week cycles with full autonomy within them. Fixed time, variable scope. No standups, no estimation.",
        relevant: [
          "process-fit-temporal-0",
          "time-boxing-fit-0",
          "management-compatibility-0",
        ],
      },
      {
        name: "Kanban",
        desc: "Pull-based flow. No sprints, no estimation. Work moves through columns. Limits work in progress.",
        relevant: ["time-boxing-fit-3", "time-boxing-fit-1"],
      },
      {
        name: "Hammock-Driven Development",
        desc: "Rich Hickey's model: deliberately load problems into background processing. Incompatible with 'what did you do yesterday' culture.",
        relevant: ["process-fit-temporal-0", "process-fit-temporal-1"],
      },
      {
        name: "Maker's Schedule",
        desc: "Paul Graham's observation: managers work in 1-hour blocks, makers need half-day minimums. Structure your week around this.",
        relevant: ["process-fit-temporal-0", "process-fit-temporal-2"],
      },
      {
        name: "Async-first with written updates",
        desc: "Replace ceremonies with written async updates. Ship notes, weekly digests, exception-based escalation.",
        relevant: ["management-compatibility-0", "management-compatibility-1"],
      },
    ],
    sources: [
      {
        author: "Ron Jeffries",
        work: "Developers Should Abandon Agile",
        year: 2018,
        note: "One of the Agile Manifesto signatories argued that 'Agile' had been co-opted by management and no longer served developers.",
      },
      {
        author: "Dave Thomas",
        work: "Agile is Dead (Long Live Agility)",
        year: 2014,
        note: "Another manifesto signatory: the word 'Agile' had become a brand for selling consultancy, not a description of good practice.",
      },
      {
        author: "Ryan Singer",
        work: "Shape Up (Basecamp)",
        year: 2019,
        note: "Proposed fixed-time, variable-scope cycles with no micromanagement during the cycle. A direct counter to sprint-based Scrum.",
      },
      {
        author: "Allen Holub",
        work: "Various talks and articles",
        year: 2019,
        note: "Argued that most Scrum implementations are 'Dark Agile' — Waterfall with standups. The ceremonies become the point instead of the work.",
      },
    ],
  },
  {
    id: "user-stories",
    name: "User Stories",
    brief:
      '"As a [user], I want [feature], so that [benefit]". Acceptance criteria. Conversation fills gaps.',
    evaluators: {
      "comprehension-clarity": {
        0: {
          fit: "friction",
          text: "You need both deep understanding AND comprehensive specifications. User stories are deliberately thin — the format's brevity leaves too many gaps for someone who needs both dimensions of clarity.",
        },
        1: {
          fit: "adapt",
          text: "You'll dig until you find the missing information, compensating for vague requirements. User stories work because you make them work — but the format under-serves your comprehension depth.",
        },
        2: {
          fit: "adapt",
          text: "You need clear specifications but not deep domain understanding. User stories can work if the acceptance criteria are thorough — but the format's reliance on conversation to fill gaps assumes you'll ask, when you'd rather be told.",
        },
        3: {
          fit: "natural",
          text: "Brief direction is enough — you discover the rest through building. User stories give you just enough to start without over-constraining the solution.",
        },
      },
      "ambiguity-response": {
        0: {
          fit: "friction",
          text: "You need well-defined inputs before you can decompose a problem. User stories' deliberate structural vagueness blocks your analytical process at the start.",
        },
        1: {
          fit: "natural",
          text: "You find structure in chaos — you'll extract clear requirements from vague stories by imposing analytical order on them.",
        },
        2: {
          fit: "friction",
          text: "You need the whole picture to form a gestalt. User stories deliberately fragment requirements into isolated user needs, preventing the holistic view you require.",
        },
        3: {
          fit: "natural",
          text: "You work comfortably with partial, fuzzy outlines. User stories give you a rough shape and you fill in the rest intuitively.",
        },
      },
    },
    alternatives: [
      {
        name: "Jobs to Be Done",
        desc: "Focus on what the user is trying to accomplish in context, not on feature descriptions. Richer than user stories, more situational.",
        relevant: ["comprehension-clarity-0", "comprehension-clarity-1"],
      },
      {
        name: "Event Storming",
        desc: "Alberto Brandolini's method: map domain events collaboratively before writing any requirements. Builds the holistic picture first.",
        relevant: ["ambiguity-response-2", "comprehension-clarity-0"],
      },
      {
        name: "Specification by Example",
        desc: "Concrete examples as requirements. Bridges the gap between user stories and executable specs — more substance, less 'conversation fills gaps'.",
        relevant: ["comprehension-clarity-0", "comprehension-clarity-2"],
      },
      {
        name: "RFC / ADR-driven requirements",
        desc: "Write full Request for Comments or Architecture Decision Records. Favours written depth over conversational gap-filling.",
        relevant: ["ambiguity-response-0", "comprehension-clarity-0"],
      },
      {
        name: "Domain Storytelling",
        desc: "Collaborative modelling using pictographic language. Shows how people work together in the domain — richer than 'as a user I want'.",
        relevant: ["ambiguity-response-2", "comprehension-clarity-1"],
      },
    ],
    sources: [
      {
        author: "Dan North",
        work: "Introducing BDD",
        year: 2006,
        note: "Created BDD partly because user stories and TDD didn't connect well to business language. Stories needed richer structure.",
      },
      {
        author: "Alberto Brandolini",
        work: "Introducing EventStorming",
        year: 2013,
        note: "Proposed mapping domain events before specifying features — requirements emerge from understanding the domain, not from user-centric templates.",
      },
      {
        author: "Gojko Adzic",
        work: "Specification by Example",
        year: 2011,
        note: "Argued that concrete examples are better requirements than templates. Examples are testable, stories are not.",
      },
      {
        author: "Alan Cooper",
        work: "About Face / The Inmates Are Running the Asylum",
        year: 1999,
        note: "Pioneered persona-driven design. Argued that user stories without deep user research are just developer guesses in a template.",
      },
    ],
  },
  {
    id: "yagni",
    name: '"Build simple, abstract later" / YAGNI',
    brief:
      "Don't build what you don't need yet. Start with the simplest implementation. Extract abstractions only when forced.",
    evaluators: {
      "architecture-philosophy": {
        0: {
          fit: "friction",
          text: "You plan for future change from day one because you can anticipate it. YAGNI's 'you aren't gonna need it' feels like 'you aren't going to think about it' — and you've been burned by premature simplicity before.",
        },
        1: {
          fit: "adapt",
          text: "You agree with simplicity but achieve it through upfront modelling, not through deferred abstraction. Your domain models are simple by design, not simple by default.",
        },
        2: {
          fit: "adapt",
          text: "You grow flexible systems incrementally — close to YAGNI's spirit, though you're more willing to add abstraction proactively than a strict purist would allow.",
        },
        3: {
          fit: "natural",
          text: "You build the simplest thing that works and actively resist premature abstraction. This is YAGNI as intended.",
        },
      },
      "design-methodology": {
        0: {
          fit: "friction",
          text: "You define structure proactively before implementation. 'Start with the basic thing' contradicts your instinct to get the model right before writing any code.",
        },
        1: {
          fit: "friction",
          text: "You invest in upfront domain modelling. Starting simple feels like starting wrong — the model IS the work, and a wrong model costs more to fix than a wrong implementation.",
        },
        2: {
          fit: "adapt",
          text: "You discover structure through tests, which means you're comfortable starting simple — your tests catch when abstraction becomes necessary.",
        },
        3: {
          fit: "natural",
          text: "Build it, see what works, extract patterns. The approach matches your prototype-first instinct.",
        },
      },
    },
    alternatives: [
      {
        name: "Type-Driven Domain Modelling",
        desc: "Invest in the model, keep the implementation minimal. Simple code, rich types. The domain model prevents the problems YAGNI defers.",
        relevant: [
          "architecture-philosophy-1",
          "design-methodology-0",
          "design-methodology-1",
        ],
      },
      {
        name: "Evolutionary Architecture",
        desc: "Plan for change by building fitness functions and monitoring architectural characteristics — structure that adapts rather than structure you predict.",
        relevant: ["architecture-philosophy-0", "architecture-philosophy-2"],
      },
      {
        name: '"Make the change easy, then make the easy change" (Kent Beck)',
        desc: "Not 'build simple', but 'invest in making future change cheap'. Subtle but important distinction — structure serves future velocity.",
        relevant: ["architecture-philosophy-0", "architecture-philosophy-1"],
      },
      {
        name: "Hexagonal Architecture from the start",
        desc: "Ports and adapters as default structure. The abstraction boundaries exist from day one — you fill in simple implementations now and swap them later.",
        relevant: ["architecture-philosophy-0"],
      },
    ],
    sources: [
      {
        author: "Kent Beck",
        work: "Various (attributed)",
        year: 2012,
        note: '"Make the change easy (warning: this may be hard), then make the easy change." YAGNI is about the implementation, not the structure.',
      },
      {
        author: "Rich Hickey",
        work: "Simple Made Easy (talk)",
        year: 2011,
        note: "Distinguished simple (few concerns) from easy (familiar). A 'simple' start that entangles concerns isn't actually simple — it's just easy.",
      },
      {
        author: "Sandi Metz",
        work: "99 Bottles of OOP / Various talks",
        year: 2016,
        note: '"Duplication is far cheaper than the wrong abstraction." Supports delaying abstraction, but with the nuance that you need taste to know when.',
      },
      {
        author: "Martin Fowler",
        work: "Is Design Dead?",
        year: 2004,
        note: "Explored whether evolutionary design (XP's approach) actually works without upfront architecture. Concluded it requires design skill, not just restraint.",
      },
    ],
  },
  {
    id: "pair-programming",
    name: "Pair Programming",
    brief:
      "Two developers, one workstation. Driver/navigator model. Continuous real-time collaboration and review.",
    evaluators: {
      "team-formation": {
        0: {
          fit: "adapt",
          text: "You can pair in shared deep focus — powerful when both people are aligned. But it requires a compatible partner who matches your concentration depth, which is rare.",
        },
        1: {
          fit: "friction",
          text: "Pairing interrupts your deep work flow. You prefer to tunnel into problems alone, build something substantial, then sync via PRs and written communication.",
        },
        2: {
          fit: "natural",
          text: "You thrive in real-time collaboration with continuous shared context. Pairing energises rather than drains you.",
        },
        3: {
          fit: "adapt",
          text: "You're efficient and independent. Pairing works occasionally but isn't your preferred mode — you'd rather pick up tasks, complete them, and move on.",
        },
      },
      "process-fit-attentional": {
        0: {
          fit: "friction",
          text: "You self-structure deep concentration blocks. Another person introduces a second rhythm into your focus architecture — their context switches become your interruptions.",
        },
        1: {
          fit: "friction",
          text: "You need uninterrupted time within whatever structure is imposed. Pairing is a continuous interruption by design — the navigator role assumes you can context-switch freely.",
        },
        2: {
          fit: "natural",
          text: "You stay available while self-structuring. Pairing fits comfortably into your responsive workflow without disrupting it.",
        },
        3: {
          fit: "natural",
          text: "You thrive in externally-structured, collaborative environments. Pairing is a natural extension of how you already prefer to work.",
        },
      },
    },
    alternatives: [
      {
        name: "Mob / Ensemble Programming",
        desc: "Whole team, one screen. Rotates driver role. Removes the intensity of 1-on-1 pairing — more breathing room, broader perspectives.",
        relevant: ["team-formation-0"],
      },
      {
        name: "Design session → solo implementation",
        desc: "Collaborate synchronously on the approach, then implement independently. Gets alignment without sustained pairing.",
        relevant: ["team-formation-1", "process-fit-attentional-0"],
      },
      {
        name: "Async code review with rich context",
        desc: "Detailed PR descriptions, annotated diffs, recorded walkthroughs. The review benefits of pairing without the real-time coupling.",
        relevant: ["team-formation-1", "team-formation-3"],
      },
      {
        name: "Rubber-ducking (human or AI)",
        desc: "Explain your thinking out loud to surface assumptions. Gets the cognitive benefit of pairing without the scheduling and attention cost.",
        relevant: ["process-fit-attentional-0", "process-fit-attentional-1"],
      },
    ],
    sources: [
      {
        author: "Woody Zuill",
        work: "Mob Programming (various talks)",
        year: 2014,
        note: "Proposed whole-team collaboration as an alternative to pairing. The group dynamic reduces the intensity of 1-on-1 pairing.",
      },
      {
        author: "Dragan Stepanovic",
        work: "Async Code Review (various articles)",
        year: 2020,
        note: "Explored how rich async review can achieve pairing's knowledge-sharing benefits without requiring synchronous time.",
      },
      {
        author: "Martin Fowler",
        work: "On Pair Programming",
        year: 2020,
        note: "Acknowledged pairing isn't for everyone and works best when participation is voluntary, not mandated.",
      },
    ],
  },
  {
    id: "sprint-estimation",
    name: "Sprint Estimation / Story Points",
    brief:
      "Estimate work in story points before starting. Track velocity. Use estimates for sprint planning and forecasting.",
    evaluators: {
      "time-boxing-fit": {
        0: {
          fit: "adapt",
          text: "You value temporal pressure but want to set it yourself. Being asked to estimate for someone else's planning process feels like accountability theatre when you'd hold yourself accountable anyway.",
        },
        1: {
          fit: "friction",
          text: "You self-direct without time pressure. Estimation is a forecasting tool for people who need to know when things will be done — and your answer is 'when it's ready'.",
        },
        2: {
          fit: "natural",
          text: "You need structure and time pressure. Estimation gives you a framework for committing to delivery timelines, which you work well within.",
        },
        3: {
          fit: "adapt",
          text: "You need task structure but not time pressure. Estimation adds temporal anxiety that Kanban-style 'pull when ready' avoids.",
        },
      },
      "ambiguity-response": {
        0: {
          fit: "friction",
          text: "You can't estimate what you can't define. Estimation assumes decomposable work, but your analytical process needs well-specified inputs before decomposition can begin.",
        },
        1: {
          fit: "adapt",
          text: "You're good at finding hidden structure in vague problems, which makes estimation more tractable for you than most. But the precision implied by story points overstates your actual confidence.",
        },
        2: {
          fit: "friction",
          text: "You need the whole picture before you can size any part of it. Estimating individual stories before the gestalt has formed produces meaningless numbers.",
        },
        3: {
          fit: "natural",
          text: "You grasp rough shapes from incomplete information. 'About this big' is a natural mode of thought for you — story points just formalise it.",
        },
      },
    },
    alternatives: [
      {
        name: "#NoEstimates",
        desc: "Track cycle time instead of predicting duration. Use historical throughput for forecasting. Allen Holub and Woody Zuill's approach.",
        relevant: ["time-boxing-fit-1", "ambiguity-response-0"],
      },
      {
        name: "Shape Up: appetite-setting",
        desc: "Instead of 'how long will this take?', ask 'how much time are we willing to spend?' Fixed time, variable scope.",
        relevant: ["time-boxing-fit-0", "time-boxing-fit-1"],
      },
      {
        name: "Monte Carlo forecasting",
        desc: "Use historical data to generate probabilistic forecasts. 'There's an 85% chance we'll finish by X.' No per-item estimation needed.",
        relevant: ["ambiguity-response-0", "ambiguity-response-2"],
      },
      {
        name: "Thin-slice sizing",
        desc: "Instead of estimating complexity, just make everything small. If a story can't be done in 1-2 days, split it. No points required.",
        relevant: [],
      },
    ],
    sources: [
      {
        author: "Allen Holub",
        work: "#NoEstimates (various talks)",
        year: 2015,
        note: "Argued that estimation is waste — it consumes time, produces unreliable numbers, and creates false confidence in plans.",
      },
      {
        author: "Woody Zuill",
        work: "#NoEstimates (various)",
        year: 2015,
        note: "Practised and advocated for dropping estimation entirely in favour of limiting WIP and tracking actual throughput.",
      },
      {
        author: "Daniel Vacanti",
        work: "Actionable Agile Metrics for Predictability",
        year: 2015,
        note: "Demonstrated that cycle time and throughput data produce better forecasts than story point estimates.",
      },
      {
        author: "Ryan Singer",
        work: "Shape Up",
        year: 2019,
        note: "Replaced estimation with 'appetite' — teams don't estimate how long work takes, leadership decides how much time the work deserves.",
      },
    ],
  },
  {
    id: "daily-standups",
    name: "Daily Standups",
    brief:
      "Brief daily team sync. Share what you did, what you're doing, what's blocking you. Keep the team aligned.",
    evaluators: {
      "management-compatibility": {
        0: {
          fit: "adapt",
          text: "You already share progress proactively. Standups are redundant ceremony — you communicate this information without being prompted.",
        },
        1: {
          fit: "friction",
          text: "You self-direct and make context available when asked. Being required to broadcast daily disrupts your focus without adding information you wouldn't provide on request.",
        },
        2: {
          fit: "natural",
          text: "You follow reporting structures well. Standups give you a reliable framework for the regular communication you want to do anyway.",
        },
        3: {
          fit: "natural",
          text: "You benefit from regular check-ins. Standups provide structured accountability that helps maintain your momentum and visibility.",
        },
      },
      "communication-pattern": {
        0: {
          fit: "adapt",
          text: "You collaborate synchronously and share constantly. Standups are natural for you but may feel too brief — you'd rather have richer collaborative sessions.",
        },
        1: {
          fit: "adapt",
          text: "You collaborate with peers in real time but don't instinctively report upward. Standups force stakeholder-facing communication that doesn't match your natural pattern.",
        },
        2: {
          fit: "friction",
          text: "You share proactively but asynchronously. A written async standup format captures the same information without forcing you into a synchronous ceremony.",
        },
        3: {
          fit: "friction",
          text: "You work quietly and surface context on request. Standups force daily visibility you don't naturally provide — which may be useful discipline, but the format fights your instincts.",
        },
      },
    },
    alternatives: [
      {
        name: "Async standups (written / Slack bot)",
        desc: "Same information, written asynchronously. Respects deep work schedules and timezone differences.",
        relevant: [
          "communication-pattern-2",
          "management-compatibility-0",
          "management-compatibility-1",
        ],
      },
      {
        name: "Exception-based reporting",
        desc: "Only surface blockers and changes. If nothing is blocked and you're on track, silence is the update.",
        relevant: ["management-compatibility-0", "management-compatibility-1"],
      },
      {
        name: "Weekly team sync + written dailies",
        desc: "Rich weekly discussion, lightweight written updates between. Balances synchronous alignment with async focus time.",
        relevant: ["communication-pattern-2", "communication-pattern-3"],
      },
      {
        name: "Working agreements",
        desc: "Replace ceremonies with explicit team contracts about communication expectations. 'I'll post progress in #channel by end of day' rather than 'attend standup at 9am'.",
        relevant: ["management-compatibility-0"],
      },
    ],
    sources: [
      {
        author: "Jason Fried & DHH",
        work: "It Doesn't Have to Be Crazy at Work",
        year: 2018,
        note: "Argued against synchronous status meetings. Written communication respects everyone's time and creates a searchable record.",
      },
      {
        author: "Cal Newport",
        work: "Deep Work / A World Without Email",
        year: 2016,
        note: "Documented how scheduled interruptions (including standups) fragment deep work. Every synchronous obligation fractures the maker's day.",
      },
      {
        author: "Allen Holub",
        work: "Various talks on Agile dysfunction",
        year: 2020,
        note: "Argued standups had become status reports to management disguised as team coordination. The original intent was peer-to-peer, not bottom-up.",
      },
    ],
  },
  {
    id: "pr-code-review",
    name: "PR-Based Code Review",
    brief:
      "Work on branches. Submit pull requests. Asynchronous review with written feedback. Merge requires approval.",
    evaluators: {
      "team-formation": {
        0: {
          fit: "adapt",
          text: "You prefer deep synchronous collaboration. PR review's asynchronous nature can feel disconnected — you'd rather walk through code together, but PRs still work when pairing isn't available.",
        },
        1: {
          fit: "natural",
          text: "PRs are your natural workflow. Deep solo work, then async written review. The tunnel-and-sync pattern is exactly how you prefer to collaborate.",
        },
        2: {
          fit: "adapt",
          text: "You prefer real-time feedback. PRs work but feel slower than you'd like — you'd rather pair through the tricky bits and use PRs for the straightforward changes.",
        },
        3: {
          fit: "natural",
          text: "You're efficient with async workflows. Submit, review, merge — the lightweight written exchange suits your task-switching style.",
        },
      },
      "communication-pattern": {
        0: {
          fit: "adapt",
          text: "You share and discuss in real time. PRs as async artefacts feel too slow — you want to talk about the code, not write about it.",
        },
        1: {
          fit: "adapt",
          text: "You collaborate with peers synchronously but don't instinctively broadcast. PRs work for the peer review, though the formal approval process can feel bureaucratic.",
        },
        2: {
          fit: "natural",
          text: "You work independently and share written artefacts proactively. PRs with rich descriptions and annotations are perfectly aligned with how you communicate.",
        },
        3: {
          fit: "natural",
          text: "You work heads-down and respond when asked. Reviewing PRs on your own schedule matches your pull-based communication style.",
        },
      },
    },
    alternatives: [
      {
        name: "Ship / Show / Ask",
        desc: "Three tiers: ship directly (trivial), show after merging (FYI), or ask before merging (need review). Not everything needs a full PR cycle.",
        relevant: ["communication-pattern-0", "team-formation-2"],
      },
      {
        name: "Continuous review via pairing/mobbing",
        desc: "If you pair or mob, the code is reviewed as it's written. No separate review step needed.",
        relevant: ["team-formation-0", "team-formation-2"],
      },
      {
        name: "Stacked PRs / short-lived branches",
        desc: "Small, incremental PRs that build on each other. Reduces review burden and keeps branches short-lived.",
        relevant: [],
      },
      {
        name: "Trunk-based development with feature flags",
        desc: "Commit to main continuously, gate features behind flags. Eliminates long-lived branches and merge conflicts.",
        relevant: ["team-formation-2", "communication-pattern-0"],
      },
    ],
    sources: [
      {
        author: "Rouan Wilsenach",
        work: "Ship / Show / Ask",
        year: 2021,
        note: "Proposed a branching strategy where not every change needs the same level of review. Trust developers to classify their own changes.",
      },
      {
        author: "Google Engineering Practices",
        work: "Code Review Guidelines",
        year: 2019,
        note: "Recommended reviewing within a business day and keeping changes small. Acknowledged that review processes can become bottlenecks.",
      },
      {
        author: "Dave Farley & Jez Humble",
        work: "Continuous Delivery",
        year: 2010,
        note: "Advocated trunk-based development where code is integrated continuously, reducing the need for branch-based review.",
      },
    ],
  },
];

const FIT_META = {
  natural: {
    label: "Natural fit",
    color: "#4ade80",
    bg: "#4ade8012",
    border: "#4ade8030",
  },
  adapt: {
    label: "Adapt to fit",
    color: "#fbbf24",
    bg: "#fbbf2412",
    border: "#fbbf2430",
  },
  friction: {
    label: "Friction",
    color: "#f87171",
    bg: "#f8717112",
    border: "#f8717130",
  },
  awaiting: {
    label: "Awaiting compasses",
    color: "#777",
    bg: "rgba(255,255,255,0.02)",
    border: "rgba(255,255,255,0.06)",
  },
};

function evaluateMethod(method, cd) {
  const evals = [];
  Object.entries(method.evaluators).forEach(([cId, quads]) => {
    const d = cd[cId];
    if (d?.quadrant === null || d?.quadrant === undefined) return;
    const q = quads[d.quadrant];
    if (q)
      evals.push({
        compassId: cId,
        compass: COMPASSES.find((c) => c.id === cId),
        fit: q.fit,
        text: q.text,
        quadrant: d.quadrant,
      });
  });
  if (evals.length === 0)
    return {
      overall: "awaiting",
      evals,
      positioned: 0,
      total: Object.keys(method.evaluators).length,
    };
  const counts = { natural: 0, adapt: 0, friction: 0 };
  evals.forEach((e) => counts[e.fit]++);
  let overall = "adapt";
  if (counts.friction > counts.natural) overall = "friction";
  else if (counts.natural > counts.friction && counts.friction === 0)
    overall = "natural";
  else if (counts.natural > 0 && counts.friction > 0) overall = "adapt";
  return {
    overall,
    evals,
    positioned: evals.length,
    total: Object.keys(method.evaluators).length,
  };
}

function MethodCard({ method, cd }) {
  const [exp, setExp] = useState(false);
  const result = useMemo(() => evaluateMethod(method, cd), [method, cd]);
  const meta = FIT_META[result.overall];
  const hasData = result.overall !== "awaiting";
  const relevantAlts = method.alternatives.filter(
    (a) =>
      a.relevant.length === 0 ||
      a.relevant.some((r) => {
        const [cId, qStr] = [
          r.substring(0, r.lastIndexOf("-")),
          parseInt(r.substring(r.lastIndexOf("-") + 1)),
        ];
        return cd[cId]?.quadrant === qStr;
      }),
  );
  return (
    <FadeIn from="left">
      <div
        style={{
          background: exp ? "rgba(255,255,255,0.015)" : "transparent",
          borderRadius: "16px",
          transition: "background 0.4s ease",
          marginBottom: "8px",
        }}
      >
        <button
          onClick={() => setExp(!exp)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "20px 24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            outline: "none",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: meta.color,
              boxShadow: hasData ? `0 0 12px ${meta.color}44` : "none",
              flexShrink: 0,
              transition: "all 0.3s ease",
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(18px, 2.5vw, 24px)",
                color: exp ? meta.color : "#f0f0f0",
                transition: "color 0.3s ease",
              }}
            >
              {method.name}
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                color: "#777",
                marginTop: "2px",
              }}
            >
              {method.brief}
            </div>
          </div>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              padding: "3px 10px",
              borderRadius: "8px",
              background: meta.bg,
              color: meta.color,
              border: `1px solid ${meta.border}`,
              whiteSpace: "nowrap",
            }}
          >
            {meta.label}
          </span>
          <div
            style={{
              color: "#777",
              fontSize: "18px",
              transition: "transform 0.3s ease",
              transform: exp ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            +
          </div>
        </button>
        {exp && (
          <div
            style={{ padding: "0 24px 24px", animation: "fadeIn 0.4s ease" }}
          >
            {!hasData && (
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  color: "#666",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
              >
                Position the relevant compasses in Part 1 to see your
                relationship to this methodology. Relevant compasses:{" "}
                {Object.keys(method.evaluators)
                  .map((id) => COMPASSES.find((c) => c.id === id)?.title)
                  .filter(Boolean)
                  .join(", ")}
                .
              </div>
            )}
            {hasData && (
              <>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    color: "#777",
                    marginBottom: "16px",
                  }}
                >
                  {result.positioned} / {result.total} relevant compasses
                  positioned
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginBottom: "24px",
                  }}
                >
                  {result.evals.map((ev, i) => (
                    <div
                      key={i}
                      style={{
                        borderLeft: `2px solid ${ev.compass.accent}`,
                        paddingLeft: "14px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                          color: ev.compass.accent,
                          marginBottom: "4px",
                        }}
                      >
                        {ev.compass.title} —{" "}
                        <span style={{ color: FIT_META[ev.fit].color }}>
                          {FIT_META[ev.fit].label}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "12px",
                          color: "#bbb",
                          lineHeight: 1.7,
                        }}
                      >
                        {ev.text}
                      </div>
                    </div>
                  ))}
                </div>
                {relevantAlts.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        color: "#999",
                        marginBottom: "12px",
                      }}
                    >
                      Alternatives that fit your profile
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {relevantAlts.map((alt, i) => (
                        <div
                          key={i}
                          style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "8px",
                            padding: "12px 16px",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "12px",
                              color: "#ddd",
                              marginBottom: "4px",
                            }}
                          >
                            {alt.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "11px",
                              color: "#999",
                              lineHeight: 1.6,
                            }}
                          >
                            {alt.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <div>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  color: "#999",
                  marginBottom: "12px",
                }}
              >
                Supporting voices
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {method.sources.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "11px",
                      color: "#888",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "#bbb" }}>{src.author}</span> —{" "}
                    <span style={{ fontStyle: "italic" }}>{src.work}</span> (
                    {src.year}). {src.note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

function MethodologyRelationsSection({ cd }) {
  const anyPositioned = COMPASSES.some(
    (c) => cd[c.id]?.quadrant !== null && cd[c.id]?.quadrant !== undefined,
  );
  return (
    <section
      style={{
        paddingTop: "80px",
        paddingBottom: "80px",
        background: "rgba(255,255,255,0.015)",
        borderRadius: "16px",
        marginLeft: "-24px",
        marginRight: "-24px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <FadeIn>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            color: "#555",
            marginBottom: "8px",
          }}
        >
          Part 2
        </div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(28px, 4vw, 42px)",
            color: "#f0f0f0",
            marginBottom: "12px",
          }}
        >
          Methodology Relations
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "12px",
            color: "#999",
            lineHeight: 1.7,
            marginBottom: "40px",
            maxWidth: "660px",
          }}
        >
          {anyPositioned
            ? "How your cognitive profile relates to commonly-promoted development methodologies. Each assessment is computed live from your compass positions — with alternatives and supporting voices from experienced practitioners who've made the same arguments."
            : "Position compasses in Part 1 to see how your cognitive profile relates to established development methodologies."}
        </div>
      </FadeIn>
      {ESTABLISHED_METHODS.map((m, i) => (
        <MethodCard key={m.id} method={m} cd={cd} delay={i * 0.06} />
      ))}
    </section>
  );
}
// Main
export default function DeveloperCognitionProfile() {
  const [cd, setCd] = useState(() => {
    const i = {};
    COMPASSES.forEach((c) => {
      i[c.id] = { quadrant: null, intensity: 0, notes: "" };
    });
    return i;
  });
  const [gd, setGd] = useState({ developing: "", questions: "" });
  const [refs, setRefs] = useState("");
  const [heroVis, setHeroVis] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setHeroVis(true);
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const onChange = useCallback((id, data) => {
    setCd((prev) => ({ ...prev, [id]: { ...prev[id], ...data } }));
  }, []);
  const count = COMPASSES.filter(
    (c) => cd[c.id]?.quadrant !== null && cd[c.id]?.quadrant !== undefined,
  ).length;

  const doExport = () => {
    const p = {
      exportedAt: new Date().toISOString(),
      version: "0.3",
      compasses: {},
      growth: gd,
      references: refs,
    };
    COMPASSES.forEach((c) => {
      const d = cd[c.id];
      if (d.quadrant !== null && d.quadrant !== undefined)
        p.compasses[c.id] = {
          title: c.title,
          tier: c.tier,
          quadrant: c.quads[d.quadrant].label,
          intensity: ["centre", "moderate", "strong"][d.intensity],
          notes: d.notes || "",
        };
    });
    const b = new Blob([JSON.stringify(p, null, 2)], {
      type: "application/json",
    });
    const u = URL.createObjectURL(b);
    const a = document.createElement("a");
    a.href = u;
    a.download = "developer-cognition-profile.json";
    a.click();
    URL.revokeObjectURL(u);
  };

  const doImport = () => {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = ".json";
    inp.onchange = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = (ev) => {
        try {
          const p = JSON.parse(ev.target.result);
          if (p.growth) setGd(p.growth);
          if (p.references) setRefs(p.references);
          if (p.compasses) {
            const nd = { ...cd };
            Object.entries(p.compasses).forEach(([id, s]) => {
              const c = COMPASSES.find((x) => x.id === id);
              if (!c) return;
              const qi = c.quads.findIndex((q) => q.label === s.quadrant);
              const ii = ["centre", "moderate", "strong"].indexOf(s.intensity);
              nd[id] = {
                quadrant: qi >= 0 ? qi : null,
                intensity: ii >= 0 ? ii : 0,
                notes: s.notes || "",
              };
            });
            setCd(nd);
          }
        } catch (err) {
          console.error("Import failed:", err);
        }
      };
      r.readAsText(f);
    };
    inp.click();
  };

  const t12 = COMPASSES.filter((c) => c.tier <= 2),
    t3 = COMPASSES.filter((c) => c.tier === 3);

  return (
    <div
      style={{
        background: "#0a0a0b",
        color: "#f0f0f0",
        minHeight: "100vh",
        fontFamily: "var(--mono)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Space+Mono:wght@400;700&display=swap');
        :root { --serif: 'Instrument Serif', serif; --mono: 'Space Mono', monospace; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        * { box-sizing: border-box; } ::placeholder { color: #555; }
        textarea:focus { border-color: rgba(255,255,255,0.2) !important; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(91,141,239,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            opacity: heroVis ? 1 : 0,
            transition: "opacity 1.2s ease 0.3s",
            transform: `translateY(${scrollY * -0.1}px)`,
            fontFamily: "var(--mono)",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            color: "#777",
            marginBottom: "16px",
          }}
        >
          A cognitive framework for software practice
        </div>
        <div
          style={{
            opacity: heroVis ? 1 : 0,
            transition: "opacity 1.2s ease 0.6s",
            transform: `translateY(${scrollY * -0.15}px)`,
            fontFamily: "var(--serif)",
            fontSize: "clamp(36px, 7vw, 72px)",
            color: "#f0f0f0",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Developer Cognition Profile
        </div>
        <div
          style={{
            opacity: heroVis ? 1 : 0,
            transition: "opacity 1.2s ease 0.9s",
            transform: `translateY(${scrollY * -0.05}px)`,
            fontFamily: "var(--mono)",
            fontSize: "11px",
            color: "#777",
            marginTop: "20px",
            letterSpacing: "1px",
          }}
        >
          {count} / {COMPASSES.length} compasses positioned
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontFamily: "var(--mono)",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            color: "#777",
            animation: "pulse 3s ease infinite",
          }}
        >
          Scroll to begin
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        <FadeIn>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              padding: "24px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              marginBottom: "40px",
              position: "sticky",
              top: 0,
              zIndex: 10,
              background:
                "linear-gradient(to bottom, #0a0a0b 80%, transparent)",
            }}
          >
            <button
              onClick={doImport}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "3px",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "transparent",
                color: "#999",
              }}
            >
              Import
            </button>
            <button
              onClick={doExport}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "3px",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                border: "1px solid rgba(91,141,239,0.4)",
                background: "rgba(91,141,239,0.08)",
                color: "#5b8def",
              }}
            >
              Export JSON
            </button>
          </div>
        </FadeIn>

        <section style={{ paddingBottom: "80px" }}>
          <FadeIn>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "4px",
                color: "#555",
                marginBottom: "8px",
              }}
            >
              Part 1
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#f0f0f0",
                marginBottom: "12px",
              }}
            >
              Compasses
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "#999",
                lineHeight: 1.7,
                marginBottom: "40px",
                maxWidth: "600px",
              }}
            >
              Position yourself on each compass by considering both axes
              together. Crosshatched quadrants would contradict a position
              you've already established elsewhere.
            </div>
          </FadeIn>
          {t12.map((c, i) => (
            <CompassCard
              key={c.id}
              compass={c}
              data={cd[c.id]}
              onChange={onChange}
              index={i}
              cd={cd}
            />
          ))}
        </section>

        <MethodologyRelationsSection cd={cd} />

        <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <FadeIn>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "4px",
                color: "#555",
                marginBottom: "8px",
              }}
            >
              Part 3
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#f0f0f0",
                marginBottom: "12px",
              }}
            >
              Cognitive Foundations
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "#999",
                lineHeight: 1.7,
                marginBottom: "40px",
                maxWidth: "600px",
              }}
            >
              Deeper patterns that contextualise everything above. They don't
              map to specific practices — they explain why you arrived at your
              positions.
            </div>
          </FadeIn>
          {t3.map((c, i) => (
            <CompassCard
              key={c.id}
              compass={c}
              data={cd[c.id]}
              onChange={onChange}
              index={i}
              cd={cd}
            />
          ))}
        </section>

        <section
          style={{
            paddingTop: "80px",
            paddingBottom: "80px",
            background: "rgba(255,255,255,0.015)",
            borderRadius: "16px",
            marginLeft: "-24px",
            marginRight: "-24px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <FadeIn>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "4px",
                color: "#555",
                marginBottom: "8px",
              }}
            >
              Part 4
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#f0f0f0",
                marginBottom: "12px",
              }}
            >
              Growth Edges
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "#999",
                lineHeight: 1.7,
                marginBottom: "40px",
                maxWidth: "600px",
              }}
            >
              Frame these honestly — as areas of genuine development, not
              weaknesses repackaged as strengths.
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  color: "#f0f0f0",
                  marginBottom: "8px",
                }}
              >
                Currently developing
              </div>
              <textarea
                value={gd.developing}
                onChange={(e) =>
                  setGd((p) => ({ ...p, developing: e.target.value }))
                }
                placeholder="2-3 areas where you're building competence..."
                style={{
                  width: "100%",
                  minHeight: "140px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "14px",
                  color: "#bbb",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  lineHeight: 1.7,
                  resize: "vertical",
                  outline: "none",
                }}
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  color: "#f0f0f0",
                  marginBottom: "8px",
                }}
              >
                Open questions
              </div>
              <textarea
                value={gd.questions}
                onChange={(e) =>
                  setGd((p) => ({ ...p, questions: e.target.value }))
                }
                placeholder="What are you genuinely unsure about? What would change your mind?"
                style={{
                  width: "100%",
                  minHeight: "140px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "14px",
                  color: "#bbb",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  lineHeight: 1.7,
                  resize: "vertical",
                  outline: "none",
                }}
              />
            </div>
          </FadeIn>
        </section>

        <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <FadeIn>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "4px",
                color: "#555",
                marginBottom: "8px",
              }}
            >
              Part 5
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#f0f0f0",
                marginBottom: "12px",
              }}
            >
              Reference Library
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "#999",
                lineHeight: 1.7,
                marginBottom: "40px",
                maxWidth: "600px",
              }}
            >
              The talks, essays, and books that inform your positions.
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <textarea
              value={refs}
              onChange={(e) => setRefs(e.target.value)}
              placeholder="Your reference library..."
              style={{
                width: "100%",
                minHeight: "200px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                padding: "14px",
                color: "#bbb",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                lineHeight: 1.7,
                resize: "vertical",
                outline: "none",
              }}
            />
          </FadeIn>
        </section>

        <div
          style={{
            padding: "40px 0 80px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "4px",
              color: "#555",
              marginBottom: "12px",
            }}
          >
            Developer Cognition Profile v0.3
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              color: "#555",
            }}
          >
            Originated by Jason Warren & Claude, February 2026
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "10px",
              color: "#555",
              fontStyle: "italic",
              marginTop: "8px",
            }}
          >
            A profile that never changes probably isn't being honest.
          </div>
        </div>
      </div>
    </div>
  );
}
