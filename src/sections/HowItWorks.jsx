/* How-It-Works — 3-card feature grid. Matches Advaita brand palette. */

import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    tag: 'Install',
    title: 'Drop in the SDK',
    desc: 'One line per platform. SDKs for every language your team ships — no infra changes required.',
    icon: IconInstall,
    viz: VizInstall,
  },
  {
    tag: 'Track',
    title: 'Capture every event',
    desc: 'Events flow in real-time through your pipeline — validated, enriched, and stored automatically.',
    icon: IconFlow,
    viz: VizFlow,
  },
  {
    tag: 'Ask',
    title: 'Query with AI',
    desc: 'Plain-English questions, SQL-free answers. Share any insight with your team in a single click.',
    icon: IconAsk,
    viz: VizAsk,
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView]
}

function FeatureCard({ step, index, inView }) {
  const Icon = step.icon
  const Viz = step.viz
  const delay = 120 * index

  return (
    <div
      className="hiw-card"
      style={{
        padding: '36px 32px 32px',
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: '#F47B20',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 22,
          boxShadow: '0 4px 12px rgba(244,123,32,0.25)',
        }}
      >
        <Icon />
      </div>

      <h3
        style={{
          fontFamily: "'Space Grotesk', 'IBM Plex Sans', sans-serif",
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#111',
          margin: '0 0 10px',
          letterSpacing: '-0.01em',
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          fontFamily: "'Manrope', 'IBM Plex Sans', sans-serif",
          fontSize: '0.92rem',
          color: '#6b6b6b',
          lineHeight: 1.6,
          margin: '0 0 26px',
        }}
      >
        {step.desc}
      </p>

      <div style={{ marginTop: 'auto' }}>
        <div
          style={{
            background: '#F2EDE1',
            borderRadius: 10,
            padding: 18,
            height: 220,
            display: 'flex',
          }}
        >
          <div style={{ flex: 1, display: 'flex' }}>
            <Viz />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const [containerRef, inView] = useInView(0.15)

  return (
    <section
      id="how-it-works"
      style={{
        background: '#FAF6EC',
        padding: '96px 0',
        position: 'relative',
      }}
    >
      <div className="lp-wrap-wide" ref={containerRef}>
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 56px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 14px',
              background: '#fff',
              border: '1px solid rgba(17,17,17,0.08)',
              color: '#111',
              fontFamily: "'Manrope', 'IBM Plex Sans', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              borderRadius: 999,
              marginBottom: 22,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 2,
                background: '#F47B20',
              }}
            />
            How it works
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', 'IBM Plex Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4.6vw, 3.4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#111',
              margin: 0,
            }}
          >
            From zero to insights in three steps.
          </h2>
        </div>

        <div className="hiw-grid">
          {STEPS.map((s, i) => (
            <FeatureCard key={s.tag} step={s} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-top: 1px solid rgba(17,17,17,0.08);
          border-bottom: 1px solid rgba(17,17,17,0.08);
        }
        .hiw-grid > .hiw-card {
          border-right: 1px solid rgba(17,17,17,0.08);
        }
        .hiw-grid > .hiw-card:last-child {
          border-right: none;
        }
        @media (max-width: 900px) {
          .hiw-grid {
            grid-template-columns: 1fr !important;
          }
          .hiw-grid > .hiw-card {
            border-right: none !important;
            border-bottom: 1px solid rgba(17,17,17,0.08);
          }
          .hiw-grid > .hiw-card:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  )
}

/* ── Icons ─────────────────────────────────────────── */
function IconInstall() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
function IconFlow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="19" cy="19" r="2" />
      <line x1="6.8" y1="11" x2="17.2" y2="5.8" />
      <line x1="6.8" y1="13" x2="17.2" y2="18.2" />
    </svg>
  )
}
function IconAsk() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="15 7 21 7 21 13" />
    </svg>
  )
}

