import React, { useEffect, useState } from 'react'

import { useHotkeys } from 'react-hotkeys-hook'

import { LayoutContext } from 'contexts'
import { isMacOS } from 'utils/isMac'
// import { useLocation } from 'react-router-dom'

export const LayoutProvider = ({ children }: any) => {
  const [expand, setExpand] = useState(localStorage.getItem('expand') === 'true' ? true : false)
  // const location = useLocation()

  // useEffect(() => {
  //   setExpand(false)
  // }, [location.pathname])

  const commandFunction = () => {
    // Replace this with your desired functionality
    setExpand(!expand)
  }

  const keyboardShortcut = isMacOS ? 'ctrl+f' : 'ctrl+shift+f'

  useHotkeys(keyboardShortcut, commandFunction)

  useEffect(() => {
    if (expand) {
      localStorage.setItem('expand', 'true')
    } else {
      localStorage.setItem('expand', 'false')
    }
  }, [expand])

  const onChangeLayout = () => setExpand(prevValue => !prevValue)

  const contextValue = {
    expand,
    onChangeLayout,
  }

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>
}

export default LayoutProvider
