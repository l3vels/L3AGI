export interface Model {
  id: string
  provider: 'OpenAI' | 'Hugging Face' | 'Replicate'
  name: string
  value: string
}
