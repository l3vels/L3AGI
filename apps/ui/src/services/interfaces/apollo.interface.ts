import { ApolloError } from '@apollo/client'

export interface IApolloQuery {
  refetch?: any
  error?: ApolloError
  loading: boolean
  called?: boolean
}
