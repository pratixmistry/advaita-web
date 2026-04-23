import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Advaita Logo ────────────────────────────────────────────── */
function Logo({ size = 36 }) {
  const mid = size * 0.64
  const inner = size * 0.31
  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2.5px solid #F47B20` }} />
      <div style={{ position: 'absolute', width: mid, height: mid, borderRadius: '50%', border: `2px solid #F5D000` }} />
      <div style={{ width: inner, height: inner, borderRadius: '50%', background: '#1A7A2E' }} />
    </div>
  )
}

/* ─── Animated Analytics Visual (left panel) ─────────────────── */

const BARS = [42, 68, 55, 80, 63, 91, 74, 58, 85, 72, 95, 78]
const AREA_PTS = [30, 45, 38, 62, 55, 78, 65, 82, 70, 88, 76, 95]
const NODES = [
  { x: 50, y: 30, r: 4, color: '#F47B20' },
  { x: 25, y: 55, r: 3, color: '#F5D000' },
  { x: 75, y: 52, r: 5, color: '#4F46E5' },
  { x: 40, y: 72, r: 3, color: '#0D9488' },
  { x: 65, y: 75, r: 4, color: '#F47B20' },
  { x: 15, y: 38, r: 3, color: '#F5D000' },
  { x: 85, y: 30, r: 3, color: '#0D9488' },
  { x: 55, y: 88, r: 3, color: '#4F46E5' },
]
const EDGES = [
  [0,1],[0,2],[0,3],[0,4],[1,3],[2,4],[2,6],[3,4],[3,7],[5,1],[6,0]
]

