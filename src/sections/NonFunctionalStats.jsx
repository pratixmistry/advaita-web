/* "Numbers you can count on" — non-functional guarantees from PRD */

import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.3) {
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

/* Count-up: animates 0 → target when `run` turns true. Renders as-is if decimal = false. */
function CountUp({ target, run, decimals = 0, duration = 1600 }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run) return
    const start = performance.now()
    let rafId
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) rafId = requestAnimationFrame(tick)
      else setValue(target)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [run, target, duration])

  return <>{decimals === 0 ? Math.round(value) : value.toFixed(decimals)}</>
}

const STATS = [
  {
    prefix: '',
    target: 99,
    suffix: '%',
    label: 'Uptime & on-time response',
    desc: 'Production SLA with redundant failover and always-on monitoring.',
    icon: IconPulse,
  },
  {
    prefix: '<',
    target: 30,
    suffix: ' min',
    label: 'End-to-end latency',
    desc: 'From event ingestion to AI-generated answer — measured, not promised.',
    icon: IconBolt,
  },
  {
    prefix: '',
    target: 100,
    suffix: '%',
    label: 'Data compliance',
    desc: 'GDPR-ready data handling, region-pinned storage, full audit trails.',
    icon: IconShield,
  },
  {
    prefix: '',
    target: 256,
    suffix: '-bit',
    label: 'Encrypted end-to-end',
    desc: 'TLS 1.3 in transit, AES-256 at rest. Your data, always under lock.',
    icon: IconLock,
  },
]

export function NonFunctionalStats() {
  const [ref, inView] = useInView(0.25)

  return (
    <section
      id="guarantees"
      style={{
        background: '#1A7A2E',
        padding: '50px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid overlay pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          pointerEvents: 'none',
        }}
      />
      {/* Subtle radial highlight */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(245,208,0,0.18) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <div className="lp-wrap-wide" style={{ position: 'relative', zIndex: 1 }} ref={ref}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px',
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.22)',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              borderRadius: 2,
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#F5D000',
              }}
            />
            By the numbers
          </span>
          <h2
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.028em',
              color: '#fff',
              margin: '0 0 14px',
            }}
          >
            Numbers you can{' '}
            <span style={{ color: '#F5D000' }}>count on</span>.
          </h2>
          <p
            style={{
              fontSize: '1.02rem',
              color: 'rgba(255,255,255,0.78)',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Beyond features, Advaita is engineered for the guarantees that matter when you're
            running analytics for a real business — uptime, speed, compliance, and security.
          </p>
        </div>

        {/* Stat grid */}
        <div className="nfs-grid">
          {STATS.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="nfs-cell"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(18px)',
                  transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s ease ${i * 120}ms`,
                }}
              >
                <div className="nfs-icon" aria-hidden="true">
                  <Icon />
                </div>
                <div className="nfs-number">
                  <span className="nfs-prefix">{s.prefix}</span>
                  <CountUp target={s.target} run={inView} />
                  <span className="nfs-suffix">{s.suffix}</span>
                </div>
                <div className="nfs-label">{s.label}</div>
                <div className="nfs-desc">{s.desc}</div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .nfs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .nfs-cell {
          padding: 32px 28px 30px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-right: 1px solid rgba(255,255,255,0.12);
        }
        .nfs-cell:last-child { border-right: none; }

        .nfs-icon {
          width: 38px;
          height: 38px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          color: #F5D000;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
        }

        .nfs-number {
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(2.4rem, 4.4vw, 3.4rem);
          color: #fff;
          letter-spacing: -0.035em;
          line-height: 1;
          display: flex;
          align-items: baseline;
          gap: 2px;
        }
        .nfs-prefix,
        .nfs-suffix {
          font-size: 0.55em;
          font-weight: 700;
          color: #F5D000;
          letter-spacing: -0.02em;
        }
        .nfs-prefix { margin-right: 4px; }

        .nfs-label {
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 700;
          font-size: 0.98rem;
          color: #fff;
          letter-spacing: -0.01em;
          margin-top: 4px;
        }
        .nfs-desc {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.72);
          line-height: 1.55;
        }

        @media (max-width: 980px) {
          .nfs-grid { grid-template-columns: repeat(2, 1fr); }
          .nfs-cell:nth-child(odd)  { border-right: 1px solid rgba(255,255,255,0.12); }
          .nfs-cell:nth-child(even) { border-right: none; }
          .nfs-cell:nth-child(1),
          .nfs-cell:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }
        }
        @media (max-width: 560px) {
          .nfs-grid { grid-template-columns: 1fr; }
          .nfs-cell { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.12); }
          .nfs-cell:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  )
}

/* ── Icons ────────────────────────────────────────────── */
function IconPulse() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