/* Shared preview shell ensures identical sizing across cards */
function VizShell({ children, dark }) {
  return (
    <div
      style={{
        flex: 1,
        background: dark ? '#0E0E0E' : '#fff',
        borderRadius: 8,
        padding: 14,
        border: '1px solid rgba(17,17,17,0.06)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

/* ── Step 01 — Install preview (SDK terminal) ──────── */
function VizInstall() {
  const codeStyle = {
    fontFamily: "'JetBrains Mono', 'Menlo', monospace",
    fontSize: '0.72rem',
    lineHeight: 1.7,
    whiteSpace: 'nowrap',
  }
  return (
    <VizShell dark>
      <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FEBC2E' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840' }} />
      </div>
      <div style={{ ...codeStyle, color: '#8a8a8a' }}>
        <span style={{ color: '#F47B20' }}>$</span> npm install{' '}
        <span style={{ color: '#F5D000' }}>@advaita/acai</span>
      </div>
      <div style={{ ...codeStyle, color: '#6b6b6b', marginTop: 8 }}>
        <span>// Then…</span>
      </div>
      <div style={{ ...codeStyle, color: '#e6e6e6' }}>
        <span style={{ color: '#8A74E5' }}>import</span> advaita{' '}
        <span style={{ color: '#8A74E5' }}>from</span>{' '}
        <span style={{ color: '#F5D000' }}>&apos;@advaita/acai&apos;</span>
      </div>
      <div style={{ ...codeStyle, color: '#e6e6e6', marginTop: 6 }}>
        advaita.<span style={{ color: '#F5D000' }}>track</span>(
        <span style={{ color: '#8A74E5' }}>&apos;signup&apos;</span>)
      </div>
    </VizShell>
  )
}

/* ── Step 02 — Track preview (live event stream) ───── */
function VizFlow() {
  const events = [
    { name: 'page_view',    user: 'u_8241', t: '0.2s', c: '#F47B20' },
    { name: 'button_click', user: 'u_0193', t: '0.4s', c: '#F5D000' },
    { name: 'signup',       user: 'u_7740', t: '0.6s', c: '#1A7A2E' },
    { name: 'purchase',     user: 'u_4412', t: '0.9s', c: '#8A74E5' },
  ]
  return (
    <VizShell>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: "'Manrope', 'IBM Plex Sans', sans-serif",
          fontSize: '0.68rem',
          fontWeight: 700,
          color: '#8a8a8a',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        <span>Live events</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#1A7A2E' }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#1A7A2E',
              boxShadow: '0 0 0 3px rgba(26,122,46,0.18)',
            }}
          />
          LIVE
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-around' }}>
        {events.map((e) => (
          <div
            key={e.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '10px 1fr auto',
              alignItems: 'center',
              gap: 8,
              padding: '4px 0',
              borderBottom: '1px dashed rgba(17,17,17,0.06)',
              fontFamily: "'JetBrains Mono', 'Menlo', monospace",
              fontSize: '0.72rem',
              color: '#111',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 2, background: e.c }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span style={{ color: e.c, fontWeight: 700 }}>{e.name}</span>
              <span style={{ color: '#8a8a8a' }}> · {e.user}</span>
            </span>
            <span style={{ color: '#8a8a8a' }}>{e.t}</span>
          </div>
        ))}
      </div>
    </VizShell>
  )
}

/* ── Step 03 — Ask preview (AI chat) ────────────────── */
function VizAsk() {
  return (
    <VizShell>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div
          style={{
            alignSelf: 'flex-start',
            maxWidth: '92%',
            background: '#F2EDE1',
            border: '1px solid rgba(17,17,17,0.06)',
            borderRadius: '10px 10px 10px 2px',
            padding: '8px 11px',
            fontSize: '0.76rem',
            lineHeight: 1.45,
            fontFamily: "'Manrope', 'IBM Plex Sans', sans-serif",
            color: '#111',
          }}
        >
          Why did retention drop last week?
        </div>
        <div
          style={{
            alignSelf: 'flex-end',
            maxWidth: '96%',
            background: '#0E0E0E',
            color: '#F0EBE0',
            borderRadius: '10px 10px 2px 10px',
            padding: '9px 11px',
            fontSize: '0.74rem',
            lineHeight: 1.5,
            fontFamily: "'Manrope', 'IBM Plex Sans', sans-serif",
          }}
        >
          <span style={{ color: '#F5D000', fontWeight: 700 }}>AI · </span>
          Safari 17.3 users saw a{' '}
          <span style={{ color: '#F47B20', fontWeight: 700 }}>−18%</span> drop — likely a
          cookie-policy regression.
        </div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#fff',
            border: '1px solid rgba(17,17,17,0.1)',
            borderRadius: 8,
            padding: '7px 10px',
            fontFamily: "'Manrope', 'IBM Plex Sans', sans-serif",
            fontSize: '0.74rem',
            color: '#8a8a8a',
          }}
        >
          <span style={{ color: '#F47B20', fontWeight: 700 }}>✦</span>
          Ask anything about your data…
        </div>
      </div>
    </VizShell>
  )
}
