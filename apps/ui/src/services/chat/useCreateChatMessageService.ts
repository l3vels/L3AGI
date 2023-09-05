import { useMutation } from '@apollo/client'

import CREATE_CHAT_MESSAGE_GQL from '../../gql/chat/createChatMessage.gql'
import { ChatMessageVersionEnum } from 'services/types'

interface CreateMessageInput {
  message: string
  version: ChatMessageVersionEnum
  isPrivateChat: boolean
  localChatMessageRefId?: string
  parentId?: string
}

export const useCreateChatMessageService = () => {
  const [mutation] = useMutation(CREATE_CHAT_MESSAGE_GQL)

  const createMessageService = async (input: CreateMessageInput) => {
    const { message, isPrivateChat, version, localChatMessageRefId, parentId } = input

    const {
      data: { createMessage },
    } = await mutation({
      variables: {
        input: {
          prompt: message,
          version,
          is_private_chat: isPrivateChat,
          local_chat_message_ref_id: localChatMessageRefId,
          parent_id: parentId,
        },
      },
    })

    return createMessage
  }

  return [createMessageService]
}
