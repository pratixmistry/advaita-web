import { useState } from 'react'
import logoImg from '../assets/Logo.png'

/* ─── Data ─────────────────────────────────────────────────── */

const BILLING_CYCLES = [
  { key: 'monthly',   label: 'Monthly',   savingsLabel: null },
  { key: 'annually',  label: 'Annually',  savingsLabel: 'SAVE 40%' },
  { key: 'quarterly', label: 'Quarterly', savingsLabel: 'SAVE 25%' },
]

const PLANS = [
  {
    key: 'starter',
    name: 'Basic',
    tagline: 'Perfect for indie developers getting started with analytics.',
    highlight: false,
    prices: {
      monthly:   { amount: 0,      billing: null },
      annually:  { amount: 0,      billing: null },
      quarterly: { amount: 0,      billing: null },
    },
    cta: 'Get Advaita ',
    ctaStyle: 'outline',
    features: [
      'Up to 100K events/mo',
      '3 team members',
      'Funnels & retention',
      'User explorer',
      '30-day data retention',
      'Community support',
      'Self-hosted',
    ],
  },
  {
    key: 'growth',
    name: 'Pro',
    tagline: 'Built for scaling teams that need deeper insights and control.',
    highlight: true,
    badge: 'Most popular',
    prices: {
      monthly:   { amount: 29,     billing: null },
      annually:  { amount: 18,     billing: '$216 billed annually' },
      quarterly: { amount: 23,     billing: '$69 billed every 3 months' },
    },
    cta: 'Get Advaita Pro',
    ctaStyle: 'primary',
    features: [
      'Everything in Basic',
      'Unlimited events',
      'Unlimited team members',
      '1-year data retention',
      'AI-powered insights',
      'Priority support',
      'Advanced funnels & cohorts',
      'API access',
    ],
  },
  {
    key: 'enterprise',
    name: 'Max',
    tagline: 'Tailored solutions for organizations with advanced needs.',
    highlight: false,
    prices: {
      monthly:   { amount: null,   billing: null },
      annually:  { amount: null,   billing: null },
      quarterly: { amount: null,   billing: null },
    },
    cta: 'Get Advaita Max',
    ctaStyle: 'outline',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'SLA guarantee',
      'SSO & SAML',
      'Custom retention',
      'On-premise deployment',
    ],
  },
]

const FAQS = [
  {
    q: 'What is a credit?',
    a: 'One credit powers 20 advanced AI operations — including natural language queries, anomaly alerts, DS Bot reports, and AI-generated insights. Basic event tracking does not consume credits.',
  },
  {
    q: 'Is data hosting included?',
    a: "Yes. All plans include data hosting. You can also self-host Advaita on your own infrastructure at no extra cost — it's fully open source.",
  },
  {
    q: 'Why is Advaita ~10x cheaper than competitors?',
    a: 'Advaita is built on open-source infrastructure (ClickHouse, Kafka, FastAPI) with no legacy overhead. We pass those savings directly to you — no per-event surcharges, no surprise bills.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. You can upgrade or downgrade at any time. Prorated billing applies for mid-cycle changes.',
  },
  {
    q: 'Do quarterly and annual plans auto-renew?',
    a: 'Yes, unless you cancel before the renewal date. You can manage billing from your workspace settings.',
  },
]

/* ─── Helpers ───────────────────────────────────────────────── */

function formatPrice(amount) {
  if (amount === null) return 'Custom'
  if (amount === 0) return 'Free'
  return `$${amount}`
}

/* ─── Sub-components ────────────────────────────────────────── */

function CheckIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="8" fill={color ? `${color}1A` : 'rgba(26,122,46,0.15)'} />
      <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke={color || '#1A7A2E'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}
      >
        <span style={{ fontSize: '0.925rem', fontWeight: 600, color: '#F0EBE0', lineHeight: 1.4 }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, color: 'rgba(240,235,224,0.4)', transition: 'transform 0.22s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <p style={{ fontSize: '0.875rem', color: 'rgba(240,235,224,0.55)', lineHeight: 1.65, margin: '0 0 20px', fontFamily: "'IBM Plex Sans', sans-serif" }}>
          {a}
        </p>
      )}
    </div>
  )
}

/* ─── Main Page ─────────────────────────────────────────────── */