function AnalyticsVisual() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 100), 2200)
    return () => clearInterval(id)
  }, [])

  // Bar heights — updated each tick
  const bars = BARS.map((v, i) => v * (0.7 + 0.3 * Math.sin((tick + i * 0.7) * 0.9)))

  // Area chart path (static — does not depend on tick)
  const W = 320, H = 90
  const pts = AREA_PTS.map((v, i) => [
    (i / (AREA_PTS.length - 1)) * W,
    H - (v / 100) * H * 0.85 - 6,
  ])
  const linePath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${W},${H} L0,${H} Z`

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 24, padding: '24px 28px',
    }}>

      {/* Network graph — SVG-native animations, zero framer-motion overhead */}
      <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: 0 }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {/* Grid lines */}
          {[20,40,60,80].map(v => (
            <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
          ))}
          {[20,40,60,80].map(v => (
            <line key={`v${v}`} x1={v} y1="0" x2={v} y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
          ))}

          {/* Edges — static, no animation */}
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              stroke="rgba(244,123,32,0.18)"
              strokeWidth="0.5"
              opacity="0.5"
            />
          ))}

          {/* Nodes — SVG native opacity pulse (no JS animation frames) */}
          {NODES.map((n, i) => (
            <circle
              key={i}
              cx={n.x} cy={n.y} r={n.r}
              fill={n.color}
            >
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur={`${2.5 + i * 0.3}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Area chart */}
      <div style={{ width: '100%', background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 10, color: 'rgba(240,235,224,0.5)', fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Event Volume · 12h</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#F47B20', fontFamily: "'IBM Plex Sans', sans-serif" }}>↑ 24.3%</span>
        </div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible', display: 'block' }}>
          <defs>
            <linearGradient id="authAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F47B20" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F47B20" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#authAreaGrad)" />
          <path
            d={linePath}
            fill="none"
            stroke="#F47B20"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bar chart — CSS transition instead of framer-motion (avoids JS animation loop) */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', gap: 5, height: 52, background: 'rgba(255,255,255,0.03)', borderRadius: 14, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.06)' }}>
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1, borderRadius: 3, minHeight: 3,
              height: `${h}%`,
              background: i === bars.length - 1
                ? 'linear-gradient(180deg, #F47B20, #F5D000)'
                : i % 3 === 0
                  ? 'rgba(79,70,229,0.6)'
                  : 'rgba(255,255,255,0.12)',
              transition: 'height 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        ))}
      </div>

      {/* Metric pills */}
      <div style={{ display: 'flex', gap: 10, width: '100%' }}>
        {[
          { label: 'DAU', value: '142K', color: '#F47B20' },
          { label: 'Retention', value: '68.4%', color: '#1A7A2E' },
          { label: 'Latency', value: '<4ms', color: '#4F46E5' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            flex: 1, background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${color}33`,
            borderRadius: 12, padding: '10px 12px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 9, color: 'rgba(240,235,224,0.4)', fontFamily: "'IBM Plex Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "'IBM Plex Sans', sans-serif" }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Left Panel ─────────────────────────────────────────────── */
function LeftPanel() {
  return (
    <div style={{
      position: 'relative',
      width: '45%', flexShrink: 0,
      background: 'linear-gradient(160deg, #080C18 0%, #0E1628 60%, #0A0F1E 100%)',
      borderRadius: '28px 0 0 28px',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 360, height: 360, top: '-10%', left: '-10%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,123,32,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, bottom: '5%', right: '-5%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        <div style={{ position: 'absolute', width: 200, height: 200, bottom: '30%', left: '20%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,208,0,0.07) 0%, transparent 70%)', filter: 'blur(16px)' }} />
      </div>

      {/* Dot grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.6,
      }} />

      {/* Top: logo + tagline */}
      <div style={{ position: 'relative', zIndex: 1, padding: '32px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={36} />
          <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: '1.15rem', color: '#F0EBE0', letterSpacing: '-0.01em' }}>Advaita</span>
        </div>
        <div style={{ marginTop: 20, paddingLeft: 2 }}>
          <p style={{ fontFamily: "'Space Grotesk', serif", fontSize: '1.45rem', fontWeight: 700, color: '#F0EBE0', lineHeight: 1.35, margin: 0 }}>
            Every click.<br />Every user.<br />
            <span style={{ color: '#F47B20', fontStyle: 'italic' }}>Understood.</span>
          </p>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '0.8rem', color: 'rgba(240,235,224,0.45)', marginTop: 10, lineHeight: 1.6, fontWeight: 300 }}>
            AI-powered analytics that turns raw<br />events into actionable insight.
          </p>
        </div>
      </div>

      {/* Center: live analytics visual */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, minHeight: 0 }}>
        <AnalyticsVisual />
      </div>

      {/* Bottom: social proof */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 32px 28px' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex' }}>
            {['#F47B20','#4F46E5','#0D9488','#F5D000'].map((c, i) => (
              <div key={c} style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: '2px solid #080C18', marginLeft: i ? -8 : 0, zIndex: 4 - i }} />
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#F0EBE0', fontFamily: "'IBM Plex Sans', sans-serif" }}>1.4M+ engineers tracking</div>
            <div style={{ fontSize: 10, color: 'rgba(240,235,224,0.4)', fontFamily: "'IBM Plex Sans', sans-serif" }}>Join the waitlist today</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Input Field ────────────────────────────────────────────── */
function Field({ label, type = 'text', placeholder, value, onChange, autoComplete }) {
  const [focused, setFocused] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const isPass = type === 'password'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: '0.02em' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={isPass && showPass ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', padding: '13px 16px',
            paddingRight: isPass ? 48 : 16,
            fontSize: '0.9rem', fontFamily: "'IBM Plex Sans', sans-serif",
            background: focused ? '#fff' : '#F8FAFC',
            border: `1.5px solid ${focused ? '#F47B20' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: 12, outline: 'none', color: '#0F172A',
            transition: 'all 0.2s ease',
            boxShadow: focused ? '0 0 0 3px rgba(244,123,32,0.12)' : 'none',
          }}
        />
        {isPass && (
          <button
            type="button"
            onClick={() => setShowPass(s => !s)}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4, display: 'flex', alignItems: 'center' }}
          >
            {showPass
              ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            }
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── Auth Page ──────────────────────────────────────────────── */
export default function AuthPage({ onBack }) {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  const isLogin = mode === 'login'

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0A0F1E 0%, #111827 50%, #0A0F1E 100%)',
      padding: '20px',
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      {/* Ambient bg */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, top: '-10%', left: '-5%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,123,32,0.08) 0%, transparent 65%)', filter: 'blur(24px)' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, bottom: '-10%', right: '-5%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 65%)', filter: 'blur(24px)' }} />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex',
          width: '100%', maxWidth: 920,
          minHeight: 600,
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Left: visual panel */}
        <LeftPanel />

        {/* Right: form panel */}
        <div style={{
          flex: 1, background: '#FFFFFF',
          display: 'flex', flexDirection: 'column',
          padding: '40px 44px',
          overflowY: 'auto',
        }}>
          {/* Back link */}
          <div style={{ marginBottom: 'auto' }}>
            <button
              onClick={onBack}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '0.82rem', fontFamily: 'inherit', padding: 0, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#475569'}
              onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M10 3L5 8l5 5"/></svg>
              Back to site
            </button>
          </div>

          {/* Mode toggle */}
          <div style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 12, padding: 4, marginBottom: 32, width: 'fit-content' }}>
              {['login', 'signup'].map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    padding: '8px 24px', borderRadius: 9, border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', fontWeight: 600, fontSize: '0.85rem',
                    background: mode === m ? '#fff' : 'transparent',
                    color: mode === m ? '#0F172A' : '#94A3B8',
                    boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {m === 'login' ? 'Log in' : 'Sign up'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
              >
                <h1 style={{ fontFamily: "'Space Grotesk', serif", fontWeight: 700, fontSize: '2rem', color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                  {isLogin ? 'Welcome back.' : 'Get started free.'}
                </h1>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', margin: '0 0 28px', fontWeight: 400 }}>
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    onClick={() => setMode(isLogin ? 'signup' : 'login')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F47B20', fontWeight: 700, fontFamily: 'inherit', fontSize: 'inherit', padding: 0, textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >
                    {isLogin ? 'Create an account' : 'Log in'}
                  </button>
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {!isLogin && (
                    <Field label="Full Name" placeholder="Alex Johnson" value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
                  )}
                  <Field label="Email Address" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
                  <Field label="Password" type="password" placeholder={isLogin ? 'Your password' : 'Min. 8 characters'} value={password} onChange={e => setPassword(e.target.value)} autoComplete={isLogin ? 'current-password' : 'new-password'} />

                  {isLogin && (
                    <div style={{ textAlign: 'right', marginTop: -8 }}>
                      <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#64748B', fontFamily: 'inherit', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3, padding: 0 }}>
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Terms */}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginTop: 2 }}>
                    <div
                      onClick={() => setAgreed(a => !a)}
                      style={{
                        width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                        background: agreed ? '#F47B20' : '#fff',
                        border: `2px solid ${agreed ? '#F47B20' : 'rgba(0,0,0,0.15)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s ease', cursor: 'pointer',
                      }}
                    >
                      {agreed && <svg viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" width="10" height="10"><polyline points="1.5 6 4.5 9 10.5 3"/></svg>}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>
                      I agree to the{' '}
                      <a href="#" style={{ color: '#0F172A', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2 }}>Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" style={{ color: '#0F172A', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2 }}>Privacy Policy</a>
                    </span>
                  </label>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      marginTop: 4,
                      padding: '14px',
                      background: loading ? '#64748B' : 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                      color: '#fff', border: 'none', borderRadius: 12,
                      fontSize: '0.9rem', fontWeight: 700, fontFamily: 'inherit',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: '0 4px 16px rgba(15,23,42,0.2)',
                      transition: 'background 0.2s',
                      letterSpacing: '0.01em',
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                        />
                        {isLogin ? 'Signing in…' : 'Creating account…'}
                      </>
                    ) : (
                      <>
                        {isLogin ? 'Log in' : 'Create account'}
                        <span style={{ color: '#F47B20', fontSize: '1.1rem' }}>→</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
                  <span style={{ fontSize: '0.78rem', color: '#CBD5E1', fontWeight: 500 }}>or continue with</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
                </div>

                {/* OAuth */}
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    {
                      label: 'Google',
                      icon: (
                        <svg viewBox="0 0 24 24" width="18" height="18">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      )
                    },
                    {
                      label: 'GitHub',
                      icon: (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                        </svg>
                      )
                    },
                  ].map(({ label, icon }) => (
                    <button
                      key={label}
                      type="button"
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '11px 16px', background: '#fff',
                        border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 12,
                        fontSize: '0.84rem', fontWeight: 600, color: '#334155',
                        fontFamily: 'inherit', cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.18)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)' }}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
