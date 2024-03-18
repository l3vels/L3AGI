import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from 'contexts'
import { WebPubSubClient } from '@azure/web-pubsub-client'
import getSessionId from '../utils/getSessionId'
import useUpdateChatCache from './useUpdateChatCache'
import { useLocation } from 'react-router-dom'

type ChatSocketProps = {
  userId?: string | null
  createdChatId?: string | null
}

const useChatSocket = ({ userId, createdChatId }: ChatSocketProps) => {
  const { user, account } = useContext(AuthContext)

  const [pubSubClient, setPubSubClient] = useState<WebPubSubClient | null>(null)

  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)

  const agentId = urlParams.get('agent')
  const teamId = urlParams.get('team')
  const chatId = urlParams.get('chat') || urlParams.get('session') || createdChatId || ''

  const groupId = getSessionId({
    user,
    account,
    agentId,
    teamId,
    chatId,
  })

  const [connectedUsers, setConnectedUsers] = useState<string[]>([])
  const [typingUsersData, setTypingUsersData] = useState<any>([])

  const { upsertChatMessageInCache, upsertChatStatusConfig } = useUpdateChatCache()

  const getClientAccessUrl = useCallback(async () => {
    let url = `${import.meta.env.REACT_APP_ACCOUNT_SERVICES_URL}/chat/negotiate?id=${userId}`

    if (user) {
      url = `${import.meta.env.REACT_APP_ACCOUNT_SERVICES_URL}/chat/negotiate?id=${user.id}`
    }

    const response = await fetch(url)
    const data = await response.json()

    return data.url
  }, [user?.id])

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
        console.log('socket', data)
        upsertChatMessageInCache(data.chat_message, {
          agentId: data.agent_id,
          teamId: data.team_id,
          chatId: data.chat_id,
          localChatMessageRefId: data.local_chat_message_ref_id,
        })
      }

      if (data.type === 'CHAT_STATUS') {
        upsertChatStatusConfig(data.config)
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
  }, [groupId, getClientAccessUrl])

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

      await mainClient?.sendToGroup(groupId, chat, 'json', {
        noEcho: true,
        fireAndForget: false,
      })

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
        user_id: user.id || '',
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
          chat_id: 'chat_id', //todo need to validate
          user_id: user.id || '',
        },
      },
      client,
    )
  }

  const sendUserTyping = async (chat_id: string) => {
    const type = 'user_typing'

    if (!user) {
      return
    }
    // await send(type, {
    //   content: user?.first_name,
    //   example: false,
    //   additional_kwargs: {
    //     chat_id: chat_id,
    //     user_id: user?.id,
    //   },
    // })
  }

  const sendUserStopTyping = async (chat_id: string) => {
    const type = 'user_stop_typing'

    // await send(type, {
    //   content: false,
    //   example: false,
    //   additional_kwargs: {
    //     chat_id: chat_id,
    //     user_id: user.id,
    //   },
    // })
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
  }
}

export { useChatSocket }
