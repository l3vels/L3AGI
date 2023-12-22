import React from 'react'

type CallContextValue = {
  shoWCall: boolean
  setShowCall: (value: boolean) => void
  setCallIds: (value: { agentId: string; contactId: string } | null) => void
}

export const CallContext = React.createContext<CallContextValue>({
  shoWCall: false,
  setShowCall: () => {},
  setCallIds: () => {},
})
