import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavItem } from './NavItem.jsx'
import { NAV_ITEMS } from '../constants/index.jsx'
import logoImg from '../assets/Logo.jpeg'

export function Navbar({ offsetTop = 0, onLogin, onPricing }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Outer wrapper: always full-width fixed, provides the horizontal inset margin.
  // pointer-events: none so gaps between logo and links are click-through.
  const outerStyle = {
    position: 'fixed',
    top: offsetTop,
    left: 0,
    right: 0,
    zIndex: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scrolled ? '0 24px' : `0 clamp(32px, 5vw, 72px)`,
    pointerEvents: 'none',
    transition: 'padding 0.55s cubic-bezier(0.4,0,0.2,1)',
  }

  // Inner container: transitions from full-spread transparent bar → compact glass pill.
  const TRANSITION = '0.55s cubic-bezier(0.4,0,0.2,1)'
  const innerStyle = {
    pointerEvents: 'all',
    width: '100%',
    maxWidth: scrolled ? '860px' : '1600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scrolled ? '62px' : 'auto',
    padding: scrolled ? '0 36px' : '0',
    borderRadius: scrolled ? '999px' : '0px',
    background: scrolled ? 'rgba(14,14,14,0.72)' : 'transparent',
    backdropFilter: scrolled ? 'blur(22px) saturate(1.5)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(1.5)' : 'none',
    border: scrolled
      ? '1px solid rgba(255,255,255,0.08)'
      : '1px solid transparent',
    boxShadow: scrolled
      ? '0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04) inset'
      : 'none',
    transition: [
      `max-width ${TRANSITION}`,
      `padding ${TRANSITION}`,
      `border-radius ${TRANSITION}`,
      `background ${TRANSITION}`,
      `border-color ${TRANSITION}`,
      `box-shadow ${TRANSITION}`,
    ].join(', '),
  }

  return (
    <>
      {/* ── Desktop navbar ── */}
      <div style={outerStyle} className="lp-navbar-outer">
        <div style={innerStyle}>

          {/* Logo — black text in default (over white panel), white when scrolled */}
          <a
            href="#"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
          >
            <img
              src={logoImg}
              alt="Advaita logo"
              style={{
                width: scrolled ? 26 : 30,
                height: scrolled ? 26 : 30,
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
                transition: `width ${TRANSITION}, height ${TRANSITION}`,
              }}
            />
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: scrolled ? '1rem' : '1.1rem',
              letterSpacing: '-0.02em',
              color: scrolled ? '#ffffff' : '#111111',
              transition: `color ${TRANSITION}, font-size ${TRANSITION}`,
            }}>
              ADVAITA
            </span>
          </a>

          {/* Right group: nav links + CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: scrolled ? '32px' : '36px',
            transition: `gap ${TRANSITION}`,
          }}>
            {/* Nav links — white text (over dark panel in default, over glass in scrolled) */}
            <div style={{ display: 'flex', gap: scrolled ? '22px' : '28px', transition: `gap ${TRANSITION}` }}>
              {NAV_ITEMS.map(item => (
                <NavItem
                  key={item.label}
                  item={item}
                  textColor="rgba(255,255,255,0.75)"
                  onPricing={item.label === 'Pricing' ? onPricing : undefined}
                />
              ))}
            </div>

            {/* CTA — orange, sharp radius */}
            <a
              href="#waitlist"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: scrolled ? '0.83rem' : '0.85rem',
                fontWeight: 700,
                color: '#ffffff',
                textDecoration: 'none',
                padding: scrolled ? '9px 20px' : '9px 22px',
                background: '#F47B20',
                borderRadius: 4,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                fontFamily: "'Manrope', sans-serif",
                transition: `background 0.18s, padding ${TRANSITION}, font-size ${TRANSITION}`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e06b10' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F47B20' }}
            >
              Early Access
            </a>
          </div>
        </div>
      </div>

      {/* ── Mobile hamburger ── */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
        style={{
          position: 'fixed',
          top: offsetTop + 20,
          right: 20,
          zIndex: 61,
          display: 'none',
          flexDirection: 'column',
          gap: 5,
          padding: 8,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {[
          { transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' },
          { opacity: menuOpen ? 0 : 1 },
          { transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' },
        ].map((extra, i) => (
          <span key={i} style={{ width: 22, height: 2, background: '#fff', display: 'block', ...extra }} />
        ))}
      </button>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              top: offsetTop + 68,
              left: 0, right: 0,
              zIndex: 59,
              background: 'rgba(14,14,14,0.92)',
              backdropFilter: 'blur(16px)',
              overflow: 'hidden',
            }}
          >
            <div className="lp-wrap" style={{ paddingTop: 12, paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_ITEMS.map(item => (
                <div key={item.label}>
                  <button
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#fff', fontFamily: 'inherit' }}
                    onClick={() => setMobileSection(s => s === item.label ? null : item.label)}
                  >
                    {item.label}
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10"
                      style={{ transition: 'transform 0.2s', transform: mobileSection === item.label ? 'rotate(180deg)' : 'none', opacity: 0.4 }}>
                      <path d="M2 4l4 4 4-4" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {mobileSection === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        style={{ overflow: 'hidden', paddingLeft: 12, paddingBottom: 8 }}
                      >
                        {item.links.map(l => (
                          <a key={l.label} href="#"
                            style={{ display: 'block', padding: '7px 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500 }}
                            onClick={() => setMenuOpen(false)}
                          >
                            {l.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div style={{ paddingTop: 16, marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <a href="#waitlist" style={{ display: 'block', textAlign: 'center', padding: '11px 20px', background: '#F47B20', borderRadius: 4, fontSize: '0.875rem', fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
                  Early Access
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
