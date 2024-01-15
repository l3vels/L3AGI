import { IntegrationInput } from 'services/agent/useCreateAgentService'
import { Nullable } from './utils'

export interface AgentRunner {
  task: string
  runner: string
}

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
    agent_type: string
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

    runners: Nullable<AgentRunner[]>
    sentiment_analyzer: Nullable<AgentRunner>

    twilio_phone_number_sid: Nullable<string>
  }
  system_message: Nullable<string>
}

interface Creator {
  name: string
  avatar: string
}
