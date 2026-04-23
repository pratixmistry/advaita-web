import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logoImg from '../assets/Logo.png'

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
      { label: 'Getting Started', desc: 'Quickstart guides and tutorials', href: 'https://docs.advaita.ai/getting-started/overview' },
      { label: 'API Reference', desc: 'Comprehensive API documentation', href: 'https://docs.advaita.ai/api/overview' },
      { label: 'SDK', desc: 'Explore our software development kit', href: 'https://docs.advaita.ai/examples/overview' },
    ]
  }
]

export function Navbar({ onLogin, onPricing }) {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(250,250,244,0.92)',
        backdropFilter: 'blur(14px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
        borderBottom: '1px solid rgba(17,17,17,0.06)',
        isolation: 'isolate',
      }}>
        <div className="lp-wrap-wide" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 80,
        }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img
                src={logoImg}
                alt="Advaita logo"
                style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', background: 'none' }}
            />
            <span style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 500,
              fontSize: '1.20rem',
              letterSpacing: '-0.02em',
              color: '#111',
              lineHeight: 1,
            }}>
              ADVAITA INTELLIGENCE
            </span>
          </a>

          {/* Desktop nav */}
          <div className="lp-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '10px 14px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#3a3a3a',
                    textDecoration: 'none',
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    borderRadius: 8,
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
                        borderRadius: 2,
                        padding: 8,
                        boxShadow: '0 14px 40px rgba(17,17,17,0.10)',
                      }}>
                        {item.links.map(l => (
                          <a key={l.label} href="#" style={{
                            display: 'block',
                            padding: '10px 12px',
                            borderRadius: 2,
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

          {/* Desktop CTA */}
          <div className="lp-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={onLogin}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#3a3a3a',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: '9px 14px',
              }}
            >
              Sign in
            </button> 
            <a
              href="#waitlist"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 18px',
                background: '#F47B20',
                color: '#fff',
                fontSize: '0.87rem',
                fontWeight: 700,
                borderRadius: 2,
                textDecoration: 'none',
                fontFamily: 'inherit',
                boxShadow: '0 6px 16px rgba(244,123,32,0.28)',
                transition: 'transform 0.18s, background 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e06b10'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F47B20'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Join the Waitlist
            </a>
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
              top: 80,
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
                    setMobileOpen(false)
                  }}
                  style={{ padding: '12px 4px', fontSize: '0.95rem', fontWeight: 600, color: '#111', textDecoration: 'none', borderBottom: '1px solid rgba(17,17,17,0.05)' }}
                >
                  {item.label}
                </a>
              ))}
              <a href="#waitlist" onClick={() => setMobileOpen(false)} style={{
                marginTop: 12,
                display: 'block',
                textAlign: 'center',
                padding: '12px 18px',
                background: '#F47B20',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: 2,
                textDecoration: 'none',
              }}>
                Join the Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
