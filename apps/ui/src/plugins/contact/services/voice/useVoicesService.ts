import { useQuery } from '@apollo/client'
import VOICES_GQL from '../../gql/voice/voices.gql'

export const useVoicesService = () => {
  const { data, error, loading, refetch } = useQuery(VOICES_GQL)

  return {
    data: data?.getVoices || [],
    error,
    loading,
    refetch,
  }
}
