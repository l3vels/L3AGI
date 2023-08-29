import React from 'react'

// Todo
// 1. attach event handler to window on resize
// 2. update width on resize event
const useViewport = () => {
  const [width] = React.useState(window.innerWidth)

  return { width }
}

export default useViewport
