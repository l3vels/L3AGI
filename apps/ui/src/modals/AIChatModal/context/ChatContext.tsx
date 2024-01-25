import { ReactNode, createContext } from 'react'
import { useChat } from '../hooks/useChat'

export const ChatContext = createContext({
  thinking: false,
  setThinking: (thinking: boolean) => {},
  socket: {
    sendUserShare: (message_id: string) => {},
    sendUserLikeDislike: (message_id: string, type: string) => {},
    sendMessage: (message: string) => {},
    sendUserTyping: (chat_id: string) => {},
    sendUserStopTyping: (chat_id: string) => {},
    typingUsersData: [],
  },
  setChatId: (value: string) => {},
  setUserId: (value: string) => {},
})

type ChatContextProviderProps = {
  children: ReactNode
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { thinking, setThinking, socket, setChatId, setUserId } = useChat()

  return (
    <ChatContext.Provider
      value={{
        thinking,
        setThinking,
        socket,
        setChatId,
        setUserId,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
