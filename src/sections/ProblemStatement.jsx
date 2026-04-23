/* "The Problem" — dashboards are a bottleneck; Advaita answers with chatbots */

import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [threshold])

  return [ref, inView]
}

/* ───────────────────────── Old-way preview: cluttered dashboard ───────────────────────── */
function DashboardClutterPreview() {
  return (
    <div className="ps-viz ps-viz-old">
      {/* Fake dashboard toolbar */}
      <div className="ps-dash-bar">
        <span className="ps-dot" style={{ background: '#E24B4A' }} />
        <span className="ps-dot" style={{ background: '#F5D000' }} />
        <span className="ps-dot" style={{ background: '#1A7A2E' }} />
        <span className="ps-dash-title">analytics · dashboard · v.2.14</span>
      </div>

      {/* Tiny chart grid that feels dense + overwhelming */}
      <div className="ps-dash-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="ps-mini-card">
            <div className="ps-mini-label">
              metric_{String(i + 1).padStart(2, '0')}
            </div>
            <svg viewBox="0 0 60 24" preserveAspectRatio="none" className="ps-mini-spark">
              <path
                d={
                  [
                    'M0 18 L10 14 L20 16 L30 8 L40 12 L50 6 L60 10',
                    'M0 10 L10 12 L20 8 L30 14 L40 10 L50 14 L60 8',
                    'M0 16 L10 10 L20 12 L30 6 L40 10 L50 4 L60 8',
                    'M0 14 L10 16 L20 10 L30 12 L40 6 L50 10 L60 8',
                    'M0 8 L10 12 L20 6 L30 10 L40 14 L50 10 L60 12',
                    'M0 12 L10 8 L20 14 L30 10 L40 6 L50 12 L60 8',
                  ][i]
                }
                fill="none"
                stroke="#6b6b6b"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <div className="ps-mini-val">
              {['12.4k', '78%', '1.2M', '0.04', '3.1s', '92%'][i]}
            </div>
          </div>
        ))}
      </div>

      {/* SQL snippet bar */}
      <div className="ps-sql">
        <span style={{ color: '#8A74E5' }}>SELECT</span>{' '}
        <span style={{ color: '#6b6b6b' }}>user_id, COUNT(*)</span>{' '}
        <span style={{ color: '#8A74E5' }}>FROM</span>{' '}
        <span style={{ color: '#6b6b6b' }}>events WHERE ...</span>
      </div>

      {/* Overlay — the real point */}
      <div className="ps-overlay ps-overlay-old" aria-hidden="true">
        <div className="ps-overlay-card">
          <span className="ps-overlay-chip">Bottleneck</span>
          <div className="ps-overlay-text">
            Only <strong>technical analysts</strong> can read this.
          </div>
          <div className="ps-overlay-sub">
            Everyone else files a ticket and waits days.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── New-way preview: DS/UR chatbots answering ───────────────────────── */
