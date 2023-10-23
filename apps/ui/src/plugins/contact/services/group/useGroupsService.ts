import { useQuery } from '@apollo/client'
import GROUPS_GQL from '../../gql/group/groups.gql'

export const useGroupsService = () => {
  const { data, error, loading, refetch } = useQuery(GROUPS_GQL)

  return {
    data: data?.getGroups || [],
    error,
    loading,
    refetch,
  }
}
