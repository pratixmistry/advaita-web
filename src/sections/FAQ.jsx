import { useState } from 'react'

const FAQS = [
  {
    q: 'What is Advaita?',
    a: 'Advaita is a self-hosted, open-source product analytics platform. It captures every event, user, and session from your apps and surfaces funnels, retention, and AI-driven insights — all on infrastructure you own.',
  },
  {
    q: 'How does Advaita improve my product decisions?',
    a: 'With unified tracking across web, mobile, and backend, plus built-in funnels, cohorts, and an AI insights layer, Advaita turns raw events into answers. Teams ship faster because the "why" behind the numbers is one question away.',
  },
  {
    q: 'Do I need technical skills to use Advaita?',
    a: 'Non-technical teammates can explore dashboards and ask questions in plain English. Engineers get a clean SDK and API when they want to instrument custom events or build their own views.',
  },
  {
    q: 'Can Advaita integrate with our existing tools?',
    a: 'Yes. Advaita streams events to popular destinations like PostgreSQL, ClickHouse, BigQuery, Kafka, Snowflake, and more — so you can continue working without changing your data workflow.',
  },
  {
    q: 'Is my data really mine when self-hosted?',
    a: 'Completely. When you deploy Advaita on your own cloud or servers, every event stays inside your perimeter. No third-party pipelines, no vendor lock-in, no surprise egress costs.',
  },
  {
    q: 'How do I get started?',
    a: 'Join the early access waitlist below. We will send deployment instructions, SDK snippets, and onboarding resources so your team can be live in under an hour.',
  },
]

function ChevronIcon({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      style={{
        flexShrink: 0,
        transition: 'transform 0.2s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path
        d="M5 8l5 5 5-5"
        stroke="#111"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: isOpen ? '#F1F1EE' : '#fff',
        border: '1px solid var(--adv-border)',
        borderRadius: 6,
        padding: '22px 26px',
        transition: 'background 0.2s ease, box-shadow 0.2s ease',
        boxShadow: isOpen ? '0 2px 14px rgba(17,17,17,0.05)' : 'none',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: "'Apfel Grotezk', sans-serif",
            fontWeight: 500,
            fontSize: '1.02rem',
            color: 'black',
            letterSpacing: '-0.01em',
          }}
        >
          {faq.q}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      <div
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? 400 : 0,
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.2s ease, margin-top 0.2s ease',
          marginTop: isOpen ? 14 : 0,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '0.92rem',
            lineHeight: 1.6,
            color: '#4a4a4a',
          }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(3)

  return (
    <section
      id="faq"
      className="lp-grid-bg"
      style={{
        background: 'var(--adv-bg)',
        padding: '96px 0',
        position: 'relative',
      }}
    >
      <div className="lp-wrap-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div className="faq-grid">
          <div className="faq-left" style={{
            position: 'sticky',
            top: 96,
            alignSelf: 'start',
          }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px',
                background: '#fff',
                border: '1px solid var(--adv-border)',
                color: '#111',
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                borderRadius: 6,
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  background: '#F47B20',
                  borderRadius: 6,
                }}
              />
              FAQ
            </span>
            <h2
              style={{
                fontFamily: "'Apfel Grotezk', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2rem, 3.8vw, 2.85rem)',
                color: '#111',
                margin: 0,
                letterSpacing: '-0.025em',
                lineHeight: 1.08,
              }}
            >
              Frequently Asked
              <br />
              Questions
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {FAQS.map((faq, i) => (
              <FAQItem
                key={faq.q}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .faq-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .faq-left {
            position: static !important;
          }
        }
      `}</style>
    </section>
  )
}
