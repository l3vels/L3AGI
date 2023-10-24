import { Nullable } from 'types'

export interface RunLog {
  id: string
  name: Nullable<string>
  input: Nullable<string>
  output: string
  type: 'System' | 'Tool' | 'Final Answer'
  error: Nullable<string>
  created_on: string
}
