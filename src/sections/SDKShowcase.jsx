import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SDK_TABS = [
  {
    id: 'typescript',
    label: 'TypeScript',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.232c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    ),
    color: '#3178C6',
    code: `import { AcaiAnalytics } from '@advaita/acai'

const analytics = new AcaiAnalytics({
  writeKey: 'YOUR_WRITE_KEY',
  flushInterval: 500,
})

// Track any event
analytics.track('Button Clicked', {
  page: 'dashboard',
  component: 'upgrade-cta',
  userId: currentUser.id,
})

// Identify a user with traits
analytics.identify(userId, {
  name: 'Jane Smith',
  plan: 'pro',
  company: 'Acme Corp',
})

// That's it. AI does the rest.`,
  },
  {
    id: 'python',
    label: 'Python',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.74v-.45H7.22l-.39-.04-.34-.1-.3-.17-.25-.25-.2-.33-.15-.41-.07-.51-.01-.62.04-.74.08-.86.13-.98.17-1.1.21-1.2.25-1.3.29-1.38.33-1.45.37-1.5.39-1.55.4-1.57.39-1.55.37-1.5.33-1.43.28-1.32.23-1.19.17-1.04.11-.87.06-.7.01-.52v-.32l.02-.1.07-.21.13-.16.19-.1.26-.04.32.02.38.09.44.16z"/>
      </svg>
    ),
    color: '#F5D000',
    code: `from acai import Analytics

analytics = Analytics(
    write_key="YOUR_WRITE_KEY",
    flush_interval=0.5,
    batch_size=100,
)

# Track an event
analytics.track(
    user_id="user_123",
    event="Purchase Completed",
    properties={
        "revenue": 49.99,
        "plan": "pro",
        "currency": "USD",
    },
)

# Identify a user
analytics.identify(
    user_id="user_123",
    traits={"email": "jane@acme.com"},
)`,
  },
  {
    id: 'go',
    label: 'Go',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .058.035.035.07l-.093.28c-.023.047-.082.07-.117.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.070-.07.117-.07h2.337c.047 0 .070.035.070.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.339-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.191 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.771.105-.129.198-.269.315-.432H10.47c-.245 0-.304-.152-.222-.35.152-.362.432-.97.596-1.274a.315.315 0 0 1 .292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 0 1-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2zm3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 0 1-1.262-2.255c-.21-1.32.152-2.489.947-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.643.082-.934.106zm2.78-4.72c-.011-.153-.011-.27-.035-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788 1.11-1.847 2.197-.047.959.817 1.962 1.788 2.01 1.157.07 1.998-.57 2.245-1.729.046-.234.07-.468.234-.537z"/>
      </svg>
    ),
    color: '#00ACD7',
    code: `package main

import "github.com/advaita/acai-go"

func main() {
    client := acai.New(acai.Config{
        WriteKey:      "YOUR_WRITE_KEY",
        FlushInterval: 500 * time.Millisecond,
    })
    defer client.Close()

    // Track an event
    client.Track(acai.Track{
        UserId: "user_123",
        Event:  "Signup Completed",
        Properties: map[string]interface{}{
            "plan":   "pro",
            "source": "organic",
        },
    })
}`,
  },
  {
    id: 'kotlin',
    label: 'Kotlin',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M24 24H0V0h24L12 12z"/>
      </svg>
    ),
    color: '#A97BFF',
    code: `import io.advaita.acai.Analytics
import io.advaita.acai.TrackEvent

val analytics = Analytics.Builder(
    context = applicationContext,
    writeKey = "YOUR_WRITE_KEY"
).build()

// Track an event
analytics.track(TrackEvent(
    event = "Screen Viewed",
    properties = buildJsonObject {
        put("screen", "Dashboard")
        put("userId", currentUser.id)
    }
))

// Identify a user
analytics.identify(
    userId = currentUser.id,
    traits = buildJsonObject {
        put("plan", "pro")
    }
)`,
  },
  {
    id: 'flutter',
    label: 'Flutter',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
      </svg>
    ),
    color: '#54C5F8',
    code: `import 'package:acai_flutter/acai_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final analytics = await Analytics.create(
    Configuration(
      writeKey: 'YOUR_WRITE_KEY',
      flushInterval: const Duration(milliseconds: 500),
    ),
  );

  // Track an event
  analytics.track('App Opened', properties: {
    'version': '2.1.0',
    'platform': Platform.operatingSystem,
  });

  // Identify a user
  analytics.identify(userId: 'user_123',
    traits: {'plan': 'pro'});
}`,
  },
]

function CodeLine({ children }) {
  return <div style={{ lineHeight: 1.75, whiteSpace: 'pre' }}>{children}</div>
}

