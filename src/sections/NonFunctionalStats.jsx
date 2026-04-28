/* "Numbers you can count on" — non-functional guarantees from PRD.
   Layout: light cream background, colourful pastel stat cards on top,
   wide highlight card on bottom. */

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

/* Count-up: animates 0 → target when `run` turns true. */
function CountUp({ target, run, decimals = 0, duration = 1600 }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run) return
    const start = performance.now()
    let rafId
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
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
    target: 99.99,
    decimals: 2,
    suffix: '%',
    label: 'Uptime for Advaita services',
    bg: '#E8E4FB',
    fg: '#3A2A8C',
    sub: 'rgba(58,42,140,0.65)',
  },
  {
    prefix: '<',
    target: 30,
    suffix: ' min',
    label: 'End-to-end latency to insights',
    bg: '#DCD7F8',
    fg: '#2E2178',
    sub: 'rgba(46,33,120,0.65)',
  },
  {
    prefix: '',
    target: 100,
    suffix: '%',
    label: 'GDPR-ready data compliance',
    bg: '#FBF2A4',
    fg: '#7A6A12',
    sub: 'rgba(122,106,18,0.7)',
  },
  {
    prefix: '',
    target: 256,
    suffix: '-bit',
    label: 'TLS 1.3 / AES-256 encryption',
    bg: '#FFE3CC',
    fg: '#8C3D14',
    sub: 'rgba(140,61,20,0.7)',
  },
]

export function NonFunctionalStats() {
  const [ref, inView] = useInView(0.2)

  return (
    <section
      id="guarantees"
      style={{
        background: '#FAF6EC',
        padding: '110px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="lp-wrap-wide" style={{ position: 'relative', zIndex: 1 }} ref={ref}>
        {/* Header — left aligned, like attached reference */}
        <div style={{ maxWidth: 720, margin: '0 0 56px' }}>
          <h2
            style={{
              fontFamily: "'Apfel Grotezk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.028em',
              color: '#111',
              margin: '0 0 14px',
            }}
          >
            Numbers you can count on.
          </h2>
          <p
            style={{
              fontFamily: "'Apfel Grotezk', sans-serif",
              fontSize: '1.02rem',
              color: 'rgba(17,17,17,0.62)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 560,
            }}
          >
            Beyond features, Advaita is engineered for the guarantees that matter
            when you're running analytics for a real business.
          </p>
        </div>

        {/* Stat cards row */}
        <div className="nfs-grid">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="nfs-cell"
              style={{
                background: s.bg,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(18px)',
                transition: `opacity 0.7s ease ${i * 110}ms, transform 0.7s ease ${i * 110}ms`,
              }}
            >
              <div
                className="nfs-number"
                style={{ color: s.fg }}
              >
                <span className="nfs-prefix">{s.prefix}</span>
                <CountUp
                  target={s.target}
                  run={inView}
                  decimals={s.decimals || 0}
                />
                <span className="nfs-suffix">{s.suffix}</span>
              </div>
              <div className="nfs-label" style={{ color: s.sub }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Wide highlight card */}
        <div
          className="nfs-wide"
          style={{
            background: '#D8EEDC',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(18px)',
            transition: `opacity 0.7s ease 480ms, transform 0.7s ease 480ms`,
          }}
        >
          <div
            style={{
              fontFamily: "'Apfel Grotezk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              letterSpacing: '-0.025em',
              color: '#1A5A24',
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            100% safe &amp; secure
          </div>
          <div
            style={{
              fontFamily: "'Apfel Grotezk', sans-serif",
              fontSize: '1rem',
              color: 'rgba(26,90,36,0.78)',
              lineHeight: 1.55,
            }}
          >
            SOC 2 aligned controls. Region-pinned storage. Full audit trails on
            every event we ingest.
          </div>
        </div>
      </div>

      <style>{`
        .nfs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 18px;
        }
        .nfs-cell {
          padding: 28px 26px 26px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 170px;
        }
        .nfs-number {
          font-family: 'Apfel Grotezk', sans-serif;
          font-weight: 700;
          font-size: clamp(2rem, 3.6vw, 2.6rem);
          letter-spacing: -0.03em;
          line-height: 1;
          display: flex;
          align-items: baseline;
          gap: 2px;
        }
        .nfs-prefix,
        .nfs-suffix {
          font-size: 0.6em;
          font-weight: 700;
          letter-spacing: -0.02em;
          opacity: 0.85;
        }
        .nfs-prefix { margin-right: 4px; }
        .nfs-label {
          font-family: 'Apfel Grotezk', sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          line-height: 1.4;
          margin-top: 6px;
        }
        .nfs-wide {
          padding: 30px 32px;
          border-radius: 14px;
        }

        @media (max-width: 980px) {
          .nfs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .nfs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
