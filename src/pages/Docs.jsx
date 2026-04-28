import { useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import logoImg from '../assets/Logo.png'

/* ─── Theme tokens (kept inline to match other pages) ───────── */
const ORANGE = '#F47B20'
const ORANGE_SOFT = 'rgba(244,123,32,0.10)'
const ORANGE_BORDER = 'rgba(244,123,32,0.35)'
const BG = '#0E0E0E'
const SURFACE = '#161616'
const SURFACE_2 = '#1B1B1B'
const TEXT = '#F0EBE0'
const MUTED = 'rgba(240,235,224,0.55)'
const FAINT = 'rgba(240,235,224,0.35)'
const BORDER = 'rgba(255,255,255,0.07)'
const BORDER_STRONG = 'rgba(255,255,255,0.14)'

/* ─── Sidebar navigation tree ───────────────────────────────── */
const NAV_GROUPS = [
  {
    title: 'Getting Started',
    items: [
      { id: 'overview',   label: 'Overview' },
      { id: 'quickstart', label: 'Quickstart' },
      { id: 'install',    label: 'Install with AI' },
    ],
  },
  {
    title: 'SDKs',
    items: [
      { id: 'sdk-typescript', label: 'TypeScript' },
      { id: 'sdk-python',     label: 'Python' },
      { id: 'sdk-go',         label: 'Go' },
      { id: 'sdk-node',       label: 'Node' },
      { id: 'sdk-java',       label: 'Java / Kotlin' },
      { id: 'sdk-flutter',    label: 'Flutter' },
      { id: 'sdk-browser',    label: 'Browser JS' },
    ],
  },
  {
    title: 'Concepts',
    items: [
      { id: 'concepts-events',   label: 'Event model' },
      { id: 'concepts-identify', label: 'Identify & users' },
      { id: 'concepts-pipeline', label: 'Plugin pipeline' },
    ],
  },
  {
    title: 'Tutorials',
    items: [
      { id: 'video-tutorials', label: 'Video tutorials' },
      { id: 'self-host',       label: 'Self-host the server' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { id: 'api-batch', label: 'POST /batch' },
      { id: 'changelog', label: 'Changelog' },
    ],
  },
]

/* ─── On-this-page TOC for the main rail ────────────────────── */
const TOC = [
  { id: 'overview',        label: 'Overview' },
  { id: 'quickstart',      label: 'Quickstart' },
  { id: 'sdk-grid',        label: 'SDKs' },
  { id: 'video-tutorials', label: 'Video tutorials' },
  { id: 'api-batch',       label: 'API reference' },
  { id: 'self-host',       label: 'Self-host' },
]

/* ─── SDK grid data (lightweight — full code lives on /sdks) ─ */
const SDKS = [
  { id: 'sdk-typescript', name: 'TypeScript', tag: 'Browser · Node · RN',     icon: 'TS',   slug: 'typescript', color: '#3178C6' },
  { id: 'sdk-python',     name: 'Python',     tag: 'Flask · Django · FastAPI', icon: 'PY',   slug: 'python',     color: '#3776AB' },
  { id: 'sdk-go',         name: 'Go',         tag: 'Gin · Echo · net/http',    icon: 'GO',   slug: 'go',         color: '#00ACD7' },
  { id: 'sdk-node',       name: 'Node.js',    tag: 'Server-side runtime',      icon: 'NODE', slug: 'nodedotjs',  color: '#1A7A2E' },
  { id: 'sdk-java',       name: 'Java',       tag: 'Spring · Micronaut',       icon: 'JAVA', slug: 'openjdk',    color: '#EA8A37' },
  { id: 'sdk-kotlin',     name: 'Kotlin',     tag: 'Android · Multiplatform',  icon: 'KT',   slug: 'kotlin',     color: '#7F52FF' },
  { id: 'sdk-flutter',    name: 'Flutter',    tag: 'iOS · Android · Web',      icon: 'FL',   slug: 'flutter',    color: '#54C5F8' },
  { id: 'sdk-browser',    name: 'Browser JS', tag: 'Vanilla · UMD · ESM',      icon: 'JS',   slug: 'javascript', color: '#F7DF1E' },
]

/* ─── Video tutorials ───────────────────────────────────────── */
const VIDEOS = [
  {
    id: 'v1',
    title: 'Install Advaita in 3 minutes',
    duration: '3:21',
    chapter: 'Getting Started',
    color: '#F47B20',
  },
  {
    id: 'v2',
    title: 'Track your first event with the TypeScript SDK',
    duration: '6:04',
    chapter: 'SDK Walkthrough',
    color: '#F5D000',
  },
  {
    id: 'v3',
    title: 'Building a conversion funnel from scratch',
    duration: '8:47',
    chapter: 'Funnels',
    color: '#1A7A2E',
  },
  {
    id: 'v4',
    title: 'Self-hosting the ingestion server on AWS',
    duration: '11:12',
    chapter: 'Infrastructure',
    color: '#A97BFF',
  },
  {
    id: 'v5',
    title: 'Using the AI Insights chatbot effectively',
    duration: '5:33',
    chapter: 'AI Insights',
    color: '#54C5F8',
  },
  {
    id: 'v6',
    title: 'Cohort retention: heatmaps explained',
    duration: '4:58',
    chapter: 'Retention',
    color: '#F47B20',
  },
]

/* ─── Small helpers ─────────────────────────────────────────── */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 11px',
        background: copied ? 'rgba(244,123,32,0.18)' : 'transparent',
        color: copied ? ORANGE : MUTED,
        border: `1px solid ${copied ? ORANGE_BORDER : BORDER}`,
        borderRadius: 7,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '0.7rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

function CodeBlock({ filename, code }) {
  return (
    <div style={{
      background: '#0a0a0a',
      border: `1px solid ${BORDER}`,
      borderRadius: 12,
      overflow: 'hidden',
      marginTop: 18,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px',
        borderBottom: `1px solid ${BORDER}`,
        background: '#080808',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.55 }} />
            ))}
          </div>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.72rem',
            color: FAINT,
            marginLeft: 6,
          }}>{filename}</span>
        </div>
        <CopyButton text={code} />
      </div>
      <pre style={{
        margin: 0,
        padding: '18px 18px 22px',
        overflow: 'auto',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '0.82rem',
        lineHeight: 1.65,
        color: '#dcd6c8',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Pill({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: ORANGE_SOFT,
      border: `1px solid ${ORANGE_BORDER}`,
      borderRadius: 999,
      padding: '4px 12px',
      fontSize: '0.66rem',
      fontWeight: 700,
      color: ORANGE,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    }}>
      {children}
    </span>
  )
}

