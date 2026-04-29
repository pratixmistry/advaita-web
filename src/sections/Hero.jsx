import { Fragment, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TABS = [
  { id: 'live',      label: 'Live Events', fill: 'rgba(244,123,32,0.16)' },
  { id: 'funnels',   label: 'Funnels',     fill: 'rgba(245,208,0,0.22)'  },
  { id: 'retention', label: 'Retention',   fill: 'rgba(201,184,240,0.30)'},
  { id: 'ds',        label: 'DS Chatbot',  fill: 'rgba(26,122,46,0.16)'  },
  { id: 'ur',        label: 'UR Chatbot',  fill: 'rgba(138,116,229,0.22)'},
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const AUTO_TAB_DURATION = 5 /* seconds each tab stays active */

export function Hero() {
  const [active, setActive] = useState('live')
  const [cycleKey, setCycleKey] = useState(0)
  const activeTab = TABS.find(t => t.id === active) || TABS[0]

  const advanceTab = () => {
    const idx = TABS.findIndex(t => t.id === active)
    const next = TABS[(idx + 1) % TABS.length]
    setActive(next.id)
  }

  const handleTabClick = (id) => {
    setActive(id)
    setCycleKey(k => k + 1) /* reset fill animation on manual click */
  }

  return (
    <section className="lp-grid-bg" style={{ background: 'var(--adv-bg)', position: 'relative', overflow: 'hidden' }}>
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* ── Centered header content (inside padded wrap) ── */}
        <div className="lp-wrap-wide" style={{ paddingTop: 72, paddingBottom: 0, textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Release badge */}
         <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
             <span style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#011c21', color: 'white', border: '1px solid #E0E0D9',
              fontSize: '0.3rem', fontWeight: 400,
              padding: '4px 12px', borderRadius: 6,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
            
            <span style={{ fontSize: '0.88rem', color: 'white', fontWeight: 400 }}>
              Startup Srujan Grant S4 - backed by IHub
            </span> 
            
            </span>
          </motion.div> 

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "'Apfel Grotezk', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(2.4rem, 5.4vw, 4.5rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.035em',
              color: '#111',
              margin: '0 0 20px',
              maxWidth: 860,
            }}
          >
            The AI Analytics Platform for Faster, Deeper Decisions.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'Apfel Grotezk', sans-serif",
              fontSize: '1.05rem',
              color: '#6b6b6b',
              lineHeight: 1.6,
              margin: '0 auto 36px',
              maxWidth: 560,
              fontWeight: 400,
            }}
          >
            From data overload to unified clarity — AI that helps you see the complete picture.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
            <a href="#how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 24px',
              background: '#fff',
              color: '#111',
              border: '1px solid rgba(17,17,17,0.14)',
              borderRadius: 6,
              fontSize: '0.92rem',
              fontWeight: 600,
              textDecoration: 'none',
              fontFamily: 'inherit',
              transition: 'background 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F5F5EF' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
            >
              Get Started Now
            </a>
            <a href="#waitlist" className="login-btn" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 24px',
              background: '#F47B20',
              color: '#fff',
              border: '1px solid #F47B20',
              borderRadius: 6,
              fontSize: '0.92rem',
              fontWeight: 700,
              textDecoration: 'none',
              fontFamily: 'inherit',
            }}>
              <span className="login-btn-inner">
                <span className="login-btn-text">Book a Demo</span>
                <span className="login-btn-text login-btn-text--hover" aria-hidden="true">Book a Demo</span>
              </span>
            </a>
          </motion.div>

        </div>
        {/* ── End centered header. Below spans full frame width ── */}

        {/* Tabs strip — spans to frame border */}
        <motion.div variants={fadeUp} className="hero-tabs" style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: `repeat(${TABS.length}, 1fr)`,
          background: '#fff',
          borderTop: '1px solid var(--adv-border)',
          borderBottom: 'none',
          position: 'relative',
          overflow: 'hidden',
        }}>
            {TABS.map((t, i) => {
              const isActive = t.id === active
              return (
                <button
                  key={t.id}
                  onClick={() => handleTabClick(t.id)}
                  style={{
                    position: 'relative',
                    padding: '16px 10px',
                    background: 'transparent',
                    color: isActive ? '#111' : '#6b6b6b',
                    border: 'none',
                    borderRight: i < TABS.length - 1 ? '1px solid var(--adv-border)' : 'none',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    transition: 'color 0.25s',
                    zIndex: 1,
                  }}
                >
                  {isActive && (
                    <motion.span
                      key={`fill-${t.id}-${cycleKey}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_TAB_DURATION, ease: 'linear' }}
                      onAnimationComplete={() => advanceTab()}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        background: t.fill,
                        zIndex: -1,
                      }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      key={`underline-${t.id}-${cycleKey}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_TAB_DURATION, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        height: 2,
                        background: '#F47B20',
                      }}
                    />
                  )}
                <span style={{ position: 'relative' }}>{t.label}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Dashboard preview — spans full frame width, fixed height */}
        <motion.div variants={fadeUp} className="hero-preview-wrap" style={{
          width: '100%',
          height: 560,
          position: 'relative',
          padding: '48px clamp(40px, 6vw, 96px) 0',
          background: `linear-gradient(135deg, ${activeTab.fill.replace(/[\d.]+\)/, '0.55)')} 0%, #F47B20 28%, #F5D000 58%, #C9B8F0 100%)`,
          overflow: 'hidden',
          transition: 'background 0.6s',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }} />

          <DashboardPreview activeTab={active} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ── Dashboard preview — fixed-height card, only content switches ── */
const PREVIEW_HEIGHT = 440


function DashboardPreview({ activeTab }) {
  return (
    <div className="hero-dashboard-card" style={{
      position: 'relative',
      background: '#fff',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      border: '1px solid rgba(17,17,17,0.08)',
      boxShadow: '0 24px 60px rgba(17,17,17,0.18)',
      padding: 20,
      width: '100%',
      maxWidth: 1080,
      height: PREVIEW_HEIGHT,
      margin: '0 auto',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header row — fixed height */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111' }}>Analytics</span>
          <span style={{ fontSize: '0.72rem', color: '#888' }}>/ {tabLabel(activeTab)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F47B20' }} />
          <span style={{ fontSize: '0.7rem', color: '#777', fontWeight: 600 }}>Live</span>
        </div>
      </div>

      {/* Body — fills remaining space, content switches with rise + fade */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '100%', width: '100%' }}
          >
            {activeTab === 'live'      && <LivePreview />}
            {activeTab === 'funnels'   && <FunnelsPreview />}
            {activeTab === 'retention' && <RetentionPreview />}
            {activeTab === 'ds'        && <ChatbotPreview variant="ds" />}
            {activeTab === 'ur'        && <ChatbotPreview variant="ur" />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── Live Events preview (default) ──────────────────────── */
function LivePreview() {
  return (
    <div style={{ position: 'relative' }}>
      <svg viewBox="0 0 1000 300" width="100%" style={{ display: 'block' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1={0} x2={1000} y1={50 + i * 56} y2={50 + i * 56} stroke="rgba(17,17,17,0.05)" />
        ))}
        <path d="M0,210 C120,200 180,140 300,150 C440,160 520,100 640,110 C740,118 820,80 1000,60"
          fill="none" stroke="#F5D000" strokeWidth="3" />
        <path d="M0,230 C130,225 200,170 340,178 C470,184 550,140 680,148 C780,154 860,120 1000,108"
          fill="none" stroke="#F47B20" strokeWidth="3" />
        <path d="M0,250 C150,245 240,225 360,220 C500,214 570,190 710,190 C820,190 900,176 1000,168"
          fill="none" stroke="#8A74E5" strokeWidth="3" />
        {[
          { x: 760, y: 95,  c: '#F5D000' },
          { x: 760, y: 140, c: '#F47B20' },
          { x: 760, y: 184, c: '#8A74E5' },
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#fff" stroke={p.c} strokeWidth="3" />
        ))}
        <line x1={760} x2={760} y1={40} y2={280} stroke="rgba(17,17,17,0.15)" strokeDasharray="3 3" />
      </svg>

      <div className="hero-live-tooltip" style={{
        position: 'absolute',
        top: 70,
        right: 20,
        background: '#111',
        color: '#fff',
        borderRadius: 6,
        padding: '10px 14px',
        fontSize: '0.75rem',
        fontFamily: 'inherit',
        boxShadow: '0 14px 30px rgba(0,0,0,0.24)',
        minWidth: 150,
      }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Apr 2026</div>
        {[
          { c: '#F5D000', k: 'Signups', v: '+65%' },
          { c: '#F47B20', k: 'Active',  v: '+42%' },
          { c: '#8A74E5', k: 'Retain',  v: '+32%' },
        ].map(r => (
          <div key={r.k} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: r.c }} />
            <span style={{ flex: 1 }}>{r.k}</span>
            <span style={{ fontWeight: 700 }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Funnels preview ────────────────────────────────────── */
function FunnelsPreview() {
  const steps = [
    { label: 'Landing page',   pct: 100, count: '48,210' },
    { label: 'Sign up started', pct: 62,  count: '29,890' },
    { label: 'Sign up complete', pct: 38,  count: '18,320' },
    { label: 'Activated',      pct: 24,  count: '11,570' },
    { label: 'Paid',           pct: 9,   count:  '4,338' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b6b6b' }}>
        <span style={{ fontWeight: 600 }}>Sign-up → Paid</span>
        <span>Last 30 days</span>
      </div>
      {steps.map((s, i) => (
        <div key={s.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 5 }}>
            <span style={{ color: '#3a3a3a', fontWeight: 600 }}>{i + 1}. {s.label}</span>
            <span style={{ color: '#111', fontWeight: 700 }}>
              {s.count} <span style={{ color: '#888', fontWeight: 500 }}>({s.pct}%)</span>
            </span>
          </div>
          <div style={{ height: 16, background: '#F4F2EC' }}>
            <div style={{
              width: `${s.pct}%`,
              height: '100%',
              background: `linear-gradient(90deg, #F47B20, #F5D000)`,
              transition: 'width 0.5s',
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Retention preview ─────────────────────────────────── */
function RetentionPreview() {
  const rows = 6, cols = 10
  const data = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => {
      if (c === 0) return 100
      const base = Math.max(0, 100 - r * 5 - c * 9 + (r % 2 === 0 ? 3 : -2))
      return Math.max(0, base + (Math.sin(r * c) * 4))
    })
  )
  const headers = ['W0','W1','W2','W3','W4','W5','W6','W7','W8','W9']
  const labels  = ['Mar 1','Mar 8','Mar 15','Mar 22','Mar 29','Apr 5']

  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b6b6b', marginBottom: 10 }}>
        <span style={{ fontWeight: 600 }}>Weekly cohort retention</span>
        <span>% returning</span>
      </div>
      <div className="hero-retention-grid" style={{ display: 'grid', gridTemplateColumns: `90px repeat(${cols}, 1fr)`, gap: 3, alignItems: 'center' }}>
        <span />
        {headers.map((h, idx) => (
          <span key={h} className={idx >= 5 ? 'hero-retention-hide' : ''} style={{ fontSize: '0.68rem', color: '#8a8a8a', fontWeight: 600, textAlign: 'center' }}>{h}</span>
        ))}
        {data.map((row, r) => (
          <Fragment key={r}>
            <span style={{ fontSize: '0.7rem', color: '#6b6b6b', fontWeight: 500 }}>{labels[r]}</span>
            {row.map((v, c) => {
              const intensity = Math.max(0.05, v / 100)
              return (
                <div key={`${r}-${c}`} className={c >= 5 ? 'hero-retention-hide' : ''} style={{
                  height: 26,
                  background: `rgba(244,123,32, ${intensity})`,
                  border: '1px solid rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.62rem',
                  color: intensity > 0.5 ? '#fff' : '#555',
                  fontWeight: 600,
                }}>
                  {v > 5 ? Math.round(v) : ''}
                </div>
              )
            })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

/* ─── Chatbot preview (DS / UR) ─────────────────────────── */
function ChatbotPreview({ variant }) {
  const config = variant === 'ds'
    ? {
        title: 'DS Chatbot',
        subtitle: 'Your on-call data scientist',
        accent: '#1A7A2E',
        avatar: 'DS',
        messages: [
          { role: 'user', text: 'Why did conversion drop last week?' },
          {
            role: 'bot',
            text: 'I ran a cohort split. Conversion is down <b style="color:#F47B20">−12%</b> for users on Safari 17.3 starting Mar 28. The drop correlates with the new cookie-storage policy.',
            chart: 'dropSparkline',
          },
          { role: 'user', text: 'Confidence?' },
          { role: 'bot', text: '<b>94%</b> — based on 6 days of traffic. Want me to build an A/B test to confirm?' },
        ],
      }
    : {
        title: 'UR Chatbot',
        subtitle: 'Your always-on user researcher',
        accent: '#8A74E5',
        avatar: 'UR',
        messages: [
          { role: 'user', text: 'What are users complaining about this week?' },
          {
            role: 'bot',
            text: 'Analyzed <b>1,284</b> sessions. Top friction points:<br/>• Onboarding step 3 (47 drop-offs)<br/>• Payment form (32 rage clicks)<br/>• Mobile nav collapse (19 reports)',
            chart: 'friction',
          },
          { role: 'user', text: 'Show me a session replay of the onboarding issue.' },
          { role: 'bot', text: 'Queued 3 recent session replays where users stalled for <b>>45s</b> on step 3. Opening now.' },
        ],
      }

  return (
    <div className="hero-chat-grid" style={{
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      gap: 18,
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <div className="hero-chat-sidebar" style={{ borderRight: '1px solid var(--adv-border)', paddingRight: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{
            width: 40, height: 40,
            background: config.accent,
            color: '#fff',
            fontSize: '0.9rem', fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Apfel Grotezk', sans-serif",
          }}>{config.avatar}</div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111' }}>{config.title}</div>
            <div style={{ fontSize: '0.7rem', color: '#888' }}>{config.subtitle}</div>
          </div>
        </div>

        {/* Thread list */}
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#8a8a8a', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px' }}>
          Recent threads
        </div>
        {[
          'Retention drop · Safari',
          'Funnel drop-off · Step 3',
          'Paid cohort Q1',
          'Activation definition',
        ].map((t, i) => (
          <div key={t} style={{
            padding: '8px 10px',
            fontSize: '0.76rem',
            color: i === 0 ? '#111' : '#6b6b6b',
            background: i === 0 ? '#FAFAF4' : 'transparent',
            borderLeft: i === 0 ? `2px solid ${config.accent}` : '2px solid transparent',
            fontWeight: i === 0 ? 600 : 500,
            marginBottom: 2,
          }}>
            {t}
          </div>
        ))}
      </div>

      {/* Chat stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0, overflow: 'auto' }}>
        {config.messages.map((m, i) => (
          <ChatBubble key={i} msg={m} accent={config.accent} />
        ))}

        {/* Input */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid var(--adv-border)',
          padding: '8px 10px',
          background: '#FAFAF4',
        }}>
          <span style={{ flex: 1, fontSize: '0.78rem', color: '#999' }}>Ask {config.title}…</span>
          <button style={{
            background: config.accent, color: '#fff', border: 'none',
            padding: '6px 12px', fontSize: '0.72rem', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>Send →</button>
        </div>
      </div>
    </div>
  )
}

function ChatBubble({ msg, accent }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        maxWidth: '85%',
        padding: '9px 13px',
        fontSize: '0.8rem',
        lineHeight: 1.55,
        background: isUser ? '#111' : '#fff',
        border: isUser ? 'none' : `1px solid ${accent}33`,
        color: isUser ? '#fff' : '#111',
        position: 'relative',
      }}>
        {!isUser && (
          <div style={{
            fontSize: '0.62rem',
            fontWeight: 800,
            color: accent,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 3,
          }}>AI</div>
        )}
        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
        {msg.chart === 'dropSparkline' && (
          <svg viewBox="0 0 220 40" width="100%" style={{ marginTop: 8, display: 'block' }}>
            <path d="M0,12 L30,14 L60,10 L90,12 L120,18 L150,30 L180,34 L220,36" fill="none" stroke="#F47B20" strokeWidth="2" />
            <circle cx="150" cy="30" r="3" fill="#F47B20" />
          </svg>
        )}
        {msg.chart === 'friction' && (
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { l: 'Onboarding · step 3', v: 100 },
              { l: 'Payment form',        v: 68 },
              { l: 'Mobile nav',          v: 40 },
            ].map(r => (
              <div key={r.l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.7rem', color: '#6b6b6b', flex: '0 0 130px' }}>{r.l}</span>
                <div style={{ flex: 1, height: 7, background: '#F4F2EC' }}>
                  <div style={{ width: `${r.v}%`, height: '100%', background: accent }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function tabLabel(id) {
  return TABS.find(t => t.id === id)?.label || ''
}