function TokenizedCode({ code, lang }) {
  const lines = code.split('\n')

  const tokenize = (line, idx) => {
    const keywords = ['import', 'from', 'const', 'let', 'var', 'new', 'return', 'func', 'package', 'main', 'defer', 'val', 'fun', 'void', 'async', 'await', 'class', 'def', 'for', 'if', 'else', 'in', 'with', 'try', 'catch', 'throws', 'override', 'suspend', 'object', 'companion']
    const strings = /('([^']*)'|"([^"]*)")/g
    const comments = /(\/\/.*|#.*)/g
    const numbers = /\b(\d+\.?\d*)\b/g

    let colored = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Comments
    colored = colored.replace(/(\/\/[^\n]*|#[^\n]*)/g, '<span style="color:rgba(148,163,184,0.5)">$1</span>')
    // Strings
    colored = colored.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, '<span style="color:#86EFAC">$1</span>')
    // Numbers
    colored = colored.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#FCD34D">$1</span>')
    // Keywords
    keywords.forEach(kw => {
      colored = colored.replace(new RegExp(`\\b(${kw})\\b`, 'g'), '<span style="color:#93C5FD">$1</span>')
    })
    // Method calls
    colored = colored.replace(/\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '.<span style="color:#F9A8D4">$1</span>(')

    return (
      <div key={idx} style={{ display: 'flex', lineHeight: 1.75, whiteSpace: 'pre' }}>
        <span style={{ color: 'rgba(148,163,184,0.25)', userSelect: 'none', fontSize: '0.72rem', minWidth: 32, textAlign: 'right', paddingRight: 16, marginTop: 1 }}>
          {idx + 1}
        </span>
        <span dangerouslySetInnerHTML={{ __html: colored }} />
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace", fontSize: '0.74rem', color: '#E2E8F0' }}>
      {lines.map((line, i) => tokenize(line, i))}
    </div>
  )
}

export function SDKShowcase() {
  const [activeTab, setActiveTab] = useState('typescript')
  const activeSDK = SDK_TABS.find(t => t.id === activeTab)

  return (
    <section style={{
      background: '#111111',
      padding: '72px 0 80px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background atmosphere */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          width: 600, height: 600,
          top: '-10%', left: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,123,32,0.06) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute',
          width: 400, height: 400,
          bottom: '-5%', left: '-5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,208,0,0.04) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
      </div>

      <div className="lp-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="sdk-layout">

          {/* ── Left column: heading + pills ── */}
          <motion.div
            className="sdk-left"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(244,123,32,0.08)',
              border: '1px solid rgba(244,123,32,0.2)',
              borderRadius: 999,
              padding: '4px 14px',
              marginBottom: 20,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#F47B20', flexShrink: 0, boxShadow: '0 0 6px rgba(244,123,32,0.6)' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#F47B20', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'Manrope', sans-serif" }}>
                Get started in seconds
              </span>
            </div>

            {/* Heading */}
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
              color: '#ffffff',
              margin: '0 0 14px',
              lineHeight: 1.12,
              letterSpacing: '-0.028em',
            }}>
              Three lines of code.{' '}
              <span style={{ color: '#F47B20' }}>Full visibility.</span>
            </h2>

            {/* Subheading */}
            <p style={{
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.4)',
              margin: '0 0 32px',
              lineHeight: 1.7,
              fontFamily: "'Manrope', sans-serif",
              maxWidth: 340,
            }}>
              SDKs for every platform — JavaScript, Python, Go, Kotlin, Flutter.
              One unified API, consistent event protocol across web, mobile, and server.
            </p>

            {/* Install pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'npm install @advaita/acai' },
                { label: 'pip install acai-python' },
                { label: 'go get github.com/advaita/acai-go' },
              ].map(({ label }) => (
                <div key={label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '8px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 8,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.45)',
                  width: 'fit-content',
                }}>
                  <span style={{ color: '#F47B20', fontSize: '0.65rem' }}>▸</span>
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right column: code window ── */}
          <motion.div
            className="sdk-right"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: '#0D0D0D',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(244,123,32,0.04)',
            }}
          >
            {/* Window chrome */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 16px',
              background: '#111111',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
                ))}
              </div>
              <div style={{
                flex: 1, height: 22,
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 6, display: 'flex', alignItems: 'center', paddingLeft: 8,
              }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
                  {activeSDK.id === 'typescript' ? 'analytics.ts' :
                   activeSDK.id === 'python' ? 'analytics.py' :
                   activeSDK.id === 'go' ? 'main.go' :
                   activeSDK.id === 'kotlin' ? 'Analytics.kt' : 'main.dart'}
                </span>
              </div>
            </div>

            {/* Tab bar */}
            <div style={{
              display: 'flex',
              padding: '0 16px',
              background: '#111111',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              overflowX: 'auto',
              gap: 2,
            }}>
              {SDK_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? `2px solid ${tab.color}` : '2px solid transparent',
                    color: activeTab === tab.id ? tab.color : 'rgba(255,255,255,0.35)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'color 0.15s',
                    whiteSpace: 'nowrap',
                    fontFamily: "'Manrope', sans-serif",
                  }}
                  onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
                  onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
                >
                  <span style={{ color: activeTab === tab.id ? tab.color : 'rgba(255,255,255,0.25)' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Code body */}
            <div style={{ padding: '18px 20px 22px', minHeight: 220, maxHeight: 300, overflowY: 'auto', overflowX: 'auto' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <TokenizedCode code={activeSDK.code} lang={activeSDK.id} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .sdk-layout {
          display: grid;
          grid-template-columns: 2fr 3fr;
          grid-template-areas: "left right";
          align-items: center;
          gap: 48px;
        }
        .sdk-left  { grid-area: left; }
        .sdk-right { grid-area: right; }

        @media (max-width: 820px) {
          .sdk-layout {
            grid-template-columns: 1fr;
            grid-template-areas: "left" "right";
            gap: 36px;
          }
          .sdk-left p { max-width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
