import { useMutation } from '@apollo/client'

import createAgentGql from '../../gql/ai/agent/createAgent.gql'

export type AgentInput = {
  name: string
  role: string
  description: string
  is_template: boolean
  temperature: number
  goals: string[]
  constraints: string[]
  tools: string[]
  datasources: string[]
  instructions: string[]
  model_version: string
  mode_provider: string
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
      instructions,
      model_version,
      mode_provider,
    } = input

    const {
      data: { createAgent },
    } = await mutation({
      variables: {
        input: {
          agent: {
            name: name,
            description: description,
            role: role,
            is_template: is_template,
          },
          configs: {
            goals: goals,
            constraints: constraints,
            tools: tools,
            datasources: datasources,
            mode_provider: mode_provider,
            model_version: model_version,
            temperature: temperature,
            instructions: instructions,
          },
        },
      },
    })

    return createAgent
  }

  return [createAgentService]
}
