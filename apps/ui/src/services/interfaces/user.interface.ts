import { IApolloQuery } from './apollo.interface'
import { IUser } from 'interfaces'
import { ApolloError } from '@apollo/client'

export interface IUserQuery extends IApolloQuery {
  data: IUser
}

export interface IUsersQuery extends IApolloQuery {
  data: {
    items: [IUser]
    total_count: string
  }
  error?: ApolloError
  refetch: any
  loading: boolean
}

export interface IUserQueryLazy extends IUserQuery {
  getUser: any
}
