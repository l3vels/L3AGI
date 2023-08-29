import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from 'contexts'
// import { ChatMessageVersionEnum } from 'services'
import { WebPubSubClient } from '@azure/web-pubsub-client'
import { useLocation } from 'react-router-dom'
import getSessionId from '../utils/getSessionId'
import useUpdateChatCache from './useUpdateChatCache'

// interface ChatEvent {
//   type: string
//   message_id: string
//   version: ChatMessageVersionEnum
//   thoughts: { id: number; title: string; result: string | null; loading: boolean }[]
//   game_id?: string
// }

type UseChatSocketProps = {
  isPrivateChat: boolean
}

const useChatSocket = ({ isPrivateChat }: UseChatSocketProps) => {
  const location = useLocation()

  const { user, account } = useContext(AuthContext)

  const [pubSubClient, setPubSubClient] = useState<WebPubSubClient | null>(null)
  const [isNewMessage, setIsNewMessage] = useState(false)

  const typingTimeoutRef: any = useRef(null)
  // TODO: Get gameId from useParams
  // const { state: { gameId } = {} } = location
  const gameId = location?.state?.gameId

  const groupId = getSessionId({
    gameId,
    user,
    account,
    isPrivateChat,
  })

  const [connectedUsers, setConnectedUsers] = useState<string[]>([])
  const [typingUsersData, setTypingUsersData] = useState<any>([])

  const { upsertChatMessageInCache } = useUpdateChatCache()

  const getClientAccessUrl = useCallback(async () => {
    const url = `${import.meta.env.REACT_APP_AI_SERVICES_URL}/negotiate?id=${user.id}`

    const response = await fetch(url)
    const data = await response.json()
    return data[0].url
  }, [user.id])

  useEffect(() => {
    const client = new WebPubSubClient({
      getClientAccessUrl,
    })

    client.on('group-message', e => {
      const data = e.message.data as any

      if (data.type === 'user_disconnected') {
        onUserDisconnectEvent(e)
      }
      if (data.type === 'user_connected') {
        onUserConnectEvent(e)
      }

      if (data.type === 'user_typing' || data.type === 'user_stop_typing') {
        onUserTypingEvent(e)
      }
      if (data.type === 'CHAT_MESSAGE_ADDED') {
        upsertChatMessageInCache(data.chat_message, isPrivateChat, {
          localChatMessageRefId: data.local_chat_message_ref_id,
        })

        setIsNewMessage(true)
      }
    })

    const subscribe = async () => {
      await client.start()
      await client.joinGroup(groupId)

      setPubSubClient(client)
    }

    const unsubscribe = async () => {
      await sendUserDisconnected(client)
      await client.leaveGroup(groupId)
      client.stop()
    }

    subscribe()

    return () => {
      unsubscribe()
    }
  }, [groupId, getClientAccessUrl, isPrivateChat])

  useEffect(() => {
    if (!pubSubClient) return

    setTimeout(() => {
      sendUserConnected()
    }, 1000)
  }, [pubSubClient, connectedUsers])

  const onUserConnectEvent = (e: any) => {
    return setConnectedUsers((prevState: string[]) => {
      const connectedUserIds = prevState
      if (connectedUserIds.includes(e?.message.fromUserId)) {
        return prevState
      } else {
        return [...prevState, e?.message.fromUserId]
      }
    })
  }

  const onUserDisconnectEvent = (e: any) => {
    return setConnectedUsers((prevState: string[]) => {
      const filteredData = prevState.filter((userId: string) => userId !== e?.message.fromUserId)

      return filteredData
    })
  }

  const onUserTypingEvent = (e: any) => {
    setTypingUsersData((prevState: any) => {
      const userIds = prevState.map((typingUser: any) => {
        return typingUser.userId
      })

      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        const filteredData = prevState.filter(
          (typingUser: any) => typingUser.userId !== e?.message.fromUserId,
        )
        setTypingUsersData(filteredData)
      }, 2000)

      if (!e?.message.data.message.data.content) {
        const filteredData = prevState.filter(
          (typingUser: any) => typingUser.userId !== e?.message.fromUserId,
        )
        return filteredData
      } else if (userIds.includes(e?.message.fromUserId)) {
        return prevState
      } else {
        return [
          ...prevState,
          { userId: e?.message.fromUserId, text: e?.message.data.message.data.content },
        ]
      }
    })
  }

  const send = async (eventName: string, data: any, client?: any) => {
    let mainClient = pubSubClient

    if (!pubSubClient && client) {
      mainClient = client
    }

    try {
      const chat = {
        type: eventName,
        from: user,
        message: {
          data: data,
        },
      }

      const response = await mainClient?.sendToGroup(groupId, chat, 'json', {
        noEcho: true,
        fireAndForget: false,
      })
      // console.log(response, 'sendToGroup response')
      await mainClient?.sendEvent(eventName, chat, 'json')
    } catch (error) {
      // console.error(error)
    }
  }

  const sendUserConnected = async () => {
    const type = 'user_connected'

    await send(type, {
      content: `connected`,
      example: false,
      additional_kwargs: {
        chat_id: 'chat_id',
        user_id: user.id,
      },
    })
  }

  const sendUserDisconnected = async (client: any) => {
    const type = 'user_disconnected'

    await send(
      type,
      {
        content: `disconnected`,
        example: false,
        additional_kwargs: {
          chat_id: 'chat_id',
          user_id: user.id,
        },
      },
      client,
    )
  }

  const sendUserTyping = async (chat_id: string) => {
    const type = 'user_typing'

    await send(type, {
      content: user.first_name,
      example: false,
      additional_kwargs: {
        chat_id: chat_id,
        user_id: user.id,
      },
    })
  }

  const sendUserStopTyping = async (chat_id: string) => {
    const type = 'user_stop_typing'

    await send(type, {
      content: false,
      example: false,
      additional_kwargs: {
        chat_id: chat_id,
        user_id: user.id,
      },
    })
  }

  const sendUserLikeDislike = async (message_id: string, type: string) => {
    await send(type, {
      content: `${user.name} like`,
      example: false,
      additional_kwargs: {
        message_id,
      },
    })
  }

  const sendUserShare = async (message_id: string) => {
    const type = 'user_share'
    await send(type, {
      content: `${user.name} share`,
      example: false,
      additional_kwargs: {
        message_id,
      },
    })
  }

  const sendMessage = async (message: string) => {
    const type = 'user_send_message'
    await send(type, {
      content: message,
      example: false,
      additional_kwargs: {
        user_id: user.id,
        account_id: account.id,
      },
    })
  }

  return {
    sendUserTyping,
    sendUserStopTyping,
    sendUserLikeDislike,
    sendUserShare,
    sendMessage,
    sendUserConnected,
    connectedUsers,
    typingUsersData,
    isNewMessage,
    setIsNewMessage,
  }
}

export { useChatSocket }
