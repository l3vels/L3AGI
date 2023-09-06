import { useQuery, useMutation } from '@apollo/client'
import DATASOURCE_SQL_TABLES from '../../gql/ai/datasource/datasourceSqlTables.gql'

export type IDatasourceSqlTables = {
  id: string
  name: string
  count: number
}[]

interface Data {
  getDatasourceSqlTables: IDatasourceSqlTables
}

export const useDatasourceSqlTables = (datasourceId: string) => {
  const { data, refetch, loading } = useQuery<Data>(DATASOURCE_SQL_TABLES, {
    variables: {
      id: datasourceId,
    },
    notifyOnNetworkStatusChange: true,
  })

  return { data: data?.getDatasourceSqlTables, refetch, loading }
}
