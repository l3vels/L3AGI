import { IUser } from './user.interface'

export interface IAccount {
  id: number
  user: IUser
  user_id: string
  company_name: string
  location: string
  deleted: boolean
}
