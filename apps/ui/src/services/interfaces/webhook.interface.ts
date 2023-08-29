import { ApolloError } from '@apollo/client'
import { IWebhook } from 'interfaces'
import { IApolloQuery } from './apollo.interface'

export interface IWebhooksQuery extends IApolloQuery {
  data: {
    items: [IWebhook]
    total_count: string
  }
  refetch: any
  error?: ApolloError
  loading: boolean
}

export interface IWebhooksQueryLazy extends IWebhooksQuery {
  getWebhooks: any
}

// eslint-disable-next-line import/export
export interface IWebhookQuery extends IApolloQuery {
  data: IWebhook
  refetch: any
  error?: ApolloError
  loading: boolean
}
