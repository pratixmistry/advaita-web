import React from 'react'
import { motion } from 'framer-motion'
import { stagger, fadeUp } from '../constants/index.jsx'
import './Hero.css'

export function Hero() {
  return (
    <section style={{ background: '#ffffff', minHeight: '90vh', display: 'flex', alignItems: 'stretch', overflow: 'hidden', width: '100%' }}>
      <div style={{ display: 'flex', width: '100%', minHeight: '90vh', alignItems: 'stretch' }}>

        {/* ── Left column (50%) ── */}
        <motion.div
          className="hero-left-grid"
          variants={stagger} initial="hidden" animate="visible"
          style={{
            flex: '0 0 50%',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(100px,10vw,120px) clamp(32px,5vw,72px) clamp(60px,6vw,80px)',
            position: 'relative',
            overflow: 'hidden',
            background: '#ffffff',
          }}
        >
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
          {/* Badge */}
          <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
            <span style={{
              display: 'inline-block',
              border: '1px solid #E5E5E5',
              borderRadius: 4,
              padding: '4px 14px',
              fontSize: '0.72rem',
              color: '#888',
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}>
              Open Source Analytics
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)',
              lineHeight: 1.15,
              color: '#111111',
              margin: '0 0 20px',
              letterSpacing: '-0.03em',
            }}
          >
            Stop reading dashboards.<br />
            <span style={{ color: '#F47B20' }}>Start understanding users.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '1.05rem',
              color: '#666666',
              lineHeight: 1.7,
              maxWidth: 400,
              margin: '0 0 36px',
              fontWeight: 400,
            }}
          >
            Advaita is a self-hosted, open-source analytics platform that gives you complete behavioral insights — without sending data to third parties.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
            <a href="#waitlist" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px',
              background: '#111111',
              color: '#ffffff',
              borderRadius: 4,
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              fontFamily: "'Manrope', sans-serif",
              transition: 'background 0.18s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#F47B20'}
              onMouseLeave={e => e.currentTarget.style.background = '#111111'}
            >
              Get Early Access
            </a>
            <a href="#how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: '0.9rem',
              fontWeight: 500,
              color: '#F47B20',
              textDecoration: 'none',
              fontFamily: "'Manrope', sans-serif",
              transition: 'gap 0.18s',
            }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '6px'}
            >
              See how it works →
            </a>
          </motion.div>

          {/* Stat chips */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {/* Self-hosted — orange */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 16px', borderRadius: 4,
              background: 'rgba(244,123,32,0.1)', color: '#b85a0d',
              border: '1px solid rgba(244,123,32,0.2)',
              fontSize: '0.78rem', fontWeight: 700,
              fontFamily: "'Manrope', sans-serif",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F47B20', display: 'inline-block', flexShrink: 0 }} />
              Self-hosted
            </span>

            {/* MIT Licensed — dark/green */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 16px', borderRadius: 4,
              background: 'rgba(17,17,17,0.07)', color: '#333333',
              border: '1px solid rgba(17,17,17,0.12)',
              fontSize: '0.78rem', fontWeight: 700,
              fontFamily: "'Manrope', sans-serif",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A7A2E', display: 'inline-block', flexShrink: 0 }} />
              MIT Licensed
            </span>

            {/* Backed by iHub — blue */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 16px', borderRadius: 4,
              background: 'rgba(49,120,198,0.08)', color: '#1a5fa8',
              border: '1px solid rgba(49,120,198,0.18)',
              fontSize: '0.78rem', fontWeight: 700,
              fontFamily: "'Manrope', sans-serif",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3178C6', display: 'inline-block', flexShrink: 0 }} />
              Backed by iHub
            </span>
          </motion.div>
          </div>
        </motion.div>

        {/* ── Right column (50%) — animated orbs ── */}
        <div style={{
          flex: '0 0 50%',
          width: '50%',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          background: '#0E0E0E',
        }}>
          {/* Base radial gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(ellipse 80% 70% at 85% 15%, rgba(244,123,32,0.55) 0%, transparent 65%),
              radial-gradient(ellipse 60% 50% at 20% 80%, rgba(244,123,32,0.12) 0%, transparent 60%),
              linear-gradient(145deg, #1a0a00 0%, #0E0E0E 50%, #060606 100%)
            `,
          }} />

          {/* Subtle grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />

          {/* Floating orb 1 — large, top right */}
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: 320, height: 320, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,123,32,0.22) 0%, transparent 70%)',
            animation: 'orbFloat1 7s ease-in-out infinite',
          }} />

          {/* Floating orb 2 — medium, center */}
          <div style={{
            position: 'absolute', top: '40%', right: '20%',
            width: 180, height: 180, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,208,0,0.12) 0%, transparent 70%)',
            animation: 'orbFloat2 9s ease-in-out infinite',
          }} />

          {/* Floating orb 3 — small, bottom left */}
          <div style={{
            position: 'absolute', bottom: '15%', left: '10%',
            width: 120, height: 120, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,123,32,0.15) 0%, transparent 70%)',
            animation: 'orbFloat3 6s ease-in-out infinite',
          }} />

          {/* Ghost tagline centred over canvas */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', inset: 0, zIndex: 3,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              letterSpacing: '-0.035em',
              lineHeight: 1.25,
              textAlign: 'center',
              margin: 0,
              color: 'rgba(255,255,255,0.14)',
            }}>
              Know your users.
            </p>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              letterSpacing: '-0.035em',
              lineHeight: 1.25,
              textAlign: 'center',
              margin: 0,
              color: 'rgba(255,255,255,0.22)',
            }}>
              Own your{' '}
              <span style={{ color: 'rgba(255,160,60,0.55)' }}>data.</span>
            </p>
          </motion.div>
        </div>
      </div>

    </section>
  )
}