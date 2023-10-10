import React, { useEffect, useRef } from 'react'

const Doc: React.FC = () => {
  const windowRef = useRef<Window | null>(null)

  useEffect(() => {
    if (!windowRef.current) {
      // Store the previous route in session storage before redirecting to external link
      sessionStorage.setItem('previousRoute', window.location.pathname)
      window.history.pushState({}, '', '/developers/docs')
      windowRef.current = window.open('https://docs.l3agi.com/', '_blank')
    } else {
      windowRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      // Retrieve the previous route from session storage and redirect to it
      const previousRoute = sessionStorage.getItem('/developers/api-keys')
      if (
        previousRoute &&
        windowRef.current?.closed &&
        window.location.href === 'https://docs.l3agi.com/'
      ) {
        window.history.pushState({}, '', previousRoute)
        window.location.reload()
      }
    }
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return null
}

export default Doc
