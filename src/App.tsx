import { useEffect, useState } from "react";

const CAL = "https://cal.com/angel-delerme-tnr1ag/15min?embed=true&layout=month_view&theme=light";
const DEMO = "https://ig.me/m/atlasbiznow?text=SMILE";

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

export default function App() {
  const [playing, setPlaying] = useState(false);

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

      {/* TEST DRIVE */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="testdrive reveal">
            <span className="eyebrow">Live Test Drive</span>
            <h2 className="h2" style={{ marginTop: 20 }}>
              📱 Test Drive the System Right Now on Your Phone
            </h2>
            <ol className="steps">
              <li><b>1</b><span>Tap the demo link below to open a direct message to our Instagram.</span></li>
              <li><b>2</b><span>Send the word <code>SMILE</code>.</span></li>
              <li><b>3</b><span>Check your Instagram DMs within 10 seconds to see your private voucher delivered live.</span></li>
            </ol>
            <a className="btn" href={DEMO} target="_blank" rel="noopener">
              🚀 Open Live Demo &amp; Send ‘SMILE’ <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

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
