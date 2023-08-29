import { ApolloError } from '@apollo/client'
import { ILog } from 'interfaces/log.interface'
import { IApolloQuery } from './apollo.interface'

export interface ILogsQuery extends IApolloQuery {
  data: {
    items: [ILog]
    total_count: string
  }
  refetch: any
  error?: ApolloError
  loading: boolean
}

export interface ILogsQueryLazy extends ILogsQuery {
  getLogs: any
}

export interface ILogQuery extends IApolloQuery {
  data: ILog
  refetch: any
  error?: ApolloError
  loading: boolean
}
