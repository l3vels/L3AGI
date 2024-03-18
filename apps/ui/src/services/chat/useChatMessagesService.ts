import { useQuery } from '@apollo/client'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/fp/isNil'
import { Nullable } from 'types'
import CHAT_MESSAGES_GQL from '../../gql/chat/userChatMessages.gql'
import CHAT_CLIENT_MESSAGES_GQL from '../../gql/chat/chatMessages.gql'
import CHAT_MESSAGES_HISTORY_GQL from '../../gql/chat/chatMessagesHistory.gql'

type UseChatMessagesService = {
  agentId?: Nullable<string>
  teamId?: Nullable<string>
  chatId?: Nullable<string>
}

export const useChatMessagesService = ({ agentId, teamId, chatId }: UseChatMessagesService) => {
  let queryVariables = omitBy(
    {
      agent_id: agentId,
      team_id: teamId,
      chat_id: chatId,
    },
    isNil,
  )
  if (chatId) {
    queryVariables = omitBy(
      {
        chat_id: chatId,
      },
      isNil,
    )
  }

  const { data, error, loading, refetch } = useQuery(CHAT_MESSAGES_GQL, {
    // Omit undefined variables to exclude in query params
    variables: queryVariables,
  })

  return {
    data: data?.chatMessages || [],
    error,
    loading,
    refetch,
  }
}

export const useChatMessagesHistoryService = ({ agentId, teamId }: UseChatMessagesService) => {
  const { data, error, loading, refetch } = useQuery(CHAT_MESSAGES_HISTORY_GQL, {
    // Omit undefined variables to exclude in query params
    variables: omitBy(
      {
        agent_id: agentId,
        team_id: teamId,
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

export const useClientChatMessagesService = ({ chat_id }: { chat_id: string }) => {
  const { data, error, loading, refetch } = useQuery(CHAT_CLIENT_MESSAGES_GQL, {
    // Omit undefined variables to exclude in query params
    variables: omitBy(
      {
        chat_id,
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
