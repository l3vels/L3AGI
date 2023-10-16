import { IUserQuery } from 'services/interfaces'
import { IUser } from './user.interface'

export interface IAccount {
  id: number
  user: IUserQuery
  name: string
  deleted: boolean
  configs: any
}