function ChatbotPreview() {
  const [ref, inView] = useInView(0.25)
  const [stage, setStage] = useState(0)
  // 0: empty → 1: DS typing → 2: DS answer → 3: UR typing → 4: UR answer

  useEffect(() => {
    if (!inView) return
    const timers = []
    timers.push(setTimeout(() => setStage(1), 300))
    timers.push(setTimeout(() => setStage(2), 1400))
    timers.push(setTimeout(() => setStage(3), 2400))
    timers.push(setTimeout(() => setStage(4), 3400))
    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <div className="ps-viz ps-viz-new" ref={ref}>
      {/* User question bubble */}
      <div className="ps-chat-row ps-chat-user">
        <div className="ps-bubble ps-bubble-user">
          Why did retention drop among iOS users last week?
        </div>
        <div className="ps-avatar ps-avatar-user">You</div>
      </div>

      {/* DS Bot */}
      <div className={`ps-chat-row ps-chat-bot ${stage >= 1 ? 'is-visible' : ''}`}>
        <div className="ps-avatar ps-avatar-ds">DS</div>
        <div className="ps-bubble ps-bubble-ds">
          {stage === 1 ? (
            <span className="ps-typing">
              <span /><span /><span />
            </span>
          ) : stage >= 2 ? (
            <>
              <div className="ps-bubble-tag">Data Science · analyzing 12 cohorts</div>
              <div>
                iOS <strong>17.3</strong> users dropped <strong style={{ color: '#E24B4A' }}>−18%</strong> in
                D7 retention. Correlated with a Safari cookie-policy regression that broke session continuity.
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* UR Bot */}
      <div className={`ps-chat-row ps-chat-bot ${stage >= 3 ? 'is-visible' : ''}`}>
        <div className="ps-avatar ps-avatar-ur">UR</div>
        <div className="ps-bubble ps-bubble-ur">
          {stage === 3 ? (
            <span className="ps-typing">
              <span /><span /><span />
            </span>
          ) : stage >= 4 ? (
            <>
              <div className="ps-bubble-tag">User Research · 38 session replays</div>
              <div>
                Affected users abandoned at the <strong>login step</strong> after repeated re-auth prompts.
                Fix the session cookie SameSite policy to restore retention.
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Footer hint */}
      <div className="ps-chat-foot">
        <span className="ps-live-dot" />
        <span>Real-time answer · background analysis in seconds</span>
      </div>
    </div>
  )
}

/* ───────────────────────── Section ───────────────────────── */
export function ProblemStatement() {
  const [ref, inView] = useInView(0.15)

  return (
    <section
      id="problem"
      className="lp-grid-bg"
      style={{ background: 'var(--adv-bg)', padding: '96px 0' }}
    >
      <div className="lp-wrap-wide" ref={ref}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 72px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: '#fff',
              border: '1px solid var(--adv-border)',
              color: '#111',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              borderRadius: 2,
              marginBottom: 18,
            }}
          >
            The Problem
          </span>
          <h2
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.028em',
              color: '#111',
              margin: '0 0 14px',
            }}
          >
            Dashboards are a{' '}
            <span style={{ color: '#F47B20' }}>bottleneck</span>,
            not an answer.
          </h2>
          <p
            style={{
              fontSize: '1.02rem',
              color: '#6b6b6b',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Engineers and brands rely on dashboards to understand user behavior — but dashboards only
            speak the language of a handful of technical analysts. Every question becomes a ticket,
            every answer takes days, and most of the team is left guessing.
          </p>
        </div>

        {/* Split — Old way vs Advaita way */}
        <div className="ps-split">
          {/* OLD WAY */}
          <div
            className="ps-col ps-col-old"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-60px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,0.61,0.36,1), transform 0.8s cubic-bezier(0.22,0.61,0.36,1)',
            }}
          >
            <div className="ps-col-head">
              <span className="ps-pill ps-pill-old">Today</span>
              <h3 className="ps-col-title">
                Dashboards built for the few
              </h3>
              <p className="ps-col-sub">
                SQL, filters, drill-downs, and disconnected charts — built for analysts, opaque to
                everyone else. PMs, designers, and founders file tickets and wait.
              </p>
            </div>

            <DashboardClutterPreview />

            <ul className="ps-points">
              <li>Requires SQL + technical training</li>
              <li>Insights gated behind the data team</li>
              <li>Hours-to-days answer latency</li>
            </ul>
          </div>

          {/* ARROW between columns */}
          <div className="ps-arrow" aria-hidden="true">
            <svg viewBox="0 0 60 24" width="60" height="24">
              <defs>
                <linearGradient id="ps-arrow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F5D000" />
                  <stop offset="100%" stopColor="#F47B20" />
                </linearGradient>
              </defs>
              <path
                d="M2 12 L52 12 M44 4 L52 12 L44 20"
                fill="none"
                stroke="url(#ps-arrow-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ps-arrow-label">Advaita</span>
          </div>

          {/* NEW WAY */}
          <div
            className="ps-col ps-col-new"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(60px)',
              transition: 'opacity 0.8s cubic-bezier(0.22,0.61,0.36,1) 120ms, transform 0.8s cubic-bezier(0.22,0.61,0.36,1) 120ms',
            }}
          >
            <div className="ps-col-head">
              <span className="ps-pill ps-pill-new">With Advaita</span>
              <h3 className="ps-col-title">
                Ask the{' '}
                <span style={{ color: '#F47B20' }}>DS</span> &{' '}
                <span style={{ color: '#1A7A2E' }}>UR</span> bots
              </h3>
              <p className="ps-col-sub">
                Dashboards exist — but the real interface is conversation. Advaita's Data Science and
                User Research agents run background analysis and answer in plain English, in real time.
              </p>
            </div>

            <ChatbotPreview />

            <ul className="ps-points">
              <li>Plain-English questions, instant answers</li>
              <li>Background analysis across cohorts, segments, replays</li>
              <li>Accessible to every role, not just analysts</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .ps-split {
          display: grid;
          grid-template-columns: 1fr 72px 1fr;
          align-items: stretch;
          gap: 0;
        }
        .ps-col {
          background: #fff;
          border: 1px solid var(--adv-border);
          border-radius: 2px;
          padding: 34px 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          min-height: 540px;
        }
        .ps-col-old { position: relative; }
        .ps-col-new {
          position: relative;
          box-shadow:
            0 0 0 1px rgba(244,123,32,0.18),
            0 18px 40px -22px rgba(244,123,32,0.35);
        }
        .ps-col-new::before {
          content: '';
          position: absolute;
          top: -1px; left: -1px; right: -1px;
          height: 3px;
          background: linear-gradient(90deg, #F5D000, #F47B20, #1A7A2E);
          pointer-events: none;
        }

        .ps-col-head { display: flex; flex-direction: column; gap: 10px; }
        .ps-col-title {
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 700;
          font-size: 1.35rem;
          color: #111;
          margin: 0;
          letterSpacing: -0.015em;
          line-height: 1.3;
        }
        .ps-col-sub {
          font-size: 0.94rem;
          color: #6b6b6b;
          line-height: 1.6;
          margin: 0;
        }

        .ps-pill {
          align-self: flex-start;
          display: inline-block;
          padding: 3px 10px;
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: 2px;
        }
        .ps-pill-old {
          background: rgba(17,17,17,0.06);
          color: #3a3a3a;
          border: 1px solid var(--adv-border);
        }
        .ps-pill-new {
          background: #F47B20;
          color: #fff;
        }

        .ps-points {
          list-style: none;
          padding: 0;
          margin: auto 0 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid var(--adv-border);
          padding-top: 18px;
        }
        .ps-points li {
          font-size: 0.86rem;
          color: #3a3a3a;
          position: relative;
          padding-left: 18px;
        }
        .ps-points li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 8px;
          height: 2px;
          background: #F47B20;
        }
        .ps-col-old .ps-points li::before { background: #8a8a8a; }

        /* Arrow */
        .ps-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 0 6px;
        }
        .ps-arrow-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F47B20;
        }

        /* ───── Old-way viz ───── */
        .ps-viz {
          position: relative;
          border: 1px solid var(--adv-border);
          background: #FAFAF4;
          padding: 14px;
          border-radius: 2px;
          min-height: 220px;
        }
        .ps-viz-old { overflow: hidden; }

        .ps-dash-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--adv-border);
          margin-bottom: 12px;
        }
        .ps-dot { width: 8px; height: 8px; border-radius: 50%; }
        .ps-dash-title {
          margin-left: 8px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem;
          color: #8a8a8a;
        }
        .ps-dash-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .ps-mini-card {
          background: #fff;
          border: 1px solid var(--adv-border);
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ps-mini-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.58rem;
          color: #8a8a8a;
          letter-spacing: 0.04em;
        }
        .ps-mini-spark { width: 100%; height: 22px; }
        .ps-mini-val {
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          color: #111;
          letter-spacing: -0.01em;
        }
        .ps-sql {
          margin-top: 10px;
          padding: 8px 10px;
          background: #0E0E0E;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          color: #d6d6d6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Old-way overlay — blur + callout */
        .ps-overlay-old {
          position: absolute;
          inset: 0;
          background: rgba(250,250,244,0.72);
          backdrop-filter: blur(2px) saturate(120%);
          -webkit-backdrop-filter: blur(2px) saturate(120%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .ps-overlay-card {
          background: #fff;
          border: 1px solid var(--adv-border);
          border-left: 3px solid #E24B4A;
          padding: 14px 18px;
          max-width: 320px;
          box-shadow: 0 14px 36px -18px rgba(17,17,17,0.35);
        }
        .ps-overlay-chip {
          display: inline-block;
          padding: 2px 8px;
          background: rgba(226,75,74,0.12);
          color: #E24B4A;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .ps-overlay-text {
          font-size: 0.95rem;
          color: #111;
          line-height: 1.4;
          margin-bottom: 4px;
        }
        .ps-overlay-sub {
          font-size: 0.78rem;
          color: #6b6b6b;
        }

        /* ───── New-way chat viz ───── */
        .ps-viz-new {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px;
        }
        .ps-chat-row {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .ps-chat-user { justify-content: flex-end; }
        .ps-chat-bot {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .ps-chat-bot.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .ps-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }
        .ps-avatar-user {
          background: #111;
          color: #fff;
        }
        .ps-avatar-ds { background: #F47B20; }
        .ps-avatar-ur { background: #1A7A2E; }

        .ps-bubble {
          padding: 9px 12px;
          font-size: 0.84rem;
          line-height: 1.5;
          color: #111;
          border: 1px solid var(--adv-border);
          max-width: 78%;
          border-radius: 2px;
        }
        .ps-bubble-user {
          background: #111;
          color: #fff;
          border-color: #111;
        }
        .ps-bubble-ds {
          background: #fff;
          border-left: 3px solid #F47B20;
        }
        .ps-bubble-ur {
          background: #fff;
          border-left: 3px solid #1A7A2E;
        }
        .ps-bubble-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #8a8a8a;
          margin-bottom: 4px;
        }

        .ps-typing {
          display: inline-flex;
          gap: 4px;
          padding: 2px 0;
        }
        .ps-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b8b8b8;
          animation: ps-typing-bounce 1.1s infinite ease-in-out;
        }
        .ps-typing span:nth-child(2) { animation-delay: 0.15s; }
        .ps-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes ps-typing-bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40%           { transform: scale(1);   opacity: 1; }
        }

        .ps-chat-foot {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.72rem;
          color: #6b6b6b;
          padding-top: 6px;
          border-top: 1px dashed var(--adv-border);
          margin-top: 4px;
        }
        .ps-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #1A7A2E;
          box-shadow: 0 0 0 0 rgba(26,122,46,0.5);
          animation: ps-live-pulse 1.8s infinite;
        }
        @keyframes ps-live-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(26,122,46,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(26,122,46,0);   }
          100% { box-shadow: 0 0 0 0 rgba(26,122,46,0);   }
        }

        /* ───── Responsive ───── */
        @media (max-width: 980px) {
          .ps-split {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .ps-arrow {
            flex-direction: row;
            padding: 4px 0;
          }
          .ps-arrow svg { transform: rotate(90deg); }
        }
      `}</style>
    </section>
  )
}
