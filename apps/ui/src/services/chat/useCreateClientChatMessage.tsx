import { Nullable } from 'types'
import moment from 'moment'
import { useContext } from 'react'
import { AuthContext } from 'contexts'
import { useCookies } from 'react-cookie'
import useUpdateChatCache from 'modals/AIChatModal/hooks/useUpdateChatCache'
import { v4 as uuid } from 'uuid'

interface CreateClientChatMessageInput {
  chat_id: string
  prompt: string
  localChatMessageRefId: string
  voice_url: Nullable<string>
}

export const useCreateClientChatMessageService = ({
  agentName,
  agentAvatar,
}: {
  agentName: string
  agentAvatar?: string
}) => {
  const { user, account } = useContext(AuthContext)
  const [cookies] = useCookies([''])

  // @ts-expect-error TODO: fix cookie types
  const { accountId, authorization } = cookies
  const { upsertChatMessageInCache } = useUpdateChatCache()

  const createClientChatMessageService = async (input: CreateClientChatMessageInput) => {
    const { chat_id, prompt, localChatMessageRefId, voice_url } = input

    const aiMessage = {
      id: uuid(),
      session_id: '',
      thoughts: null,
      sender_user_id: user?.id || '',
      sender_account_id: account?.id || '',
      sender_name: user?.name || 'Guest',
      parent_id: null,
      parent: null,
      agent_id: null,
      agent: {
        name: agentName,
        avatar: agentAvatar,
      },
      team_id: null,
      team: null,
      chat_id: chat_id,
      message: {
        data: { content: '', example: false, additional_kwargs: {} },
        type: 'ai',
      },
      created_on: moment().add(10, 'seconds').toISOString(),
      sender_user: user || '',
      run_id: null,
      voice_url: null,
    }

    const response = await fetch(
      `${import.meta.env.REACT_APP_ACCOUNT_SERVICES_URL}/chat/session/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authorization}`,
          account_id: accountId,
        },
        credentials: 'include',
        body: JSON.stringify({
          prompt,
          chat_id,
          local_chat_message_ref_id: localChatMessageRefId,
          voice_url,
        }),
      },
    )

    if (!response.body) return

    const reader = response.body.getReader()

    const stream = new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close()
              return
            }

            const token = new TextDecoder('utf-8').decode(value)
            aiMessage.message.data.content += token
            aiMessage.message.data.content = aiMessage.message.data.content.replace(/\\n/g, '\n')

            upsertChatMessageInCache(aiMessage, {
              chatId: chat_id,
            })

            controller.enqueue(value)
            push()
          })
        }
        push()
      },
    })

    return new Response(stream, { headers: { 'Content-Type': 'text/html' } })
  }

  return [createClientChatMessageService]
}
