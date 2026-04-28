import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logoImg from '../assets/Logo.png'
import { LOGIN_URL, DASHBOARD_URL, isAuthenticated } from '../utils/auth.js'

const NAV_DROPDOWNS = [
  {
    label: 'Product',
    links: [
      { label: 'Live Events', desc: 'Real-time event stream' },
      { label: 'Funnels',     desc: 'Conversion drop-off analysis' },
      { label: 'Retention',   desc: 'Cohort retention over time' },
      { label: 'DS Chatbot',  desc: 'Your on-call data scientist' },
      { label: 'UR Chatbot',  desc: 'Your always-on user researcher' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About',    desc: 'Our mission & team' },
      { label: 'Blog',     desc: 'Engineering & product writing' },
      { label: 'Careers',  desc: "We're hiring" },
      { label: 'Contact',  desc: 'Talk to us' },
    ],
  },
  {
    label: 'Pricing',
    href: '#',
  },
  {
    label: 'Docs',
    links: [
      { label: 'Getting Started', desc: 'Quickstart guides and tutorials', target: 'docs', anchor: 'quickstart' },
      { label: 'SDKs',            desc: 'Explore our 10 native SDKs',      target: 'docs', anchor: 'sdk-grid' },
      { label: 'Video Tutorials', desc: 'Short walkthroughs and demos',    target: 'docs', anchor: 'video-tutorials' },
      { label: 'API Reference',   desc: 'POST /batch and event spec',      target: 'docs', anchor: 'api-batch' },
    ]
  }
]

export function Navbar({ onPricing, onSdks, onDocs }) {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  // Client-only SPA (Vite) — safe to compute auth state at initial render.
  const [authed] = useState(() => isAuthenticated())

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        background: 'white',
        backdropFilter: 'blur(14px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
        borderBottom: '1px solid rgba(17,17,17,0.06)',
        isolation: 'isolate',
      }}>
        <div className="lp-nav-wrap" style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: 80,
          gap: 24,
        }}>
          {/* Logo (left column) */}
          <a href="#" className="lp-logo" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
            minWidth: 0,
            justifySelf: 'start',
          }}>
            <img
                src={logoImg}
                alt="Advaita logo"
                className="lp-logo-img"
                style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', background: 'none', flexShrink: 0 }}
            />
            <span className="lp-logo-text" style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '1.24rem',
              letterSpacing: '-0.02em',
              color: '#0F0F0F',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              ADVAITA INTELLIGENCE
            </span>
          </a>

          {/* Desktop nav (center column) */}
          <div className="lp-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4, justifySelf: 'center' }}>
            {NAV_DROPDOWNS.map(item => (
              <div
                key={item.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => !item.href && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.label === 'Pricing' && onPricing) { e.preventDefault(); onPricing() }
                    if (item.label === 'Docs' && onDocs) { e.preventDefault(); onDocs() }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F5F5F2'
                    e.currentTarget.style.color = '#0F0F0F'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#1a1a1a'
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: '#1a1a1a',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    borderRadius: 8,
                    letterSpacing: '-0.005em',
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                >
                  {item.label}
                  {!item.href && (
                    <svg viewBox="0 0 12 12" width="10" height="10" stroke="currentColor" strokeWidth="1.8" fill="none" style={{ opacity: 0.5, marginTop: 2 }}>
                      <path d="M2.5 4.5l3.5 3.5 3.5-3.5" />
                    </svg>
                  )}
                </a>
                <AnimatePresence>
                  {openDropdown === item.label && item.links && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        paddingTop: 8,
                        minWidth: 280,
                      }}
                    >
                      <div style={{
                        background: '#fff',
                        border: '1px solid var(--adv-border)',
                        borderRadius: 6,
                        padding: 8,
                        boxShadow: '0 14px 40px rgba(17,17,17,0.10)',
                      }}>
                        {item.links.map(l => (
                          <a key={l.label}
                            href={l.href || '#'}
                            onClick={(e) => {
                              if (l.target === 'docs' && onDocs) {
                                e.preventDefault()
                                onDocs()
                                if (l.anchor) {
                                  setTimeout(() => {
                                    const el = document.getElementById(l.anchor)
                                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                  }, 80)
                                }
                                setOpenDropdown(null)
                              } else if (l.target === 'sdks' && onSdks) {
                                e.preventDefault(); onSdks(); setOpenDropdown(null)
                              }
                            }}
                            style={{
                              display: 'block',
                              padding: '10px 12px',
                              borderRadius: 6,
                              textDecoration: 'none',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#FAFAF4'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>{l.label}</div>
                            <div style={{ fontSize: '0.78rem', color: '#777', marginTop: 2 }}>{l.desc}</div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA (right column) */}
          <div className="lp-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 10, justifySelf: 'end' }}>
            {authed ? (
              <a
                href={DASHBOARD_URL}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 18px',
                  background: '#F47B20',
                  color: '#fff',
                  fontSize: '0.87rem',
                  fontWeight: 700,
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontFamily: 'inherit',
                  boxShadow: '0 6px 16px rgba(244,123,32,0.28)',
                  transition: 'transform 0.18s, background 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e06b10'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F47B20'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Go to Dashboard
              </a>
            ) : (
              <a
                href={LOGIN_URL}
                className="login-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '8px 22px',
                  background: '#F5F5F2',
                  color: '#1a1a1a',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.005em',
                }}
              >
                <span className="login-btn-inner">
                  <span className="login-btn-text">Login</span>
                  <span className="login-btn-text login-btn-text--hover" aria-hidden="true">Login</span>
                </span>
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              padding: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 22, height: 2, background: '#111', display: 'block',
                transition: 'all 0.25s ease',
                transform: mobileOpen && i === 0 ? 'rotate(45deg) translateY(7px)' : mobileOpen && i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Login button text ticker animation (bg stays static) */}
      <style>{`
        .login-btn { overflow: hidden; }
        .login-btn-inner {
          position: relative;
          display: inline-block;
          line-height: 1.2;
          height: 1.2em;
          overflow: hidden;
        }
        .login-btn-text {
          display: block;
          transition: transform 0.32s cubic-bezier(0.65, 0, 0.35, 1);
          will-change: transform;
        }
        .login-btn-text--hover {
          position: absolute;
          inset: 100% 0 auto 0;
        }
        .login-btn:hover .login-btn-text { transform: translateY(-100%); }
        .login-btn:hover .login-btn-text--hover { transform: translateY(-100%); }
      `}</style>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'sticky',
              top: 72,
              zIndex: 59,
              background: '#fff',
              borderBottom: '1px solid rgba(17,17,17,0.08)',
              overflow: 'hidden',
            }}
          >
            <div className="lp-wrap" style={{ paddingTop: 16, paddingBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV_DROPDOWNS.map(item => (
                <a key={item.label}
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.label === 'Pricing' && onPricing) { e.preventDefault(); onPricing() }
                    if (item.label === 'Docs' && onDocs) { e.preventDefault(); onDocs() }
                    setMobileOpen(false)
                  }}
                  style={{ padding: '12px 4px', fontSize: '0.95rem', fontWeight: 600, color: '#111', textDecoration: 'none', borderBottom: '1px solid rgba(17,17,17,0.05)' }}
                >
                  {item.label}
                </a>
              ))}
              {authed ? (
                <a href={DASHBOARD_URL} onClick={() => setMobileOpen(false)} style={{
                  marginTop: 12,
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px 18px',
                  background: '#F47B20',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  borderRadius: 6,
                  textDecoration: 'none',
                }}>
                  Go to Dashboard
                </a>
              ) : (
                <a href={LOGIN_URL} onClick={() => setMobileOpen(false)} style={{
                  marginTop: 12,
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px 18px',
                  background: '#F5F5F2',
                  color: '#111',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: 6,
                  border: '1px solid rgba(17,17,17,0.06)',
                  textDecoration: 'none',
                }}>
                  Login
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
