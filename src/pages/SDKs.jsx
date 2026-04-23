import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import logoImg from '../assets/Logo.png'

/* ─── SDK catalog ─────────────────────────────────────────── */

const SDKS = [
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Web',
    color: '#3178C6',
    tag: 'Browser · Node · RN',
    icon: 'TS',
    install: 'npm install @acai/analytics-browser',
    fileName: 'analytics.ts',
    lang: 'typescript',
    code: `import * as acai from '@acai/analytics-browser'

acai.init('YOUR_API_KEY', {
  serverUrl: 'https://events.acai.yourdomain.com/2/httpapi',
})

// Identify a user
acai.setUserId('user@example.com')
acai.identify(
  new acai.Identify()
    .set('plan', 'pro')
    .set('company', 'Acme Corp'),
)

// Track events
acai.track('Purchase Completed', {
  item: 'Pro Plan',
  price: 29.99,
  currency: 'USD',
})`,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend',
    color: '#F5D000',
    tag: 'Flask · Django · FastAPI',
    icon: 'PY',
    install: 'pip install acai-analytics',
    fileName: 'analytics.py',
    lang: 'python',
    code: `from acai.client import Acai
from acai.event import BaseEvent, Identify, IdentifyEvent

client = Acai(
    api_key="YOUR_API_KEY",
    server_url="https://your-acai-server.com/2/httpapi",
)

# Track an event
client.track(BaseEvent(
    event_type="purchase",
    user_id="user-123",
    event_properties={"price": 99.0, "plan": "pro"},
))

# Identify a user
identify = Identify().set("plan", "premium")
client.identify(IdentifyEvent(
    identify_obj=identify, user_id="user-123",
))

client.shutdown()`,
  },
  {
    id: 'go',
    name: 'Go',
    category: 'Backend',
    color: '#00ACD7',
    tag: 'Gin · Echo · net/http',
    icon: 'GO',
    install: 'go get github.com/acai/analytics-go',
    fileName: 'main.go',
    lang: 'go',
    code: `package main

import "github.com/acai/analytics-go/acai"

func main() {
    config := acai.NewConfig("YOUR-API-KEY")
    config.ServerURL = "https://your-acai-server.com/2/httpapi"

    client := acai.NewClient(config)
    defer client.Shutdown()

    client.Track(acai.Event{
        EventType: "Button Clicked",
        UserID:    "user-123",
        EventProperties: map[string]interface{}{
            "button": "signup",
            "page":   "landing",
        },
    })

    client.Flush()
}`,
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend',
    color: '#83CD29',
    tag: 'Express · NestJS · Koa',
    icon: 'JS',
    install: 'npm install @acai/analytics-node',
    fileName: 'server.ts',
    lang: 'typescript',
    code: `import { createInstance } from '@acai/analytics-node'

const acai = createInstance()

await acai.init('YOUR_API_KEY', {
  serverUrl: 'https://events.acai.yourdomain.com/2/httpapi',
}).promise

acai.track({
  event_type: 'Server Event',
  user_id: 'user@example.com',
  event_properties: { source: 'api' },
})

await acai.flush().promise`,
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Backend',
    color: '#EF8B2C',
    tag: 'Spring · Dropwizard',
    icon: 'JV',
    install: 'implementation "com.acai:acai-java-sdk:1.0.0"',
    fileName: 'Analytics.java',
    lang: 'java',
    code: `import com.acai.Acai;
import com.acai.Event;
import org.json.JSONObject;

Acai client = Acai.getInstance();
client.init("YOUR_API_KEY");
client.setServerUrl("https://your-acai-server.com/2/httpapi");

Event event = new Event("purchase_completed", "user-abc");
event.eventProperties = new JSONObject()
    .put("item", "Pro Plan")
    .put("price", 99.0)
    .put("currency", "USD");

client.logEvent(event);
client.flushEvents();`,
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'Mobile',
    color: '#A97BFF',
    tag: 'Android · JVM',
    icon: 'KT',
    install: 'implementation("com.acai:analytics-android:1.0.0")',
    fileName: 'Analytics.kt',
    lang: 'kotlin',
    code: `import com.acai.android.Acai
import com.acai.android.Configuration
import com.acai.core.AcaiServer

val acai = Acai(Configuration(
    apiKey = "YOUR_API_KEY",
    context = applicationContext,
    serverUrl = "https://api.yourdomain.com/2/httpapi",
))

acai.setUserId("user-123")

acai.track("Button Clicked", mapOf(
    "button_name" to "purchase",
    "price" to 9.99,
))`,
  },
  {
    id: 'swift',
    name: 'Swift',
    category: 'Mobile',
    color: '#F05138',
    tag: 'iOS · macOS · tvOS',
    icon: 'SW',
    install: '.package(url: "https://github.com/your-org/Acai-Swift.git")',
    fileName: 'Analytics.swift',
    lang: 'swift',
    code: `import AcaiSwift

let acai = Acai(
    configuration: Configuration(
        apiKey: "YOUR_API_KEY",
        serverUrl: "https://api.your-server.com/2/httpapi"
    )
)

acai.setUserId("user@example.com")

acai.track(
    eventType: "Button Clicked",
    eventProperties: ["button": "sign_up"]
)

let revenue = Revenue()
revenue.price = 9.99
revenue.productId = "premium_plan"
acai.revenue(revenue: revenue)`,
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Mobile',
    color: '#54C5F8',
    tag: 'Android · iOS · Web',
    icon: 'FL',
    install: 'flutter pub add acai_flutter',
    fileName: 'main.dart',
    lang: 'dart',
    code: `import 'package:acai_flutter/acai.dart';
import 'package:acai_flutter/configuration.dart';
import 'package:acai_flutter/events/base_event.dart';

final acai = Acai(Configuration(
  apiKey: 'YOUR_API_KEY',
  serverUrl: 'https://api.your-server.com/2/httpapi',
));

await acai.isBuilt;

acai.track(BaseEvent(
  'button_clicked',
  eventProperties: {'button_name': 'sign_up'},
));`,
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'Mobile',
    color: '#61DAFB',
    tag: 'iOS · Android',
    icon: 'RN',
    install: 'npm install @acai/react-native-sdk',
    fileName: 'App.tsx',
    lang: 'typescript',
    code: `import { Acai } from '@acai/react-native-sdk'

const acai = Acai.getInstance()
await acai.init('YOUR_API_KEY')
await acai.setServerUrl(
  'https://your-acai-server.com/api/v1/events',
)

acai.setUserId('user_123')
acai.setUserProperties({ plan: 'pro' })

acai.logEvent('app_opened')
acai.logEvent('button_clicked', {
  button: 'signup',
  screen: 'home',
})`,
  },
  {
    id: 'js',
    name: 'JavaScript',
    category: 'Web',
    color: '#F7DF1E',
    tag: 'Browser · UMD · ESM',
    icon: 'JS',
    install: 'npm install acai-js',
    fileName: 'analytics.js',
    lang: 'javascript',
    code: `import acai from 'acai-js'

acai.init('YOUR_API_KEY', null, {
  apiEndpoint: 'api.acai.yourdomain.com',
  forceHttps: true,
  batchEvents: true,
  includeUtm: true,
})

acai.setUserId('user_123')
acai.setUserProperties({ plan: 'pro' })

acai.logEvent('button_clicked', { label: 'Sign Up' })

const revenue = new acai.Revenue()
  .setProductId('pro_monthly')
  .setPrice(29.99)
acai.logRevenueV2(revenue)`,
  },
]

