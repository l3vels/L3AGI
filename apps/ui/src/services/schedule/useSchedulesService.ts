import { useQuery } from '@apollo/client'
import SCHEDULES_GQL from '../../gql/schedule/schedules.gql'

export const useSchedulesService = () => {
  const { data, error, loading, refetch } = useQuery(SCHEDULES_GQL)

  return {
    data: data?.getSchedules || [],
    error,
    loading,
    refetch,
  }
}
