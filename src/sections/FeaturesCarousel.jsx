import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ── Feature data ─────────────────────────────────────────── */
const FEATURES = [
  {
    name: 'Real-time Tracking',
    desc: 'Capture every user action as it happens',
    url: 'app.advaita.io / live-events',
    navActive: 'Live Events',
    showLive: true,
  },
  {
    name: 'User Identification',
    desc: 'Unified profiles across sessions and devices',
    url: 'app.advaita.io / users / u_7k2m',
    navActive: 'Users',
    showLive: true,
  },
  {
    name: 'Funnel Analysis',
    desc: 'See exactly where users drop off',
    url: 'app.advaita.io / funnels / signup',
    navActive: 'Funnels',
    showLive: false,
  },
  {
    name: 'DS Chatbot',
    desc: 'Ask questions, get SQL-free answers',
    url: 'app.advaita.io / ai-insights',
    navActive: 'AI Insights',
    showLive: false,
  },
  {
    name: 'Cohort Retention',
    desc: 'Track how groups behave over time',
    url: 'app.advaita.io / retention',
    navActive: 'Retention',
    showLive: false,
  },
]

const NAV_LINKS = ['Overview', 'Funnels', 'Live Events', 'Users', 'AI Insights', 'Retention']

/* ── Preview content components ────────────────────────────── */

function LiveEventsPreview() {
  const events = [
    { color: '#F47B20', name: 'page_view',  user: 'u_7k2m · /dashboard', time: '2s ago', opacity: 1 },
    { color: '#1A7A2E', name: 'identify',   user: 'u_3x9p · james@co.io', time: '5s ago', opacity: 1 },
    { color: '#3178C6', name: 'track',      user: 'u_9z2b · btn_clicked', time: '9s ago', opacity: 1 },
    { color: '#F47B20', name: 'page_view',  user: 'u_mk1a · /pricing', time: '14s ago', opacity: 0.55 },
    { color: '#7C3AED', name: 'click',      user: 'u_p9xq · upgrade_btn', time: '18s ago', opacity: 0.35 },
    { color: '#F47B20', name: 'page_view',  user: 'u_rk3c · /features', time: '23s ago', opacity: 0.2 },
  ]
  const bars = [35, 50, 42, 68, 55, 80, 72, 100]

  return (
    <div style={{ flex: 1, padding: 16, background: '#F8FAFC', display: 'flex', gap: 12, overflow: 'hidden' }}>
      {/* Stat cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0, width: 136 }}>
        {[
          { label: 'Events / min', value: '2,847', change: '↑ 12% vs yesterday', changeColor: '#1A7A2E' },
          { label: 'Avg Latency',  value: '3.2ms',  change: '↓ 0.4ms this hour',  changeColor: '#1A7A2E' },
          { label: 'Active Users', value: '341',    change: '↑ 8 new sessions',   changeColor: '#3178C6' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: '0.55rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.58rem', color: s.changeColor, marginTop: 3 }}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* Event stream */}
      <div style={{ flex: 1, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '9px 14px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Event Stream</span>
          <span style={{ fontSize: '0.56rem', color: '#94A3B8' }}>last 60 seconds</span>
        </div>
        {events.map((ev, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderBottom: '1px solid #F8FAFC', opacity: ev.opacity }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.64rem', fontWeight: 600, color: '#111', fontFamily: 'monospace', flex: 1 }}>{ev.name}</span>
            <span style={{ fontSize: '0.58rem', color: '#94A3B8', fontFamily: 'monospace' }}>{ev.user}</span>
            <span style={{ fontSize: '0.56rem', color: '#CBD5E1', minWidth: 40, textAlign: 'right' }}>{ev.time}</span>
          </div>
        ))}
      </div>

      {/* Mini bar chart */}
      <div style={{ width: 160, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '9px 12px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Events / hour</div>
        </div>
        <div style={{ padding: '10px 12px', flex: 1, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: '2px 2px 0 0',
              height: `${h}%`,
              background: h === 100 ? '#F47B20' : 'rgba(244,123,32,0.15)',
            }} />
          ))}
        </div>
        <div style={{ padding: '0 12px 8px', fontSize: '0.54rem', color: '#94A3B8' }}>Peak: 4,120 events</div>
      </div>
    </div>
  )
}