const CATEGORIES = ['All', 'Web', 'Backend', 'Mobile']

/* ─── Capabilities ───────────────────────────────────────── */

const CAPABILITIES = [
  {
    icon: '◆',
    title: 'Plugin pipeline',
    desc: 'Before → Enrichment → Destination. Extend with custom middleware for every SDK.',
  },
  {
    icon: '▲',
    title: 'Batched delivery',
    desc: 'Events buffered locally and flushed in batches, tunable per deployment.',
  },
  {
    icon: '●',
    title: 'Offline queue',
    desc: 'Persists unsent events to local storage / disk — zero data loss on reconnect.',
  },
  {
    icon: '◈',
    title: 'Retry with backoff',
    desc: 'Automatic exponential backoff on 429s and 5xx responses.',
  },
  {
    icon: '◐',
    title: 'Auto-capture',
    desc: 'Page views, clicks, sessions, UTM, referrer, web vitals — opt-in per SDK.',
  },
  {
    icon: '▣',
    title: 'Session replay',
    desc: 'Lightweight replay plugin for the browser SDK. DOM-based, privacy-first.',
  },
  {
    icon: '◇',
    title: 'Revenue tracking',
    desc: 'First-class Revenue model with product id, price, quantity, and type.',
  },
  {
    icon: '◎',
    title: 'Identify & Group',
    desc: 'User traits, once-only sets, counters, appends — and group-level identify.',
  },
]

