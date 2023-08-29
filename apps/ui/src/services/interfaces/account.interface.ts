import { IApolloQuery } from './apollo.interface'
import { IAccount } from 'interfaces'

export interface IAccountQuery extends IApolloQuery {
  data: IAccount
}

export interface IAccountQueryLazy extends IAccountQuery {
  getAccount: any
}
