import { useQuery } from '@apollo/client'
import SCHEDULES_GQL from '../../gql/schedule/schedules.gql'
import { ScheduleWithConfigs } from 'types'

type UseSchedulesServiceData = {
  schedules: ScheduleWithConfigs[]
}

export const useSchedulesService = () => {
  const { data, error, loading, refetch } = useQuery<UseSchedulesServiceData>(SCHEDULES_GQL)

  return {
    data: data?.schedules || [],
    error,
    loading,
    refetch,
  }
}
