import { useContext, useState } from 'react'

import { ChatContext } from '../context/ChatContext'
import { useChatSocket } from './useChatSocket'

const useChat = () => {
  const socket = useChatSocket()

  const [thinking, setThinking] = useState(false)

  return {
    thinking,
    setThinking,
    socket,
  }
}

const useChatState = () => {
  const context = useContext(ChatContext)

  if (context === undefined) {
    throw new Error('useChatState must be used within a useChatState')
  }
  return context
}

export { useChat, useChatState }
