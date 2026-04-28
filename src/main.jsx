import { StrictMode, Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { Preloader } from './components/Preloader.jsx'

/* Routes that aren't part of the initial landing render are lazy-loaded
   so they don't bloat the first paint of the home page. */
const AuthPage = lazy(() => import('./Auth.jsx'))
const Pricing = lazy(() => import('./pages/Pricing.jsx'))
const SDKs = lazy(() => import('./pages/SDKs.jsx'))
const Docs = lazy(() => import('./pages/Docs.jsx'))

function pageFromHash() {
  if (window.location.hash === '#auth') return 'auth'
  if (window.location.hash === '#pricing') return 'pricing'
  if (window.location.hash === '#sdks') return 'sdks'
  if (window.location.hash === '#docs' || window.location.hash.startsWith('#docs/')) return 'docs'
  return 'home'
}

function RouteFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: '#FAFAF8',
        zIndex: 50,
      }}
    />
  )
}

function Root() {
  const [page, setPage] = useState(pageFromHash)
  const [loading, setLoading] = useState(() => pageFromHash() === 'home')

  useEffect(() => {
    const onHash = () => {
      setPage(pageFromHash())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const goHome    = () => { window.location.hash = '';         setPage('home') }
  const goPricing = () => { window.location.hash = '#pricing'; setPage('pricing') }
  const goSdks    = () => { window.location.hash = '#sdks';    setPage('sdks') }
  const goDocs    = () => { window.location.hash = '#docs';    setPage('docs') }

  if (page === 'auth')
    return (
      <Suspense fallback={<RouteFallback />}>
        <AuthPage onBack={goHome} />
      </Suspense>
    )
  if (page === 'pricing')
    return (
      <Suspense fallback={<RouteFallback />}>
        <Pricing onBack={goHome} />
      </Suspense>
    )
  if (page === 'sdks')
    return (
      <Suspense fallback={<RouteFallback />}>
        <SDKs onBack={goHome} onDocs={goDocs} />
      </Suspense>
    )
  if (page === 'docs')
    return (
      <Suspense fallback={<RouteFallback />}>
        <Docs onBack={goHome} onSdks={goSdks} />
      </Suspense>
    )

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <App onPricing={goPricing} onSdks={goSdks} onDocs={goDocs} />
        </motion.div>
      )}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
