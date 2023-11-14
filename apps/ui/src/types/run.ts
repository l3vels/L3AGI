import { Nullable } from './utils'

export interface RunLog {
  id: string
  name: string
  type: 'LLM' | 'Tool'
  messages: {
    name: string
    content: string
    is_chat_history: Nullable<boolean>
  }[]
  created_on: string
  start_date: Nullable<string>
  end_date: Nullable<string>
  toolkit_id: Nullable<string>
}
