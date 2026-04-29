import { lazy, Suspense } from 'react'
import { FOOTER_LINKS } from '../constants/index.jsx'
import logoImg from '../assets/Logo.png'

/* Heavy canvas particle background — load lazily so it never blocks
   the footer's first paint. */
const FloatingParticlesBackground = lazy(
  () => import('../components/FloatingParticlesBackground.jsx'),
)

export function Footer() {
  return (
    <footer
      style={{
        background: '#0A0A0A',
        color: '#F0EBE0',
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Animated particle background */}
      <Suspense fallback={null}>
        <FloatingParticlesBackground
          particleCount={70}
          particleSize={2}
          particleOpacity={0.55}
          glowIntensity={12}
          movementSpeed={0.4}
          mouseInfluence={140}
          mouseGravity="attract"
          gravityStrength={60}
          glowAnimation="ease"
          backgroundColor="transparent"
          particleColor="#F47B20"
        />
      </Suspense>

      <div
        style={{
          maxWidth: 1300,
          margin: '0 auto',
          borderLeft: '1px solid rgba(240,235,224,0.10)',
          borderRight: '1px solid rgba(240,235,224,0.10)',
          position: 'relative',
          zIndex: 1,
        }}
      >
      <div className="lp-wrap">
        {/* Top: logo column + link columns */}
        <div className="lp-footer-cols">
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img
                src={logoImg}
                alt="Advaita logo"
                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', background: 'none' }}
              />
              <span style={{ fontFamily: "'Apfel Grotezk', sans-serif", fontWeight: 700, fontSize: '1.2rem', color: '#F0EBE0' }}>Advaita Intelligence</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'rgba(240,235,224,0.45)', lineHeight: 1.65, maxWidth: 240 }}>
              AI-powered clickstream analytics. Open source, self-hosted, and built for engineering teams.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {/* GitHub */}
              <a href="#" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(240,235,224,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(240,235,224,0.4)', transition: 'color 0.2s, border-color 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F0EBE0'; e.currentTarget.style.borderColor = 'rgba(240,235,224,0.25)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,235,224,0.4)'; e.currentTarget.style.borderColor = 'rgba(240,235,224,0.1)' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="#" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(240,235,224,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(240,235,224,0.4)', transition: 'color 0.2s, border-color 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F0EBE0'; e.currentTarget.style.borderColor = 'rgba(240,235,224,0.25)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,235,224,0.4)'; e.currentTarget.style.borderColor = 'rgba(240,235,224,0.1)' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{ fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 700, color: 'rgba(240,235,224,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 }}>
                {heading}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(l => (
                  <a key={l} href="#" style={{ fontSize: '0.875rem', color: 'rgba(240,235,224,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#F0EBE0'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,235,224,0.55)'}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(240,235,224,0.06)', paddingTop: 16, paddingBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(240,235,224,0.3)' }}>© 2026 Advaita Intelligence Private Limited.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Status', 'Security'].map(l => (
              <a key={l} href="#" style={{ fontSize: '0.78rem', color: 'rgba(240,235,224,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(240,235,224,0.6)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,235,224,0.3)'}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Giant brand wordmark at the bottom */}
      <div style={{ padding: '0 32px', overflow: 'hidden', lineHeight: 1, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: 32, paddingBottom: 0 }}>
        <div className="footer-brand-text" style={{fontFamily:'IBM Plex Sans'}}>ADVAITA</div>
      </div>
      </div>
    </footer>
  )
}
