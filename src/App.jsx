import { useEffect } from 'react'
import Lenis from 'lenis'
import { AnnouncementBanner } from './components/AnnouncementBanner.jsx'
import { InvestmentBanner } from './components/InvestmentBanner.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Hero } from './sections/Hero.jsx'
import { ProblemStatement } from './sections/ProblemStatement.jsx'
import { CapabilitiesBento } from './sections/CapabilitiesBento.jsx'
import { NonFunctionalStats } from './sections/NonFunctionalStats.jsx'
import { IntegrationsSection } from './sections/IntegrationsSection.jsx'
import { HowItWorks } from './sections/HowItWorks.jsx'
import { PricingSection } from './sections/PricingSection.jsx'
import { FAQ } from './sections/FAQ.jsx'
import { FinalCTA } from './sections/FinalCTA.jsx'
import { Footer } from './sections/Footer.jsx'

export default function App({ onLogin, onPricing }) {
  useEffect(() => {
    // Honor the user's OS-level reduced-motion preference.
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const scrollToHash = (hash) => {
      if (!hash || hash === '#') return false
      const id = hash.slice(1)
      const el = document.getElementById(id)
      if (!el) return false
      if (prefersReduced || !window.__lenis) {
        el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
      } else {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 })
      }
      // Update URL hash without causing a second jump
      if (window.history.replaceState) {
        window.history.replaceState(null, '', hash)
      }
      return true
    }

    // Global click delegate: intercept all same-page hash links so they reliably scroll.
    const handleAnchorClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      const anchor = e.target.closest('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('#') || href === '#') return
      if (scrollToHash(href)) {
        e.preventDefault()
      }
    }
    document.addEventListener('click', handleAnchorClick)

    let lenis
    let rafId
    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.75,
        touchMultiplier: 1.2,
      })
      window.__lenis = lenis

      const raf = (time) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    // Handle initial hash on load (e.g. visiting /#waitlist directly)
    if (window.location.hash) {
      // Wait for layout before scrolling
      setTimeout(() => scrollToHash(window.location.hash), 120)
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) {
        lenis.destroy()
        delete window.__lenis
      }
    }
  }, [])

  return (
    <div className="lp-frame-outer">
      <div className="lp-frame">
        {/* 1. Top announcement bar */}
        <AnnouncementBanner />

        {/* 2. Sticky light navbar */}
        <Navbar onLogin={onLogin} onPricing={onPricing} />

        <main>
          {/* 3. Hero — animated-fill tabs + dashboard preview */}
          <Hero />

          {/* 3b. Problem statement — dashboards bottleneck vs DS/UR bots */}
          <ProblemStatement />

          {/* 3c. Investment announcement */}
          <InvestmentBanner />

          {/* 4. Capabilities bento (Saalyn-style) */}
          <CapabilitiesBento />

          {/* 5. How it works */}
          <HowItWorks />

          {/* 6. Non-functional guarantees — uptime, latency, compliance, security */}
          <NonFunctionalStats />

          {/* 7. Integrations grid (Coming Soon) */}
          <IntegrationsSection />

          {/* 8. Pricing */}
          <PricingSection />

          {/* 9. FAQ */}
          <FAQ />

          {/* 10. Final CTA */}
          <FinalCTA />
        </main>
      </div>

      {/* 11. Footer — outside lp-frame so bg spans full viewport width */}
      <Footer />
    </div>
  )
}