function SectionAnchor({ id, eyebrow, title, children }) {
  return (
    <section id={id} style={{ scrollMarginTop: 96, marginTop: 72 }}>
      {eyebrow && (
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: ORANGE,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}>{eyebrow}</div>
      )}
      <h2 style={{
        fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: TEXT,
        margin: 0,
        lineHeight: 1.15,
      }}>{title}</h2>
      <div style={{ marginTop: 18 }}>{children}</div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function Docs({ onBack, onSdks }) {
  const [activeSection, setActiveSection] = useState('overview')
  const [search, setSearch] = useState('')

  // Highlight TOC item that's currently in view
  useEffect(() => {
    const ids = TOC.map(t => t.id).concat(NAV_GROUPS.flatMap(g => g.items.map(i => i.id)))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return NAV_GROUPS
    const q = search.trim().toLowerCase()
    return NAV_GROUPS
      .map(g => ({ ...g, items: g.items.filter(i => i.label.toLowerCase().includes(q)) }))
      .filter(g => g.items.length > 0)
  }, [search])

  const quickstartCode = `// 1. Install the SDK
npm install @acai/analytics-browser

// 2. Initialise with your write key
import * as acai from '@acai/analytics-browser'

acai.init('YOUR_WRITE_KEY', {
  serverUrl: 'https://events.advaita.ai/batch',
})

// 3. Identify the user, then track an event
acai.setUserId('user@example.com')
acai.track('Signup Completed', { plan: 'pro' })`

  const apiCode = `POST /batch HTTP/1.1
Host: events.advaita.ai
Content-Type: application/json

{
  "write_key": "YOUR_WRITE_KEY",
  "sent_at": "2026-04-27T09:42:11.018Z",
  "batch": [
    {
      "type": "track",
      "event": "Signup Completed",
      "user_id": "u_8421",
      "properties": { "plan": "pro" },
      "message_id": "01HV3M...",
      "timestamp": "2026-04-27T09:42:10.812Z"
    }
  ]
}`

  return (
    <div style={{
      minHeight: '100vh',
      background: BG,
      color: TEXT,
      fontFamily: "'Apfel Grotezk', sans-serif",
    }}>
      

      {/* ── Top navbar ─────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 60,
        background: 'rgba(14,14,14,0.85)',
        backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${BORDER}`,
        padding: '0 28px',
      }}>
        <div style={{
          maxWidth: 1320, margin: '0 auto', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <a href="#" onClick={e => { e.preventDefault(); onBack && onBack() }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src={logoImg} alt="Advaita logo"
              style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', mixBlendMode: 'lighten' }} />
           {/* <span style={{ fontWeight: 700, fontSize: '1.05rem', color: TEXT, letterSpacing: '0.02em' }}>
              ADVAITA
            </span> */}
          </a>

          <div style={{ flex: 1, maxWidth: 460, display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'relative', width: '100%',
            }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search docs..."
                style={{
                  width: '100%',
                  padding: '9px 14px 9px 36px',
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  color: TEXT,
                  fontSize: '0.85rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onFocus={e => { e.target.style.borderColor = ORANGE_BORDER; e.target.style.background = SURFACE_2 }}
                onBlur={e => { e.target.style.borderColor = BORDER; e.target.style.background = SURFACE }}
              />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: FAINT }}>
                <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9.4 9.4l2.6 2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                fontSize: '0.65rem', fontWeight: 700, color: FAINT,
                border: `1px solid ${BORDER}`, borderRadius: 5, padding: '2px 6px',
                fontFamily: "'IBM Plex Mono', monospace",
              }}>⌘K</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a href="#" onClick={e => { e.preventDefault(); onBack && onBack() }}
              style={{ fontSize: '0.85rem', fontWeight: 500, color: MUTED, textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = TEXT}
              onMouseLeave={e => e.currentTarget.style.color = MUTED}
            >Home</a>
            {/* <a href="#" onClick={e => { e.preventDefault(); onSdks && onSdks() }}
              style={{ fontSize: '0.85rem', fontWeight: 500, color: MUTED, textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = TEXT}
              onMouseLeave={e => e.currentTarget.style.color = MUTED}
            >SDKs</a> */}
            <a href="#waitlist" onClick={() => onBack && onBack()}
              style={{
                padding: '8px 16px', background: ORANGE, color: '#fff',
                borderRadius: 7, fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none',
                transition: 'background 0.15s', letterSpacing: '0.02em',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e0701c'}
              onMouseLeave={e => e.currentTarget.style.background = ORANGE}
            >Get early access</a>
          </div>
        </div>
      </nav>

      {/* ── 3-column shell ─────────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1480,
        margin: '0 auto',
        padding: '0 32px',
        display: 'grid',
        gridTemplateColumns: '220px minmax(0,1fr) 200px',
        gap: 56,
      }} className="docs-shell">

        {/* ── Left sidebar ─────────────────────────────── */}
        <aside style={{
          position: 'sticky', top: 64,
          alignSelf: 'start',
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
          padding: '32px 4px 80px 0',
          fontSize: '0.86rem',
        }} className="docs-side-left">
          {filteredGroups.map(group => (
            <div key={group.title} style={{ marginBottom: 22 }}>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: FAINT,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 8,
                paddingLeft: 10,
              }}>{group.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {group.items.map(item => {
                  const active = activeSection === item.id
                  return (
                    <a key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        const el = document.getElementById(item.id)
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        setActiveSection(item.id)
                      }}
                      style={{
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                        width: 'fit-content',
                        padding: '5px 12px',
                        borderRadius: 7,
                        textDecoration: 'none',
                        color: active ? ORANGE : MUTED,
                        background: active ? '#2A1E12' : 'transparent',
                        fontWeight: active ? 600 : 500,
                        transition: 'background 0.12s, color 0.12s',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          e.currentTarget.style.color = TEXT
                          e.currentTarget.style.background = '#1A1A1A'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          e.currentTarget.style.color = MUTED
                          e.currentTarget.style.background = 'transparent'
                        }
                      }}
                    >{item.label}</a>
                  )
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* ── Main content ─────────────────────────────── */}
        <main style={{ padding: '48px 0 120px', minWidth: 0 }}>

          {/* Hero */}
          <div id="overview" style={{ scrollMarginTop: 80 }}>
            <Pill>Documentation · v1.0</Pill>
            <h1 style={{
              marginTop: 18,
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              color: TEXT,
            }}>
              Overview - What is Advaita?
            </h1>
            <p style={{
              marginTop: 18,
              fontSize: '1.02rem',
              lineHeight: 1.7,
              color: MUTED,
              maxWidth: 720,
            }}>
              Advaita is the open-source, self-hosted analytics platform you wish you had three
              ramp-ups ago. Drop in an SDK, point it at your ingest server, and get a real-time
              event stream, funnels, retention, and AI insights — without the vendor lock-in.
            </p>

            <div style={{ marginTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="#quickstart" style={{
                padding: '11px 20px',
                background: ORANGE, color: '#fff',
                borderRadius: 8, fontSize: '0.88rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.02em',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e0701c' }}
                onMouseLeave={e => { e.currentTarget.style.background = ORANGE }}
              >Get started</a>
              <a href="#" onClick={e => { e.preventDefault(); onSdks && onSdks() }} style={{
                padding: '11px 20px',
                background: 'transparent', color: TEXT,
                border: `1px solid ${BORDER_STRONG}`,
                borderRadius: 8, fontSize: '0.88rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.02em',
                transition: 'background 0.15s, border-color 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = SURFACE; e.currentTarget.style.borderColor = ORANGE_BORDER }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = BORDER_STRONG }}
              >Browse SDKs</a>
            </div>

            {/* Quick highlight tiles */}
            <div style={{
              marginTop: 36,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 12,
            }}>
              {[
                { label: 'Time to first event', value: '< 5 min' },
                { label: 'Native SDKs', value: '10' },
                { label: 'License', value: 'MIT' },
                { label: 'Self-host', value: 'Yes' },
              ].map(s => (
                <div key={s.label} style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 12,
                  padding: '16px 18px',
                }}>
                  <div style={{
                    fontFamily: "'Apfel Grotezk', sans-serif",
                    fontWeight: 800, fontSize: '1.45rem',
                    color: TEXT, letterSpacing: '-0.02em',
                  }}>{s.value}</div>
                  <div style={{
                    marginTop: 4,
                    fontSize: '0.7rem', color: FAINT,
                    textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quickstart */}
          <SectionAnchor id="quickstart" eyebrow="Get Started" title="Quickstart">
            <p style={{ color: MUTED, fontSize: '1rem', lineHeight: 1.7, maxWidth: 700 }}>
              Three steps. The first event lands in your dashboard within seconds.
            </p>

            <ol style={{
              listStyle: 'none',
              padding: 0,
              marginTop: 22,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              {[
                { n: '01', title: 'Create a workspace and grab your write key', body: 'Sign up, pick a project name, copy the key from Settings → API.' },
                { n: '02', title: 'Install the SDK for your stack',             body: 'Pick from TypeScript, Python, Go, Java, Kotlin, Flutter, or any of our 10 native SDKs.' },
                { n: '03', title: 'Identify the user and track your first event', body: 'Send a track, identify, page, group or alias call. Events appear live in the stream.' },
              ].map(step => (
                <li key={step.n} style={{
                  display: 'grid',
                  gridTemplateColumns: '52px 1fr',
                  gap: 16,
                  padding: '16px 18px',
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 12,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: ORANGE_SOFT,
                    border: `1px solid ${ORANGE_BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: ORANGE, letterSpacing: '-0.02em',
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}>{step.n}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: TEXT, fontSize: '1rem' }}>{step.title}</div>
                    <div style={{ marginTop: 4, color: MUTED, fontSize: '0.9rem', lineHeight: 1.6 }}>{step.body}</div>
                  </div>
                </li>
              ))}
            </ol>

            <CodeBlock filename="quickstart.ts" code={quickstartCode} />
          </SectionAnchor>

          {/* Install with AI */}
          <SectionAnchor id="install" eyebrow="Install" title="Install with AI">
            <p style={{ color: MUTED, fontSize: '1rem', lineHeight: 1.7, maxWidth: 700 }}>
              Drop this prompt into Cursor, Windsurf, or Claude Code to scaffold the SDK in
              your repo automatically.
            </p>
            <CodeBlock filename="ai-prompt.md"
              code={`> Install the Advaita analytics SDK in this repo using the framework already in
> use. Read package.json (or equivalent) to detect the runtime, install the right
> @acai package, wire up acai.init(...) at app startup, and add a single track
> call to verify ingestion. Use the write key ADV_DEV_xxxx.`}
            />
          </SectionAnchor>

          {/* SDK grid */}
          <SectionAnchor id="sdk-grid" eyebrow="SDKs" title="One protocol, every runtime">
            <p style={{ color: MUTED, fontSize: '1rem', lineHeight: 1.7, maxWidth: 700 }}>
              Native SDKs for every major language. All open-source under MIT. Pick yours and
              jump straight to the install snippet.
            </p>
            <div style={{
              marginTop: 22,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
              gap: 12,
            }}>
              {SDKS.map(sdk => (
                <a key={sdk.id} id={sdk.id}
                  href="#" onClick={(e) => { e.preventDefault(); onSdks && onSdks() }}
                  style={{
                    scrollMarginTop: 96,
                    display: 'block',
                    padding: '16px 16px 14px',
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 14,
                    textDecoration: 'none',
                    color: TEXT,
                    transition: 'background 0.15s, border-color 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = SURFACE_2
                    e.currentTarget.style.borderColor = ORANGE_BORDER
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = SURFACE
                    e.currentTarget.style.borderColor = BORDER
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 9,
                      background: `${sdk.color}1F`,
                      border: `1px solid ${sdk.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: 7,
                      flexShrink: 0,
                    }}>
                      {sdk.slug ? (
                        <img
                          src={`https://cdn.simpleicons.org/${sdk.slug}/${sdk.color.replace('#', '')}`}
                          alt={`${sdk.name} logo`}
                          width={20}
                          height={20}
                          style={{ display: 'block', objectFit: 'contain' }}
                        />
                      ) : (
                        <span style={{ fontWeight: 800, fontSize: '0.7rem', color: sdk.color }}>
                          {sdk.icon}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{sdk.name}</div>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: FAINT, lineHeight: 1.5 }}>{sdk.tag}</div>
                </a>
              ))}
            </div>
          </SectionAnchor>

          {/* Concepts blurbs */}
          <SectionAnchor id="concepts-events" eyebrow="Concepts" title="The event model">
            <p style={{ color: MUTED, fontSize: '1rem', lineHeight: 1.7, maxWidth: 720 }}>
              Every event is a JSON document with a <code style={{ color: ORANGE, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.92em' }}>type</code>,
              a <code style={{ color: ORANGE, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.92em' }}>message_id</code>, a user identifier
              (<code style={{ color: ORANGE, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.92em' }}>user_id</code> or
              {' '}<code style={{ color: ORANGE, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.92em' }}>anonymous_id</code>), and a context block
              describing the device, app, page, and campaign. Five primary types cover the
              whole spec — <strong style={{ color: TEXT }}>track</strong>, <strong style={{ color: TEXT }}>identify</strong>,
              {' '}<strong style={{ color: TEXT }}>page</strong>, <strong style={{ color: TEXT }}>group</strong>, and
              {' '}<strong style={{ color: TEXT }}>alias</strong>.
            </p>
          </SectionAnchor>

          <SectionAnchor id="concepts-identify" title="Identify and users">
            <p style={{ color: MUTED, fontSize: '1rem', lineHeight: 1.7, maxWidth: 720 }}>
              Call <code style={{ color: ORANGE, fontFamily: "'IBM Plex Mono', monospace" }}>acai.identify(...)</code> when a user
              signs in, sets a trait, or upgrades. Advaita merges traits over time and resolves
              anonymous traffic to known users automatically the moment you attach a stable
              identifier.
            </p>
          </SectionAnchor>

          <SectionAnchor id="concepts-pipeline" title="The plugin pipeline">
            <p style={{ color: MUTED, fontSize: '1rem', lineHeight: 1.7, maxWidth: 720 }}>
              Events flow through <strong style={{ color: TEXT }}>before → enrichment → destination</strong> plugins
              in order. You can drop a plugin at any layer to scrub PII, enrich with server
              data, or fan out to additional destinations like Kafka, ClickHouse, or your data
              warehouse.
            </p>
          </SectionAnchor>

          {/* Video tutorials */}
          <SectionAnchor id="video-tutorials" eyebrow="Tutorials" title="Video tutorials">
            <p style={{ color: MUTED, fontSize: '1rem', lineHeight: 1.7, maxWidth: 720 }}>
              Short, focused walkthroughs covering install, instrumentation, dashboards, and
              self-hosting. New videos drop weekly.
            </p>
            <div style={{
              marginTop: 22,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 14,
            }}>
              {VIDEOS.map(v => (
                <Motion.a key={v.id} href="#"
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  onClick={e => e.preventDefault()}
                  style={{
                    display: 'block',
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 14,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: TEXT,
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = ORANGE_BORDER}
                  onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
                >
                  {/* Thumbnail */}
                  <div style={{
                    position: 'relative',
                    aspectRatio: '16 / 9',
                    background: `linear-gradient(135deg, ${v.color}38, ${v.color}10 70%, #0a0a0a 100%)`,
                    borderBottom: `1px solid ${BORDER}`,
                    overflow: 'hidden',
                  }}>
                    <div aria-hidden style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }} />
                    {/* Play button */}
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                      width: 56, height: 56, borderRadius: '50%',
                      background: 'rgba(14,14,14,0.78)',
                      backdropFilter: 'blur(4px)',
                      border: `1px solid ${ORANGE_BORDER}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill={ORANGE}>
                        <path d="M5 3.5v11l10-5.5z" />
                      </svg>
                    </div>
                    {/* Duration badge */}
                    <div style={{
                      position: 'absolute', bottom: 10, right: 10,
                      padding: '3px 8px',
                      background: 'rgba(0,0,0,0.65)',
                      borderRadius: 5,
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.68rem', fontWeight: 700, color: TEXT,
                      border: `1px solid ${BORDER}`,
                    }}>{v.duration}</div>
                    {/* Chapter tag */}
                    <div style={{
                      position: 'absolute', top: 10, left: 10,
                      padding: '3px 8px',
                      background: 'rgba(0,0,0,0.55)',
                      borderRadius: 5,
                      fontSize: '0.62rem', fontWeight: 800, color: v.color,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      border: `1px solid ${v.color}40`,
                    }}>{v.chapter}</div>
                  </div>
                  <div style={{ padding: '14px 16px 16px' }}>
                    <div style={{ fontSize: '0.94rem', fontWeight: 700, color: TEXT, lineHeight: 1.35 }}>
                      {v.title}
                    </div>
                    <div style={{ marginTop: 8, fontSize: '0.74rem', color: FAINT, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>Watch</span>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M3 2l4 3.5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Motion.a>
              ))}
            </div>
          </SectionAnchor>

          {/* API reference */}
          <SectionAnchor id="api-batch" eyebrow="Reference" title="API · POST /batch">
            <p style={{ color: MUTED, fontSize: '1rem', lineHeight: 1.7, maxWidth: 720 }}>
              Behind every SDK is a single HTTP endpoint. If your stack isn't covered by a
              native SDK, point any HTTP client at <code style={{ color: ORANGE, fontFamily: "'IBM Plex Mono', monospace" }}>/batch</code>.
            </p>
            <CodeBlock filename="POST /batch" code={apiCode} />
          </SectionAnchor>

          {/* Self-host */}
          <SectionAnchor id="self-host" eyebrow="Infrastructure" title="Self-host the server">
            <div style={{
              padding: 22,
              background: 'linear-gradient(135deg, rgba(244,123,32,0.10), rgba(245,208,0,0.04) 70%, transparent)',
              border: `1px solid ${ORANGE_BORDER}`,
              borderRadius: 14,
            }}>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: TEXT, marginBottom: 6 }}>
                Run Advaita on your own infra in under 10 minutes.
              </div>
              <p style={{ color: MUTED, fontSize: '0.94rem', lineHeight: 1.65, margin: 0, maxWidth: 640 }}>
                The ingestion server is a stateless FastAPI app. Drop it behind your own load
                balancer, point it at PostgreSQL or ClickHouse, and you own every byte.
              </p>
              <CodeBlock filename="docker-compose.yml"
                code={`services:
  advaita:
    image: advaita/event-collection:latest
    ports: ["8080:8080"]
    environment:
      DATABASE_URL: postgres://...
      WRITE_KEYS:   "ADV_PROD_xxxx,ADV_DEV_yyyy"`}
              />
            </div>
          </SectionAnchor>

          {/* Changelog */}
          <SectionAnchor id="changelog" eyebrow="Reference" title="Changelog">
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { v: 'v1.0.0', date: 'Apr 2026', notes: 'GA release: TS, Python, Go, Java, Kotlin, Flutter, Browser JS SDKs.' },
                { v: 'v0.9.0', date: 'Mar 2026', notes: 'AI Insights chatbot beta. Cohort retention heatmap.' },
                { v: 'v0.8.0', date: 'Feb 2026', notes: 'Plugin pipeline (before → enrichment → destination).' },
              ].map(c => (
                <li key={c.v} style={{
                  display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16,
                  padding: '12px 14px',
                  background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 10,
                }}>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: ORANGE, fontWeight: 700, fontSize: '0.9rem' }}>{c.v}</div>
                    <div style={{ fontSize: '0.72rem', color: FAINT, marginTop: 2 }}>{c.date}</div>
                  </div>
                  <div style={{ color: MUTED, fontSize: '0.92rem', lineHeight: 1.55 }}>{c.notes}</div>
                </li>
              ))}
            </ul>
          </SectionAnchor>

          {/* Footer-ish next-steps */}
          <div style={{
            marginTop: 80,
            padding: '24px 26px',
            background: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: 14,
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          }}>
            <div>
              <div style={{ fontWeight: 700, color: TEXT, fontSize: '1rem' }}>Need a hand?</div>
              <div style={{ marginTop: 4, color: MUTED, fontSize: '0.88rem' }}>
                Join the early-access program — we onboard each team personally.
              </div>
            </div>
            <a href="#waitlist" onClick={() => onBack && onBack()}
              style={{
                padding: '10px 18px', background: ORANGE, color: '#fff',
                borderRadius: 8, fontSize: '0.85rem', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.02em',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e0701c'}
              onMouseLeave={e => e.currentTarget.style.background = ORANGE}
            >Get early access</a>
          </div>

        </main>

        {/* ── Right TOC ───────────────────────────────── */}
        <aside style={{
          position: 'sticky', top: 64,
          alignSelf: 'start',
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
          padding: '48px 0 80px',
          fontSize: '0.84rem',
        }} className="docs-side-right">
          <div style={{
            fontSize: '0.66rem',
            fontWeight: 800,
            color: FAINT,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: 12,
            paddingLeft: 10,
          }}>On this page</div>
          <div style={{ position: 'relative', paddingLeft: 10 }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: 1, background: BORDER,
            }} />
            {TOC.map(t => {
              const active = activeSection === t.id
              return (
                <a key={t.id} href={`#${t.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById(t.id)
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  style={{
                    position: 'relative',
                    display: 'block',
                    padding: '6px 12px',
                    color: active ? ORANGE : MUTED,
                    fontWeight: active ? 600 : 500,
                    textDecoration: 'none',
                    transition: 'color 0.12s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = TEXT }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = MUTED }}
                >
                  <span aria-hidden style={{
                    position: 'absolute', left: -1, top: 8, bottom: 8,
                    width: 2,
                    background: active ? ORANGE : 'transparent',
                    borderRadius: 1,
                  }} />
                  {t.label}
                </a>
              )
            })}
          </div>
        </aside>
      </div>

      {/* Responsive shell collapse + scrollbar hiding */}
      <style>{`
        /* Hide scrollbars on docs side rails (still scrollable) */
        .docs-side-left,
        .docs-side-right {
          scrollbar-width: none;     /* Firefox */
          -ms-overflow-style: none;  /* IE/Edge */
        }
        .docs-side-left::-webkit-scrollbar,
        .docs-side-right::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        @media (max-width: 1080px) {
          .docs-shell { grid-template-columns: 200px minmax(0,1fr) !important; }
          .docs-side-right { display: none !important; }
        }
        @media (max-width: 760px) {
          .docs-shell { grid-template-columns: 1fr !important; gap: 0 !important; }
          .docs-side-left { display: none !important; }
        }
      `}</style>
    </div>
  )
}
