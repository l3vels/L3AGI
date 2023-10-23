import { useQuery } from '@apollo/client'
import SCHEDULE_BY_ID_GQL from '../../gql/schedule/scheduleById.gql'
import { ScheduleWithConfigs } from 'types'

type UseScheduleByIdServiceData = {
  scheduleById: ScheduleWithConfigs
}

type UseScheduleByIdServiceVariables = {
  id?: string
}

export const useScheduleByIdService = ({ id }: UseScheduleByIdServiceVariables) => {
  const {
    data: { scheduleById } = {},
    error,
    loading,
    refetch,
  } = useQuery<UseScheduleByIdServiceData, UseScheduleByIdServiceVariables>(SCHEDULE_BY_ID_GQL, {
    variables: { id },
    skip: !id,
  })

  return {
    data: scheduleById,
    error,
    loading,
    refetch,
  }
}
