import { useLazyQuery, useQuery } from '@apollo/client'
import logsGql from '../../gql/log/logs.gql'
import logByIdGql from '../../gql/log/logById.gql'

export const useLogsService = (query: any) => {
  const { data, error, loading, refetch } = useQuery(logsGql, {
    variables: {
      filter: {
        ...query,
      },
    },
  })

  return {
    data: data?.logs.items || [],
    error,
    loading,
    refetch,
  }
}

export const useLogByIdLazy = () => {
  const [getLogById, { data: { logById } = [], error, loading, refetch }] = useLazyQuery(logByIdGql)

  return {
    data: logById || {},
    error,
    loading,
    refetch,
    getLogById,
  }
}