export default function Pricing({ onBack }) {
  const [cycle, setCycle] = useState('monthly')

  const handleCta = (plan) => {
    if (plan.key === 'enterprise') {
      window.location.hash = '#contact'
    } else {
      window.location.hash = '#waitlist'
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0E0E0E',
      color: '#F0EBE0',
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        background: 'rgba(14,14,14,0.92)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 28px',
      }}>
        <div style={{
          maxWidth: 1180,
          margin: '0 auto',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <a href="#" onClick={e => { e.preventDefault(); onBack && onBack() }} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src={logoImg} alt="Advaita logo" style={{ width: 36, height: 36, borderRadius: '50%', mixBlendMode: 'lighten', objectFit: 'cover' }} />
            <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: '1.15rem', color: '#F0EBE0', letterSpacing: '0.02em' }}>ADVAITA</span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="#" onClick={e => { e.preventDefault(); onBack && onBack() }}
              style={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(240,235,224,0.5)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F0EBE0'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,235,224,0.5)'}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back to home
            </a>
            <a href="#waitlist" onClick={() => onBack && onBack()}
              style={{ padding: '8px 18px', background: '#F47B20', color: '#fff', borderRadius: 7, fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', transition: 'background 0.15s', letterSpacing: '0.02em' }}
              onMouseEnter={e => e.currentTarget.style.background = '#e0701c'}
              onMouseLeave={e => e.currentTarget.style.background = '#F47B20'}
            >
              Get early access
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero heading ────────────────────────────────────────── */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '80px 28px 56px', textAlign: 'left' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(244,123,32,0.08)', border: '1px solid rgba(244,123,32,0.22)',
          borderRadius: 999, padding: '4px 16px', marginBottom: 24,
        }}>
          <span style={{ color: '#F47B20', fontSize: '0.85rem', lineHeight: 1 }}>★</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#F47B20', letterSpacing: '0.09em', textTransform: 'uppercase', fontFamily: "'IBM Plex Sans', sans-serif" }}>
            ~10X LESS THAN AMPLITUDE &amp; MIXPANEL
          </span>
        </div>

        <h1 style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
          color: '#F0EBE0',
          margin: '0 0 18px',
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
        }}>
          The <span style={{ color: '#F47B20' }}>ANALYTICS PLATFORM</span>,
          <br />built for modern teams
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'rgba(240,235,224,0.5)',
          maxWidth: 480,
          margin: '0 0',
          lineHeight: 1.7,
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}>
          Full-stack analytics with AI insights and data hosting included.
          No per-event surcharges, no seat taxes, no surprises.
        </p>
      </section>

      {/* ── Pricing table (dotted border layout) ────────────────── */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px 80px' }}>
        <div style={{
          border: '1.5px dashed rgba(255,255,255,0.14)',
          borderRadius: 20,
          overflow: 'hidden',
          background: '#111',
        }}>
          {/* Table header row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '220px 1fr 1fr 1fr',
            borderBottom: '1.5px dashed rgba(255,255,255,0.14)',
          }}>
            {/* Billing selector column header */}
            <div style={{
              padding: '28px 24px',
              borderRight: '1.5px dashed rgba(255,255,255,0.14)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'rgba(240,235,224,0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}>
                Billing period
              </span>
            </div>

            {/* Plan column headers */}
            {PLANS.map((plan, i) => (
              <div
                key={plan.key}
                style={{
                  padding: '28px 28px 24px',
                  borderRight: i < PLANS.length - 1 ? '1.5px dashed rgba(255,255,255,0.14)' : 'none',
                  background: plan.highlight ? 'rgba(244,123,32,0.04)' : 'transparent',
                  position: 'relative',
                }}
              >
                {plan.badge && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    background: '#F47B20',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 999,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    marginBottom: 10,
                  }}>
                    {plan.badge}
                  </div>
                )}

                <div style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.3rem',
                  color: plan.highlight ? '#F47B20' : '#F0EBE0',
                  marginBottom: 4,
                }}>
                  {plan.name}
                </div>

                <div style={{
                  fontSize: '0.8rem',
                  color: 'rgba(240,235,224,0.45)',
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  lineHeight: 1.5,
                }}>
                  {plan.tagline}
                </div>
              </div>
            ))}
          </div>

          {/* Price row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '220px 1fr 1fr 1fr',
            borderBottom: '1.5px dashed rgba(255,255,255,0.14)',
            alignItems: 'center',
          }}>
            {/* Billing period radio selector */}
            <div style={{
              padding: '28px 24px',
              borderRight: '1.5px dashed rgba(255,255,255,0.14)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}>
              {BILLING_CYCLES.map(c => (
                <button
                  key={c.key}
                  onClick={() => setCycle(c.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                  }}
                >
                  {/* Radio dot */}
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: `2px solid ${cycle === c.key ? '#F47B20' : 'rgba(255,255,255,0.25)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'border-color 0.18s',
                  }}>
                    {cycle === c.key && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F47B20' }} />
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: '0.875rem',
                      fontWeight: cycle === c.key ? 700 : 400,
                      color: cycle === c.key ? '#F0EBE0' : 'rgba(240,235,224,0.5)',
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      transition: 'color 0.18s',
                    }}>
                      {c.label}
                    </span>
                    {c.savingsLabel && (
                      <span style={{
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        color: '#0E0E0E',
                        background: '#F5D000',
                        padding: '1px 7px',
                        borderRadius: 999,
                        letterSpacing: '0.05em',
                        fontFamily: "'IBM Plex Sans', sans-serif",
                      }}>
                        {c.savingsLabel}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Price cells */}
            {PLANS.map((plan, i) => {
              const price = plan.prices[cycle]
              return (
                <div
                  key={plan.key}
                  style={{
                    padding: '28px 28px',
                    borderRight: i < PLANS.length - 1 ? '1.5px dashed rgba(255,255,255,0.14)' : 'none',
                    background: plan.highlight ? 'rgba(244,123,32,0.04)' : 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                    <span style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontWeight: 900,
                      fontSize: price.amount === 0 || price.amount === null ? '2rem' : '2.2rem',
                      color: '#F0EBE0',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}>
                      {formatPrice(price.amount)}
                    </span>
                    {price.amount !== null && price.amount > 0 && (
                      <span style={{ fontSize: '0.8rem', color: 'rgba(240,235,224,0.4)', fontFamily: "'IBM Plex Sans', sans-serif" }}>
                        / mo
                      </span>
                    )}
                  </div>

                  {price.billing ? (
                    <div style={{ fontSize: '0.73rem', color: 'rgba(240,235,224,0.35)', fontFamily: "'IBM Plex Sans', sans-serif", marginBottom: 16, minHeight: 18 }}>
                      {price.billing}
                    </div>
                  ) : (
                    <div style={{ minHeight: 18, marginBottom: 16 }} />
                  )}

                  <button
                    onClick={() => handleCta(plan)}
                    style={{
                      width: '100%',
                      padding: '10px 0',
                      borderRadius: 8,
                      border: plan.ctaStyle === 'primary' ? 'none' : '1.5px solid rgba(255,255,255,0.14)',
                      background: plan.ctaStyle === 'primary' ? '#F47B20' : 'transparent',
                      color: plan.ctaStyle === 'primary' ? '#fff' : '#F0EBE0',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      cursor: 'pointer',
                      letterSpacing: '0.01em',
                      transition: 'background 0.18s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => {
                      if (plan.ctaStyle === 'primary') {
                        e.currentTarget.style.background = '#e0701c'
                        e.currentTarget.style.boxShadow = '0 4px 18px rgba(244,123,32,0.35)'
                      } else {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (plan.ctaStyle === 'primary') {
                        e.currentTarget.style.background = '#F47B20'
                        e.currentTarget.style.boxShadow = 'none'
                      } else {
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {plan.cta}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Features rows */}
          {(() => {
            const maxFeatures = Math.max(...PLANS.map(p => p.features.length))
            return Array.from({ length: maxFeatures }).map((_, fi) => (
              <div
                key={fi}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr 1fr 1fr',
                  borderBottom: fi < maxFeatures - 1 ? '1px dashed rgba(255,255,255,0.07)' : 'none',
                }}
              >
                {/* Empty left column on feature rows */}
                <div style={{ borderRight: '1.5px dashed rgba(255,255,255,0.14)' }} />

                {PLANS.map((plan, pi) => (
                  <div
                    key={plan.key}
                    style={{
                      padding: '13px 28px',
                      borderRight: pi < PLANS.length - 1 ? '1.5px dashed rgba(255,255,255,0.14)' : 'none',
                      background: plan.highlight ? 'rgba(244,123,32,0.025)' : 'transparent',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                    }}
                  >
                    {plan.features[fi] ? (
                      <>
                        <CheckIcon color={plan.highlight ? '#F47B20' : '#1A7A2E'} />
                        <span style={{
                          fontSize: '0.83rem',
                          color: 'rgba(240,235,224,0.65)',
                          lineHeight: 1.5,
                          fontFamily: "'IBM Plex Sans', sans-serif",
                        }}>
                          {plan.features[fi]}
                        </span>
                      </>
                    ) : (
                      <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '1rem', paddingLeft: 2 }}>—</span>
                    )}
                  </div>
                ))}
              </div>
            ))
          })()}
        </div>
      </section>

      {/* ── Included in all plans ──────────────────────────────── */}
      <section style={{ background: '#161616', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 28px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: '1.6rem', color: '#F0EBE0', marginBottom: 8 }}>
            Included in every plan
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'rgba(240,235,224,0.45)', marginBottom: 36, fontFamily: "'IBM Plex Sans', sans-serif" }}>
            No add-ons, no gotchas — these come standard.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              { icon: '⚡', title: '<5ms latency',    desc: 'Sub-5ms event ingestion, always.' },
              { icon: '🔒', title: 'GDPR compliant',  desc: 'Privacy-first defaults, data deletion on request.' },
              { icon: '🌐', title: 'Self-hostable',   desc: 'Deploy on your own infra — 100% open source.' },
              { icon: '🤖', title: 'DS Bot',          desc: 'AI analyst built in, answers in plain English.' },
              { icon: '🗄️', title: 'Data hosting',    desc: 'Managed storage on secure cloud infrastructure.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '22px 20px', textAlign: 'left' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F0EBE0', marginBottom: 5, fontFamily: "'IBM Plex Sans', sans-serif" }}>{item.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(240,235,224,0.45)', lineHeight: 1.5, fontFamily: "'IBM Plex Sans', sans-serif" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '72px 28px 80px' }}>
        <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: '1.75rem', color: '#F0EBE0', marginBottom: 8, textAlign: 'center' }}>
          Frequently asked questions
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'rgba(240,235,224,0.45)', textAlign: 'center', marginBottom: 40, fontFamily: "'IBM Plex Sans', sans-serif" }}>
          Still have questions?{' '}
          <a href="#contact" style={{ color: '#F47B20', textDecoration: 'none', fontWeight: 600 }}>Talk to us</a>
        </p>
        <div>
          {FAQS.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #111 0%, #1a0e05 50%, #111 100%)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '72px 28px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <img src={logoImg} alt="Advaita" style={{ width: 52, height: 52, borderRadius: '50%', mixBlendMode: 'lighten', objectFit: 'cover' }} />
          </div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: '#F0EBE0', margin: '0 0 14px', lineHeight: 1.2 }}>
            Start tracking in under 5 minutes
          </h2>
          <p style={{ fontSize: '0.975rem', color: 'rgba(240,235,224,0.5)', marginBottom: 32, lineHeight: 1.6, fontFamily: "'IBM Plex Sans', sans-serif" }}>
            Three lines of code. Full visibility. Backed by iHub.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#waitlist" onClick={() => onBack && onBack()}
              style={{ padding: '13px 28px', background: '#F47B20', color: '#fff', borderRadius: 8, fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: '0.02em', transition: 'background 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e0701c'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(244,123,32,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F47B20'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Join the waitlist →
            </a>
            <a href="#contact"
              style={{ padding: '13px 28px', background: 'transparent', color: '#F0EBE0', border: '1.5px solid rgba(255,255,255,0.14)', borderRadius: 8, fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'IBM Plex Sans', sans-serif", transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}
            >
              Contact sales
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 28px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.78rem', color: 'rgba(240,235,224,0.3)', margin: 0, fontFamily: "'IBM Plex Sans', sans-serif" }}>
          © {new Date().getFullYear()} Advaita. Open source. Self-hostable. Backed by iHub.
        </p>
      </footer>
    </div>
  )
}
