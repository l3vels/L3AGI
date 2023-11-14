import { IntegrationInput } from 'services/agent/useCreateAgentService'
import { Nullable } from './utils'

export interface AgentWithConfigs {
  agent: {
    id: string
    name: string
    description: string
    role: string
    creator: Nullable<Creator>
    avatar: string
    is_template: boolean
    is_memory: boolean
    created_by: string
  }
  configs: {
    goals: string[]
    instructions: string[]
    constraints: string[]
    suggestions: string[]
    tools: string[]
    datasources: string[]
    greeting: string
    text: string
    source_flow: string
    model: string
    temperature: number

    synthesizer?: string
    default_voice?: string
    voice_id?: string
    transcriber?: string
    response_mode?: string[]
    input_mode?: string[]

    integrations?: IntegrationInput[]
  }
  system_message: Nullable<string>
}

interface Creator {
  name: string
  avatar: string
}
