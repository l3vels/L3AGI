import { Nullable } from 'types'
import { useCookies } from 'react-cookie'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import { useContext } from 'react'
import { AuthContext } from 'contexts'
import useUpdateChatCache from 'modals/AIChatModal/hooks/useUpdateChatCache'

interface CreateMessageInput {
  message: string
  localChatMessageRefId?: string
  parentId?: string
  agentId?: Nullable<string>
  teamId?: Nullable<string>
  voice_url?: Nullable<string>
}

export const useCreateChatMessageService = ({
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

  const createMessageService = async (input: CreateMessageInput) => {
    const { message, agentId, teamId, localChatMessageRefId, parentId, voice_url } = input

    const aiMessage = {
      id: uuid(),
      session_id: '',
      thoughts: null,
      sender_user_id: user?.id || '',
      sender_account_id: account?.id || '',
      sender_name: user?.name || 'Guest',
      parent_id: null,
      parent: null,
      agent_id: agentId,
      agent: {
        name: agentName,
        avatar: agentAvatar,
      },
      team_id: teamId,
      team: null,
      chat_id: null,
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
      `${import.meta.env.REACT_APP_ACCOUNT_SERVICES_URL}/chat/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authorization}`,
          account_id: accountId,
        },
        credentials: 'include',
        body: JSON.stringify({
          prompt: message,
          agent_id: agentId,
          team_id: teamId,
          local_chat_message_ref_id: localChatMessageRefId,
          parent_id: parentId,
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
              agentId,
              teamId,
              chatId: null,
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

  return [createMessageService]
}
