/* Integrations — horizontal marquee of colorful tool icons */

const INTEGRATIONS = [
  { name: 'Segment',    color: '#F47B20', Icon: IconAsterisk },
  { name: 'Sanity',     color: '#F24E1E', Icon: IconRose },
  { name: 'HubSpot',    color: '#E25444', Icon: IconSpiral },
  { name: 'Dropbox',    color: '#1B6CFF', Icon: IconDisc },
  { name: 'Linear',     color: '#14B8A6', Icon: IconSunburst },
  { name: 'Drive',      color: '#2E7DF6', Icon: IconDelta },
  { name: 'Webflow',    color: '#E0335B', Icon: IconZigZag },
  { name: 'Retool',     color: '#6D28D9', Icon: IconLoop },
  { name: 'Framer',     color: '#F47B20', Icon: IconOctagon },
  { name: 'Notion',     color: '#111111', Icon: IconNotion },
  { name: 'Slack',      color: '#E01E5A', Icon: IconSlack },
  { name: 'Stripe',     color: '#635BFF', Icon: IconStripe },
  { name: 'Postgres',   color: '#336791', Icon: IconElephant },
  { name: 'Snowflake',  color: '#29B5E8', Icon: IconFlake },
  { name: 'Kafka',      color: '#231F20', Icon: IconKafka },
  { name: 'Zapier',     color: '#FF4A00', Icon: IconBolt },
]

