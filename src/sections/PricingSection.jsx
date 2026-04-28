import { useState } from 'react'

const PRICES = {
  Basic: { monthly: 20000, quarterly: 15000, annually: 12000 },
  Pro:   { monthly: 50000, quarterly: 37500, annually: 30000 },
  Max:   { monthly: 100000, quarterly: 75000, annually: 60000 },
}

const FEATURES = {
  Basic: [
    'Instant account activation',
    '10 team members',
    'Cloud-hosted Infrastructure',
    '2,000 AI credits/mo',
    'Email support',
    'Standard API access',
  ],
  Pro: [
    'Everything in Basic',
    '50 team members',
    '5,000 AI credits/mo',
    'Priority email support(12-24hr)',
    'Advanced Analytics features',
    'Custom integrations',
  ],
  Max: [
    'Everything in Pro',
    'Unlimited team members',
    '24/7 priority support',
    '10,000 AI credits/mo',
    'Dedicated account manager',
    'Premium API limits',
  ],
}

const CYCLES = ['monthly', 'quarterly', 'annually']
const SAVINGS = { monthly: null, quarterly: '−25%', annually: '−40%' }

function formatINR(amount) {
  if (amount >= 100000) {
    const val = amount / 100000
    return `₹${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}L`
  }
  if (amount >= 1000) {
    const val = amount / 1000
    return `₹${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}K`
  }
  return `₹${amount}`
}

function BillingToggle({ cycle, onChange }) {
  return (
    <div role="group" aria-label="Billing cycle" style={{
      display: 'inline-flex',
      margin: '0 auto 40px',
      border: '1px solid var(--adv-border)',
      background: '#fff',
      borderRadius: 6,
      overflow: 'hidden',
    }}>
      {CYCLES.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={cycle === c}
          onClick={() => onChange(c)}
          style={{
            fontFamily: 'inherit',
            fontSize: '0.8rem',
            fontWeight: 600,
            padding: '10px 20px',
            color: cycle === c ? '#fff' : '#6b6b6b',
            background: cycle === c ? '#F47B20' : 'transparent',
            border: 'none',
            borderRight: c !== 'annually' ? '1px solid var(--adv-border)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'background 0.15s, color 0.15s',
          }}
        >
          {c.charAt(0).toUpperCase() + c.slice(1)}
          {SAVINGS[c] && (
            <span style={{
              background: cycle === c ? 'rgba(255,255,255,0.25)' : '#1A7A2E',
              color: '#fff',
              fontSize: '0.58rem',
              padding: '2px 6px',
              borderRadius: 6,
              fontWeight: 700,
            }}>{SAVINGS[c]}</span>
          )}
        </button>
      ))}
    </div>
  )
}

