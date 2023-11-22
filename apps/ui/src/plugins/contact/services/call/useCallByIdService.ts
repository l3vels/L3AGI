import { useQuery } from '@apollo/client'
import CALL_BY_ID_GQL from '../../gql/call/callById.gql'

export const useCallByIdService = ({ id }: { id?: string }) => {
  const {
    data: { callById } = {},
    error,
    loading,
    refetch,
  } = useQuery(CALL_BY_ID_GQL, {
    variables: { id },
    skip: !id,
  })

  return {
    data: callById,
    error,
    loading,
    refetch,
  }
}
