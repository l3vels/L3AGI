import { ApolloError } from '@apollo/client'
import { IApiKey } from 'interfaces'
import { IApolloQuery } from './apollo.interface'

export interface IApiKeysQuery extends IApolloQuery {
  data: {
    items: [IApiKey]
    total_count: string
  }
  refetch: any
  error?: ApolloError
  loading: boolean
}

export interface IApiKeysQueryLazy extends IApiKeysQuery {
  getApiKeys: any
}

export interface IApiKeyQuery extends IApolloQuery {
  data: IApiKey
  refetch: any
  error?: ApolloError
  loading: boolean
}
