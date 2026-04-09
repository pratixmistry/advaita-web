import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function NavItem({ item, onPricing, textColor = '#475569' }) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef(null)

  const show = () => { clearTimeout(timerRef.current); setOpen(true) }
  const hide = () => { timerRef.current = setTimeout(() => setOpen(false), 120) }

  return (
    <div style={{ position: 'relative' }} onMouseEnter={show} onMouseLeave={hide}>
      <button style={{
        display: 'flex', alignItems: 'center', gap: 4,
        fontSize: '0.92rem', fontWeight: 600,
        color: open ? '#F47B20' : textColor,
        background: 'none', border: 'none', cursor: 'pointer', padding: '8px 2px',
        transition: 'color 0.15s', fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}>
        {item.label}
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', opacity: 0.5 }}>
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 'calc(100% + 10px)', left: 0,
              background: '#fff', borderRadius: 14,
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.04)',
              padding: '8px', minWidth: 220, zIndex: 100,
            }}
          >
            <div style={{
              position: 'absolute', top: -5, left: 20,
              width: 10, height: 10, background: '#fff',
              border: '1px solid rgba(0,0,0,0.08)', borderBottom: 'none', borderRight: 'none',
              rotate: '45deg',
            }} />
            {item.links.map(l => (
              <a key={l.label} href="#"
                style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '9px 12px', borderRadius: 9, textDecoration: 'none', transition: 'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                onClick={e => { e.preventDefault(); if (onPricing) { onPricing(); setOpen(false) } }}
              >
                <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#111', lineHeight: 1.3 }}>{l.label}</span>
                <span style={{ fontSize: '0.76rem', color: '#94A3B8', lineHeight: 1.4 }}>{l.desc}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
