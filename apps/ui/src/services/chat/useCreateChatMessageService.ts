import { useMutation } from '@apollo/client'

import CREATE_CHAT_MESSAGE_GQL from '../../gql/chat/createChatMessage.gql'

interface CreateMessageInput {
  message: string
  isPrivateChat: boolean
  localChatMessageRefId?: string
  parentId?: string
  agentId?: string
}

export const useCreateChatMessageService = () => {
  const [mutation] = useMutation(CREATE_CHAT_MESSAGE_GQL)

  const createMessageService = async (input: CreateMessageInput) => {
    const { message, isPrivateChat, agentId, localChatMessageRefId, parentId } = input

    const {
      data: { createMessage },
    } = await mutation({
      variables: {
        input: {
          prompt: message,
          agent_id: agentId,
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
