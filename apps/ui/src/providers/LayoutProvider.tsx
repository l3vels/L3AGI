import React, { useEffect, useState } from 'react'

import { LayoutContext } from 'contexts'
import { useLocation } from 'react-router-dom'

export const LayoutProvider = ({ children }: any) => {
  const [expand, setExpand] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setExpand(false)
  }, [location.pathname])

  const onChangeLayout = () => setExpand(prevValue => !prevValue)

  const contextValue = {
    expand,
    onChangeLayout,
  }

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>
}

export default LayoutProvider
