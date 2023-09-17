import { useQuery } from '@apollo/client'
import checkAgentIsCreatedGql from '../../gql/ai/agent/checkAgentIsCreated.gql'

export const useCheckAgentIsCreatedService = ({ id }: { id: string }) => {
  const { data, error, loading, refetch } = useQuery(checkAgentIsCreatedGql, {
    variables: { id: id },
    skip: !id,
  })

  return {
    data: data?.checkAgentIsCreated || false,
    error,
    loading,
    refetch,
  }
}
