export interface RunLog {
  id: string
  name: string
  type: 'LLM' | 'Tool'
  messages: {
    name: string
    content: string
  }[]
  created_on: string
}
