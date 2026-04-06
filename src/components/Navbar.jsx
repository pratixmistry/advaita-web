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
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: offsetTop,
      left: 0, right: 0,
      zIndex: 60,
      background: '#F0EEE8',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
      boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.06)' : 'none',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: scrolled ? 62 : 76,
        maxWidth: 1280, margin: '0 auto', padding: '0 28px',
        transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* Logo + wordmark */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <img
            src={logoImg}
            alt="Advaita logo"
            style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', background: 'none' }}
          />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.3rem', color: '#111111', letterSpacing: '-0.01em' }}>
            ADVAITA
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="lp-nav-links" style={{ display: 'flex', gap: 24 }}>
          {NAV_ITEMS.map(item => <NavItem key={item.label} item={item} onPricing={item.label === 'Pricing' ? onPricing : undefined} />)}
        </div>

        {/* Desktop CTAs */}
        <div className="lp-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="#contact"
            style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111111', textDecoration: 'none', padding: '8px 14px', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#F47B20'}
            onMouseLeave={e => e.currentTarget.style.color = '#111111'}
          >
            Contact Sales
          </a>
          <a href="#waitlist"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', textDecoration: 'none', padding: '10px 22px', background: '#111111', borderRadius: 4, transition: 'background 0.15s', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.background = '#2A2A2A'}
            onMouseLeave={e => e.currentTarget.style.background = '#111111'}
          >
            Get early access <span style={{ color: '#F47B20', fontSize: '1rem' }}>→</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="ham-line" style={{ width: 22, height: 2, background: '#111', display: 'block', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span className="ham-line" style={{ width: 22, height: 2, background: '#111', display: 'block', opacity: menuOpen ? 0 : 1 }} />
          <span className="ham-line" style={{ width: 22, height: 2, background: '#111', display: 'block', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{ background: '#F0EEE8', borderBottom: '1px solid rgba(0,0,0,0.07)', overflow: 'hidden' }}
          >
            <div className="lp-wrap" style={{ paddingTop: 12, paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_ITEMS.map(item => (
                <div key={item.label}>
                  <button
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#111', fontFamily: 'inherit' }}
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
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }} style={{ overflow: 'hidden', paddingLeft: 12, paddingBottom: 8 }}>
                        {item.links.map(l => (
                          <a key={l.label} href="#" style={{ display: 'block', padding: '7px 0', fontSize: '0.85rem', color: '#64748B', textDecoration: 'none', fontWeight: 500 }} onClick={() => setMenuOpen(false)}>
                            {l.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, marginTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <a href="#pricing" onClick={e => { e.preventDefault(); setMenuOpen(false); onPricing && onPricing() }} style={{ textAlign: 'center', padding: '11px 20px', border: '1.5px solid rgba(0,0,0,0.14)', borderRadius: 4, fontSize: '0.875rem', fontWeight: 600, color: '#111', textDecoration: 'none' }}>Pricing</a>
                <a href="#contact" style={{ textAlign: 'center', padding: '11px 20px', border: '1.5px solid rgba(0,0,0,0.14)', borderRadius: 4, fontSize: '0.875rem', fontWeight: 600, color: '#111', textDecoration: 'none' }}>Contact Sales</a>
                <a href="#waitlist" style={{ textAlign: 'center', padding: '11px 20px', background: '#111', borderRadius: 4, fontSize: '0.875rem', fontWeight: 700, color: '#ffffff', textDecoration: 'none' }}>Get started free</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
