import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from './Logo.jsx'
import { NavItem } from './NavItem.jsx'
import { NAV_ITEMS } from '../constants/index.jsx'

export function Navbar({ offsetTop = 0, onLogin }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(prev => prev ? y > 20 : y > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    // Outer nav: always full-width fixed strip — never moves, no left/x animation
    <nav style={{ position: 'fixed', top: offsetTop, left: 0, right: 0, zIndex: 60, pointerEvents: 'none', transition: 'top 0.3s ease' }}>
      {/* Inner pill: this is what animates — only opacity/radius/background/shadow/padding change */}
      <motion.div
        animate={scrolled ? {
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 10,
          borderRadius: 100,
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          border: '1px solid rgba(0,0,0,0.08)',
          paddingLeft: 20,
          paddingRight: 20,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        } : {
          maxWidth: 1280,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 0,
          borderRadius: 0,
          background: 'rgba(250,250,248,0)',
          backdropFilter: 'blur(0px) saturate(100%)',
          WebkitBackdropFilter: 'blur(0px) saturate(100%)',
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          border: '1px solid transparent',
          paddingLeft: 32,
          paddingRight: 32,
          transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? 52 : 72, transition: 'height 0.4s ease' }}>

          {/* Logo + wordmark */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <Logo size={scrolled ? 'sm' : 'md'} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: scrolled ? '1.05rem' : '1.2rem', color: '#111111', letterSpacing: '-0.01em', transition: 'font-size 0.4s ease' }}>
              Advaita
            </span>
          </a>

          {/* Desktop nav links with dropdowns */}
          <div className="lp-nav-links" style={{ display: 'flex', gap: scrolled ? 20 : 40 }}>
            {NAV_ITEMS.map(item => <NavItem key={item.label} item={item} />)}
          </div>

          {/* Desktop CTAs — Amplitude/Mixpanel style */}
          <div className="lp-nav-actions" style={{ display: 'flex' }}>
            {/* Log in — plain text link (hidden for now) */}
            {/* <a href="#" onClick={e => { e.preventDefault(); onLogin?.() }} style={{
              fontSize: '0.875rem', fontWeight: 500, color: '#475569',
              textDecoration: 'none', padding: '9px 14px', transition: 'color 0.15s',
              whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#111'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            >
              Log in
            </a> */}

            {/* Contact Sales — outlined, hidden when pill */}
            <a href="#contact" style={{
              fontSize: '0.875rem', fontWeight: 500, color: '#1E293B',
              textDecoration: 'none', padding: '8px 16px',
              border: '1.5px solid rgba(15,23,42,0.18)', borderRadius: 8,
              transition: 'all 0.15s', whiteSpace: 'nowrap',
              display: scrolled ? 'none' : 'inline-block',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.38)'; e.currentTarget.style.background = 'rgba(15,23,42,0.03)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(15,23,42,0.18)'; e.currentTarget.style.background = 'transparent' }}
            >
              Contact Sales
            </a>

            {/* Join Waitlist — solid dark pill */}
            <motion.a
              href="#waitlist"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontSize: '0.875rem', fontWeight: 600, color: '#fff',
                textDecoration: 'none', padding: '9px 20px',
                background: '#0F172A', borderRadius: 8,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                whiteSpace: 'nowrap', transition: 'background 0.15s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1E293B'}
              onMouseLeave={e => e.currentTarget.style.background = '#0F172A'}
            >
              Get early access
              <span style={{ color: '#F47B20', fontSize: '1rem', lineHeight: 1 }}>→</span>
            </motion.a>
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
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{ background: 'rgba(250,250,248,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', pointerEvents: 'auto' }}
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
                          <a key={l.label} href="#" style={{ display: 'block', padding: '7px 0', fontSize: '0.85rem', color: '#475569', textDecoration: 'none', fontWeight: 500 }} onClick={() => setMenuOpen(false)}>
                            {l.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, marginTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                {/* <a href="#" style={{ textAlign: 'center', padding: '11px 20px', border: '1.5px solid rgba(0,0,0,0.14)', borderRadius: 8, fontSize: '0.875rem', fontWeight: 500, color: '#475569', textDecoration: 'none' }}>Log in</a> */}
                <a href="#contact" style={{ textAlign: 'center', padding: '11px 20px', border: '1.5px solid rgba(15,23,42,0.18)', borderRadius: 8, fontSize: '0.875rem', fontWeight: 500, color: '#1E293B', textDecoration: 'none' }}>Contact Sales</a>
                <a href="#waitlist" style={{ textAlign: 'center', padding: '11px 20px', background: '#0F172A', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Get started free</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
