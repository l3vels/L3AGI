import { useQuery } from '@apollo/client'
import { RunLog } from 'types'
import RUN_LOGS_GQL from '../../gql/ai/run/runLogs.gql'

type UseRunLogsServiceData = {
  runLogs: RunLog[]
}

type UseRunLogsServiceVariables = {
  run_id: string
}

export const useRunLogsService = ({ run_id }: UseRunLogsServiceVariables) => {
  const { data, error, loading, refetch } = useQuery<
    UseRunLogsServiceData,
    UseRunLogsServiceVariables
  >(RUN_LOGS_GQL, {
    variables: {
      run_id,
    },
  })

  return {
    data: data?.runLogs || [],
    error,
    loading,
    refetch,
  }
}
