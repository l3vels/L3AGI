import React from 'react'

type CallContextValue = {
  shoWCall: boolean
  setShowCall: (value: boolean) => void
}

export const CallContext = React.createContext<CallContextValue>({
  shoWCall: false,
  setShowCall: () => {},
})
