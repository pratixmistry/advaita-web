import { useEffect, useState } from 'react'

const API_URL = 'https://advaita-platform.onrender.com'

export function FinalCTA() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [position, setPosition] = useState(null)
  const [count, setCount] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/v1/waitlist/count`)
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || loading) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/v1/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Something went wrong')
      setPosition(data.position)
      setCount(data.position)
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className="lp-grid-bg" style={{ background: 'var(--adv-bg)', padding: '96px 0' }}>
      <div className="lp-wrap-wide">
        <div className="final-cta-card" style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #F47B20 0%, #F5D000 55%, #C9B8F0 100%)',
          borderRadius: 6,
          border: '1px solid var(--adv-border)',
          padding: '72px 40px',
          textAlign: 'center',
          overflow: 'hidden',
        }}>
          {/* Decorative grid */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)`,
            backgroundSize: '46px 46px',
            pointerEvents: 'none',
            opacity: 0.5,
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 14px',
              background: 'rgba(17,17,17,0.88)',
              color: '#fff',
              borderRadius: 999,
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F47B20' }} />
              {count !== null ? `${count} on the waitlist` : 'Early access'}
            </span>
            <h2 style={{
              fontFamily: "'Apfel Grotezk', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4.2vw, 3.25rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#111',
              margin: '0 0 16px',
            }}>
              Ready to own your analytics?
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#2a2a2a', lineHeight: 1.6, margin: '0 auto 28px', maxWidth: 540 }}>
              Join the waitlist and be first to deploy Advaita on your own infrastructure — with AI insights included.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="final-cta-form"
                style={{
                  display: 'flex',
                  gap: 8,
                  maxWidth: 420,
                  margin: '0 auto',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={loading}
                  style={{
                    flex: '1 1 220px',
                    padding: '13px 18px',
                    borderRadius: 6,
                    border: '1px solid rgba(17,17,17,0.1)',
                    background: '#fff',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    opacity: loading ? 0.7 : 1,
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '13px 22px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#111',
                    color: '#fff',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    fontFamily: 'inherit',
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {loading ? 'Joining…' : 'Get Early Access →'}
                </button>
              </form>
            ) : (
              <div
                role="status"
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(17,17,17,0.88)',
                  color: '#fff',
                  padding: '18px 28px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.12)',
                  maxWidth: 440,
                  margin: '0 auto',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.95rem', fontWeight: 700 }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#F5D000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 5 8 13 4 9" />
                  </svg>
                  You're on the list!
                </div>
                {position && (
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>
                    Position <strong style={{ color: '#F5D000' }}>#{position}</strong> — check your inbox for confirmation.
                  </span>
                )}
              </div>
            )}

            {error && (
              <p style={{ fontSize: '0.82rem', color: '#7a0a0a', marginTop: 12, fontWeight: 600 }}>
                {error}
              </p>
            )}

            <p style={{ fontSize: '0.78rem', color: '#3a3a3a', marginTop: 14 }}>
              Feel free to reach out if you have any questions!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
