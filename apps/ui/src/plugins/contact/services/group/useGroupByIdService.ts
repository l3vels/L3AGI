import { useQuery } from '@apollo/client'
import GROUP_BY_ID_GQL from '../../gql/group/groupById.gql'

export const useGroupByIdService = ({ id }: { id: string }) => {
  const {
    data: { groupById } = {},
    error,
    loading,
    refetch,
  } = useQuery(GROUP_BY_ID_GQL, {
    variables: { id },
    skip: !id,
  })

  return {
    data: groupById,
    error,
    loading,
    refetch,
  }
}