function CheckIcon({ accent = '#F47B20' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <rect width="14" height="14" fill={`${accent}1F`} />
      <path d="M3.5 7l2.5 2.5L10.5 4.5" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PricingCard({ tier, cycle, featured }) {
  const price = PRICES[tier][cycle]
  const ctaLabel = tier === 'Basic' ? 'Get Started' : tier === 'Pro' ? 'Get Started' : 'Get Started'
  const ctaHref  = tier === 'Max' ? '#contact' : '#waitlist'

  return (
    <div style={{
      background: featured ? '#111' : '#fff',
      color: featured ? '#fff' : '#111',
      border: featured ? '1px solid #111' : '1px solid var(--adv-border)',
      borderRadius: 6,
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {featured && (
        <span style={{
          position: 'absolute',
          top: 16, right: 16,
          display: 'inline-block',
          background: '#F47B20',
          color: '#fff',
          borderRadius: 6,
          padding: '3px 10px',
          fontSize: '0.6rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>Recommended</span>
      )}

      <div style={{
        fontSize: '0.66rem',
        fontWeight: 800,
        color: featured ? '#F47B20' : '#8a8a8a',
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        marginBottom: 10,
      }}>
        {tier}
      </div>

      <div style={{
        fontFamily: "'Apfel Grotezk', sans-serif",
        fontWeight: 800,
        fontSize: '2.4rem',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: 4,
      }}>
        {formatINR(price)}
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: featured ? 'rgba(255,255,255,0.45)' : '#8a8a8a',
        marginBottom: 22,
      }}>
        per month
      </div>

      <a
        href={ctaHref}
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '11px 0',
          borderRadius: 6,
          fontWeight: 700,
          fontSize: '0.88rem',
          textDecoration: 'none',
          fontFamily: 'inherit',
          background: featured ? '#F47B20' : '#fff',
          color: featured ? '#fff' : '#111',
          border: featured ? '1px solid #F47B20' : '1px solid #111',
          transition: 'opacity 0.15s, transform 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1';   e.currentTarget.style.transform = 'translateY(0)' }}
      >
        {ctaLabel}
      </a>

      <hr style={{
        border: 'none',
        borderTop: featured ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(17,17,17,0.08)',
        margin: '22px 0 0',
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
        {FEATURES[tier].map((f) => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <CheckIcon accent={featured ? '#F5D000' : '#F47B20'} />
            <span style={{
              fontSize: '0.82rem',
              color: featured ? 'rgba(255,255,255,0.8)' : '#3a3a3a',
              lineHeight: 1.55,
            }}>
              {f}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const ENTERPRISE_GROUPS = [
  {
    label: 'Deployment & Infrastructure',
    items: [
      'On-premises or private cloud deployment',
      'Unlimited team members',
      'Unlimited data processing',
      'Dedicated infrastructure',
    ],
  },
  {
    label: 'Security & Support',
    items: [
      '24/7 priority support with SLA',
      'Custom integrations & API limits',
      'Advanced security & compliance',
      'White-label options available',
    ],
  },
]

function EnterprisePlusIcon({ open }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 22,
        height: 22,
        borderRadius: 4,
        background: '#A1824A',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.05rem',
        fontWeight: 700,
        lineHeight: 1,
        flexShrink: 0,
        transition: 'transform 0.2s',
        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
      }}
    >
      +
    </span>
  )
}

function EnterpriseCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
      <path d="M3 7.2l2.8 2.8L11 4.8" stroke="#A1824A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EnterpriseAccordionItem({ label, items }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(17,17,17,0.08)' }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '10px 0',
          cursor: 'pointer',
          fontFamily: 'inherit',
          color: '#111',
          fontSize: '0.95rem',
          fontWeight: 600,
          textAlign: 'left',
        }}
      >
        <EnterprisePlusIcon open={open} />
        <span style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{label}</span>
      </button>
      {open && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: '4px 0 14px 34px',
        }}>
          {items.map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <EnterpriseCheckIcon />
              <span style={{ fontSize: '0.84rem', color: '#3a3a3a', lineHeight: 1.5 }}>{f}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function EnterpriseHostingCard() {
  return (
    <div style={{ marginTop: 48 }}>
      <div className="enterprise-strip" style={{
        background: '#EDE7D8',
        padding: '36px 44px 44px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1.4fr auto',
        gap: 40,
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div>
          <div style={{
            fontFamily: "'Apfel Grotezk', sans-serif",
            fontWeight: 800,
            fontSize: '0.78rem',
            letterSpacing: '0.18em',
            color: '#111',
            marginBottom: 14,
          }}>
            ENTERPRISE PRIVATE HOSTING
          </div>
          <p style={{
            fontFamily: 'inherit',
            fontSize: '0.95rem',
            color: '#2a2a2a',
            margin: 0,
            lineHeight: 1.55,
            maxWidth: 300,
          }}>
            Full enterprise-level intelligence with unlimited capabilities
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {ENTERPRISE_GROUPS.map((g) => (
            <EnterpriseAccordionItem key={g.label} label={g.label} items={g.items} />
          ))}
        </div>

        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 22px',
            background: '#3f5f8a',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
            borderRadius: 6,
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.15s, transform 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.92'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Contact Us
          <span aria-hidden="true">→</span>
        </a>

        <div aria-hidden="true" style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 14,
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(17,17,17,0.18) 0 1px, transparent 1px 6px)',
          opacity: 0.9,
        }} />
      </div>

      <style>{`
        @media (max-width: 860px) {
          .enterprise-strip {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding: 28px 24px 36px !important;
          }
        }
      `}</style>
    </div>
  )
}

export function PricingSection() {
  const [cycle, setCycle] = useState('monthly')

  return (
    <section id="pricing" className="lp-grid-bg" style={{
      background: 'var(--adv-bg)',
      padding: '96px 0',
      position: 'relative',
    }}>
      <div className="lp-wrap-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: '#fff',
            border: '1px solid var(--adv-border)',
            color: '#111',
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            borderRadius: 6,
            marginBottom: 18,
          }}>
            Pricing
          </span>
          <h2 style={{
            fontFamily: "'Apfel Grotezk', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 3.8vw, 2.85rem)',
            color: '#111',
            margin: '0 0 14px',
            letterSpacing: '-0.025em',
          }}>
            Simple, transparent pricing.
          </h2>
          <p style={{
            fontFamily: "'Apfel Grotezk', sans-serif",
            fontSize: '1rem',
            color: '#6b6b6b',
            margin: '0 0 28px',
          }}>
            Choose the plan that fits your team. Free forever when self-hosted.
          </p>
          <BillingToggle cycle={cycle} onChange={setCycle} />
        </div>

        <div style={{
          display: 'grid',
          gap: 16,
          alignItems: 'stretch',
          maxWidth: 1100,
          margin: '0 auto',
        }} className="pricing-cards-grid">
          <PricingCard tier="Basic" cycle={cycle} featured={false} />
          <PricingCard tier="Pro"   cycle={cycle} featured={true}  />
          <PricingCard tier="Max"   cycle={cycle} featured={false} />
        </div>

        <p style={{
          textAlign: 'center',
          fontFamily: 'inherit',
          fontSize: '0.78rem',
          color: '#8a8a8a',
          marginTop: 28,
        }}>
          1 AI credit = 20 AI operations · Basic 2K · Pro 5K · Max 10K credits/mo
        </p>

        <EnterpriseHostingCard />
      </div>

      <style>{`
        .pricing-cards-grid { grid-template-columns: 1fr 1fr 1fr; }
        @media (max-width: 860px) {
          .pricing-cards-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 861px) and (max-width: 1060px) {
          .pricing-cards-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  )
}
