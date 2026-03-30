import { motion } from 'framer-motion'
import { DashboardPreview } from '../components/DashboardPreview.jsx'
import { fadeUp, stagger } from '../constants/index.jsx'

export function Hero() {
  return (
    <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 0, overflow: 'hidden' }}>
      {/* Gradient mesh blobs */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 800, height: 800, top: '-20%', left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,123,32,0.13) 0%, transparent 65%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 560, height: 560, top: '10%', left: '-5%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', width: 480, height: 480, top: '10%', right: '-5%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      </div>

      <div className="lp-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={stagger} initial="hidden" animate="visible"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 28 }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.07)', fontSize: '0.78rem', fontWeight: 600, color: '#475569', padding: '6px 16px', borderRadius: 999, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', flexShrink: 0, boxShadow: '0 0 0 3px rgba(5,150,105,0.15)' }} />
              engineers already tracking
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.6rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#0F172A', maxWidth: 780 }}
          >
            Stop reading dashboards.{' '}
            <span style={{ color: '#F47B20', fontStyle: 'italic' }}>Start understanding users.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: '#64748B', lineHeight: 1.7, maxWidth: 520, fontWeight: 400 }}
          >
            Advaita captures every user action and uses AI to explain what
            it means — no dashboards to build, no SQL to write.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <motion.a
              href="#waitlist"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#0F172A', color: '#fff', borderRadius: 10, fontWeight: 600, fontSize: '0.925rem', textDecoration: 'none', boxShadow: '0 4px 18px rgba(15,23,42,0.18)', transition: 'background 0.15s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1E293B'}
              onMouseLeave={e => e.currentTarget.style.background = '#0F172A'}
            >
              Get early access
              <span style={{ color: '#F47B20', fontSize: '1.1rem' }}>→</span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '14px 24px', background: '#fff', border: '1.5px solid rgba(0,0,0,0.12)', color: '#1E293B', borderRadius: 10, fontWeight: 500, fontSize: '0.925rem', textDecoration: 'none', transition: 'border-color 0.15s, background 0.15s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.24)'; e.currentTarget.style.background = '#F8FAFC' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.background = '#fff' }}
            >
              Talk to sales
            </motion.a>
          </motion.div>

          {/* Trust strip */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', paddingBottom: 12 }}>
            {[
              { label: '99.9% uptime', color: '#059669' },
              { label: '<5ms latency', color: '#4F46E5' },
              { label: 'SOC2 certified', color: '#F47B20' },
              { label: '5.0★ rating', color: '#F59E0B' },
            ].map(({ label, color }) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#94A3B8', fontWeight: 500 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, display: 'inline-block' }} />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Dashboard preview — full-width below text */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 56, position: 'relative' }}
        >
          {/* Browser chrome wrapper */}
          <div style={{
            background: '#fff', borderRadius: '20px 20px 0 0',
            border: '1px solid rgba(0,0,0,0.08)', borderBottom: 'none',
            boxShadow: '0 -4px 40px rgba(0,0,0,0.06), 0 40px 80px rgba(79,70,229,0.08)',
            overflow: 'hidden',
            maxWidth: 960, margin: '0 auto',
          }}>
            {/* Browser top bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
                  <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ flex: 1, height: 24, background: '#EEF2F7', borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 10, gap: 6 }}>
                <svg viewBox="0 0 16 16" fill="none" stroke="#94A3B8" strokeWidth="1.5" width="10" height="10"><circle cx="7" cy="7" r="5"/><path d="M12 12l-2-2"/></svg>
                <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'monospace' }}>acaiplatform.ai/dashboard</span>
              </div>
            </div>
            {/* Dashboard content */}
            <div style={{ padding: 28, background: '#F8FAFC' }}>
              <DashboardPreview />
            </div>
          </div>
          {/* Bottom fade into page */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, #FAFAF8, transparent)', pointerEvents: 'none' }} />
        </motion.div>
      </div>
    </section>
  )
}
