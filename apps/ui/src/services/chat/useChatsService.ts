import { useQuery } from '@apollo/client'

import CHATS_GQL from '../../gql/chat/chats.gql'

function joinFilters(filters: string[]) {
  return filters.map(filter => `filter=${encodeURIComponent(filter)}`).join('&')
}

export const useChatsService = ({
  filter = [''],
  page = 1,
  itemsCount = 10,
}: {
  filter?: string[]
  page?: number
  itemsCount?: number
  agentType?: 'inbound' | 'outbound' | 'text' | null
}) => {
  const restPath = `/chat?${joinFilters(filter)}&page=${page}&per_page=${itemsCount}`
  const { data, error, loading, refetch } = useQuery(CHATS_GQL, {
    variables: { restPath },
    fetchPolicy: 'cache-first',
  })

  return {
    data: data?.getChats?.chats || [],
    count: data?.getChats?.count || 0,
    error,
    loading,
    refetch,
  }
}
