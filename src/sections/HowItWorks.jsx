/* How-It-Works + Use Cases — single dark themed section.
   Top half: 3-step "How it works" flow.
   Bottom half: Fluid card stack (Framer-style) for use cases —
   Engineering, Product Managers, Founders / CTOs. */

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  {
    tag: 'Install',
    title: 'Drop in the SDK',
    desc: 'One line per platform. SDKs for every language your team ships — no infra changes required.',
    viz: VizInstall,
  },
  {
    tag: 'Track',
    title: 'Capture every event',
    desc: 'Events flow in real-time through your pipeline — validated, enriched, and stored automatically.',
    viz: VizFlow,
  },
  {
    tag: 'Ask',
    title: 'Query with AI',
    desc: 'Plain-English questions, SQL-free answers. Share any insight with your team in a single click.',
    viz: VizAsk,
  },
]

const USE_CASE_ACCENT = '#F47B20'

const USE_CASES = [
  {
    audience: 'For Engineering teams',
    title: 'Ship instrumentation, not infra.',
    bullets: [
      'Drop-in SDKs for every stack — zero pipeline plumbing',
      'Self-hosted, open-source, owns its own data plane',
      'Audit-ready event schema enforced at ingestion',
    ],
    accent: USE_CASE_ACCENT,
    icon: IconCode,
  },
  {
    audience: 'For Product Managers',
    title: 'Answers in seconds, not sprints.',
    bullets: [
      'Ask in plain English — funnels, retention, segments',
      'Spot anomalies before they hit the roadmap review',
      'Share any insight as a live, link-able dashboard',
    ],
    accent: USE_CASE_ACCENT,
    icon: IconChart,
  },
  {
    audience: 'For Founders / CTOs',
    title: 'One pane of glass for the whole company.',
    bullets: [
      'Replace Amplitude + Mixpanel + Segment with one stack',
      'Region-pinned, GDPR-ready data — own your customer graph',
      'AI insights bot that briefs the team every Monday',
    ],
    accent: USE_CASE_ACCENT,
    icon: IconCompass,
  },
  {
    audience: 'For Growth teams',
    title: 'Find the lever, pull it, prove it.',
    bullets: [
      'Pre-built funnels & retention cohorts out of the box',
      'AB-test wins with statistical significance baked in',
      'Attribute revenue back to channels, campaigns, copy',
    ],
    accent: USE_CASE_ACCENT,
    icon: IconTrendUp,
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

function StepCard({ step, index, inView }) {
  const Viz = step.viz
  const delay = 120 * index
  const stepNumber = String(index + 1).padStart(2, '0')

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
          fontFamily: "'Apfel Grotezk', sans-serif",
          fontWeight: 700,
          fontSize: '2.4rem',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'rgba(255,255,255,0.18)',
          marginBottom: 22,
        }}
      >
        {stepNumber}
      </div>

      <h3
        style={{
          fontFamily: "'Apfel Grotezk', sans-serif",
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 10px',
          letterSpacing: '-0.01em',
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          fontFamily: "'Apfel Grotezk', sans-serif",
          fontSize: '0.92rem',
          color: 'rgba(240,235,224,0.65)',
          lineHeight: 1.6,
          margin: '0 0 26px',
        }}
      >
        {step.desc}
      </p>

      <div style={{ marginTop: 'auto' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
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

/* ── Fluid Card Stack — Framer-style horizontal expanding cards ── */
function FluidCardStack({ cards, inView }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isTouch] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none)').matches,
  )
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 900px)').matches,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 900px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  return (
    <div
      className="fcs-stack"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s ease 120ms, transform 0.8s ease 120ms',
      }}
    >
      {cards.map((card, i) => {
        const Icon = card.icon
        const isActive = isMobile ? true : activeIndex === i
        const isCollapsed = !isMobile && activeIndex !== null && !isActive
        const flexGrow = isMobile ? 1 : isActive ? 3 : isCollapsed ? 0.45 : 1

        return (
          <motion.div
            key={card.audience}
            className="fcs-card"
            onMouseEnter={() => !isTouch && !isMobile && setActiveIndex(i)}
            onMouseLeave={() => !isTouch && !isMobile && setActiveIndex(null)}
            animate={{ flexGrow }}
            transition={{ type: 'spring', stiffness: 300, damping: 40 }}
            style={{
              flexBasis: 0,
              minWidth: 0,
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${isActive ? `${card.accent}55` : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 16,
              padding: 24,
              cursor: isTouch ? 'pointer' : 'default',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              overflow: 'hidden',
              position: 'relative',
              height: isMobile ? 'auto' : 380,
              minHeight: isMobile ? 0 : 380,
            }}
          >
            {/* Soft glow when active */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at 30% 0%, ${card.accent}22 0%, transparent 55%)`,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
              }}
            />

            {/* Icon */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: card.accent,
                color: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Icon />
            </div>

            {/* Bullets — overlay the empty space ABOVE the title block.
                Absolute positioned on desktop so they never push the
                title around. On mobile they flow naturally below the
                title (handled in the second motion.ul render below). */}
            {!isMobile && (
              <motion.ul
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  pointerEvents: isActive ? 'auto' : 'none',
                  position: 'absolute',
                  left: 24,
                  right: 24,
                  /* Sits just above the title block. We approximate the
                     title block height (audience tag + 2-line title +
                     gaps ≈ 90px) plus 18px of breathing room. */
                  bottom: 24 + 90 + 18,
                  zIndex: 1,
                }}
              >
                {card.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      fontFamily: "'Apfel Grotezk', sans-serif",
                      fontSize: '0.92rem',
                      lineHeight: 1.5,
                      color: 'rgba(240,235,224,0.82)',
                      display: 'flex',
                      gap: 10,
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        marginTop: 8,
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: card.accent,
                        flexShrink: 0,
                      }}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* Audience label + title — anchored at the bottom of the card */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                marginTop: 'auto',
              }}
            >
              <motion.span
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                }}
                transition={{ duration: 0.25 }}
                style={{
                  display: 'block',
                  fontFamily: "'Apfel Grotezk', sans-serif",
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: card.accent,
                  marginBottom: 10,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {card.audience}
              </motion.span>
              <motion.h3
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily: "'Apfel Grotezk', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)',
                  letterSpacing: '-0.01em',
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  wordBreak: 'break-word',
                  /* Reserve 2 lines of vertical space at all times so the
                     title block doesn't shrink/grow as the card width
                     animates and the title flips between 1 and 2 lines. */
                  height: isMobile ? 'auto' : '2.4em',
                }}
              >
                {card.title}
              </motion.h3>

              {/* Mobile-only bullet list — flows naturally below title */}
              {isMobile && (
                <motion.ul
                  animate={{ opacity: 1 }}
                  style={{
                    listStyle: 'none',
                    margin: '18px 0 0',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {card.bullets.map((b) => (
                    <li
                      key={b}
                      style={{
                        fontFamily: "'Apfel Grotezk', sans-serif",
                        fontSize: '0.92rem',
                        lineHeight: 1.5,
                        color: 'rgba(240,235,224,0.82)',
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          marginTop: 8,
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: card.accent,
                          flexShrink: 0,
                        }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function HowItWorks() {
  const [stepsRef, stepsInView] = useInView(0.12)
  const [casesRef, casesInView] = useInView(0.12)

  return (
    <section
      id="how-it-works"
      style={{
        /*background:
          'radial-gradient(ellipse at 50% -10%, #1a1a1a 0%, #111111 35%, #0a0a0a 70%, #000000 100%', */
        background: '#011c21',
        padding: '110px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dot grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse at 50% 30%, black 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 30%, black 0%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />
      {/* Soft accent glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -180,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 720,
          height: 720,
          background:
            'radial-gradient(circle, rgba(244,123,32,0.10) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="lp-wrap-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Header for "How it works" ────────────────────── */}
        <div
          ref={stepsRef}
          style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 56px' }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: '#fff',
              fontFamily: "'Apfel Grotezk', sans-serif",
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
                borderRadius: 6,
                background: '#F47B20',
              }}
            />
            How it works
          </span>
          <h2
            style={{
              fontFamily: "'Apfel Grotezk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4.6vw, 3.4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#cdcafe',
              margin: 0,
            }}
          >
            From zero to insights in{' '}
            <span style={{ color: '#F5D000' }}>three steps</span>.
          </h2>
        </div>

        {/* ── 3-step grid ──────────────────────────────────── */}
        <div className="hiw-grid">
          {STEPS.map((s, i) => (
            <StepCard key={s.tag} step={s} index={i} inView={stepsInView} />
          ))}
        </div>

        {/* ── Use Cases header ─────────────────────────────── */}
        <div
          ref={casesRef}
          style={{
            textAlign: 'center',
            maxWidth: 880,
            margin: '120px auto 56px',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: '#fff',
              fontFamily: "'Apfel Grotezk', sans-serif",
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
                borderRadius: 6,
                background: '#1A7A2E',
              }}
            />
            Use cases
          </span>
          <h2
            style={{
              fontFamily: "'Apfel Grotezk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4.2vw, 3.1rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#cdcafe',
              margin: '0 0 14px',
            }}
          >
            Built for every team that ships.
          </h2>
          <p
            style={{
              fontFamily: "'Apfel Grotezk', sans-serif",
              fontSize: '1.02rem',
              color: 'rgba(240,235,224,0.72)',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Whether you're shipping the API, owning the roadmap, or running the
            company — Advaita gives you the same source of truth.
          </p>
        </div>

        {/* ── Fluid Card Stack ─────────────────────────────── */}
        <FluidCardStack cards={USE_CASES} inView={casesInView} />
      </div>

      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-top: 1px solid rgba(255,255,255,0.10);
          border-bottom: 1px solid rgba(255,255,255,0.10);
        }
        .hiw-grid > .hiw-card {
          border-right: 1px solid rgba(255,255,255,0.10);
        }
        .hiw-grid > .hiw-card:last-child {
          border-right: none;
        }
        .fcs-stack {
          display: flex;
          flex-direction: row;
          gap: 14px;
          width: 100%;
        }
        @media (max-width: 900px) {
          .hiw-grid {
            grid-template-columns: 1fr !important;
          }
          .hiw-grid > .hiw-card {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.10);
          }
          .hiw-grid > .hiw-card:last-child {
            border-bottom: none;
          }
          /* Stack vertically on mobile, every card fully expanded */
          .fcs-stack {
            flex-direction: column;
            gap: 16px;
          }
          .fcs-stack > .fcs-card {
            flex: 1 1 auto !important;
            min-height: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}

/* ── Shared preview shell (dark variant by default) ──────────── */
function VizShell({ children, light }) {
  return (
    <div
      style={{
        flex: 1,
        background: light ? '#fff' : '#0E0E0E',
        borderRadius: 8,
        padding: 14,
        border: light ? '1px solid rgba(17,17,17,0.06)' : '1px solid rgba(255,255,255,0.06)',
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
    <VizShell>
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
    { name: 'signup',       user: 'u_7740', t: '0.6s', c: '#5BD46C' },
    { name: 'purchase',     user: 'u_4412', t: '0.9s', c: '#8A74E5' },
  ]
  return (
    <VizShell>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: "'Apfel Grotezk', sans-serif",
          fontSize: '0.68rem',
          fontWeight: 700,
          color: 'rgba(240,235,224,0.6)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        <span>Live events</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#5BD46C' }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#5BD46C',
              boxShadow: '0 0 0 3px rgba(91,212,108,0.18)',
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
              borderBottom: '1px dashed rgba(255,255,255,0.07)',
              fontFamily: "'JetBrains Mono', 'Menlo', monospace",
              fontSize: '0.72rem',
              color: '#F0EBE0',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 6, background: e.c }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span style={{ color: e.c, fontWeight: 700 }}>{e.name}</span>
              <span style={{ color: 'rgba(240,235,224,0.5)' }}> · {e.user}</span>
            </span>
            <span style={{ color: 'rgba(240,235,224,0.5)' }}>{e.t}</span>
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
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px 10px 10px 2px',
            padding: '8px 11px',
            fontSize: '0.76rem',
            lineHeight: 1.45,
            fontFamily: "'Apfel Grotezk', sans-serif",
            color: '#F0EBE0',
          }}
        >
          Why did retention drop last week?
        </div>
        <div
          style={{
            alignSelf: 'flex-end',
            maxWidth: '96%',
            background: '#1A1A1A',
            color: '#F0EBE0',
            border: '1px solid rgba(244,123,32,0.35)',
            borderRadius: '10px 10px 2px 10px',
            padding: '9px 11px',
            fontSize: '0.74rem',
            lineHeight: 1.5,
            fontFamily: "'Apfel Grotezk', sans-serif",
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
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 8,
            padding: '7px 10px',
            fontFamily: "'Apfel Grotezk', sans-serif",
            fontSize: '0.74rem',
            color: 'rgba(240,235,224,0.55)',
          }}
        >
          <span style={{ color: '#F47B20', fontWeight: 700 }}>✦</span>
          Ask anything about your data…
        </div>
      </div>
    </VizShell>
  )
}

/* ── Use Case Icons ─────────────────────────────────── */
function IconCode() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
function IconChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="20" x2="21" y2="20" />
      <rect x="6" y="11" width="3" height="9" />
      <rect x="11" y="6" width="3" height="14" />
      <rect x="16" y="14" width="3" height="6" />
    </svg>
  )
}
function IconCompass() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}
function IconTrendUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  )
}
