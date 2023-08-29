export interface IUser {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  contact_number: string
  role: string
  created_on: Date
  modified_on: Date
  modified_by: string
  deleted: boolean
}