function UserProfilePreview() {
  const traitRows = [
    { key: 'userId',      val: 'u_7k2m' },
    { key: 'anonymousId', val: 'anon_9x3p' },
    { key: 'browser',     val: 'Chrome 123' },
    { key: 'OS',          val: 'macOS 14.4' },
    { key: 'country',     val: 'United States' },
  ]
  const timeline = [
    { name: 'page_view',   detail: '/dashboard',   time: '2m ago' },
    { name: 'track',       detail: 'btn_clicked',  time: '5m ago' },
    { name: 'identify',    detail: 'james@co.io',  time: '12m ago' },
    { name: 'page_view',   detail: '/pricing',     time: '18m ago' },
    { name: 'page_view',   detail: '/features',    time: '31m ago' },
  ]

  return (
    <div style={{ flex: 1, padding: 16, background: '#F8FAFC', display: 'flex', gap: 12, overflow: 'hidden' }}>
      {/* Profile card + traits */}
      <div style={{ width: 160, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '14px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#F47B20,#F5D000)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 800, color: '#fff' }}>J</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111' }}>James Carter</div>
            <div style={{ fontSize: '0.6rem', color: '#94A3B8', marginTop: 2 }}>james@co.io</div>
          </div>
          <div style={{ fontSize: '0.58rem', color: '#94A3B8', marginTop: 2 }}>Joined Mar 2024</div>
          <div style={{ background: 'rgba(244,123,32,0.1)', border: '1px solid rgba(244,123,32,0.3)', borderRadius: 99, padding: '2px 8px', fontSize: '0.56rem', fontWeight: 700, color: '#F47B20' }}>Pro Plan</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '10px 12px', flex: 1 }}>
          <div style={{ fontSize: '0.58rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Identity Traits</div>
          {traitRows.map((t, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', marginBottom: 6 }}>
              <span style={{ fontSize: '0.54rem', color: '#94A3B8' }}>{t.key}</span>
              <span style={{ fontSize: '0.6rem', color: '#111', fontFamily: 'monospace', fontWeight: 600 }}>{t.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Event timeline */}
      <div style={{ flex: 1, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '9px 14px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Event Timeline</span>
        </div>
        {timeline.map((ev, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderBottom: '1px solid #F8FAFC' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A7A2E', flexShrink: 0 }} />
            <span style={{ fontSize: '0.64rem', fontWeight: 600, color: '#111', fontFamily: 'monospace', flex: 1 }}>{ev.name}</span>
            <span style={{ fontSize: '0.58rem', color: '#94A3B8', fontFamily: 'monospace' }}>{ev.detail}</span>
            <span style={{ fontSize: '0.56rem', color: '#CBD5E1', minWidth: 44, textAlign: 'right' }}>{ev.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FunnelPreview() {
  const steps = [
    { label: 'Visited',    count: 10000, pct: 100,  drop: null },
    { label: 'Signed Up',  count: 3200,  pct: 32,   drop: '68% dropped' },
    { label: 'Added Card', count: 1440,  pct: 14.4, drop: '55% dropped' },
    { label: 'Converted',  count: 720,   pct: 7.2,  drop: '50% dropped' },
  ]

  return (
    <div style={{ flex: 1, padding: 16, background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
      <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Signup Funnel</div>
      <div style={{ flex: 1, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 600, color: '#374151' }}>{step.label}</span>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: '0.6rem', color: '#94A3B8' }}>{step.count.toLocaleString()}</span>
                <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#111' }}>{step.pct}%</span>
              </div>
            </div>
            <div style={{ height: 24, background: '#F1F5F9', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${step.pct}%`,
                background: i === 0 ? '#1A7A2E' : i === steps.length - 1 ? '#F47B20' : '#4ade80',
                borderRadius: 6,
                transition: 'width 0.6s ease',
              }} />
            </div>
            {step.drop && (
              <div style={{ fontSize: '0.56rem', color: '#EF4444', marginTop: 2 }}>↓ {step.drop}</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.62rem', color: '#94A3B8' }}>Overall conversion rate</span>
        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#F47B20' }}>7.2%</span>
      </div>
    </div>
  )
}

function ChatbotPreview() {
  return (
    <div style={{ flex: 1, padding: 16, background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
      <div style={{ flex: 1, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '9px 14px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' }}>AI Insights</span>
        </div>
        <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
          {/* User message */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ background: '#1A7A2E', color: '#fff', borderRadius: '12px 12px 2px 12px', padding: '8px 12px', maxWidth: '75%', fontSize: '0.68rem', lineHeight: 1.5 }}>
              Which feature drives the most retention?
            </div>
          </div>
          {/* AI response */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'conic-gradient(#F47B20 0deg 120deg,#F5D000 120deg 240deg,#1A7A2E 240deg 360deg)', flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '2px 12px 12px 12px', padding: '8px 12px', fontSize: '0.66rem', color: '#374151', lineHeight: 1.6, marginBottom: 8 }}>
                Users who complete the <strong>Funnel Analysis</strong> setup within 3 days of signup retain at <strong>68%</strong> after 8 weeks — compared to 31% for those who don't. Cohort W3 shows the strongest signal.
              </div>
              {/* Inline mini retention chart */}
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ fontSize: '0.56rem', color: '#94A3B8', marginBottom: 6 }}>8-week retention by onboarding path</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
                  {[68, 65, 60, 54, 50, 46, 42, 38].map((h, i) => (
                    <div key={i} style={{ flex: 1, background: '#1A7A2E', borderRadius: '2px 2px 0 0', opacity: 0.4 + i * 0.08, height: `${(h / 68) * 100}%` }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map(w => (
                    <span key={w} style={{ fontSize: '0.5rem', color: '#CBD5E1' }}>{w}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Input */}
        <div style={{ padding: '8px 12px', borderTop: '1px solid #F1F5F9', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '6px 10px', fontSize: '0.62rem', color: '#94A3B8' }}>
            Ask a question about your data...
          </div>
          <div style={{ background: '#1A7A2E', borderRadius: 6, padding: '6px 10px', fontSize: '0.6rem', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Send</div>
        </div>
      </div>
    </div>
  )
}

function RetentionPreview() {
  const cohorts = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6']
  const weekCols = ['W0', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']
  const data = [
    [100, 72, 61, 54, 49, 45, 41, 38, 35],
    [100, 68, 57, 50, 44, 40, 37, 34, null],
    [100, 74, 63, 56, 51, 47, 43, null, null],
    [100, 70, 60, 52, 47, 43, null, null, null],
    [100, 66, 55, 48, null, null, null, null, null],
    [100, 71, null, null, null, null, null, null, null],
  ]

  const cellColor = (val) => {
    if (val === null) return '#F8FAFC'
    if (val >= 90) return '#14532d'
    if (val >= 70) return '#166534'
    if (val >= 55) return '#15803d'
    if (val >= 40) return '#4ade80'
    return '#bbf7d0'
  }

  return (
    <div style={{ flex: 1, padding: 16, background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
      <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Cohort Retention Heatmap</div>
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Column headers */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 6, paddingLeft: 60 }}>
          {weekCols.map(w => (
            <div key={w} style={{ flex: 1, textAlign: 'center', fontSize: '0.54rem', color: '#94A3B8', fontWeight: 600 }}>{w}</div>
          ))}
        </div>
        {/* Rows */}
        {cohorts.map((cohort, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 4, marginBottom: 3, alignItems: 'center' }}>
            <div style={{ width: 56, fontSize: '0.54rem', color: '#94A3B8', flexShrink: 0 }}>{cohort}</div>
            {weekCols.map((_, ci) => {
              const val = data[ri][ci]
              return (
                <div key={ci} style={{
                  flex: 1, height: 26, borderRadius: 4,
                  background: cellColor(val),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {val !== null && (
                    <span style={{ fontSize: '0.5rem', color: val >= 55 ? '#fff' : '#374151', fontWeight: 700 }}>{val}%</span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
          <span style={{ fontSize: '0.54rem', color: '#94A3B8' }}>Low</span>
          {['#bbf7d0', '#4ade80', '#15803d', '#166534', '#14532d'].map((c, i) => (
            <div key={i} style={{ width: 18, height: 10, borderRadius: 2, background: c }} />
          ))}
          <span style={{ fontSize: '0.54rem', color: '#94A3B8' }}>High</span>
        </div>
      </div>
    </div>
  )
}

/* ── Feature list (left panel) ─────────────────────────────── */
function FeatureList({ activeIndex }) {
  const fillPct = ((activeIndex + 1) / FEATURES.length) * 100

  return (
    <div style={{
      width: 240,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      padding: '8px 0',
    }}>
      {/* Grey track line */}
      <div style={{
        position: 'absolute',
        left: 6,
        top: 16,
        bottom: 16,
        width: 2,
        background: '#E2E8F0',
        borderRadius: 2,
      }} />
      {/* Green fill overlay */}
      <div style={{
        position: 'absolute',
        left: 6,
        top: 16,
        width: 2,
        height: `${fillPct}%`,
        background: '#1A7A2E',
        borderRadius: 2,
        transition: 'height 0.6s ease',
      }} />

      {FEATURES.map((feature, i) => {
        const isActive = i === activeIndex
        return (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            padding: i === FEATURES.length - 1 ? '10px 0 8px 0' : '10px 0 22px 0',
            position: 'relative',
          }}>
            {/* Dot */}
            <div style={{ position: 'absolute', left: 0, top: 13, zIndex: 1 }}>
              {isActive ? (
                <div style={{
                  width: 13, height: 13, borderRadius: '50%',
                  background: '#1A7A2E',
                  border: '2px solid #fff',
                  boxShadow: '0 0 0 2.5px #1A7A2E',
                }} />
              ) : (
                <div style={{
                  width: 11, height: 11, borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid #CBD5E1',
                }} />
              )}
            </div>

            {/* Text */}
            <div style={{ paddingLeft: 24 }}>
              <div style={{
                fontSize: isActive ? '0.9rem' : '0.86rem',
                fontWeight: isActive ? 700 : 600,
                color: isActive ? '#1A7A2E' : '#374151',
                opacity: isActive ? 1 : 0.38,
                fontFamily: "'Manrope', sans-serif",
                lineHeight: 1.3,
                transition: 'color 0.4s ease, opacity 0.4s ease',
              }}>
                {feature.name}
              </div>
              {isActive && (
                <div style={{
                  fontSize: '0.72rem',
                  color: '#4ade80',
                  fontWeight: 500,
                  marginTop: 3,
                  fontFamily: "'Manrope', sans-serif",
                }}>
                  {feature.desc}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Feature preview (right panel) ────────────────────────── */
const PREVIEWS = [LiveEventsPreview, UserProfilePreview, FunnelPreview, ChatbotPreview, RetentionPreview]

function FeaturePreview({ activeIndex }) {
  const feature = FEATURES[activeIndex]
  const PreviewContent = PREVIEWS[activeIndex]

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 14,
      overflow: 'hidden',
      border: '1px solid #D1D5DB',
      boxShadow: '0 12px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)',
    }}>
      {/* Browser chrome */}
      <div style={{
        background: '#E8EAED',
        padding: '9px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid #D1D5DB',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: '#fff', borderRadius: 6,
          padding: '4px 10px', fontSize: '0.6rem', color: '#94A3B8',
          fontFamily: 'monospace', border: '1px solid #E2E8F0',
        }}>
          {feature.url}
        </div>
      </div>

      {/* Dashboard shell */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{
          background: '#0F172A',
          padding: '9px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'conic-gradient(#F47B20 0deg 120deg,#F5D000 120deg 240deg,#1A7A2E 240deg 360deg)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>ADVAITA</span>
            <div style={{ display: 'flex', gap: 18, marginLeft: 20 }}>
              {NAV_LINKS.map(link => (
                <a key={link} href="#" style={{
                  fontSize: '0.6rem',
                  color: link === feature.navActive ? '#F47B20' : 'rgba(255,255,255,0.38)',
                  textDecoration: 'none',
                  borderBottom: link === feature.navActive ? '1.5px solid #F47B20' : 'none',
                  paddingBottom: link === feature.navActive ? 1 : 0,
                }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
          {feature.showLive && (
            <span style={{ fontSize: '0.58rem', background: 'rgba(26,122,46,0.2)', color: '#4ade80', padding: '2px 9px', borderRadius: 99, fontWeight: 700 }}>
              ● LIVE
            </span>
          )}
        </div>

        {/* Animated preview content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1, display: 'flex', overflow: 'hidden' }}
          >
            <PreviewContent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────── */
export function FeaturesCarousel() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrolled = -rect.top
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight))
      setActiveIndex(Math.min(4, Math.floor(progress * 5)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section style={{ background: '#ffffff' }}>

      {/* Sticky scroll track — 500vh = 5 features × 100vh */}
      <div ref={sectionRef} style={{ height: '500vh', position: 'relative' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          padding: '48px 40px 32px',
        }}>

          {/* Section heading — inside sticky so no gap */}
          <div style={{ textAlign: 'center', width: '100%', maxWidth: 1100 }}>
            <div style={{ marginBottom: 10 }}>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                color: '#F47B20',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontFamily: "'Manrope', sans-serif",
              }}>
                Smarter Analytics for Modern Businesses
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
              color: '#111111',
              margin: 0,
              letterSpacing: '-0.025em',
              maxWidth: 700,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.25,
            }}>
              Turn Complex Data Into Clear, Confident Decisions
              <span style={{ color: '#999999', fontWeight: 500 }}>
                {' '}— Empowering Your Team With Insights That Drive Real Business Growth.
              </span>
            </h2>
          </div>

          {/* Feature list + preview */}
          <div style={{
            width: '100%',
            maxWidth: 1100,
            display: 'flex',
            gap: 40,
            alignItems: 'stretch',
            flex: 1,
            minHeight: 0,
          }}>
            <FeatureList activeIndex={activeIndex} />
            <FeaturePreview activeIndex={activeIndex} />
          </div>

        </div>
      </div>

    </section>
  )
}
