import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../constants/index.jsx'
import './Hero.css'

/* ── Single vertical dashboard preview ─────────────────────── */

function DashboardPreview() {
  const events = [
    { color: '#F47B20', label: 'page_view',  user: 'u_7k2m', time: '2s ago' },
    { color: '#1A7A2E', label: 'identify',   user: 'u_3x9p', time: '5s ago' },
    { color: '#3178C6', label: 'track',      user: 'u_9z2b', time: '9s ago' },
    { color: '#C026D3', label: 'group',      user: 'u_1a4q', time: '14s ago' },
  ]
  const bars = [32, 48, 41, 67, 54, 72, 58, 85, 63, 91, 77, 88]
  const funnelSteps = [
    { label: 'Visited',   pct: 100, color: '#F47B20' },
    { label: 'Signed Up', pct: 62,  color: '#F5D000' },
    { label: 'Activated', pct: 38,  color: '#1A7A2E' },
    { label: 'Converted', pct: 19,  color: '#3178C6' },
  ]
  return (
    <div style={{
      background: 'rgba(255,255,255,0.97)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
      width: '88%',
      margin: '0 auto',
      fontFamily: "'Manrope', sans-serif",
    }}>
      {/* Dashboard header bar */}
      <div style={{
        background: '#111111',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>ADVAITA</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A7A2E', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Live · Today</span>
        </div>
      </div>

      {/* Metric pills row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, borderBottom: '1px solid #F0F0F0' }}>
        {[
          { label: 'Events', value: '24,831', delta: '+12%' },
          { label: 'Users',  value: '1,204',  delta: '+8%' },
          { label: 'Conv.',  value: '38.2%',  delta: '+3%' },
        ].map((m, i) => (
          <div key={m.label} style={{
            padding: '14px 16px',
            borderRight: i < 2 ? '1px solid #F0F0F0' : 'none',
          }}>
            <div style={{ fontSize: '0.6rem', color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: '0.62rem', color: '#1A7A2E', fontWeight: 600, marginTop: 3 }}>{m.delta}</div>
          </div>
        ))}
      </div>

      {/* Mini bar chart */}
      <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ fontSize: '0.62rem', color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Event Volume · Last 12h</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 52 }}>
          {bars.map((v, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${(v / 91) * 100}%`,
              background: i === bars.length - 1 ? '#F47B20' : i >= bars.length - 3 ? 'rgba(244,123,32,0.4)' : '#E8E8E8',
              borderRadius: '2px 2px 0 0',
              minHeight: 3,
              transition: 'background 0.2s',
            }} />
          ))}
        </div>
      </div>

      {/* Funnel section */}
      <div style={{ padding: '12px 18px', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ fontSize: '0.62rem', color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Conversion Funnel</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {funnelSteps.map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: '0.62rem', color: '#666', width: 58, flexShrink: 0 }}>{s.label}</div>
              <div style={{ flex: 1, height: 5, background: '#F0F0F0', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 99 }} />
              </div>
              <div style={{ fontSize: '0.62rem', color: '#111', fontWeight: 700, width: 30, textAlign: 'right' }}>{s.pct}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Live event stream */}
      <div style={{ padding: '12px 18px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: '0.62rem', color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Live Stream</div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'rgba(26,122,46,0.08)', borderRadius: 99, padding: '2px 7px', fontSize: '0.58rem', color: '#1A7A2E', fontWeight: 700 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#1A7A2E', display: 'inline-block' }} /> LIVE
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {events.map((ev, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#111', fontFamily: 'monospace', flex: 1 }}>{ev.label}</span>
              <span style={{ fontSize: '0.6rem', color: '#aaa', fontFamily: 'monospace' }}>{ev.user}</span>
              <span style={{ fontSize: '0.58rem', color: '#ccc' }}>{ev.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Kept for backwards compat (unused now) ─────────────────── */
function LiveEventStreamCard() {
  const events = [
    { color: '#F47B20', label: 'page_view',  user: 'u_7k2m', time: '2s ago' },
    { color: '#1A7A2E', label: 'identify',   user: 'u_3x9p', time: '5s ago' },
    { color: '#3178C6', label: 'track',      user: 'u_9z2b', time: '9s ago' },
    { color: '#C026D3', label: 'group',      user: 'u_1a4q', time: '13s ago' },
  ]
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 16,
      padding: '20px 22px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
      width: '85%',
      margin: '0 auto',
      fontFamily: "'Manrope', sans-serif",
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Live Event Stream
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.68rem', color: '#1A7A2E', fontWeight: 700 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: '#1A7A2E',
            display: 'inline-block',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          LIVE
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {events.map((ev, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#111', fontFamily: 'monospace', flex: 1 }}>{ev.label}</span>
            <span style={{ fontSize: '0.67rem', color: '#888', fontFamily: 'monospace' }}>{ev.user}</span>
            <span style={{ fontSize: '0.63rem', color: '#bbb' }}>{ev.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConversionFunnelCard() {
  const steps = [
    { label: 'Visited',    pct: 100, color: '#F47B20' },
    { label: 'Signed Up',  pct: 62,  color: '#F5D000' },
    { label: 'Activated',  pct: 38,  color: '#1A7A2E' },
    { label: 'Converted',  pct: 19,  color: '#222' },
  ]
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 16,
      padding: '20px 22px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
      width: '85%',
      margin: '0 auto',
      fontFamily: "'Manrope', sans-serif",
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Conversion Funnel
        </span>
        <span style={{ fontSize: '0.63rem', color: '#999', fontWeight: 500 }}>Last 30 days</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {steps.map((s, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: '0.7rem', color: '#555', fontWeight: 500 }}>{s.label}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#111' }}>{s.pct}%</span>
            </div>
            <div style={{ height: 6, background: '#F0F0F0', borderRadius: 99 }}>
              <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 99, transition: 'width 0.6s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WeeklyRetentionCard() {
  const rows = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
  const cols = ['D0', 'D7', 'D14', 'D21', 'D28']
  const values = [
    [1.0, 0.78, 0.61, 0.48, 0.38],
    [1.0, 0.72, 0.55, 0.41, 0.30],
    [1.0, 0.68, 0.50, 0.35, 0.22],
    [1.0, 0.65, 0.44, 0.28, 0.15],
  ]
  const toColor = (v) => {
    if (v >= 0.9) return '#1A7A2E'
    if (v >= 0.65) return '#2E9E46'
    if (v >= 0.45) return '#5DC475'
    if (v >= 0.28) return '#A3DDB2'
    return '#C8EDDA'
  }
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 16,
      padding: '20px 22px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
      width: '85%',
      margin: '0 auto',
      fontFamily: "'Manrope', sans-serif",
    }}>
      <div style={{ marginBottom: 14 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Cohort Retention
        </span>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 20 }}>
          {rows.map(r => (
            <div key={r} style={{ fontSize: '0.58rem', color: '#999', height: 22, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', paddingRight: 4 }}>{r}</div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
            {cols.map(c => (
              <div key={c} style={{ flex: 1, textAlign: 'center', fontSize: '0.58rem', color: '#999' }}>{c}</div>
            ))}
          </div>
          {values.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
              {row.map((v, ci) => (
                <div key={ci} style={{
                  flex: 1,
                  height: 22,
                  borderRadius: 4,
                  background: toColor(v),
                }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AIInsightCard() {
  const miniBar = [18, 34, 29, 42, 21, 15, 12]
  const max = Math.max(...miniBar)
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 16,
      padding: '20px 22px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
      width: '85%',
      margin: '0 auto',
      fontFamily: "'Manrope', sans-serif",
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111', letterSpacing: '0.04em', textTransform: 'uppercase' }}>AI Insight</span>
        <span style={{ fontSize: '0.9rem' }}>✦</span>
      </div>
      <div style={{
        background: '#F5F5F5',
        borderRadius: 8,
        padding: '8px 12px',
        marginBottom: 12,
        fontSize: '0.72rem',
        color: '#444',
        fontStyle: 'italic',
      }}>
        "Why did signups drop last week?"
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 36, marginBottom: 10 }}>
        {miniBar.map((v, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${(v / max) * 100}%`,
            background: i === 4 || i === 5 || i === 6 ? '#F47B20' : '#E0E0E0',
            borderRadius: '3px 3px 0 0',
            minHeight: 4,
          }} />
        ))}
      </div>
      <div style={{ fontSize: '0.68rem', color: '#555', lineHeight: 1.5 }}>
        Signup drop of <strong style={{ color: '#F47B20' }}>23%</strong> correlates with mobile load time spike on Mar 3.
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section style={{ background: '#ffffff', minHeight: '90vh', display: 'flex', alignItems: 'stretch', overflow: 'hidden', width: '100%' }}>
      <div style={{ display: 'flex', width: '100%', minHeight: '90vh', alignItems: 'stretch' }}>

        {/* ── Left column (50%) ── */}
        <motion.div
          className="hero-left-grid"
          variants={stagger} initial="hidden" animate="visible"
          style={{
            flex: '0 0 50%',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(100px,10vw,120px) clamp(32px,5vw,72px) clamp(60px,6vw,80px)',
            position: 'relative',
            overflow: 'hidden',
            background: '#ffffff',
          }}
        >
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
          {/* Badge */}
          <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
            <span style={{
              display: 'inline-block',
              border: '1px solid #E5E5E5',
              borderRadius: 4,
              padding: '4px 14px',
              fontSize: '0.72rem',
              color: '#888',
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}>
              Open Source Analytics
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)',
              lineHeight: 1.15,
              color: '#111111',
              margin: '0 0 20px',
              letterSpacing: '-0.03em',
            }}
          >
            Stop reading dashboards.<br />
            <span style={{ color: '#F47B20' }}>Start understanding users.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '1.05rem',
              color: '#666666',
              lineHeight: 1.7,
              maxWidth: 400,
              margin: '0 0 36px',
              fontWeight: 400,
            }}
          >
            Advaita is a self-hosted, open-source analytics platform that gives you complete behavioral insights — without sending data to third parties.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
            <a href="#waitlist" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px',
              background: '#111111',
              color: '#ffffff',
              borderRadius: 4,
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              fontFamily: "'Manrope', sans-serif",
              transition: 'background 0.18s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#F47B20'}
              onMouseLeave={e => e.currentTarget.style.background = '#111111'}
            >
              Get Early Access
            </a>
            <a href="#how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: '0.9rem',
              fontWeight: 500,
              color: '#F47B20',
              textDecoration: 'none',
              fontFamily: "'Manrope', sans-serif",
              transition: 'gap 0.18s',
            }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '6px'}
            >
              See how it works →
            </a>
          </motion.div>

          {/* Stat chips */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {/* Self-hosted — orange */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 16px', borderRadius: 4,
              background: 'rgba(244,123,32,0.1)', color: '#b85a0d',
              border: '1px solid rgba(244,123,32,0.2)',
              fontSize: '0.78rem', fontWeight: 700,
              fontFamily: "'Manrope', sans-serif",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F47B20', display: 'inline-block', flexShrink: 0 }} />
              Self-hosted
            </span>

            {/* MIT Licensed — dark/green */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 16px', borderRadius: 4,
              background: 'rgba(17,17,17,0.07)', color: '#333333',
              border: '1px solid rgba(17,17,17,0.12)',
              fontSize: '0.78rem', fontWeight: 700,
              fontFamily: "'Manrope', sans-serif",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A7A2E', display: 'inline-block', flexShrink: 0 }} />
              MIT Licensed
            </span>

            {/* Backed by iHub — blue */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 16px', borderRadius: 4,
              background: 'rgba(49,120,198,0.08)', color: '#1a5fa8',
              border: '1px solid rgba(49,120,198,0.18)',
              fontSize: '0.78rem', fontWeight: 700,
              fontFamily: "'Manrope', sans-serif",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3178C6', display: 'inline-block', flexShrink: 0 }} />
              Backed by iHub
            </span>
          </motion.div>
          </div>
        </motion.div>

        {/* ── Right column (50%) — orange gradient bg ── */}
        <div style={{
          flex: '0 0 50%',
          width: '50%',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '90vh',
          background: '#0E0E0E',
        }}>

          {/* Base radial gradient — orange top-right to dark bottom-left */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 80% 70% at 85% 15%, rgba(244,123,32,0.55) 0%, transparent 65%),
              radial-gradient(ellipse 60% 50% at 20% 80%, rgba(244,123,32,0.12) 0%, transparent 60%),
              linear-gradient(145deg, #1a0a00 0%, #0E0E0E 50%, #060606 100%)
            `,
          }} />

          {/* Subtle grid overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />

          {/* Floating orb 1 — large, top right */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,123,32,0.22) 0%, transparent 70%)',
            animation: 'orbFloat1 7s ease-in-out infinite',
          }} />

          {/* Floating orb 2 — medium, center */}
          <div style={{
            position: 'absolute',
            top: '40%',
            right: '20%',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,208,0,0.12) 0%, transparent 70%)',
            animation: 'orbFloat2 9s ease-in-out infinite',
          }} />

          {/* Floating orb 3 — small, bottom left */}
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,123,32,0.15) 0%, transparent 70%)',
            animation: 'orbFloat3 6s ease-in-out infinite',
          }} />

          {/* Noise texture overlay for depth */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />

          {/* Single vertical dashboard preview */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '48px 0',
          }}>
            <DashboardPreview />
          </div>
        </div>
      </div>

    </section>
  )
}