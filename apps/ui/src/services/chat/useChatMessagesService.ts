import { useQuery } from '@apollo/client'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/fp/isNil'
import CHAT_MESSAGES_GQL from '../../gql/chat/chatMessages.gql'

type UseChatMessagesService = {
  isPrivateChat: boolean
}

export const useChatMessagesService = ({ isPrivateChat }: UseChatMessagesService) => {
  const { data, error, loading, refetch } = useQuery(CHAT_MESSAGES_GQL, {
    // Omit undefined variables to exclude in query params
    variables: omitBy(
      {
        is_private_chat: isPrivateChat,
      },
      isNil,
    ),
  })

  return {
    data: data?.chatMessages || [],
    error,
    loading,
    refetch,
  }
}