/* ─── Event types ─────────────────────────────────────────── */

const EVENT_TYPES = [
  { type: 'track',    desc: 'Arbitrary event with a name and properties.',              sample: 'acai.track("Signed Up", { plan: "pro" })' },
  { type: 'identify', desc: 'Associate a user id with traits or increments.',            sample: 'acai.identify(new Identify().set("plan", "pro"))' },
  { type: 'page',     desc: 'Page view, auto-captured on the browser SDK.',              sample: 'acai.page("/pricing", { referrer: "hn" })' },
  { type: 'group',    desc: 'Assign the current user to a group / org / account.',       sample: 'acai.setGroup("orgId", "org_456")' },
  { type: 'alias',    desc: 'Merge an anonymous visitor with a known user.',             sample: 'acai.alias("anon_123", "user_456")' },
  { type: 'revenue',  desc: 'Revenue event with product id, price, quantity.',           sample: 'acai.revenue(new Revenue().setPrice(29.99))' },
]

/* ─── Syntax highlighter (light) ──────────────────────────── */

const KEYWORDS = [
  'import', 'from', 'const', 'let', 'var', 'new', 'return', 'func', 'package',
  'main', 'defer', 'val', 'fun', 'void', 'async', 'await', 'class', 'def',
  'for', 'if', 'else', 'in', 'with', 'public', 'private', 'final', 'static',
  'interface', 'type', 'struct', 'this', 'self', 'true', 'false', 'null', 'nil',
  'export', 'extends', 'implements', 'override', 'map', 'as',
]

