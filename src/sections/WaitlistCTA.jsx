import { useState } from 'react'
import { motion } from 'framer-motion'

export function WaitlistCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="waitlist" style={{ position: 'relative', padding: '112px 0', overflow: 'hidden', background: '#FAFAF8' }}>
      {/* Glow blob */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 800, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(244,123,32,0.11) 0%, rgba(79,70,229,0.07) 45%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="lp-wrap" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid rgba(0,0,0,0.07)', fontSize: '0.78rem', fontWeight: 600, color: '#64748B', padding: '6px 14px', borderRadius: 999, marginBottom: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F47B20' }} />
          Limited early access — join now
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', color: '#0F172A', lineHeight: 1.1, marginBottom: 20 }}
        >
          Know why users churn.<br />
          <em style={{ fontStyle: 'italic', color: '#F47B20' }}>Before they do.</em>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
          style={{ fontSize: '1.1rem', color: '#64748B', marginBottom: 40, fontWeight: 300, lineHeight: 1.7 }}
        >
          Join engineers who switched from dashboards to answers. Free plan, no credit card.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, maxWidth: 440, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                style={{ flex: 1, minWidth: 220, padding: '14px 20px', background: '#fff', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 999, fontSize: '0.9rem', color: '#111', outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#F47B20'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '14px 28px', background: '#F47B20', color: '#fff', border: 'none', borderRadius: 999, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 18px rgba(244,123,32,0.28)', whiteSpace: 'nowrap', fontFamily: 'inherit' }}
              >
                Get early access
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#ECFDF5', border: '1px solid rgba(5,150,105,0.2)', color: '#059669', fontWeight: 600, fontSize: '0.9rem', padding: '14px 24px', borderRadius: 16, maxWidth: 360 }}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <polyline points="16 5 8 13 4 9" />
              </svg>
              You're on the list! We'll be in touch soon.
            </motion.div>
          )}
          <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: 14 }}>No spam. Unsubscribe anytime. SOC2 compliant.</p>
        </motion.div>
      </div>
    </section>
  )
}
