/* "What Advaita Can Do" — clean, minimal grey-card layout (Dodo-style) */

import { useEffect, useRef, useState } from 'react'

/* ────────────────────────────────────────────────────────── */
/*  Shared hooks                                               */
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

/* ────────────────────────────────────────────────────────── */
/*  Feature row (left = copy, right = preview card)            */
/* ────────────────────────────────────────────────────────── */

function FeatureRow({ reverse = false, icon, iconBg, iconColor, label, title, description, learnMore, href = '#', preview }) {
  const [ref, inView] = useInView(0.18)

  return (
    <div
      ref={ref}
      className={`cap-row ${reverse ? 'cap-row-reverse' : ''}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div className="cap-content">
        <div className="cap-label-row">
          <span className="cap-label-icon" style={{ background: iconBg, color: iconColor }}>
            {icon}
          </span>
          <span className="cap-label-text">{label}</span>
        </div>
        <h3 className="cap-title">{title}</h3>
        <p className="cap-desc">{description}</p>
        <a href={href} className="cap-learn-more">
          Learn more about {learnMore}
        </a>
      </div>
      <div className="cap-preview">
        <div className="cap-preview-card">{preview}</div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────── */
/*  Animated Previews (unchanged)                              */
/* ────────────────────────────────────────────────────────── */

function KPIPreview() {
  return (
    <div style={{ color: '#111' }}>
      <div style={{ fontSize: '0.72rem', color: '#6b6b6b', marginBottom: 6, fontWeight: 600 }}>
        KPI Growth Tracking
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontFamily: "'Apfel Grotezk', sans-serif", fontWeight: 800, fontSize: '1.95rem', letterSpacing: '-0.02em' }}>
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

      <svg viewBox="0 0 300 120" width="100%" height="130" style={{ display: 'block' }}>
        <line x1="0" y1="20"  x2="300" y2="20"  stroke="rgba(17,17,17,0.08)" />
        <line x1="0" y1="60"  x2="300" y2="60"  stroke="rgba(17,17,17,0.08)" />
        <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(17,17,17,0.08)" />
        <text x="0" y="17"  fontSize="9" fill="#8a8a8a">50%</text>
        <text x="0" y="57"  fontSize="9" fill="#8a8a8a">25%</text>
        <text x="0" y="115" fontSize="9" fill="#8a8a8a">0</text>

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
      <div style={{ fontFamily: "'Apfel Grotezk', sans-serif", fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>
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
          <div style={{ fontFamily: "'Apfel Grotezk', sans-serif", fontWeight: 700, fontSize: '0.98rem' }}>
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
/*  Inline icons used in the label badges                      */
/* ────────────────────────────────────────────────────────── */

const TrackingIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M2 12L6 8L9 11L14 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const InsightIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
)
const SDKIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M5 4L1.5 8L5 12M11 4L14.5 8L11 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const FlaskIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M6 2H10M6.5 2V6.5L3 12.5C2.5 13.3 3.1 14 4 14H12C12.9 14 13.5 13.3 13 12.5L9.5 6.5V2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ────────────────────────────────────────────────────────── */
/*  Main section                                               */
/* ────────────────────────────────────────────────────────── */

export function CapabilitiesBento() {
  return (
    <section id="features" style={{ background: '#fff', padding: '110px 0' }}>
      <div className="lp-wrap-wide">
        {/* Heading */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 64px' }}>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 3.6vw, 2.7rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              color: '#0F0F0F',
              margin: '0 0 14px',
            }}
          >
            What Advaita Can Do
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b6b6b',
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "'Inter', sans-serif",
          }}>
            Real-time tracking, AI root-cause analysis, experiments, and drop-in SDKs —
            the complete analytics stack on infrastructure you own.
          </p>
        </div>

        {/* Feature rows */}
        <div className="cap-grid">
          <FeatureRow
            label="Tracking"
            icon={TrackingIcon}
            iconBg="#F4ECDF"
            iconColor="#C75A14"
            title={<>KPI growth tracking,<br />built for product teams</>}
            description="Track KPIs in real time, monitor growth trends instantly, and compare progress over time — with automated insights to drive better decisions across business and product metrics."
            learnMore="Tracking"
            preview={<KPIPreview />}
          />

          <FeatureRow
            reverse
            label="AI Insights"
            icon={InsightIcon}
            iconBg="#ECE5FA"
            iconColor="#6F58C9"
            title={<>AI root-cause analysis,<br />not just charts</>}
            description="Advaita detects anomalies before you do and explains the why in plain English — with confidence scores, source citations, and supporting evidence."
            learnMore="AI Insights"
            preview={<RCAPreview />}
          />

          <FeatureRow
            label="SDKs"
            icon={SDKIcon}
            iconBg="#DDEEE0"
            iconColor="#1A7A2E"
            title={<>SDKs for every<br />platform you ship on</>}
            description="One-line instrumentation across Python, TypeScript, JavaScript, Node, Go, Kotlin, Java, and Flutter — all with the same clean API and consistent schema."
            learnMore="SDKs"
            preview={<SDKPreview />}
          />

          <FeatureRow
            reverse
            label="Experiments"
            icon={FlaskIcon}
            iconBg="#FAEFC2"
            iconColor="#A18800"
            title={<>Run experiments<br />with confidence</>}
            description="Launch notification-based A/B tests, track statistical significance automatically, and alert your team the moment a metric meaningfully moves."
            learnMore="Experiments"
            preview={<ExperimentPreview />}
          />
        </div>
      </div>

      <style>{`
        .cap-grid {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .cap-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: rgb(251,251,250);
          border: 1px solid rgba(17,17,17,0.05);
          border-radius: 13px;
          overflow: hidden;
          align-items: stretch;
          min-height: 380px;
        }
        .cap-row-reverse .cap-content { order: 2; }
        .cap-row-reverse .cap-preview { order: 1; }

        .cap-content {
          padding: 56px 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .cap-label-row {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 22px;
        }
        .cap-label-icon {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cap-label-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: -0.005em;
        }
        .cap-title {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: clamp(1.45rem, 2.3vw, 1.95rem);
          letter-spacing: -0.022em;
          color: #0F0F0F;
          margin: 0 0 18px;
          line-height: 1.18;
        }
        .cap-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.96rem;
          color: #5a5a5a;
          line-height: 1.65;
          margin: 0 0 28px;
          max-width: 460px;
        }
        .cap-learn-more {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0F0F0F;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 1.5px;
          transition: opacity 0.18s ease;
        }
        .cap-learn-more:hover { opacity: 0.7; }

        /* Right-side preview card — clean white, subtle bleed off the outer edge */
        .cap-preview {
          position: relative;
          display: flex;
          align-items: center;
          padding: 40px 0 40px 20px;
          overflow: hidden;
        }
        .cap-preview-card {
          background: #fff;
          border: 1px solid rgba(17,17,17,0.06);
          border-radius: 12px;
          padding: 22px 24px;
          width: calc(100% + 40px);
          max-width: 520px;
          box-shadow: 0 12px 32px -14px rgba(17,17,17,0.10);
        }
        .cap-row-reverse .cap-preview {
          padding: 40px 20px 40px 0;
          justify-content: flex-end;
        }
        .cap-row-reverse .cap-preview-card {
          margin-left: -40px;
        }

        @media (max-width: 980px) {
          .cap-row {
            grid-template-columns: 1fr;
            min-height: 0;
          }
          .cap-content { padding: 36px 28px 8px; }
          .cap-preview {
            padding: 24px 20px 32px !important;
            justify-content: center !important;
          }
          .cap-preview-card {
            width: 100% !important;
            margin: 0 !important;
            max-width: 480px;
          }
          .cap-row-reverse .cap-content { order: 1; }
          .cap-row-reverse .cap-preview { order: 2; }
        }
      `}</style>
    </section>
  )
}
