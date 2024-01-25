import { useContext, useState } from 'react'

import { ChatContext } from '../context/ChatContext'
import { useChatSocket } from './useChatSocket'

const useChat = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [chatId, setChatId] = useState<string | null>(null)
  const socket = useChatSocket({
    userId: userId || null,
    createdChatId: chatId || null,
  })

  const [thinking, setThinking] = useState(false)

  return {
    thinking,
    setThinking,
    socket,
    setUserId,
    setChatId,
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
