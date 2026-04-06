/* CTABanner.jsx
   Orange rounded CTA banner placed above the footer.
   "Ready to unlock your growth potential?"
*/
import { motion } from 'framer-motion'

export function CTABanner() {
  return (
    <section style={{ padding: '48px 0 56px', background: '#F0EEE8' }}>
      <div className="lp-wrap">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: '#F47B20',
            borderRadius: 28,
            padding: 'clamp(40px, 6vw, 64px) clamp(32px, 6vw, 72px)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Background texture / depth */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {/* Noise texture overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '120px 120px',
              opacity: 0.06,
              mixBlendMode: 'overlay',
            }} />
            {/* Warm inner radial */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.14) 0%, transparent 60%)',
            }} />
            {/* Decorative rings */}
            <div style={{
              position: 'absolute',
              width: 400, height: 400,
              top: '-30%', right: '-8%',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              width: 280, height: 280,
              top: '-18%', right: '4%',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.07)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              width: 350, height: 350,
              bottom: '-30%', left: '-6%',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.08)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              style={{ marginBottom: 20 }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 14px',
                background: 'rgba(0,0,0,0.12)',
                borderRadius: 999,
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'rgba(0,0,0,0.65)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: "'Manrope', sans-serif",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', flexShrink: 0 }} />
                Limited early access
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
                color: '#111111',
                lineHeight: 1.12,
                margin: '0 0 16px',
                letterSpacing: '-0.03em',
              }}
            >
              Ready to unlock your
              <br />
              growth potential?
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.27 }}
              style={{
                fontSize: '1rem',
                color: 'rgba(0,0,0,0.55)',
                margin: '0 auto 36px',
                maxWidth: 460,
                lineHeight: 1.65,
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
              }}
            >
              Join teams who switched from dashboards to answers.
              Self-host free or use our cloud — no credit card required.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.33 }}
              style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <a
                href="#waitlist"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px',
                  background: '#111111',
                  color: '#ffffff',
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: 'background 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#2a2a2a'}
                onMouseLeave={e => e.currentTarget.style.background = '#111111'}
              >
                Early Access <span style={{ fontSize: '0.9rem' }}>→</span>
              </a>

              <a
                href="#contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px',
                  background: 'rgba(255,255,255,0.88)',
                  color: '#111111',
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: 'background 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.88)'}
              >
                Schedule Demo
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 28, flexWrap: 'wrap' }}
            >
              {[
                'No credit card required',
                'SOC2 compliant',
                'Apache 2.0 open source',
              ].map(item => (
                <span key={item} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: '0.75rem',
                  color: 'rgba(0,0,0,0.45)',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                }}>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(0,0,0,0.35)', flexShrink: 0 }} />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
