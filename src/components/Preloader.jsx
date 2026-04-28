import { useEffect, useState } from 'react'

export function Preloader({ duration = 1400, onFinish }) {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), duration - 350)
    const removeTimer = setTimeout(() => {
      setVisible(false)
      if (onFinish) onFinish()
    }, duration)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [duration, onFinish])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'white',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 22,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.35s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 96,
          height: 96,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          style={{ position: 'absolute', inset: 0 }}
        >
          <defs>
            <linearGradient id="spiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F47B20" />
              <stop offset="55%" stopColor="#F5D000" />
              <stop offset="100%" stopColor="#1A7A2E" />
            </linearGradient>
          </defs>

          {/* Outer ring */}
          <circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke="url(#spiralGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="180 84"
            style={{
              transformOrigin: '48px 48px',
              animation: 'adv-spin-out 1.2s linear infinite',
            }}
          />

          {/* Middle ring */}
          <circle
            cx="48"
            cy="48"
            r="28"
            fill="none"
            stroke="#F5D000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="110 70"
            style={{
              transformOrigin: '48px 48px',
              animation: 'adv-spin-in 0.9s linear infinite',
            }}
          />

          {/* Inner core */}
          <circle
            cx="48"
            cy="48"
            r="8"
            fill="#1A7A2E"
            style={{
              transformOrigin: '48px 48px',
              animation: 'adv-pulse 1.1s ease-in-out infinite',
            }}
          />
        </svg>
      </div>

      <div
        style={{
          fontFamily: "'Apfel Grotezk', sans-serif",
          fontWeight: 700,
          fontSize: '0.74rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#111',
          opacity: 0.7,
        }}
      >
        Advaita
      </div>

      <style>{`
        @keyframes adv-spin-out {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes adv-spin-in {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes adv-pulse {
          0%, 100% { transform: scale(0.85); opacity: 0.9; }
          50%      { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
