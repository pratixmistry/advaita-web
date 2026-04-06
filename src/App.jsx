import { Navbar } from './components/Navbar.jsx'
import { Hero } from './sections/Hero.jsx'
import { SDKShowcase } from './sections/SDKShowcase.jsx'
import { ProductCapabilities } from './sections/ProductCapabilities.jsx'
import { WaitlistCTA } from './sections/WaitlistCTA.jsx'
import { CTABanner } from './sections/CTABanner.jsx'
import { AnnouncementBanner } from './components/AnnouncementBanner.jsx'
import { Footer } from './sections/Footer.jsx'

export default function App({ onLogin, onPricing }) {
  return (
    <div className="grain" style={{ minHeight: '100vh', background: '#F0EEE8' }}>
      <Navbar offsetTop={0} onLogin={onLogin} onPricing={onPricing} />
      <main style={{ paddingTop: 76 }}>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Product Capabilities — immediately after Hero */}
        <ProductCapabilities />

        {/* 3. SDK Code Section */}
        <SDKShowcase />

        {/* 4. Waitlist form (preserved for conversions) */}
        <WaitlistCTA />

        {/* 5. Orange CTA Banner */}
        <CTABanner />
      </main>

      {/* 6. Announcement Banner (iHub) */}
      <AnnouncementBanner />

      {/* 7. Footer */}
      <Footer />
    </div>
  )
}
