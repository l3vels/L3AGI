import { useMutation } from '@apollo/client'

import createAgentGql from '../../gql/ai/agent/createAgent.gql'
import { AgentRunner, Nullable } from 'types'

type FieldInput = {
  key: string
  label: string
  type: string
  value: string
  is_required: boolean
  is_secret: boolean
}

export type IntegrationInput = {
  value: string
  label: string
  fields: FieldInput[]
}

export type AgentInput = {
  name: string
  role: string
  greeting: string
  description: string
  is_template: boolean
  temperature: number
  goals: string[]
  constraints: string[]
  tools: string[]
  datasources: string[]
  instructions: string[]
  model: string
  is_memory: boolean
  suggestions: string[]
  text: string
  avatar: string
  source_flow: string

  synthesizer?: string
  default_voice?: string
  voice_id?: string
  transcriber?: string
  response_mode?: string[]
  input_mode?: string[]

  integrations?: IntegrationInput[]

  agent_type?: string
  runners: AgentRunner[]
  sentiment_analyzer: Nullable<AgentRunner>

  twilio_phone_number_sid: Nullable<string>
}

export const useCreateAgentService = () => {
  const [mutation] = useMutation(createAgentGql)

  const createAgentService = async (input: AgentInput) => {
    const {
      name,
      role,
      description,
      is_template,
      temperature,
      goals,
      constraints,
      tools,
      datasources,
      source_flow,
      instructions,
      model,
      is_memory,
      suggestions,
      greeting,
      text,
      avatar,

      synthesizer,
      default_voice,
      voice_id,
      transcriber,
      response_mode,
      input_mode,

      integrations,

      agent_type,
      runners,
      sentiment_analyzer,

      twilio_phone_number_sid,
    } = input

    const {
      data: { createAgent },
    } = await mutation({
      variables: {
        input: {
          agent: {
            name,
            description,
            role,
            is_template,
            is_memory,
            avatar,
            agent_type,
          },
          configs: {
            goals,
            constraints,
            tools,
            datasources,
            model,
            temperature,
            instructions,
            suggestions,
            greeting,
            text,
            source_flow,

            synthesizer,
            default_voice,
            voice_id,
            transcriber,
            response_mode,
            input_mode,

            integrations,
            runners,
            sentiment_analyzer,

            twilio_phone_number_sid,
          },
        },
      },
    })

    return createAgent
  }

  return [createAgentService]
}
