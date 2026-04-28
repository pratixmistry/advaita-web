// Centralised auth / routing constants for the landing page.
// Signup + login live on a separate subdomain (signup.acaiplatform.ai).
// When a user is already authenticated on that subdomain, a shared cookie
// scoped to `.acaiplatform.ai` lets this landing page swap CTAs to
// "Go to Dashboard" instead of "Sign in" / "Sign up".

export const SIGNUP_URL = 'https://signup.acaiplatform.ai/'
export const LOGIN_URL = 'https://signup.acaiplatform.ai/login'
export const DASHBOARD_URL = 'https://signup.acaiplatform.ai/'

// Cookie / storage keys that the signup/dashboard app is expected to set
// when a user authenticates. Any of these being present is treated as
// "signed in". Keep this list in sync with the auth service.
const AUTH_COOKIE_KEYS = ['acai_session', 'acai_auth', 'acai_token']
const AUTH_STORAGE_KEYS = ['acai_session', 'acai_auth', 'acai_token']

function readCookies() {
  if (typeof document === 'undefined' || !document.cookie) return []
  return document.cookie.split(';').map((c) => c.trim()).filter(Boolean)
}

export function isAuthenticated() {
  try {
    const cookies = readCookies()
    const hasCookie = cookies.some((c) => {
      const name = c.split('=')[0]
      return AUTH_COOKIE_KEYS.includes(name)
    })
    if (hasCookie) return true

    if (typeof window !== 'undefined' && window.localStorage) {
      const hasStorage = AUTH_STORAGE_KEYS.some(
        (k) => !!window.localStorage.getItem(k),
      )
      if (hasStorage) return true
    }
  } catch {
    // Defensive: treat any failure as "not authenticated".
  }
  return false
}
