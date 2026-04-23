/* "What Advaita Can Do" — alternating white-content / gradient-preview rows with animated previews */

import { useEffect, useRef, useState } from 'react'

/* ────────────────────────────────────────────────────────── */
/*  Shared hooks + layout primitives                           */
/* ────────────────────────────────────────────────────────── */

function useInView(threshold = 0.18) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [threshold])

  return [ref, inView]
}

function CheckBullet({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#F47B20',
          color: '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5 L4.2 7 L8 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span style={{ fontSize: '0.94rem', color: '#1a1a1a', fontWeight: 600 }}>{text}</span>
    </div>
  )
}

function FeatureRow({ reverse = false, title, subtitle, bullets, image, tint, preview }) {
  const [ref, inView] = useInView(0.2)

  return (
    <div
      ref={ref}
      className={`cap-row ${reverse ? 'cap-row-reverse' : ''}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* Preview side */}
      <div className="cap-preview">
        <div className="cap-preview-gradient">
          <div
            className="cap-preview-bg"
            aria-hidden="true"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
          <div
            className="cap-preview-tint"
            aria-hidden="true"
            style={{
              background: tint || 'linear-gradient(135deg, rgba(244,123,32,0.35) 0%, rgba(26,26,26,0.15) 60%, rgba(17,17,17,0.35) 100%)',
            }}
          />
          <div className="cap-preview-grid" aria-hidden="true" />
          <div className="cap-preview-inner">{preview}</div>
        </div>
      </div>

      {/* Content side — white bg */}
      <div className="cap-content">
        <h3
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)',
            color: '#111',
            margin: '0 0 14px',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '0.98rem',
            color: '#6b6b6b',
            lineHeight: 1.65,
            margin: '0 0 28px',
            maxWidth: 440,
          }}
        >
          {subtitle}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bullets.map((b) => (
            <CheckBullet key={b} text={b} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────── */
/*  Animated Previews                                          */
/* ────────────────────────────────────────────────────────── */

function KPIPreview() {
  return (
    <div style={{ color: '#111' }}>
      <div style={{ fontSize: '0.72rem', color: '#6b6b6b', marginBottom: 6, fontWeight: 600 }}>
        KPI Growth Tracking
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 800, fontSize: '1.95rem', letterSpacing: '-0.02em' }}>
          24%
        </span>
        <span
          style={{
            fontSize: '0.72rem',
            color: '#1A7A2E',
            background: 'rgba(26,122,46,0.12)',
            padding: '2px 8px',
            fontWeight: 700,
          }}
        >
          ↑ +8 points
        </span>
      </div>

      {/* animated line chart */}
      <svg viewBox="0 0 300 120" width="100%" height="130" style={{ display: 'block' }}>
        {/* grid lines */}
        <line x1="0" y1="20"  x2="300" y2="20"  stroke="rgba(17,17,17,0.08)" />
        <line x1="0" y1="60"  x2="300" y2="60"  stroke="rgba(17,17,17,0.08)" />
        <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(17,17,17,0.08)" />
        <text x="0" y="17"  fontSize="9" fill="#8a8a8a">50%</text>
        <text x="0" y="57"  fontSize="9" fill="#8a8a8a">25%</text>
        <text x="0" y="115" fontSize="9" fill="#8a8a8a">0</text>

        {/* animated path */}
        <path
          id="kpi-line"
          d="M25 100 L70 92 L115 78 L160 66 L205 52 L250 32 L290 16"
          fill="none"
          stroke="#8A74E5"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          style={{ animation: 'kpi-draw 2s ease forwards' }}
        />
        {/* travelling dot */}
        <circle r="3.2" fill="#8A74E5" style={{ filter: 'drop-shadow(0 0 4px rgba(138,116,229,0.7))' }}>
          <animateMotion
            dur="3.6s"
            repeatCount="indefinite"
            path="M25 100 L70 92 L115 78 L160 66 L205 52 L250 32 L290 16"
          />
        </circle>
        <circle r="1.6" fill="#fff">
          <animateMotion
            dur="3.6s"
            repeatCount="indefinite"
            path="M25 100 L70 92 L115 78 L160 66 L205 52 L250 32 L290 16"
          />
        </circle>

        {/* x-axis labels */}
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
          <text key={m} x={25 + i * 53} y="118" fontSize="9" fill="#8a8a8a" textAnchor="middle">{m}</text>
        ))}
      </svg>

      <style>{`
        @keyframes kpi-draw {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}

function RCAPreview() {
  return (
    <div style={{ color: '#111' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#E06B3E',
            animation: 'rca-pulse 1.6s ease-in-out infinite',
          }}
        />
        <span style={{ fontSize: '0.7rem', color: '#6b6b6b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Anomaly detected
        </span>
      </div>
      <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>
        Retention dropped −18% this week
      </div>
      <div style={{ fontSize: '0.78rem', color: '#6b6b6b', marginBottom: 14 }}>
        Advaita analyzed 12 cohorts, 7 segments, and 3 releases.
      </div>

      <svg viewBox="0 0 300 70" width="100%" height="70" style={{ marginBottom: 14 }}>
        <path
          d="M0 35 L40 30 L80 38 L120 28 L160 34 L200 56 L240 58 L290 54"
          fill="rgba(224,107,62,0.12)"
          stroke="none"
          style={{ animation: 'rca-fill 2s ease forwards' }}
          pathLength="1"
        />
        <path
          d="M0 35 L40 30 L80 38 L120 28 L160 34 L200 56 L240 58 L290 54"
          fill="none"
          stroke="#E06B3E"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          style={{ animation: 'rca-draw 1.6s ease forwards' }}
        />
        <circle cx="200" cy="56" r="3" fill="#E06B3E">
          <animate attributeName="r" values="3;5;3" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div
        style={{
          background: 'rgba(244,123,32,0.08)',
          borderLeft: '3px solid #F47B20',
          padding: '10px 12px',
          fontSize: '0.78rem',
          color: '#3a3a3a',
          lineHeight: 1.55,
        }}
      >
        <span style={{ color: '#F47B20', fontWeight: 700 }}>Root cause:</span> Safari 17.3 cookie-policy regression broke session continuity for <strong>iOS users</strong>.
      </div>

      <style>{`
        @keyframes rca-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(224,107,62,0.7); }
          50%      { box-shadow: 0 0 0 6px rgba(224,107,62,0); }
        }
        @keyframes rca-draw {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}

function SDKPreview() {
  const platforms = [
    { name: 'Python',     color: '#3776AB', slug: 'python' },
    { name: 'TypeScript', color: '#3178C6', slug: 'typescript' },
    { name: 'JavaScript', color: '#F5D000', slug: 'javascript' },
    { name: 'Node.js',    color: '#1A7A2E', slug: 'nodedotjs' },
    { name: 'Go',         color: '#00ADD8', slug: 'go' },
    { name: 'Kotlin',     color: '#7F52FF', slug: 'kotlin' },
    { name: 'Java',       color: '#E76F00', slug: 'openjdk' },
    { name: 'Flutter',    color: '#54C5F8', slug: 'flutter' },
  ]
  return (
    <div style={{ color: '#111' }}>
      <div style={{ fontSize: '0.72rem', color: '#6b6b6b', marginBottom: 10, fontWeight: 600 }}>
        Install an SDK
      </div>
      <div
        style={{
          background: '#0E0E0E',
          color: '#e6e6e6',
          padding: '10px 12px',
          fontFamily: 'monospace',
          fontSize: '0.78rem',
          marginBottom: 14,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ color: '#F47B20' }}>$</span> pip install <span style={{ color: '#F5D000' }}>acai-python</span>
        {/* shimmer */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '-30%',
            width: '30%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
            animation: 'sdk-shimmer 2.6s linear infinite',
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {platforms.map((p, i) => (
          <div
            key={p.name}
            className="sdk-tile"
            style={{
              border: '1px solid rgba(17,17,17,0.08)',
              padding: '10px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              background: '#fff',
              animation: `sdk-pop 0.45s ease ${0.1 + i * 0.07}s both`,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                background: `${p.color}1F`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}
            >
              <img
                src={`https://cdn.simpleicons.org/${p.slug}/${p.color.replace('#', '')}`}
                alt={`${p.name} logo`}
                width={20}
                height={20}
                style={{ display: 'block', objectFit: 'contain' }}
              />
            </div>
            <span style={{ fontSize: '0.7rem', color: '#3a3a3a', fontWeight: 600 }}>{p.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes sdk-shimmer {
          0%   { transform: translateX(0); }
          100% { transform: translateX(520%); }
        }
        @keyframes sdk-pop {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

function ExperimentPreview() {
  const variants = [
    { name: 'Control',   conv: 4.2, width: 60, color: '#B0B0B0', delay: 0 },
    { name: 'Variant A', conv: 5.9, width: 82, color: '#F47B20', delay: 0.15 },
    { name: 'Variant B', conv: 4.7, width: 66, color: '#F5D000', delay: 0.3 },
  ]
  return (
    <div style={{ color: '#111' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: '#6b6b6b', fontWeight: 600 }}>Experiment</div>
          <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: '0.98rem' }}>
            New onboarding flow
          </div>
        </div>
        <span
          style={{
            background: '#1A7A2E',
            color: '#fff',
            fontSize: '0.62rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '3px 8px',
          }}
        >
          Winner · A
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
        {variants.map((v) => (
          <div key={v.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: 4, color: '#3a3a3a' }}>
              <span style={{ fontWeight: 600 }}>{v.name}</span>
              <span style={{ fontWeight: 700 }}>{v.conv}%</span>
            </div>
            <div style={{ background: 'rgba(17,17,17,0.06)', height: 9, overflow: 'hidden', position: 'relative' }}>
              <div
                style={{
                  height: '100%',
                  background: v.color,
                  width: `${v.width}%`,
                  animation: `xp-grow 1.1s cubic-bezier(.2,.7,.2,1) ${v.delay}s both`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                    transform: 'translateX(-100%)',
                    animation: 'xp-shimmer 2.4s linear infinite',
                    animationDelay: `${1.1 + v.delay}s`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid rgba(17,17,17,0.08)',
          padding: '8px 10px',
          fontSize: '0.76rem',
          color: '#3a3a3a',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#F47B20',
            animation: 'rca-pulse 1.6s ease-in-out infinite',
          }}
        />
        <span>
          <strong style={{ color: '#111' }}>Alert sent</strong> — Variant A uplift +40% at 97% confidence.
        </span>
      </div>

      <style>{`
        @keyframes xp-grow {
          from { width: 0; }
        }
        @keyframes xp-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  )
}

/* ────────────────────────────────────────────────────────── */
/*  Main section                                               */
/* ────────────────────────────────────────────────────────── */

export function CapabilitiesBento() {
  return (
    <section id="features" className="lp-grid-bg" style={{ background: 'var(--adv-bg)', padding: '96px 0' }}>
      <div className="lp-wrap-wide">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 72px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: '#F47B20',
              color: '#fff',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              borderRadius: 2,
              marginBottom: 18,
            }}
          >
            Capabilities
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
            What Advaita Can Do
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#6b6b6b', lineHeight: 1.6, margin: 0 }}>
            Real-time tracking, AI root-cause analysis, experiments, and drop-in SDKs — the complete analytics stack on infrastructure you own.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <FeatureRow
            title="Advanced KPI growth tracking plus"
            subtitle="Advanced KPI growth tracking plus automated insights to drive better decision-making across business and product metrics."
            bullets={[
              'Track KPIs in real time',
              'Monitor growth trends instantly',
              'Compare progress over time',
            ]}
            image="https://images.unsplash.com/vector-1762006301173-56e3e209e89d?auto=format&fit=crop&w=1400&q=80"
            tint="linear-gradient(135deg, rgba(244,123,32,0.18) 0%, rgba(245,208,0,0.10) 50%, rgba(17,17,17,0.15) 100%)"
            preview={<KPIPreview />}
          />

          <FeatureRow
            reverse
            title="AI root-cause analysis, not just charts"
            subtitle="Advaita detects anomalies before you do and explains why in plain English — with confidence scores, source citations, and evidence."
            bullets={[
              'Automatic anomaly detection',
              'Plain-English root cause',
              'Evidence with confidence scores',
            ]}
            image="https://images.unsplash.com/vector-1744442860865-0765bab8753c?auto=format&fit=crop&w=1400&q=80"
            tint="linear-gradient(135deg, rgba(138,116,229,0.20) 0%, rgba(232,167,208,0.12) 50%, rgba(244,123,32,0.18) 100%)"
            preview={<RCAPreview />}
          />

          <FeatureRow
            title="SDKs for every platform you ship on"
            subtitle="One-line instrumentation across Python, TypeScript, JavaScript, Node, Go, Kotlin, Java, and Flutter — all with the same clean API."
            bullets={[
              '8+ platforms out of the box',
              'One-command install',
              'Same schema, everywhere',
            ]}
            image="https://images.unsplash.com/vector-1775456266139-56793a364661?auto=format&fit=crop&w=1400&q=80"
            tint="linear-gradient(135deg, rgba(26,122,46,0.20) 0%, rgba(0,173,216,0.12) 50%, rgba(245,208,0,0.18) 100%)"
            preview={<SDKPreview />}
          />

          <FeatureRow
            reverse
            title="Run experiments with confidence"
            subtitle="Launch notification-based A/B tests, track statistical significance automatically, and alert your team the moment a metric moves."
            bullets={[
              'Automated A/B analysis',
              'Winner detection with evidence',
              'Smart alerts to your team',
            ]}
            image="https://images.unsplash.com/vector-1758199808614-fa4f21866080?auto=format&fit=crop&w=1400&q=80"
            tint="linear-gradient(135deg, rgba(244,123,32,0.18) 0%, rgba(232,167,208,0.12) 50%, rgba(138,116,229,0.20) 100%)"
            preview={<ExperimentPreview />}
          />
        </div>
      </div>

      <style>{`
        .cap-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #fff;
          border: 1px solid var(--adv-border);
          border-radius: 0;
          overflow: hidden;
          align-items: stretch;
        }
        .cap-row-reverse .cap-preview { order: 2; }
        .cap-row-reverse .cap-content { order: 1; }

        .cap-content {
          background: #fff;
          padding: 56px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .cap-preview {
          position: relative;
          min-height: 400px;
        }
        .cap-preview-gradient {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 48px 40px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #1a1a1a;
        }
        .cap-preview-bg {
          position: absolute;
          inset: -20px;
          background-size: cover;
          background-position: center;
          filter: blur(18px) saturate(130%);
          transform: scale(1.08);
          pointer-events: none;
        }
        .cap-preview-tint {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .cap-preview-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          opacity: 0.4;
          mask-image: radial-gradient(ellipse at center, transparent 0%, black 85%);
        }
        .cap-preview-inner {
          position: relative;
          background: #fff;
          padding: 22px 24px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 18px 40px -18px rgba(17,17,17,0.35);
        }

        @media (max-width: 980px) {
          .cap-row { grid-template-columns: 1fr; }
          .cap-row-reverse .cap-preview { order: 1; }
          .cap-row-reverse .cap-content { order: 2; }
          .cap-content { padding: 40px 28px; }
          .cap-preview { min-height: 320px; }
          .cap-preview-gradient { padding: 32px 24px; }
        }
      `}</style>
    </section>
  )
}
