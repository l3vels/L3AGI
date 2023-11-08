import { useMutation } from '@apollo/client'
import { Nullable } from 'types'

import CREATEClient_CLIENT_CHAT_MESSAGE_GQL from '../../gql/chat/createClientChatMessage.gql'

interface CreateClientChatMessageInput {
  chat_id: string
  prompt: string
  localChatMessageRefId: string
  voice_url: Nullable<string>
}

export const useCreateClientChatMessageService = () => {
  const [mutation] = useMutation(CREATEClient_CLIENT_CHAT_MESSAGE_GQL)

  const createClientChatMessageService = async (input: CreateClientChatMessageInput) => {
    const { chat_id, prompt, localChatMessageRefId, voice_url } = input

    const {
      data: { createClientChatMessage },
    } = await mutation({
      variables: {
        input: {
          prompt,
          chat_id,
          local_chat_message_ref_id: localChatMessageRefId,
          voice_url,
        },
      },
    })

    return createClientChatMessage
  }

  return [createClientChatMessageService]
}
