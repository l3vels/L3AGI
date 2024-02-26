import { useQuery } from '@apollo/client'
import VOICE_OPTIONS_GQL from '../../gql/voice/voiceOptions.gql'

export const useVoiceOptionsService = ({
  page = 1,
  itemsCount = 10,
}: {
  page?: number
  itemsCount?: number
}) => {
  const restPath = `/voice/options?page=${page}&per_page=${itemsCount}`
  const { data, error, loading, refetch } = useQuery(VOICE_OPTIONS_GQL, {
    variables: { restPath },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  })

  const isLoading = loading && !data

  return {
    data: data?.getVoiceOptions || [],
    error,
    loading: isLoading,
    refetch,
  }
}
