import { useLazyQuery } from '@apollo/client'
import DATASOURCE_SQL_TABLES from '../../gql/ai/datasource/datasourceSqlTables.gql'

export type IDatasourceSqlTables = {
  id: string
  name: string
  count: number
}[]

interface Data {
  getDatasourceSqlTables: IDatasourceSqlTables
}

type Variables = {
  id?: string
  host?: string
  port?: number
  user?: string
  password?: string
  name?: string
  source_type?: string
}

export const useDatasourceSqlTables = (variables: Variables) => {
  const [fetchSqlTables, { data, loading }] = useLazyQuery<Data, Variables>(DATASOURCE_SQL_TABLES, {
    variables,
  })

  return { data: data?.getDatasourceSqlTables, fetchSqlTables, loading }
}
