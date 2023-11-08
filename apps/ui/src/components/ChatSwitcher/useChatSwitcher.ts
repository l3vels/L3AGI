import { useEffect, useRef, useState } from 'react'

export const useChatSwitcher = () => {
  const [showSwitcher, setShowSwitcher] = useState(false)
  const hoverTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleResize = () => {
      // Check the window width and update the state accordingly
      setShowSwitcher(window.innerWidth >= 900) // Adjust the breakpoint as needed
    }

    // Set the initial state on component mount
    handleResize()

    // Add a resize event listener to handle changes
    window.addEventListener('resize', handleResize)

    // Remove the event listener on component unmount to avoid memory leaks
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current)

    if (window.innerWidth <= 1000) {
      setTimeout(() => {
        setShowSwitcher(false)
      }, 1000)
    }
  }

  const handleMouseHover = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowSwitcher(true)
    }, 1000)
  }

  return {
    showSwitcher,
    setShowSwitcher,
    handleMouseHover,
    handleMouseLeave,
  }
}
