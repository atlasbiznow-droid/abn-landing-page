import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

const CAL = "https://cal.com/angel-delerme-tnr1ag/15min?embed=true&layout=month_view&theme=light";

const STEPS = [
  {
    n: "01",
    title: "1-Click Monthly Social Posting",
    body: "We produce your 12–16 high-impact dental videos and before/after graphics. You review once a month in your inbox and tap Approve. We handle the rest.",
  },
  {
    n: "02",
    title: "Instant Comment-to-DM Intercept",
    body: "When a patient comments “SMILE” or asks about pricing, our engine sends a personalized private DM with a special voucher within 15 seconds.",
  },
  {
    n: "03",
    title: "Direct Calendar Booking",
    body: "Patients click their private voucher link, choose an open chair time on your schedule, and your front desk receives an instant new-patient alert.",
  },
];

function RevenueLeakCalculator() {
  const [caseValue, setCaseValue] = useState(1200);
  const [missedInquiries, setMissedInquiries] = useState(15);

  // ADA / PatientPrism benchmarks: 87% of callers hang up on voicemail;
  // conservative 20% of those would have become booked patients.
  const monthlyLeak = Math.round(missedInquiries * 0.87 * 0.2 * caseValue * 4.33);
  const annualLeak = monthlyLeak * 12;

  return (
    <div className="calc-card reveal">
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span className="calc-eyebrow">Interactive Practice Diagnostic</span>
        <h3 className="calc-title">Calculate Your After-Hours Revenue Leak</h3>
        <p className="calc-sub" style={{ marginTop: 8, color: "var(--accent)", fontWeight: 700 }}>
          ⇆ Drag the two sliders below to match your practice — your estimate updates instantly.
        </p>
        <p className="calc-sub">Based on ADA benchmarks: 87% of dental callers hang up on voicemail.</p>
      </div>

      <div className="calc-drag-hint" aria-hidden="true">
        <span className="calc-drag-track"><span className="calc-drag-knob" /></span>
        Drag to adjust
      </div>

      <div className="calc-row">
        <div className="lbl">
          <span>Avg. new-patient treatment value:</span>
          <strong>${caseValue.toLocaleString()}</strong>
        </div>
        <input type="range" min="500" max="3000" step="100" value={caseValue} onChange={(e) => setCaseValue(Number(e.target.value))} aria-label="Average treatment value" />
      </div>

      <div className="calc-row">
        <div className="lbl">
          <span>After-hours / unanswered inquiries per week:</span>
          <strong>{missedInquiries} inquiries</strong>
        </div>
        <input type="range" min="5" max="35" step="1" value={missedInquiries} onChange={(e) => setMissedInquiries(Number(e.target.value))} aria-label="Missed inquiries per week" />
      </div>

      <div className="calc-result">
        <div className="kick">Estimated practice revenue bleed</div>
        <div className="amount">
          -${monthlyLeak.toLocaleString()} <span>/ month</span>
        </div>
        <div className="year">(-${annualLeak.toLocaleString()} / year walking out to competing clinics)</div>
        <div className="cue">👇 <strong>Watch the 45-second video below</strong> to see how the 3-step capture system plugs this leak.</div>
      </div>
    </div>
  );
}


const SPEED_TO_LEAD_API =
  import.meta.env.VITE_SPEED_TO_LEAD_API ||
  "https://solving-folk-colours-celtic.trycloudflare.com/api/webhook/speed-to-lead";
const FALLBACK_PHONE = "+19525928527";
const FALLBACK_PHONE_DISPLAY = "(952) 592-8527";

const RATE_KEY = "abn_speed_to_lead_attempts";
const COOLDOWN_MS = 60_000;
const HOUR_MS = 3_600_000;
const MAX_PER_HOUR = 3;
const DIAL_SECONDS = 15;

type Stage = "idle" | "sending" | "dialing" | "done" | "error";

