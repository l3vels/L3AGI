import { Nullable } from './utils'

export interface Model {
  id: string
  provider: 'OpenAI' | 'Hugging Face' | 'Replicate'
  name: string
  value: Nullable<string>
  fine_tuning: boolean
  is_fine_tuned: Nullable<boolean>
}
