/* ProductCapabilities.jsx
   Bento grid — 6 cards, unequal spans, large detailed inline SVG illustrations.
   Section header above grid: label + heading + subheading, left-aligned.
*/
import { motion } from 'framer-motion'

/* ── Inline SVG illustrations ─────────────────────────────────────── */

function RealtimeSVG() {
  return (
    <svg viewBox="0 0 560 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '68%', pointerEvents: 'none' }}>
      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: 900; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes riseBar1  { from{height:0;y:200} to{height:72px;y:128} }
        @keyframes riseBar2  { from{height:0;y:200} to{height:110px;y:90} }
        @keyframes riseBar3  { from{height:0;y:200} to{height:88px;y:112} }
        @keyframes riseBar4  { from{height:0;y:200} to{height:130px;y:70} }
        @keyframes riseBar5  { from{height:0;y:200} to{height:95px;y:105} }
        @keyframes riseBar6  { from{height:0;y:200} to{height:148px;y:52} }
        @keyframes tagFloat1 { 0%{opacity:0;transform:translateY(0)}  20%{opacity:1} 80%{opacity:1} 100%{opacity:0;transform:translateY(-22px)} }
        @keyframes tagFloat2 { 0%{opacity:0;transform:translateY(0)}  20%{opacity:1} 80%{opacity:1} 100%{opacity:0;transform:translateY(-18px)} }
        @keyframes tagFloat3 { 0%{opacity:0;transform:translateY(0)}  20%{opacity:1} 80%{opacity:1} 100%{opacity:0;transform:translateY(-20px)} }
        @keyframes livePulse { 0%,100%{r:5;opacity:1} 50%{r:9;opacity:0.25} }
        @keyframes liveDot   { 0%,100%{opacity:1} 50%{opacity:0.35} }
      `}</style>

      {/* Subtle grid lines */}
      {[56, 112, 168, 200].map((y, i) => (
        <line key={i} x1="40" y1={y} x2="520" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {[80, 160, 240, 320, 400, 480].map((x, i) => (
        <line key={i} x1={x} y1="20" x2={x} y2="210" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* Area fill under line */}
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A7A2E" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1A7A2E" stopOpacity="0.0" />
        </linearGradient>
        <clipPath id="areaClip">
          <rect x="40" y="0" width="480" height="220" />
        </clipPath>
      </defs>
      <polygon
        points="40,200 80,165 140,148 200,120 260,135 320,98 380,82 440,60 500,45 520,45 520,210 40,210"
        fill="url(#areaGrad)"
        clipPath="url(#areaClip)"
        style={{ animation: 'drawLine 1.4s 0.2s ease both' }}
        opacity="0"
      />
      {/* Workaround: fade area in */}
      <polygon
        points="40,200 80,165 140,148 200,120 260,135 320,98 380,82 440,60 500,45 520,45 520,210 40,210"
        fill="url(#areaGrad)"
        clipPath="url(#areaClip)"
      />

      {/* Main line */}
      <polyline
        points="40,200 80,165 140,148 200,120 260,135 320,98 380,82 440,60 500,45 520,42"
        stroke="#1A7A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="900" strokeDashoffset="900"
        style={{ animation: 'drawLine 1.6s 0.1s cubic-bezier(0.4,0,0.2,1) forwards' }}
        fill="none"
      />

      {/* Data point dots on line */}
      {[
        [80,165],[140,148],[200,120],[260,135],[320,98],[380,82],[440,60],[500,45]
      ].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="#1A7A2E" stroke="#111111" strokeWidth="1.5"
          style={{ opacity: 0, animation: `liveDot 0.3s ${0.15*i+0.8}s ease forwards` }}
        />
      ))}

      {/* Live pulsing indicator */}
      <circle cx="520" cy="42" r="9" fill="#1A7A2E" opacity="0.2"
        style={{ animation: 'livePulse 1.6s ease-in-out infinite' }} />
      <circle cx="520" cy="42" r="4.5" fill="#1A7A2E"
        style={{ animation: 'liveDot 1.6s ease-in-out infinite' }} />

      {/* LIVE label */}
      <rect x="490" y="16" width="42" height="16" rx="8" fill="#1A7A2E" opacity="0.9" />
      <text x="511" y="27.5" textAnchor="middle" fill="white" fontSize="8" fontFamily="Manrope,sans-serif" fontWeight="700" letterSpacing="0.08em">LIVE</text>

      {/* Right-side animated bars */}
      {[
        { x: 356, anim: 'riseBar1', dur: '0.7s', delay: '0.3s', fill: '#F47B20' },
        { x: 384, anim: 'riseBar2', dur: '0.7s', delay: '0.45s', fill: '#F47B20' },
        { x: 412, anim: 'riseBar3', dur: '0.7s', delay: '0.55s', fill: 'rgba(244,123,32,0.55)' },
        { x: 440, anim: 'riseBar4', dur: '0.7s', delay: '0.35s', fill: '#F47B20' },
        { x: 468, anim: 'riseBar5', dur: '0.7s', delay: '0.6s',  fill: 'rgba(244,123,32,0.55)' },
        { x: 496, anim: 'riseBar6', dur: '0.7s', delay: '0.25s', fill: '#F47B20' },
      ].map((b,i) => (
        <rect key={i} x={b.x} width="20" rx="4" fill={b.fill} opacity="0.85"
          style={{ animation: `${b.anim} ${b.dur} ${b.delay} cubic-bezier(0.22,1,0.36,1) both` }} />
      ))}

      {/* Floating event tags */}
      <g style={{ animation: 'tagFloat1 3.2s 0.6s ease-in-out infinite' }}>
        <rect x="58" y="90" width="76" height="20" rx="10" fill="rgba(244,123,32,0.18)" stroke="#F47B20" strokeWidth="1" />
        <text x="96" y="104" textAnchor="middle" fill="#F47B20" fontSize="9" fontFamily="Manrope,sans-serif" fontWeight="600">page_view</text>
      </g>
      <g style={{ animation: 'tagFloat2 3.5s 1.4s ease-in-out infinite' }}>
        <rect x="175" y="70" width="52" height="20" rx="10" fill="rgba(26,122,46,0.18)" stroke="#1A7A2E" strokeWidth="1" />
        <text x="201" y="84" textAnchor="middle" fill="#1A7A2E" fontSize="9" fontFamily="Manrope,sans-serif" fontWeight="600">click</text>
      </g>
      <g style={{ animation: 'tagFloat3 3.8s 2.1s ease-in-out infinite' }}>
        <rect x="288" y="50" width="68" height="20" rx="10" fill="rgba(245,208,0,0.15)" stroke="#F5D000" strokeWidth="1" />
        <text x="322" y="64" textAnchor="middle" fill="#F5D000" fontSize="9" fontFamily="Manrope,sans-serif" fontWeight="600">purchase</text>
      </g>

      {/* Y-axis labels */}
      {['0','50','100','150'].map((label, i) => (
        <text key={i} x="30" y={210 - i * 52.5 + 4} textAnchor="end" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="Manrope,sans-serif">{label}</text>
      ))}
    </svg>
  )
}

function FunnelSVG() {
  const steps = [
    { label: 'Visited',    pct: '100%', w: 340, color: '#F47B20',            delay: '0s'    },
    { label: 'Signed Up',  pct: '68%',  w: 232, color: '#F58A38',            delay: '0.12s' },
    { label: 'Activated',  pct: '41%',  w: 140, color: '#F5A060',            delay: '0.24s' },
    { label: 'Converted',  pct: '23%',  w: 78,  color: '#F5C090',            delay: '0.36s' },
  ]
  return (
    <svg viewBox="0 0 460 250" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '72%', pointerEvents: 'none' }}>
      <style>{`
        @keyframes barSlide { from{width:0;opacity:0} to{opacity:1} }
        @keyframes pctPop   { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
      `}</style>
      <defs>
        <linearGradient id="funnelGrad0" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F47B20" />
          <stop offset="100%" stopColor="#F47B20" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="funnelGrad1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F58A38" />
          <stop offset="100%" stopColor="#F58A38" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="funnelGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5A060" />
          <stop offset="100%" stopColor="#F5A060" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="funnelGrad3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5C090" />
          <stop offset="100%" stopColor="#F5C090" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {steps.map((s, i) => (
        <g key={i}>
          {/* Bar background track */}
          <rect x="90" y={20 + i * 52} width="340" height="34" rx="8" fill="rgba(244,123,32,0.08)" />
          {/* Animated bar */}
          <rect x="90" y={20 + i * 52} width={s.w} height="34" rx="8"
            fill={`url(#funnelGrad${i})`}
            style={{ animation: `barSlide 0.7s ${s.delay} cubic-bezier(0.22,1,0.36,1) both` }}
          />
          {/* Step label */}
          <text x="82" y={42 + i * 52} textAnchor="end" fill="#5C3A1E"
            fontSize="11" fontFamily="Manrope,sans-serif" fontWeight="600">{s.label}</text>
          {/* Percentage */}
          <text x={90 + s.w + 10} y={43 + i * 52} fill="#F47B20"
            fontSize="12" fontFamily="Manrope,sans-serif" fontWeight="700"
            style={{ animation: `pctPop 0.4s ${parseFloat(s.delay)+0.5}s ease both`, opacity: 0 }}
          >{s.pct}</text>
          {/* Connecting dashes between bars */}
          {i < steps.length - 1 && (
            <line x1="90" y1={54 + i * 52} x2="90" y2={56 + i * 52 + 16}
              stroke="#F47B20" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          )}
        </g>
      ))}

      {/* Drop-off annotation on last step */}
      <rect x="290" y="194" width="98" height="22" rx="6" fill="rgba(244,123,32,0.12)" />
      <text x="339" y="208" textAnchor="middle" fill="#F47B20" fontSize="9.5"
        fontFamily="Manrope,sans-serif" fontWeight="600">-77% drop-off</text>
    </svg>
  )
}

