import { useQuery } from '@apollo/client'
import FINE_TUNINGS_GQL from '../../gql/ai/fineTuning/fineTunings.gql'

export const useFineTuningsService = () => {
  const { data, error, loading, refetch } = useQuery(FINE_TUNINGS_GQL)

  return {
    data: data?.getFineTunings || [],
    error,
    loading,
    refetch,
  }
}
