import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Ensures every navigation (including pushed history entries from the
// blog filters) lands the user at the top of the new page.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  return null
}
