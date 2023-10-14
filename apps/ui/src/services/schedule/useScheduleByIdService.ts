import { useQuery } from '@apollo/client'
import SCHEDULE_BY_ID_GQL from '../../gql/schedule/scheduleById.gql'

export const useScheduleByIdService = ({ id }: { id: string }) => {
  const {
    data: { scheduleById } = {},
    error,
    loading,
    refetch,
  } = useQuery(SCHEDULE_BY_ID_GQL, {
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
