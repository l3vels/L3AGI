import { ReactNode, createContext } from 'react'
import { API_VERSION, INITIAL_CHAT, INITIAL_MESSAGE } from '../constants'
import { useChat } from '../hooks/useChat'
import {
  IChatMessage,
  IChat,
  ApiVersionEnum,
  ICollection,
  IAchievement,
  IReward,
  IAsset,
  IAssetMedia,
} from '../types'

export const ChatContext = createContext({
  messages: [INITIAL_MESSAGE],
  chats: [INITIAL_CHAT],
  currentChat: INITIAL_CHAT,
  apiVersions: API_VERSION,
  apiVersion: ApiVersionEnum.L3_Conversational,
  setAPIVersion: (apiVersion: ApiVersionEnum) => {},
  addMessage: (message: IChatMessage) => {},
  updateMessage: (id: string, newMessage: Partial<IChatMessage>) => {},
  updateMessageCollection: (messageId: string, collection: ICollection) => {},
  updateMessageCollectionAsset: (collectionId: string, asset: IAsset) => {},
  updateAsset: (collectionId: string, assetId: number, fields: Partial<IAsset>) => {},
  clearMessages: () => {},
  clearChats: () => {},
  handleGoToNextStep: () => {},
  addChat: (chat: IChat) => {},
  handleUserInput: (userInput: string, aiModel: string) => {},
  setGameMedias: (medias: IAssetMedia[]) => {},
  setGameIdea: (gameIdea: any) => {},
  setGameplay: (gameplay: any) => {},
  addRemoveCollection: (isAdd: boolean, collection: ICollection) => {},
  addRemoveRewardAchievement: (isAdd: boolean, reward?: IReward, achievement?: IAchievement) => {},
  setGameCategory: (gameCategory: any) => {},
  showChat: (chat: IChat) => {},
  handleRegenerate: async () => {},
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
})

type ChatContextProviderProps = {
  children: ReactNode
  initialApiVersion?: ApiVersionEnum
  isPrivateChat: boolean
}

export const ChatContextProvider = ({
  children,
  initialApiVersion = ApiVersionEnum.L3_Conversational,
  isPrivateChat,
}: ChatContextProviderProps) => {
  const {
    messages,
    addMessage,
    clearMessages,
    showChat,
    updateMessage,
    chats,
    currentChat,
    clearChats,
    addChat,
    handleGoToNextStep,
    handleUserInput,
    handleRegenerate,
    setGameIdea,
    setGameplay,
    setGameMedias,
    addRemoveCollection,
    addRemoveRewardAchievement,
    updateMessageCollection,
    updateMessageCollectionAsset,
    updateAsset,
    setGameCategory,
    apiVersions,
    apiVersion,
    setAPIVersion,
    thinking,
    setThinking,
    socket,
  } = useChat({ initialApiVersion, isPrivateChat })

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        showChat,
        chats,
        currentChat,
        updateMessage,
        clearChats,
        addChat,
        handleGoToNextStep,
        handleUserInput,
        setGameIdea,
        setGameMedias,
        updateMessageCollection,
        updateMessageCollectionAsset,
        updateAsset,
        setGameplay,
        addRemoveCollection,
        addRemoveRewardAchievement,
        setGameCategory,
        handleRegenerate,
        apiVersions,
        apiVersion,
        setAPIVersion,
        thinking,
        setThinking,
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