function TokenizedCode({ code }) {
  const lines = code.split('\n')

  const render = (line) => {
    let out = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    out = out.replace(/(\/\/[^\n]*|#[^\n]*)/g, '<span style="color:rgba(148,163,184,0.55)">$1</span>')
    out = out.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, '<span style="color:#86EFAC">$1</span>')
    out = out.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#FCD34D">$1</span>')
    KEYWORDS.forEach(kw => {
      out = out.replace(new RegExp(`\\b(${kw})\\b`, 'g'), '<span style="color:#93C5FD">$1</span>')
    })
    out = out.replace(/\.([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '.<span style="color:#F9A8D4">$1</span>(')
    return out
  }

  return (
    <div style={{
      fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
      fontSize: '0.78rem',
      color: '#E2E8F0',
      lineHeight: 1.75,
    }}>
      {lines.map((line, i) => (
        <div key={i} style={{ display: 'flex' }}>
          <span style={{
            color: 'rgba(148,163,184,0.22)',
            userSelect: 'none',
            fontSize: '0.7rem',
            minWidth: 32,
            textAlign: 'right',
            paddingRight: 16,
            marginTop: 2,
          }}>
            {i + 1}
          </span>
          <span style={{ whiteSpace: 'pre' }} dangerouslySetInnerHTML={{ __html: render(line) }} />
        </div>
      ))}
    </div>
  )
}

/* ─── Copy button ──────────────────────────────────────────── */

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    try {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch { /* noop */ }
  }
  return (
    <button
      onClick={handle}
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 6,
        padding: '5px 10px',
        fontSize: '0.7rem',
        fontWeight: 600,
        color: copied ? '#1A7A2E' : 'rgba(255,255,255,0.6)',
        cursor: 'pointer',
        fontFamily: "'IBM Plex Sans', sans-serif",
        transition: 'color 0.15s, background 0.15s',
        letterSpacing: '0.04em',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
    >
      {copied ? 'COPIED' : 'COPY'}
    </button>
  )
}

/* ─── SDK card (grid item) ─────────────────────────────────── */

function SDKCard({ sdk, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left',
        background: active ? 'rgba(244,123,32,0.08)' : '#161616',
        border: active
          ? '1px solid rgba(244,123,32,0.45)'
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: '18px 18px 16px',
        cursor: 'pointer',
        transition: 'background 0.18s, border-color 0.18s, transform 0.18s',
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: '#F0EBE0',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = '#1a1a1a'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = '#161616'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 38, height: 38,
          borderRadius: 10,
          background: `${sdk.color}22`,
          border: `1px solid ${sdk.color}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '0.78rem',
          color: sdk.color,
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '-0.02em',
        }}>
          {sdk.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F0EBE0', lineHeight: 1.1 }}>
            {sdk.name}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(240,235,224,0.4)', marginTop: 3 }}>
            {sdk.category}
          </div>
        </div>
        {active && (
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#F47B20',
            boxShadow: '0 0 10px rgba(244,123,32,0.6)',
          }} />
        )}
      </div>
      <div style={{ fontSize: '0.72rem', color: 'rgba(240,235,224,0.5)', lineHeight: 1.5 }}>
        {sdk.tag}
      </div>
    </button>
  )
}

/* ─── Main Page ────────────────────────────────────────────── */

export default function SDKs({ onBack }) {
  const [category, setCategory] = useState('All')
  const [activeId, setActiveId] = useState('typescript')

  const filtered = category === 'All' ? SDKS : SDKS.filter(s => s.category === category)
  const active = SDKS.find(s => s.id === activeId)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0E0E0E',
      color: '#F0EBE0',
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>

      {/* ── Navbar ───────────────────────────────────────────── */}
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
          <a href="#" onClick={e => { e.preventDefault(); onBack && onBack() }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src={logoImg} alt="Advaita logo"
              style={{ width: 36, height: 36, borderRadius: '50%', mixBlendMode: 'lighten', objectFit: 'cover' }} />
            <span style={{ fontWeight: 700, fontSize: '1.15rem', color: '#F0EBE0', letterSpacing: '0.02em' }}>
              ADVAITA
            </span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="#" onClick={e => { e.preventDefault(); onBack && onBack() }}
              style={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(240,235,224,0.5)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F0EBE0'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,235,224,0.5)'}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '80px 28px 48px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(244,123,32,0.08)',
          border: '1px solid rgba(244,123,32,0.22)',
          borderRadius: 999, padding: '4px 16px', marginBottom: 24,
        }}>
          <span style={{ color: '#F47B20', fontSize: '0.85rem', lineHeight: 1 }}>★</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#F47B20', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
            OPEN SOURCE · MIT LICENSE · 10 NATIVE SDKs
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 48, alignItems: 'flex-end' }}>
          <div>
            <h1 style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              color: '#F0EBE0',
              margin: '0 0 18px',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
            }}>
              One <span style={{ color: '#F47B20' }}>protocol</span>,
              <br />every runtime.
            </h1>
            <p style={{
              fontSize: '1.02rem',
              color: 'rgba(240,235,224,0.6)',
              maxWidth: 520,
              margin: 0,
              lineHeight: 1.7,
            }}>
              Advaita ships a native SDK for every major language and platform.
              Drop one in, point it at your ingest server, and start tracking events in minutes.
              Forked from Amplitude's open-source SDKs — MIT licensed, no vendor lock-in.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 14,
          }}>
            {[
              { label: 'Native SDKs', value: '10' },
              { label: 'Runtimes', value: '14+' },
              { label: 'License', value: 'MIT' },
              { label: 'Flush latency', value: '<5ms' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: '#161616',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '18px 20px',
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.8rem',
                  color: '#F0EBE0',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: 4,
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(240,235,224,0.45)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDK grid + code viewer ───────────────────────────── */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 28px 80px' }}>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'rgba(240,235,224,0.4)', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', marginRight: 4 }}>
            Filter
          </span>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: '6px 14px',
                background: category === c ? '#F47B20' : 'transparent',
                color: category === c ? '#fff' : 'rgba(240,235,224,0.6)',
                border: category === c ? '1px solid #F47B20' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 999,
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'IBM Plex Sans', sans-serif",
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                letterSpacing: '0.02em',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 32,
        }}>
          {filtered.map(sdk => (
            <SDKCard
              key={sdk.id}
              sdk={sdk}
              active={activeId === sdk.id}
              onClick={() => setActiveId(sdk.id)}
            />
          ))}
        </div>

        {/* Code viewer */}
        <div style={{
          background: '#111',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
        }}>
          {/* Install bar */}
          <div style={{
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: '#0b0b0b',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
              <span style={{
                fontSize: '0.62rem',
                fontWeight: 800,
                color: active.color,
                background: `${active.color}1F`,
                padding: '3px 8px',
                borderRadius: 999,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}>
                {active.name} INSTALL
              </span>
              <code style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.7)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
              }}>
                <span style={{ color: '#F47B20', marginRight: 6 }}>▸</span>
                {active.install}
              </code>
            </div>
            <CopyButton text={active.install} />
          </div>

          {/* File tab row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 14px',
            background: '#0a0a0a',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />
                ))}
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.4)',
                marginLeft: 10,
              }}>
                {active.fileName}
              </span>
            </div>
            <CopyButton text={active.code} />
          </div>

          {/* Code body */}
          <div style={{ padding: '24px 20px 28px', overflowX: 'auto' }}>
            <AnimatePresence mode="wait">
              <Motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
              >
                <TokenizedCode code={active.code} />
              </Motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Architecture ─────────────────────────────────────── */}
      <section style={{ background: '#161616', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#F0EBE0', marginBottom: 12, letterSpacing: '-0.02em' }}>
              How an event travels
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,224,0.55)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
              Every SDK speaks the same HTTP protocol. Plug it into your own ingest server
              and own every row.
            </p>
          </div>

          <div style={{
            border: '1.5px dashed rgba(255,255,255,0.14)',
            borderRadius: 20,
            padding: '48px 28px',
            background: '#0E0E0E',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
            alignItems: 'center',
            position: 'relative',
          }}>
            {[
              { label: 'Your App', sub: 'Web · Mobile · Server', color: '#F5D000' },
              { label: 'Acai SDK', sub: 'Batched · Retried · Offline-safe', color: '#F47B20' },
              { label: 'Ingest Server', sub: 'FastAPI · /batch', color: '#1A7A2E' },
              { label: 'Your Storage', sub: 'Postgres · ClickHouse · Kafka', color: '#F0EBE0' },
            ].map((node, i, arr) => (
              <div key={node.label} style={{ position: 'relative', textAlign: 'center' }}>
                <div style={{
                  width: 72, height: 72,
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  background: `${node.color}18`,
                  border: `1.5px solid ${node.color}55`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  color: node.color,
                }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F0EBE0', marginBottom: 4 }}>
                  {node.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(240,235,224,0.45)', lineHeight: 1.4 }}>
                  {node.sub}
                </div>

                {i < arr.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: 36,
                    right: -20,
                    width: 40,
                    height: 1.5,
                    borderTop: '1.5px dashed rgba(255,255,255,0.18)',
                  }}>
                    <div style={{
                      position: 'absolute',
                      right: -4, top: -4,
                      width: 0, height: 0,
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                      borderLeft: '6px solid rgba(255,255,255,0.25)',
                    }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Payload preview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, marginTop: 32 }}>
            <div style={{ background: '#0b0b0b', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#F47B20', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                Request  ·  POST /batch
              </div>
              <pre style={{
                margin: 0,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '0.72rem',
                color: '#E2E8F0',
                lineHeight: 1.65,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>{`{
  "write_key": "wk_live_...",
  "batch": [{
    "type": "track",
    "event": "Purchase Completed",
    "user_id": "user_123",
    "properties": {
      "revenue": 29.99,
      "plan": "pro"
    }
  }],
  "sent_at": "2026-04-20T08:14:00Z"
}`}</pre>
            </div>
            <div style={{ background: '#0b0b0b', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1A7A2E', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                Response  ·  200 OK
              </div>
              <pre style={{
                margin: 0,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '0.72rem',
                color: '#E2E8F0',
                lineHeight: 1.65,
              }}>{`{
  "code": 200,
  "events_ingested": 1,
  "payload_size_bytes": 184
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities grid ────────────────────────────────── */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '80px 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#F0EBE0', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Built for production
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,224,0.55)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Every SDK inherits the same robust core: batched delivery, offline persistence,
            plugin pipeline, and automatic retries with exponential backoff.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {CAPABILITIES.map(cap => (
            <div key={cap.title} style={{
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              padding: '22px 22px 20px',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(244,123,32,0.35)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <div style={{
                width: 34, height: 34,
                borderRadius: 10,
                background: 'rgba(244,123,32,0.1)',
                border: '1px solid rgba(244,123,32,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F47B20',
                fontSize: '1.05rem',
                marginBottom: 14,
              }}>
                {cap.icon}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F0EBE0', marginBottom: 6 }}>
                {cap.title}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(240,235,224,0.5)', lineHeight: 1.55 }}>
                {cap.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Event types table ────────────────────────────────── */}
      <section style={{ background: '#161616', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#F0EBE0', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Six event types. Consistent everywhere.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,224,0.55)', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
              Same spec across TypeScript, Python, Go, Swift, Kotlin, Flutter, and beyond.
            </p>
          </div>

          <div style={{
            border: '1.5px dashed rgba(255,255,255,0.14)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr 1.2fr',
              padding: '14px 24px',
              background: '#0E0E0E',
              borderBottom: '1.5px dashed rgba(255,255,255,0.14)',
              fontSize: '0.68rem',
              fontWeight: 800,
              color: 'rgba(240,235,224,0.45)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <div>Type</div>
              <div>Description</div>
              <div>Example</div>
            </div>
            {EVENT_TYPES.map((e, i) => (
              <div key={e.type} style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr 1.2fr',
                padding: '16px 24px',
                alignItems: 'center',
                borderBottom: i < EVENT_TYPES.length - 1 ? '1px dashed rgba(255,255,255,0.07)' : 'none',
                gap: 16,
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  color: '#F47B20',
                }}>
                  {e.type}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(240,235,224,0.65)', lineHeight: 1.55 }}>
                  {e.desc}
                </div>
                <code style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '0.75rem',
                  color: '#86EFAC',
                  background: '#0E0E0E',
                  border: '1px solid rgba(255,255,255,0.05)',
                  padding: '6px 10px',
                  borderRadius: 6,
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                }}>
                  {e.sample}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── License / credit ─────────────────────────────────── */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 28px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #161616 0%, #1a0e05 100%)',
          border: '1px solid rgba(244,123,32,0.18)',
          borderRadius: 20,
          padding: '36px 36px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 32,
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(245,208,0,0.1)',
              border: '1px solid rgba(245,208,0,0.3)',
              borderRadius: 999, padding: '3px 12px', marginBottom: 16,
            }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#F5D000', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                MIT LICENSED · FORK-FRIENDLY
              </span>
            </div>
            <h3 style={{ fontWeight: 700, fontSize: '1.5rem', color: '#F0EBE0', margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Standing on the shoulders of giants
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'rgba(240,235,224,0.6)', margin: 0, lineHeight: 1.65 }}>
              Advaita's SDKs are forked from Amplitude's open-source analytics SDKs and
              rebranded to point at your own ingest server. MIT licensed, auditable,
              fully documented — no telemetry, no hidden calls home.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { k: 'Source license',          v: 'MIT (original Amplitude work)' },
              { k: 'Advaita modifications',   v: 'MIT — yours to fork and extend' },
              { k: 'Telemetry to Advaita',    v: 'None. Events go only to your server.' },
              { k: 'Protocol compatibility',  v: 'Amplitude HTTP API v2 / /batch' },
            ].map(row => (
              <div key={row.k} style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16,
                padding: '10px 0',
                borderBottom: '1px dashed rgba(255,255,255,0.08)',
                fontSize: '0.82rem',
              }}>
                <span style={{ color: 'rgba(240,235,224,0.45)', fontWeight: 500 }}>{row.k}</span>
                <span style={{ color: '#F0EBE0', fontWeight: 600, textAlign: 'right' }}>{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #111 0%, #1a0e05 50%, #111 100%)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '72px 28px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <img src={logoImg} alt="Advaita" style={{ width: 52, height: 52, borderRadius: '50%', mixBlendMode: 'lighten', objectFit: 'cover' }} />
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: '#F0EBE0', margin: '0 0 14px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Pick an SDK. Track in 5 minutes.
          </h2>
          <p style={{ fontSize: '0.975rem', color: 'rgba(240,235,224,0.5)', marginBottom: 32, lineHeight: 1.6 }}>
            Three lines of code to first event. Full visibility in your dashboard.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#waitlist" onClick={() => onBack && onBack()}
              style={{ padding: '13px 28px', background: '#F47B20', color: '#fff', borderRadius: 8, fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.02em', transition: 'background 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e0701c'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(244,123,32,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F47B20'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Join the waitlist →
            </a>
            <a href="#docs"
              style={{ padding: '13px 28px', background: 'transparent', color: '#F0EBE0', border: '1.5px solid rgba(255,255,255,0.14)', borderRadius: 8, fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}
            >
              Read the docs
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 28px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.78rem', color: 'rgba(240,235,224,0.3)', margin: 0 }}>
          © {new Date().getFullYear()} Advaita. Open source. Self-hostable. Backed by iHub.
        </p>
      </footer>
    </div>
  )
}
