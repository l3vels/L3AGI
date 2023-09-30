import { useMutation } from '@apollo/client'

import { Nullable } from 'types'
import CREATE_CHAT_MESSAGE_GQL from '../../gql/chat/createUserChatMessage.gql'

interface CreateMessageInput {
  message: string
  isPrivateChat: boolean
  localChatMessageRefId?: string
  parentId?: string
  agentId?: Nullable<string>
  teamId?: Nullable<string>
}

export const useCreateChatMessageService = () => {
  const [mutation] = useMutation(CREATE_CHAT_MESSAGE_GQL)

  const createMessageService = async (input: CreateMessageInput) => {
    const { message, isPrivateChat, agentId, teamId, localChatMessageRefId, parentId } = input

    const {
      data: { createMessage },
    } = await mutation({
      variables: {
        input: {
          prompt: message,
          agent_id: agentId,
          team_id: teamId,
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