export function IntegrationsSection() {
  // Duplicate for seamless marquee
  const track = [...INTEGRATIONS, ...INTEGRATIONS]

  return (
    <section id="integrations" className="lp-grid-bg" style={{ background: 'var(--adv-bg)', padding: '80px 0' }}>
      {/* Header — centered */}
      <div className="lp-wrap-wide" style={{ textAlign: 'center', marginBottom: 56 }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 12px',
          background: '#fff',
          border: '1px solid var(--adv-border)',
          color: '#111',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          borderRadius: 6,
          marginBottom: 22,
          boxShadow: '0 1px 2px rgba(17,17,17,0.03)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F47B20' }} />
          Integrations
        </span>
        <h2 style={{
          fontFamily: "'Apfel Grotezk', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
          lineHeight: 1.08,
          letterSpacing: '-0.028em',
          color: '#111',
          margin: 0,
        }}>
          Connect your favorite tools
        </h2>
      </div>

      {/* Marquee row — spans full frame width */}
      <div
        className="integrations-marquee"
        style={{
          width: '100%',
          overflow: 'hidden',
          borderTop: '1px solid var(--adv-border)',
          borderBottom: '1px solid var(--adv-border)',
          background: '#fff',
          position: 'relative',
        }}
      >
        {/* Fade edges */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, width: 60,
          background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0) 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, width: 60,
          background: 'linear-gradient(270deg, #fff 0%, rgba(255,255,255,0) 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div className="marquee-track" style={{ gap: 0, padding: 0 }}>
          {track.map((it, i) => {
            const Icon = it.Icon
            return (
              <div
                key={i}
                style={{
                  width: 128,
                  height: 128,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRight: '1px solid var(--adv-border)',
                  background: '#fff',
                  transition: 'background 0.2s',
                }}
                title={it.name}
                onMouseEnter={e => { e.currentTarget.style.background = '#FAFAF4' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
              >
                <Icon color={it.color} />
              </div>
            )
          })}
        </div>
      </div>

      {/* See all */}
      <div style={{ textAlign: 'center', marginTop: 44 }}>
        <a href="#waitlist" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: '0.92rem',
          fontWeight: 600,
          color: '#111',
          textDecoration: 'none',
          padding: '8px 4px',
          transition: 'gap 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.gap = '12px'}
          onMouseLeave={e => e.currentTarget.style.gap = '8px'}
        >
          Coming Soon...
        </a>
      </div>
    </section>
  )
}

/* ─── SVG icon set (48×48 viewBox, stylized brand-like) ────── */

function IconAsterisk({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g stroke={color} strokeWidth="3.5" strokeLinecap="round">
        <line x1="24" y1="8"  x2="24" y2="40" />
        <line x1="10" y1="16" x2="38" y2="32" />
        <line x1="10" y1="32" x2="38" y2="16" />
        <line x1="8"  y1="24" x2="40" y2="24" />
      </g>
    </svg>
  )
}

function IconRose({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 6 C34 6 42 14 42 24 C42 34 34 42 24 42 C14 42 6 34 6 24 C6 14 14 6 24 6 Z" stroke={color} strokeWidth="3" fill="none" />
      <path d="M24 14 C30 14 34 18 34 24 C34 30 30 34 24 34 C18 34 14 30 14 24" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M24 22 C26 22 28 24 28 26" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function IconSpiral({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="24" cy="24" r="11" stroke={color} strokeWidth="3" fill="none" />
      <circle cx="24" cy="24" r="4"  fill={color} />
    </svg>
  )
}

function IconDisc({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" fill={color} />
      <circle cx="24" cy="24" r="9"  fill="#fff" />
      <circle cx="24" cy="24" r="3"  fill={color} />
    </svg>
  )
}

function IconSunburst({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g stroke={color} strokeWidth="3" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 12
          const x1 = 24 + Math.cos(a) * 8
          const y1 = 24 + Math.sin(a) * 8
          const x2 = 24 + Math.cos(a) * 18
          const y2 = 24 + Math.sin(a) * 18
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
      </g>
      <circle cx="24" cy="24" r="5" fill={color} />
    </svg>
  )
}

function IconDelta({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 6 L42 38 L6 38 Z" fill={color} />
      <path d="M24 14 L34 32 L14 32 Z" fill="#fff" />
      <path d="M24 20 L30 30 L18 30 Z" fill={color} />
    </svg>
  )
}

function IconZigZag({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M10 16 L22 16 L14 32 L38 32 L30 16 L42 16" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="18" y="12" width="12" height="5" fill={color} transform="rotate(-6 24 14)" opacity="0.85" />
      <rect x="18" y="32" width="12" height="5" fill={color} transform="rotate(-6 24 34)" opacity="0.85" />
    </svg>
  )
}

function IconLoop({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M10 24 a10 10 0 1 1 10 10" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M10 24 L6 20 M10 24 L6 28" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M38 24 a10 10 0 1 1 -10 -10" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M38 24 L42 28 M38 24 L42 20" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

function IconOctagon({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <polygon points="16,6 32,6 42,16 42,32 32,42 16,42 6,32 6,16" fill={color} />
      <path d="M16 24 L22 30 L33 18" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

function IconNotion({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="32" height="32" rx="3" stroke={color} strokeWidth="3" fill="none" />
      <path d="M16 16 L16 32 M16 16 L30 30 M30 16 L30 32" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function IconSlack({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g fill={color}>
        <rect x="10" y="18" width="6" height="12" rx="3" />
        <rect x="32" y="18" width="6" height="12" rx="3" />
        <rect x="18" y="10" width="12" height="6" rx="3" />
        <rect x="18" y="32" width="12" height="6" rx="3" />
      </g>
      <g fill={color} opacity="0.55">
        <rect x="16" y="16" width="6" height="6" />
        <rect x="26" y="16" width="6" height="6" />
        <rect x="16" y="26" width="6" height="6" />
        <rect x="26" y="26" width="6" height="6" />
      </g>
    </svg>
  )
}

function IconStripe({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="10" width="36" height="28" rx="3" fill={color} />
      <path d="M16 22 Q22 18 28 22 Q34 26 32 30" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="26" r="2" fill="#fff" />
      <circle cx="30" cy="22" r="2" fill="#fff" />
    </svg>
  )
}

function IconElephant({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M12 18 C12 10 20 6 26 8 C32 10 36 14 36 22 C36 28 34 32 30 34 L30 40 L26 40 L26 34 L22 34 L22 40 L18 40 L18 32 C14 30 12 26 12 18 Z" fill={color} />
      <circle cx="22" cy="18" r="2" fill="#fff" />
    </svg>
  )
}

function IconFlake({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <g stroke={color} strokeWidth="3" strokeLinecap="round">
        <line x1="24" y1="6"  x2="24" y2="42" />
        <line x1="8"  y1="15" x2="40" y2="33" />
        <line x1="8"  y1="33" x2="40" y2="15" />
      </g>
      <circle cx="24" cy="24" r="4" fill={color} />
    </svg>
  )
}

function IconKafka({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="10" r="4" fill={color} />
      <circle cx="12" cy="38" r="4" fill={color} />
      <circle cx="36" cy="38" r="4" fill={color} />
      <circle cx="24" cy="24" r="5" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M24 14 L24 19 M16 32 L20 26 M32 32 L28 26" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function IconBolt({ color }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M26 6 L10 28 L22 28 L18 42 L38 18 L26 18 Z" fill={color} />
    </svg>
  )
}
