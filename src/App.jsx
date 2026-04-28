import { Suspense, lazy, useEffect } from 'react'
import { AnnouncementBanner } from './components/AnnouncementBanner.jsx'
import { InvestmentBanner } from './components/InvestmentBanner.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Hero } from './sections/Hero.jsx'

/* Below-the-fold sections lazy-load on demand so the initial render
   only ships Hero + chrome. Each section is a separate JS chunk and
   begins fetching the moment React schedules its render. */
const ProblemStatement    = lazy(() => import('./sections/ProblemStatement.jsx').then(m => ({ default: m.ProblemStatement })))
const CapabilitiesBento   = lazy(() => import('./sections/CapabilitiesBento.jsx').then(m => ({ default: m.CapabilitiesBento })))
const HowItWorks          = lazy(() => import('./sections/HowItWorks.jsx').then(m => ({ default: m.HowItWorks })))
const NonFunctionalStats  = lazy(() => import('./sections/NonFunctionalStats.jsx').then(m => ({ default: m.NonFunctionalStats })))
const IntegrationsSection = lazy(() => import('./sections/IntegrationsSection.jsx').then(m => ({ default: m.IntegrationsSection })))
const PricingSection      = lazy(() => import('./sections/PricingSection.jsx').then(m => ({ default: m.PricingSection })))
const FAQ                 = lazy(() => import('./sections/FAQ.jsx').then(m => ({ default: m.FAQ })))
const FinalCTA            = lazy(() => import('./sections/FinalCTA.jsx').then(m => ({ default: m.FinalCTA })))
const Footer              = lazy(() => import('./sections/Footer.jsx').then(m => ({ default: m.Footer })))

/* Lenis is only needed for the smooth-scroll experience and is fairly
   heavy (~12kb gzip). Pull it in dynamically after first paint so it
   never blocks the critical path. */
function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const scrollToHash = (hash) => {
      if (!hash || hash === '#') return false
      const el = document.getElementById(hash.slice(1))
      if (!el) return false
      if (prefersReduced || !window.__lenis) {
        el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
      } else {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 })
      }
      if (window.history.replaceState) window.history.replaceState(null, '', hash)
      return true
    }

    const handleAnchorClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      const anchor = e.target.closest('a[href]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('#') || href === '#') return
      if (scrollToHash(href)) e.preventDefault()
    }
    document.addEventListener('click', handleAnchorClick)

    let lenis
    let rafId
    let cancelled = false

    if (!prefersReduced) {
      // Defer Lenis import + init until the browser is idle so it
      // never blocks the first meaningful paint.
      const init = async () => {
        const { default: Lenis } = await import('lenis')
        if (cancelled) return
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
      const idleHandle = window.requestIdleCallback
        ? window.requestIdleCallback(init, { timeout: 800 })
        : setTimeout(init, 200)

      // Cleanup the scheduled init if the component unmounts first.
      // (We can't cancel both schedulers identically; both are safe to leave.)
      void idleHandle
    }

    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash), 120)
    }

    return () => {
      cancelled = true
      document.removeEventListener('click', handleAnchorClick)
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) {
        lenis.destroy()
        delete window.__lenis
      }
    }
  }, [])
}

/* Tiny placeholder that reserves vertical space so layout shift on
   chunk-load is minimal. */
function SectionFallback() {
  return <div aria-hidden="true" style={{ minHeight: 240 }} />
}

export default function App({ onPricing, onSdks, onDocs }) {
  useSmoothScroll()

  return (
    <div className="lp-frame-outer">
      <AnnouncementBanner />
      <Navbar onPricing={onPricing} onSdks={onSdks} onDocs={onDocs} />

      <div className="lp-frame">
        <main>
          <Hero />

          {/* Each below-the-fold section has its own Suspense boundary so
              individual chunks render the moment they're ready, instead of
              blocking on the slowest one. */}
          <Suspense fallback={<SectionFallback />}><ProblemStatement /></Suspense>
          <InvestmentBanner />
          <Suspense fallback={<SectionFallback />}><CapabilitiesBento /></Suspense>
          <Suspense fallback={<SectionFallback />}><HowItWorks /></Suspense>
          <Suspense fallback={<SectionFallback />}><NonFunctionalStats /></Suspense>
          <Suspense fallback={<SectionFallback />}><IntegrationsSection /></Suspense>
          <Suspense fallback={<SectionFallback />}><PricingSection /></Suspense>
          <Suspense fallback={<SectionFallback />}><FAQ /></Suspense>
          <Suspense fallback={<SectionFallback />}><FinalCTA /></Suspense>
        </main>
      </div>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