function readAttempts(): number[] {
  try {
    const raw = window.localStorage.getItem(RATE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((n): n is number => typeof n === "number") : [];
  } catch {
    return [];
  }
}

function writeAttempts(list: number[]) {
  try {
    window.localStorage.setItem(RATE_KEY, JSON.stringify(list.slice(-20)));
  } catch {
    /* storage unavailable; server-side limits still apply */
  }
}

function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

function displayPhone(e164: string): string {
  const d = e164.replace(/\D/g, "").replace(/^1/, "");
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function SpeedToLead() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(DIAL_SECONDS);
  const [dialTo, setDialTo] = useState("");
  const deadline = useRef(0);

  useEffect(() => {
    if (stage !== "dialing") return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setSeconds(left);
      if (left === 0) setStage("done");
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [stage]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stage === "sending" || stage === "dialing") return;

    const cleanName = name.trim();
    const e164 = normalizePhone(phone);
    if (cleanName.length < 2) {
      setError("Enter your first name.");
      return;
    }
    if (!e164) {
      setError("Enter a 10-digit US mobile number.");
      return;
    }

    const now = Date.now();
    const attempts = readAttempts().filter((t) => now - t < HOUR_MS);
    const last = attempts[attempts.length - 1] ?? 0;
    if (last && now - last < COOLDOWN_MS) {
      setError(`Please wait ${Math.ceil((COOLDOWN_MS - (now - last)) / 1000)}s before trying again.`);
      return;
    }
    if (attempts.length >= MAX_PER_HOUR) {
      setError("Demo limit reached for this hour. Call us instead.");
      return;
    }

    setError("");
    setStage("sending");
    try {
      const response = await fetch(SPEED_TO_LEAD_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: "abn_internal",
          lead_name: cleanName,
          lead_phone: e164,
          service_requested: "Speed-to-lead demo",
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      writeAttempts([...attempts, now]);
      setDialTo(displayPhone(e164));
      deadline.current = Date.now() + DIAL_SECONDS * 1000;
      setSeconds(DIAL_SECONDS);
      setStage("dialing");
    } catch {
      setStage("error");
      setError("We couldn't start the call. Try once more, or call us directly.");
    }
  };

  const busy = stage === "sending" || stage === "dialing";

  return (
    <section className="s2l" id="speed-to-lead" aria-labelledby="s2l-title">
      <div className="s2l-wrap">
        <div className="s2l-card">
          <div className="s2l-copy">
            <h2 className="s2l-title" id="s2l-title">
              Hear Annie call your phone.
            </h2>
            <p className="s2l-sub">
              Enter your name and mobile number. Annie dials within 15 seconds and asks two
              quick questions.
            </p>
            <p className="s2l-fine">
              One demo call per number. Standard call rates may apply.
            </p>
          </div>

          <div className="s2l-panel">
            <form className="s2l-form" onSubmit={handleSubmit} noValidate>
              <label className="s2l-field">
                <span>Name</span>
                <input
                  className="s2l-input"
                  name="name"
                  autoComplete="given-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={busy}
                  required
                />
              </label>
              <label className="s2l-field">
                <span>Mobile number</span>
                <input
                  className="s2l-input"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  disabled={busy}
                  required
                />
              </label>
              <button className="s2l-btn" type="submit" disabled={busy}>
                {stage === "sending" ? "Starting call…" : "Call my phone"}
              </button>
            </form>

            {stage === "dialing" && (
              <div className="s2l-status" aria-live="polite">
                <p className="s2l-status-line">
                  Dialing <strong>{dialTo}</strong>
                </p>
                <p className="s2l-count">
                  {seconds}
                  <span>s</span>
                </p>
                <div className="s2l-track" aria-hidden="true">
                  <span
                    className="s2l-fill"
                    style={{ transform: `scaleX(${Math.max(seconds, 0) / DIAL_SECONDS})` }}
                  />
                </div>
                <p className="s2l-note">Keep your phone close. Annie will introduce herself.</p>
              </div>
            )}

            {stage === "done" && (
              <div className="s2l-status" aria-live="polite">
                <p className="s2l-status-line">
                  <strong>{dialTo}</strong> should be ringing now.
                </p>
                <p className="s2l-note">
                  Nothing yet? Call{" "}
                  <a href={`tel:${FALLBACK_PHONE}`}>{FALLBACK_PHONE_DISPLAY}</a>.
                </p>
              </div>
            )}

            {error && (
              <p className="s2l-error" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [simState, setSimState] = useState<"idle" | "typing" | "delivered">("idle");

  const handleTriggerSim = () => {
    setSimState("typing");
    setTimeout(() => {
      setSimState("delivered");
    }, 700);
  };

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">[ 24/7 Patient Acquisition Pipeline ]</span>
          <h1 className="display" style={{ marginTop: 26 }}>
            How Dental Practices Turn Instagram &amp; Facebook Comments into{" "}
            <em>Booked Patients</em> in 60 Seconds on Autopilot.
          </h1>
          <p className="lede lead-center" style={{ marginTop: 22 }}>
            Every time you post, interested patients ask questions in your comments
            and DMs. Stop letting prospective cases sit unanswered. Our system
            delivers private consultation vouchers in 15 seconds and books them
            straight into your calendar.
          </p>

          <RevenueLeakCalculator />

          <div className="video-card">
            <div className="video-frame">
              {playing ? (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/WVsBW6eQobY?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                  title="How Local Practices Stay Visible & Booked 24/7 | AtlasBizNow"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button className="play" type="button" aria-label="Play video" onClick={() => setPlaying(true)}>
                  <img src="https://i.ytimg.com/vi/WVsBW6eQobY/maxresdefault.jpg" alt="" />
                  <span className="puck">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </button>
              )}
            </div>
          </div>

          <div style={{ marginTop: 34, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <a className="btn" href={CAL} target="_blank" rel="noopener">
              Claim Your Practice Territory <span className="arrow">→</span>
            </a>
            <span style={{ color: "var(--muted)", fontSize: ".86rem" }}>
              One dental practice per zone · Month-to-month
            </span>
          </div>

          <div style={{ marginTop: 22, textAlign: "center" }}>
            <a
              className="concierge-link"
              href="https://atlasbiznow.com/free-consultation/"
              target="_blank"
              rel="noopener"
            >
              <span className="concierge-icon" aria-hidden="true">💬</span>
              <span>
                Want to see what your live web concierge and phone booking agent would look like
                right now? Tap the chat bubble or call the direct number on atlasbiznow.com
              </span>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3 STEPS */}
      <section className="section">
        <div className="wrap">
          <div className="reveal" style={{ textAlign: "center" }}>
            <span className="eyebrow">The 3-Step Social-to-Chair System</span>
            <h2 className="h2" style={{ marginTop: 22 }}>
              From a comment to a booked chair — without you touching a thing.
            </h2>
          </div>
          <div className="grid-3">
            {STEPS.map((s, i) => (
              <article key={s.n} className="card reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TEST DRIVE (LIVE INTERACTIVE SIMULATION) */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="testdrive reveal">
            <span className="eyebrow">Interactive Live Test Drive</span>
            <h2 className="h2" style={{ marginTop: 20 }}>
              📱 Experience the 15-Second Patient Capture Live
            </h2>
            <p className="lede lead-center" style={{ marginTop: 12, fontSize: "1.02rem" }}>
              See exactly how an after-hours commenter on your Instagram or Facebook gets qualified, receives their private voucher, and books directly into your schedule.
            </p>

            {/* SIMULATOR CARD */}
            <div className="sim-container">
              <div className="sim-header">
                <div className="sim-avatar">🦷</div>
                <div className="sim-practice-info">
                  <div className="sim-practice-name">
                    Your Dental Practice
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#1D4ED8">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="sim-status">
                    <span className="sim-status-dot"></span>
                    24/7 Automated Concierge Active
                  </div>
                </div>
              </div>

              <div className="sim-body">
                {simState === "idle" && (
                  <div className="sim-prompt">
                    <p style={{ margin: "0 0 10px", fontWeight: 600, color: "var(--text)" }}>
                      Simulate a prospective patient commenting or DMing "SMILE":
                    </p>
                    <p style={{ margin: 0, fontSize: "0.85rem" }}>
                      Tap the button below to see the instant 15-second response and calendar booking flow.
                    </p>
                  </div>
                )}

                {(simState === "typing" || simState === "delivered") && (
                  <div className="sim-bubble-patient">
                    SMILE
                  </div>
                )}

                {simState === "typing" && (
                  <div className="sim-typing">
                    <span className="sim-dot"></span>
                    <span className="sim-dot"></span>
                    <span className="sim-dot"></span>
                  </div>
                )}

                {simState === "delivered" && (
                  <div className="sim-bubble-practice">
                    <p style={{ margin: "0 0 8px" }}>
                      👋 <strong>Thanks for reaching out!</strong> Here is your private New Patient Consultation &amp; Full Exam Voucher:
                    </p>
                    <div className="sim-voucher-card">
                      <div className="sim-voucher-title">🏷️ $50 Off Consultation &amp; Exam</div>
                      <div className="sim-voucher-desc">
                        Reserved for New Patients · Expiring in 48 Hours
                      </div>
                      <a
                        className="sim-voucher-btn"
                        href={CAL}
                        target="_blank"
                        rel="noopener"
                      >
                        🗓️ Pick Open Chair Time Now →
                      </a>
                    </div>
                    <p style={{ margin: "10px 0 0", fontSize: "0.78rem", color: "var(--muted)" }}>
                      ⚡ Delivered in 12 seconds automatically · No staff required
                    </p>
                  </div>
                )}
              </div>

              <div className="sim-controls">
                {simState === "idle" && (
                  <button
                    type="button"
                    className="sim-btn-trigger"
                    onClick={handleTriggerSim}
                  >
                    ⚡ Tap to Test: Send “SMILE” →
                  </button>
                )}

                {simState === "typing" && (
                  <button type="button" className="sim-btn-trigger" disabled style={{ opacity: 0.7 }}>
                    Delivering Private Voucher...
                  </button>
                )}

                {simState === "delivered" && (
                  <>
                    <a
                      className="sim-btn-trigger"
                      href={CAL}
                      target="_blank"
                      rel="noopener"
                    >
                      🚀 Claim Your Practice Territory &amp; Book Demo →
                    </a>
                    <button
                      type="button"
                      className="sim-btn-reset"
                      onClick={() => setSimState("idle")}
                    >
                      ↻ Reset Simulation
                    </button>
                  </>
                )}
              </div>
            </div>

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <span style={{ color: "var(--muted)", fontSize: ".86rem" }}>
                💡 In live deployment, this runs seamlessly inside your practice's real Instagram &amp; Facebook accounts.
              </span>
            </div>
          </div>
        </div>
      </section>

      <SpeedToLead />

      {/* FINAL CTA */}
      <section className="section final">
        <div className="wrap">
          <div className="reveal">
            <h2 className="display" style={{ marginBottom: 20 }}>
              Ready to Put Your Patient Acquisition on Autopilot?
            </h2>
            <p className="lede lead-center">
              We only partner with ONE dental practice per geographic zone to ensure
              complete patient exclusivity.
            </p>
            <div style={{ marginTop: 32 }}>
              <a className="btn" href={CAL} target="_blank" rel="noopener">
                Claim Your Practice Territory &amp; Schedule Demo <span className="arrow">→</span>
              </a>
            </div>
            <p className="micro">
              <span>30-Day Performance Guarantee</span> • Month-to-Month • Zero Technical Headaches.
            </p>
          </div>
        </div>
      </section>

      <footer className="foot">
        © {new Date().getFullYear()} AtlasBizNow · Patient acquisition infrastructure for dental practices.
      </footer>
    </div>
  );
}
