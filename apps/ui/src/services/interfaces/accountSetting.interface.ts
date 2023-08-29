import { ApolloError } from '@apollo/client'
import { IApolloQuery } from './apollo.interface'
import { IAccountSetting } from 'interfaces'

export interface IAccountSettingQuery extends IApolloQuery {
  data: IAccountSetting
  refetch: any
  error?: ApolloError
  loading: boolean
}
