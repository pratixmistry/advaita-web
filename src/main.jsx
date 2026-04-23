import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import AuthPage from './Auth.jsx'
import Pricing from './pages/Pricing.jsx'
import SDKs from './pages/SDKs.jsx'
import { Preloader } from './components/Preloader.jsx'

function pageFromHash() {
  if (window.location.hash === '#auth') return 'auth'
  if (window.location.hash === '#pricing') return 'pricing'
  if (window.location.hash === '#sdks') return 'sdks'
  return 'home'
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

  const goAuth    = () => { window.location.hash = '#auth';    setPage('auth') }
  const goHome    = () => { window.location.hash = '';         setPage('home') }
  const goPricing = () => { window.location.hash = '#pricing'; setPage('pricing') }
  const goSdks    = () => { window.location.hash = '#sdks';    setPage('sdks') }

  if (page === 'auth')    return <AuthPage onBack={goHome} />
  if (page === 'pricing') return <Pricing  onBack={goHome} />
  if (page === 'sdks')    return <SDKs     onBack={goHome} />
  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <App onLogin={goAuth} onPricing={goPricing} onSdks={goSdks} />
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