function RetentionSVG() {
  const colHeaders = ['Day 0', 'Day 7', 'Day 14', 'Day 21', 'Day 28', 'Day 35']
  const rowLabels  = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
  const vals = [
    [1.00, 0.82, 0.71, 0.63, 0.55, 0.47],
    [1.00, 0.78, 0.65, 0.54, 0.46, 0.38],
    [1.00, 0.85, 0.73, 0.65, 0.58, 0.51],
    [1.00, 0.80, 0.68, 0.59, 0.50, 0.43],
    [1.00, 0.88, 0.76, 0.68, 0.61, 0.54],
  ]
  // Color scale: from dark green (high) to light green (low)
  const getColor = (v) => {
    // v 1.0 → #1A7A2E, v 0.0 → #C8EDD2
    const r = Math.round(26  + (200 - 26)  * (1 - v))
    const g = Math.round(122 + (237 - 122) * (1 - v))
    const b = Math.round(46  + (210 - 46)  * (1 - v))
    return `rgb(${r},${g},${b})`
  }
  const cellW = 56, cellH = 26, xOff = 68, yOff = 32

  return (
    <svg viewBox="0 0 420 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '72%', pointerEvents: 'none' }}>
      <style>{`
        @keyframes cellFade { from{opacity:0;transform:scale(0.75)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* Column headers */}
      {colHeaders.map((h, ci) => (
        <text key={ci} x={xOff + ci * cellW + cellW / 2} y={yOff - 8}
          textAnchor="middle" fill="rgba(30,80,45,0.5)" fontSize="8.5"
          fontFamily="Manrope,sans-serif" fontWeight="600">{h}</text>
      ))}

      {/* Row labels + cells */}
      {vals.map((row, ri) => (
        <g key={ri}>
          <text x={xOff - 6} y={yOff + ri * (cellH + 5) + cellH / 2 + 4}
            textAnchor="end" fill="rgba(30,80,45,0.55)" fontSize="8.5"
            fontFamily="Manrope,sans-serif" fontWeight="600">{rowLabels[ri]}</text>

          {row.map((v, ci) => {
            const delay = (ri * 6 + ci) * 0.035
            const x = xOff + ci * cellW
            const y = yOff + ri * (cellH + 5)
            return (
              <g key={ci} style={{
                animation: `cellFade 0.4s ${delay}s ease both`,
                transformOrigin: `${x + cellW/2}px ${y + cellH/2}px`,
                opacity: 0
              }}>
                <rect x={x} y={y} width={cellW - 4} height={cellH} rx="5"
                  fill={getColor(v)} />
                <text x={x + (cellW - 4) / 2} y={y + cellH / 2 + 4}
                  textAnchor="middle"
                  fill={v > 0.6 ? 'rgba(255,255,255,0.9)' : 'rgba(30,80,45,0.7)'}
                  fontSize="8" fontFamily="Manrope,sans-serif" fontWeight="700">
                  {Math.round(v * 100)}%
                </text>
              </g>
            )
          })}
        </g>
      ))}
    </svg>
  )
}

function UserIDSVG() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, right: 0, width: '75%', height: '75%', pointerEvents: 'none' }}>
      <style>{`
        @keyframes cardIn   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes avatarIn { from{opacity:0;transform:scale(0.6)} to{opacity:1;transform:scale(1)} }
        @keyframes pillIn   { from{opacity:0;transform:translateX(10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes dotPop   { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
        @keyframes cursorBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      `}</style>

      {/* Profile card */}
      <rect x="20" y="16" width="230" height="130" rx="16"
        fill="white" opacity="0.95"
        stroke="rgba(124,58,237,0.18)" strokeWidth="1.5"
        style={{ animation: 'cardIn 0.55s 0.1s ease both', opacity: 0 }} />

      {/* Avatar circle */}
      <circle cx="68" cy="62" r="28" fill="rgba(167,139,250,0.25)"
        style={{ animation: 'avatarIn 0.4s 0.25s ease both', opacity: 0 }} />
      <circle cx="68" cy="54" r="13" fill="#7C3AED" opacity="0.7"
        style={{ animation: 'avatarIn 0.4s 0.3s ease both', opacity: 0 }} />
      <path d="M44 88 Q68 74 92 88" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" opacity="0.55"
        style={{ animation: 'avatarIn 0.4s 0.35s ease both', opacity: 0 }} />

      {/* Name */}
      <text x="112" y="50" fill="#111111" fontSize="13" fontFamily="Manrope,sans-serif" fontWeight="700"
        style={{ animation: 'cardIn 0.4s 0.35s ease both', opacity: 0 }}>Sarah Chen</text>
      {/* Email */}
      <text x="112" y="66" fill="rgba(80,40,140,0.6)" fontSize="9.5" fontFamily="Manrope,sans-serif"
        style={{ animation: 'cardIn 0.4s 0.4s ease both', opacity: 0 }}>sarah@acme.com</text>

      {/* Verified badge */}
      <circle cx="218" cy="34" r="12" fill="#7C3AED" opacity="0.15" />
      <polyline points="212,34 216,38 225,28" stroke="#7C3AED" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />

      {/* Trait pills */}
      {[
        { label: 'Plan: Pro',         x: 112, y: 82,  delay: '0.5s',  bg: 'rgba(124,58,237,0.1)', color: '#7C3AED' },
        { label: 'Country: US',       x: 112, y: 100, delay: '0.6s',  bg: 'rgba(26,122,46,0.1)',  color: '#1A7A2E' },
        { label: 'Power User',        x: 112, y: 118, delay: '0.7s',  bg: 'rgba(244,123,32,0.1)', color: '#F47B20' },
      ].map((p, i) => (
        <g key={i} style={{ animation: `pillIn 0.35s ${p.delay} ease both`, opacity: 0 }}>
          <rect x={p.x} y={p.y - 11} width={p.label.length * 5.8 + 12} height="16" rx="8" fill={p.bg} />
          <text x={p.x + 6} y={p.y + 1} fill={p.color} fontSize="8.5" fontFamily="Manrope,sans-serif" fontWeight="600">{p.label}</text>
        </g>
      ))}

      {/* Journey timeline below card */}
      <line x1="36" y1="168" x2="236" y2="168" stroke="rgba(124,58,237,0.2)" strokeWidth="1.5" strokeDasharray="4 4"
        style={{ animation: 'cardIn 0.5s 0.8s ease both', opacity: 0 }} />
      {[
        { cx: 36,  label: 'signup',    color: '#7C3AED', delay: '0.85s' },
        { cx: 86,  label: 'onboard',   color: '#1A7A2E', delay: '0.92s' },
        { cx: 136, label: 'upgrade',   color: '#F47B20', delay: '0.99s' },
        { cx: 186, label: 'purchase',  color: '#F47B20', delay: '1.06s' },
        { cx: 236, label: 'referral',  color: '#7C3AED', delay: '1.13s' },
      ].map((d, i) => (
        <g key={i} style={{ animation: `dotPop 0.3s ${d.delay} ease both`, opacity: 0 }}>
          <circle cx={d.cx} cy="168" r="6" fill={d.color} opacity="0.9" />
          <text x={d.cx} y="185" textAnchor="middle" fill="rgba(80,40,140,0.55)"
            fontSize="7.5" fontFamily="Manrope,sans-serif">{d.label}</text>
        </g>
      ))}
    </svg>
  )
}

function AISvg() {
  return (
    <svg viewBox="0 0 560 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '70%', pointerEvents: 'none' }}>
      <style>{`
        @keyframes aiCardIn  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cursorBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes sparkSpin { 0%{opacity:0;transform:scale(0) rotate(0deg)} 40%{opacity:1;transform:scale(1.2) rotate(180deg)} 100%{opacity:0;transform:scale(0.6) rotate(360deg)} }
        @keyframes barGrow1  { from{width:0} to{width:110px} }
        @keyframes barGrow2  { from{width:0} to{width:72px} }
        @keyframes barGrow3  { from{width:0} to{width:148px} }
        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
      `}</style>

      {/* Glow behind input bar */}
      <ellipse cx="280" cy="52" rx="180" ry="28" fill="rgba(167,139,250,0.08)"
        style={{ animation: 'glowPulse 3s ease-in-out infinite' }} />

      {/* Input bar */}
      <rect x="40" y="28" width="480" height="44" rx="12"
        fill="rgba(255,255,255,0.05)" stroke="rgba(167,139,250,0.35)" strokeWidth="1.5"
        style={{ animation: 'aiCardIn 0.5s 0.1s ease both', opacity: 0 }} />
      {/* Search icon */}
      <circle cx="68" cy="50" r="8" stroke="rgba(167,139,250,0.6)" strokeWidth="1.5" fill="none" />
      <line x1="73.5" y1="55.5" x2="78" y2="60" stroke="rgba(167,139,250,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Query text */}
      <text x="90" y="55" fill="rgba(255,255,255,0.75)" fontSize="12"
        fontFamily="Manrope,sans-serif" fontWeight="500"
        style={{ animation: 'aiCardIn 0.4s 0.3s ease both', opacity: 0 }}>
        Which users dropped off at checkout?
      </text>
      {/* Blinking cursor */}
      <rect x="352" y="42" width="2" height="16" rx="1" fill="rgba(167,139,250,0.9)"
        style={{ animation: 'cursorBlink 1s 0.5s step-end infinite' }} />

      {/* AI Response card */}
      <rect x="40" y="88" width="480" height="152" rx="14"
        fill="rgba(255,255,255,0.04)" stroke="rgba(167,139,250,0.18)" strokeWidth="1"
        style={{ animation: 'aiCardIn 0.5s 0.55s ease both', opacity: 0 }} />

      {/* "AI Insight" label */}
      <rect x="56" y="102" width="68" height="16" rx="8" fill="rgba(167,139,250,0.2)" />
      <text x="90" y="113.5" textAnchor="middle" fill="#A78BFA" fontSize="8.5"
        fontFamily="Manrope,sans-serif" fontWeight="700" letterSpacing="0.06em">AI INSIGHT</text>

      {/* Insight text lines */}
      <text x="56" y="134" fill="rgba(255,255,255,0.8)" fontSize="11"
        fontFamily="Manrope,sans-serif" fontWeight="500"
        style={{ animation: 'aiCardIn 0.4s 0.75s ease both', opacity: 0 }}>
        68% of users abandon at payment step.
      </text>
      <text x="56" y="150" fill="rgba(255,255,255,0.45)" fontSize="10"
        fontFamily="Manrope,sans-serif"
        style={{ animation: 'aiCardIn 0.4s 0.85s ease both', opacity: 0 }}>
        Primary cause: slow load time on mobile (3.4s avg)
      </text>

      {/* Mini bar chart inside response */}
      {[
        { label: 'Desktop', w: 110, delay: '0.95s', color: '#A78BFA' },
        { label: 'Mobile',  w: 72,  delay: '1.05s', color: '#7C3AED' },
        { label: 'Tablet',  w: 148, delay: '1.15s', color: '#A78BFA' },
      ].map((b, i) => (
        <g key={i}>
          <text x="56" y={175 + i * 18} fill="rgba(255,255,255,0.35)" fontSize="8.5"
            fontFamily="Manrope,sans-serif">{b.label}</text>
          <rect x="108" y={163 + i * 18} height="10" rx="3" fill="rgba(255,255,255,0.07)" width="200" />
          <rect x="108" y={163 + i * 18} height="10" rx="3" fill={b.color} opacity="0.75"
            style={{ animation: `barGrow${i+1} 0.6s ${b.delay} cubic-bezier(0.22,1,0.36,1) both` }} />
        </g>
      ))}

      {/* Floating sparkle stars */}
      {[
        { cx: 490, cy: 108, delay: '0.8s',  size: 10 },
        { cx: 466, cy: 92,  delay: '1.3s',  size: 7  },
        { cx: 508, cy: 130, delay: '1.8s',  size: 8  },
        { cx: 476, cy: 145, delay: '2.4s',  size: 6  },
      ].map((s, i) => (
        <g key={i} style={{ animation: `sparkSpin 2.4s ${s.delay} ease-in-out infinite`,
          transformOrigin: `${s.cx}px ${s.cy}px`, opacity: 0 }}>
          {/* 4-pointed star */}
          <path d={`M${s.cx},${s.cy-s.size} L${s.cx+s.size*0.25},${s.cy-s.size*0.25} L${s.cx+s.size},${s.cy} L${s.cx+s.size*0.25},${s.cy+s.size*0.25} L${s.cx},${s.cy+s.size} L${s.cx-s.size*0.25},${s.cy+s.size*0.25} L${s.cx-s.size},${s.cy} L${s.cx-s.size*0.25},${s.cy-s.size*0.25}Z`}
            fill="#A78BFA" opacity="0.8" />
        </g>
      ))}
    </svg>
  )
}

function GroupSVG() {
  return (
    <svg viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '72%', pointerEvents: 'none' }}>
      <style>{`
        @keyframes circleScale { from{opacity:0;transform:scale(0.6)} to{opacity:0.5;transform:scale(1)} }
        @keyframes circleScale2 { from{opacity:0;transform:scale(0.6)} to{opacity:0.35;transform:scale(1)} }
        @keyframes circleScale3 { from{opacity:0;transform:scale(0.6)} to{opacity:0.28;transform:scale(1)} }
        @keyframes labelPop    { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
        @keyframes statCardIn  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <defs>
        <clipPath id="vennClip">
          <rect width="420" height="200" />
        </clipPath>
      </defs>

      <g clipPath="url(#vennClip)">
        {/* Enterprise circle */}
        <circle cx="160" cy="100" r="80" fill="#F47B20"
          style={{ animation: 'circleScale 0.6s 0.1s ease both', opacity: 0, transformOrigin: '160px 100px' }} />
        {/* Mobile circle */}
        <circle cx="260" cy="100" r="80" fill="#1A7A2E"
          style={{ animation: 'circleScale2 0.6s 0.25s ease both', opacity: 0, transformOrigin: '260px 100px' }} />
        {/* API Users circle */}
        <circle cx="210" cy="168" r="70" fill="#F5D000"
          style={{ animation: 'circleScale3 0.6s 0.4s ease both', opacity: 0, transformOrigin: '210px 168px' }} />
      </g>

      {/* Count labels */}
      <text x="122" y="76" textAnchor="middle" fill="rgba(90,40,10,0.9)" fontSize="11"
        fontFamily="Manrope,sans-serif" fontWeight="700"
        style={{ animation: 'labelPop 0.35s 0.7s ease both', opacity: 0 }}>2.4k</text>
      <text x="114" y="90" textAnchor="middle" fill="rgba(90,40,10,0.6)" fontSize="8"
        fontFamily="Manrope,sans-serif"
        style={{ animation: 'labelPop 0.35s 0.72s ease both', opacity: 0 }}>Enterprise</text>

      <text x="298" y="76" textAnchor="middle" fill="rgba(10,50,20,0.9)" fontSize="11"
        fontFamily="Manrope,sans-serif" fontWeight="700"
        style={{ animation: 'labelPop 0.35s 0.8s ease both', opacity: 0 }}>1.2k</text>
      <text x="298" y="90" textAnchor="middle" fill="rgba(10,50,20,0.6)" fontSize="8"
        fontFamily="Manrope,sans-serif"
        style={{ animation: 'labelPop 0.35s 0.82s ease both', opacity: 0 }}>Mobile</text>

      <text x="210" y="220" textAnchor="middle" fill="rgba(80,60,0,0.85)" fontSize="11"
        fontFamily="Manrope,sans-serif" fontWeight="700"
        style={{ animation: 'labelPop 0.35s 0.9s ease both', opacity: 0 }}>891</text>
      <text x="210" y="233" textAnchor="middle" fill="rgba(80,60,0,0.55)" fontSize="8"
        fontFamily="Manrope,sans-serif"
        style={{ animation: 'labelPop 0.35s 0.92s ease both', opacity: 0 }}>API Users</text>

      {/* Overlap count */}
      <text x="210" y="108" textAnchor="middle" fill="rgba(60,30,0,0.75)" fontSize="10"
        fontFamily="Manrope,sans-serif" fontWeight="700"
        style={{ animation: 'labelPop 0.35s 1.0s ease both', opacity: 0 }}>340</text>
    </svg>
  )
}

/* ── Card configs ─────────────────────────────────────────────────── */

const BENTO_CARDS = [
  {
    id: 'realtime',
    title: 'Real-time Event Tracking',
    desc: 'Capture every click, page view, and custom event in under 5ms.',
    bg: '#111111',
    textColor: '#ffffff',
    descColor: 'rgba(255,255,255,0.45)',
    area: 'realtime',
    Illustration: RealtimeSVG,
  },
  {
    id: 'funnels',
    title: 'Funnel Analysis',
    desc: 'Spot drop-offs instantly and fix them before they cost revenue.',
    bg: '#FFF4EC',
    textColor: '#111111',
    descColor: '#996633',
    area: 'funnels',
    Illustration: FunnelSVG,
  },
  {
    id: 'retention',
    title: 'Cohort Retention',
    desc: 'Measure how well you retain users over any time window.',
    bg: '#EDF7F0',
    textColor: '#111111',
    descColor: '#2E6642',
    area: 'retention',
    Illustration: RetentionSVG,
  },
  {
    id: 'identity',
    title: 'User Identification',
    desc: 'Stitch anonymous and identified sessions across every platform.',
    bg: '#F5F0FF',
    textColor: '#111111',
    descColor: '#5B3A8C',
    area: 'identity',
    Illustration: UserIDSVG,
  },
  {
    id: 'ai',
    title: 'AI-Powered Insights',
    desc: 'Ask anything in plain English — DS Bot answers without SQL.',
    bg: '#1A1A2E',
    textColor: '#ffffff',
    descColor: 'rgba(255,255,255,0.45)',
    area: 'ai',
    Illustration: AISvg,
  },
  {
    id: 'groups',
    title: 'Group Analytics',
    desc: 'Track behavior at the account level. Built for B2B SaaS.',
    bg: '#FFFBEC',
    textColor: '#111111',
    descColor: '#7A6400',
    area: 'groups',
    Illustration: GroupSVG,
  },
]

/* ── Card component ────────────────────────────────────────────────── */

function BentoCard({ card, index }) {
  const { Illustration } = card
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        gridArea: card.area,
        background: card.bg,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'default',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '22px 24px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.02)'
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.18)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Large SVG illustration — absolute, covers top portion of card */}
      <Illustration />

      {/* Text at bottom, above illustration */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '1rem',
          color: card.textColor,
          margin: '0 0 5px',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
        }}>
          {card.title}
        </h3>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '0.8rem',
          color: card.descColor,
          margin: 0,
          lineHeight: 1.55,
        }}>
          {card.desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ── Section ───────────────────────────────────────────────────────── */

export function ProductCapabilities() {
  return (
    <section style={{
      background: '#FAFAF8',
      borderTop: '1px solid #E8E6E0',
      borderBottom: '1px solid #E8E6E0',
      padding: '80px 0 88px',
    }}>
      <div className="lp-wrap">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 48, maxWidth: 640 }}
        >
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: '#F47B20',
            textTransform: 'uppercase',
            margin: '0 0 14px',
          }}>
            Capabilities
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#111111',
            margin: '0 0 14px',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
          }}>
            Everything you need to understand your users
          </h2>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '1.05rem',
            color: '#777777',
            margin: 0,
            lineHeight: 1.6,
          }}>
            From raw events to deep behavioral insights — Advaita gives you the full picture.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="bento-grid">
          {BENTO_CARDS.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 260px 260px 260px;
          grid-template-areas:
            "realtime realtime funnels"
            "retention identity funnels"
            "ai       ai       groups";
          gap: 14px;
        }

        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
            grid-template-areas:
              "realtime realtime"
              "funnels  retention"
              "identity ai"
              "groups   groups";
          }
        }

        @media (max-width: 560px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas:
              "realtime"
              "funnels"
              "retention"
              "identity"
              "ai"
              "groups";
          }
        }
      `}</style>
    </section>
  )
}
