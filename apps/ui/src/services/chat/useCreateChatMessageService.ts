import { useMutation } from '@apollo/client'

import createMessageGql from '../../gql/chat/createMessage.gql'
import { ChatMessageVersionEnum } from 'services/types'

interface CreateMessageInput {
  message: string
  version: ChatMessageVersionEnum
  isPrivateChat: boolean
  gameId?: string
  collectionId?: string
  localChatMessageRefId?: string
  parentId?: string
}

export const useCreateChatMessageService = () => {
  const [mutation] = useMutation(createMessageGql)

  const createMessageService = async (input: CreateMessageInput) => {
    const {
      message,
      gameId,
      collectionId,
      isPrivateChat,
      version,
      localChatMessageRefId,
      parentId,
    } = input

    const {
      data: { createMessage },
    } = await mutation({
      variables: {
        input: {
          prompt: message,
          version,
          is_private_chat: isPrivateChat,
          game_id: gameId,
          collection_id: collectionId,
          local_chat_message_ref_id: localChatMessageRefId,
          parent_id: parentId,
        },
      },
    })

    return createMessage
  }

  return [createMessageService]
}
