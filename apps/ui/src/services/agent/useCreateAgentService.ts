import { useMutation } from '@apollo/client'

import createAgentGql from '../../gql/ai/agent/createAgent.gql'

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
      model,
      is_memory,
      suggestions,
      greeting,
      text,
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
            is_memory: is_memory,
          },
          configs: {
            goals: goals,
            constraints: constraints,
            tools: tools,
            datasources: datasources,
            model,
            temperature: temperature,
            instructions: instructions,
            suggestions: suggestions,
            greeting: greeting,
            text: text,
          },
        },
      },
    })

    return createAgent
  }

  return [createAgentService]
}
