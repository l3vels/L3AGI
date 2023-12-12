import { useQuery } from '@apollo/client'
import CALL_GQL from '../../gql/call/calls.gql'

export const useCallsService = () => {
  const { data, error, loading, refetch } = useQuery(CALL_GQL)

  return {
    data: data?.getCalls || [],
    error,
    loading,
    refetch,
  }
}
