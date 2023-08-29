import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { API_VERSION, INITIAL_CHAT, INITIAL_MESSAGE, INITIAL_STEPS } from '../constants'
import { ChatContext } from '../context/ChatContext'
import {
  ApiVersionEnum,
  IAchievement,
  IAsset,
  IAssetMedia,
  IChat,
  IChatMessage,
  ICollection,
  IGameIdea,
  IGameplay,
  IReward,
  MessageTypeEnum,
} from '../types'
import { useProcessSteps } from './useProcessStep'
import { useStepStatus } from './useStepStatus'
import { useChatSocket } from './useChatSocket'

type UseChatProps = {
  initialApiVersion: ApiVersionEnum
  isPrivateChat: boolean
}

const useChat = ({ initialApiVersion, isPrivateChat }: UseChatProps) => {
  const initialChats: IChat[] = JSON.parse(localStorage.getItem('chats') || 'null') || [
    INITIAL_CHAT,
  ]
  const [chats, setChats] = useState<IChat[]>(initialChats)
  const [currentChat, setCurrentChat] = useState<IChat>(initialChats[0])

  const { updateStepStatus } = useStepStatus()

  const addNotifyMessage = (newValue: string, ai = false) => {
    const newMsg: IChatMessage = {
      id: uuidv4(),
      createdOn: Date.now(),
      text: newValue,
      ai: ai,
      type: MessageTypeEnum.AI_MANUAL,
      history: [],
    }

    addMessage(newMsg)
  }

  const addMessage = (message: IChatMessage) => {
    setCurrentChat(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }))
  }

  const socket = useChatSocket({
    isPrivateChat,
  })

  const regenerateMessage = (message: IChatMessage) => {
    setCurrentChat(prevState => {
      //todo need fix history
      // if (!message?.history) {
      //   message.history = []
      // }
      // message?.history?.push(message)
      const index = prevState.messages.findIndex(message => message.id === message.id)
      // If no chat was found, return the original array
      if (index === -1) return prevState

      // Otherwise, replace the chat at the found index with the currentChat
      const newMessages = [
        ...prevState.messages.slice(0, index),
        message,
        ...prevState.messages.slice(index + 1),
      ]

      return {
        ...prevState,
        messages: newMessages,
      }
    })
  }

  const updateMessage = (id: string, fields: Partial<IChatMessage>) => {
    setCurrentChat(prevState => {
      const updatedMessages = prevState.messages.map(message => {
        if (message.id !== id) {
          return message
        }

        debugger

        return { ...message, ...fields }
      })

      return {
        ...prevState,
        messages: updatedMessages,
      }
    })
  }

  const updateMessageCollectionAsset = (collectionId: string, asset: IAsset) => {
    setCurrentChat(prevState => {
      const updatedMessages = prevState.messages.map(message => {
        const updatedCollections = message.collections?.map(collection => {
          if (collection.id !== collectionId) {
            return collection
          }

          const updatedAssets = collection.assets?.map(a => {
            if (a.id === asset.id) {
              return asset
            }
            return a
          })

          return { ...collection, assets: updatedAssets }
        })

        return { ...message, collections: updatedCollections }
      })

      return {
        ...prevState,
        messages: updatedMessages,
      }
    })
  }

  const updateMessageCollection = (messageId: string, collection: ICollection) => {
    setCurrentChat(prevState => {
      const updatedMessages = prevState.messages.map(message => {
        if (message.id !== messageId) {
          return message
        }

        const updatedCollections = message.collections?.map(c => {
          if (c.id === collection.id) {
            return collection
          }
          return c
        })

        return { ...message, collections: updatedCollections }
      })
      return {
        ...prevState,
        messages: updatedMessages,
      }
    })
  }

  const setIsCreateFinished = (isCreateFinished: boolean) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, isCreateFinished }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const setIsAssetMediasGenerated = (isAssetMediasGenerated: boolean) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, isAssetMediasGenerated }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const [apiVersion, setAPIVersion] = useState(initialApiVersion)

  const [thinking, setThinking] = useState(false)

  const setUserKeywords = (userKeywords: string) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, userKeywords }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const updateAsset = (collectionId: string, assetId: number, fields: Partial<IAsset>) => {
    setCurrentChat(prevState => {
      const updatedMessages = prevState.messages.map(message => {
        const updatedCollections = message.collections?.map(collection => {
          if (collection.id !== collectionId) {
            return collection
          }

          const updatedAssets = collection.assets?.map(asset => {
            if (asset.id !== assetId) {
              return asset
            }

            return { ...asset, ...fields }
          })

          return { ...collection, assets: updatedAssets }
        })

        return { ...message, collections: updatedCollections }
      })

      return {
        ...prevState,
        messages: updatedMessages,
      }
    })
  }

  const setGameMedias = (medias: IAssetMedia[]) => {
    setCurrentChat(prevState => ({
      ...prevState,
      medias,
    }))
  }

  const { processSteps, processRegenerate } = useProcessSteps(
    addMessage,
    addNotifyMessage,
    regenerateMessage,
    setIsCreateFinished,
    setIsAssetMediasGenerated,
    updateMessageCollection,
    setUserKeywords,
    apiVersion,
  )

  // Save chats to localStorage whenever it is updated
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats))
  }, [chats])

  // console.log(currentChat)

  const updateChatsByCurrent = (chat: IChat) => {
    setChats(chats => {
      // Find the index of the chat that matches the currentChat
      const index = chats.findIndex(chat => chat.id === currentChat.id)

      // If no chat was found, return the original array
      if (index === -1) return chats

      // Otherwise, replace the chat at the found index with the currentChat
      return [...chats.slice(0, index), chat, ...chats.slice(index + 1)]
    })
  }

  useEffect(() => {
    setChats(chats => {
      // Find the index of the chat that matches the currentChat
      const index = chats.findIndex(chat => chat.id === currentChat.id)

      // If no chat was found, return the original array
      if (index === -1) return chats

      // Otherwise, replace the chat at the found index with the currentChat
      return [...chats.slice(0, index), currentChat, ...chats.slice(index + 1)]
    })
  }, [currentChat])

  const addChat = (chat: IChat) => {
    if (chat.messages.length === 0) {
      chat.messages.push(INITIAL_MESSAGE)
    }
    if (Object.keys(chat?.steps || {}).length === 0) {
      chat.steps = INITIAL_STEPS
    }
    setChats(prev => [
      ...prev,
      {
        ...chat,
        id: uuidv4(),
      },
    ])
    showChat(chat)
  }

  const showChat = (chat: IChat) => {
    updateChatsByCurrent(currentChat)
    setCurrentChat(chat)
  }

  const setGameIdea = (gameIdea?: IGameIdea) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, gameIdea, name: gameIdea?.name || 'Game By L3 AI' }

      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const setGameplay = (gameplay?: IGameplay) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, gameplay }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const setGameCategory = (gameCategory: string) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, gameCategory }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const addRemoveCollection = (isAdd: boolean, collection: ICollection) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState }

      if (!newChat?.collections) newChat.collections = []
      const index = newChat.collections?.findIndex(c => c.id === collection.id)
      if (isAdd) {
        if (index >= 0) return prevState
        newChat.collections = [...newChat.collections, collection]
      } else {
        if (index === -1) return prevState
        newChat.collections = [
          ...newChat.collections.slice(0, index),
          ...newChat.collections.slice(index + 1),
        ]
      }

      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const addRemoveRewardAchievement = (
    isAdd: boolean,
    reward?: IReward,
    achievement?: IAchievement,
  ) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState }

      if (reward) {
        if (!newChat?.rewards) newChat.rewards = []
        const index = newChat.rewards?.findIndex(c => c.id === reward.id)
        if (isAdd) {
          if (index >= 0) return prevState
          newChat.rewards = [...newChat.rewards, reward]
        } else {
          if (index === -1) return prevState
          newChat.rewards = [
            ...newChat.rewards.slice(0, index),
            ...newChat.rewards.slice(index + 1),
          ]
        }
      }

      if (achievement) {
        if (!newChat?.achievements) newChat.achievements = []
        const index = newChat.achievements?.findIndex(c => c.id === achievement.id)
        if (isAdd) {
          if (index >= 0) return prevState
          newChat.achievements = [...newChat.achievements, achievement]
        } else {
          if (index === -1) return prevState
          newChat.achievements = [
            ...newChat.achievements.slice(0, index),
            ...newChat.achievements.slice(index + 1),
          ]
        }
      }

      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const clearChats = () => setChats([INITIAL_CHAT])

  const clearMessages = () => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, collections: [] }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const handleUserInput = async (userInput: string) => {
    switch (apiVersion) {
      case ApiVersionEnum.CreateV1:
        await processSteps(currentChat, userInput)
        return
      case ApiVersionEnum.ReportV1:
        await processSteps(currentChat, userInput)
        return
      case ApiVersionEnum.MediaV1:
        await processSteps(currentChat, userInput)
        return
    }
  }

  const reportGeneration = async () => {}

  const handleRegenerate = async () => {
    setThinking(true)
    await processRegenerate(currentChat)
    setThinking(false)
  }

  const handleGoToNextStep = async () => {
    setThinking(true)
    const isValid = await processSteps(currentChat)
    setThinking(false)
  }

  return {
    messages: currentChat.messages,
    addMessage,
    clearMessages,
    clearChats,
    currentChat,
    showChat,
    handleGoToNextStep,
    chats,
    addChat,
    handleUserInput,
    updateAsset,
    setGameIdea,
    setGameplay,
    setGameMedias,
    addRemoveCollection,
    updateMessage,
    updateMessageCollection,
    updateMessageCollectionAsset,
    setGameCategory,
    handleRegenerate,
    apiVersions: API_VERSION,
    apiVersion,
    setAPIVersion,
    thinking,
    setThinking,
    addRemoveRewardAchievement,
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
