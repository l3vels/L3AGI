import { useContext, useEffect, useState } from 'react'
import { LayoutContext } from 'contexts'

export const useChatSwitcher = () => {
  const { expand } = useContext(LayoutContext)
  const [showSwitcher, setShowSwitcher] = useState(false)

  let hoverTimeout: any

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

  // useEffect(() => {
  //   if (expand) {
  //     setShowSwitcher(false)
  //   } else {
  //     setShowSwitcher(true)
  //   }
  // }, [expand])

  const handleMouseLeave = () => {
    const clearHoverTimer = () => {
      clearTimeout(hoverTimeout)
    }
    clearHoverTimer()

    if (window.innerWidth <= 1000) {
      setTimeout(() => {
        setShowSwitcher(false)
      }, 1000)
    }
  }

  const handleMouseHover = () => {
    const startHoverTimer = () => {
      hoverTimeout = setTimeout(() => {
        setShowSwitcher(true)
      }, 1000)
    }
    startHoverTimer()
  }

  return {
    showSwitcher,
    setShowSwitcher,
    handleMouseHover,
    handleMouseLeave,
  }
}
