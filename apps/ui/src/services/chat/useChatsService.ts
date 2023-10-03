import { useQuery } from '@apollo/client'

import CHATS_GQL from '../../gql/chat/chats.gql'

export const useChatsService = () => {
  const { data, error, loading, refetch } = useQuery(CHATS_GQL)

  return {
    data: data?.getChats || [],
    error,
    loading,
    refetch,
  }
}
