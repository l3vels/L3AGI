import { useMutation } from '@apollo/client'
import updateAgentGql from '../../gql/ai/agent/updateAgent.gql'

import { AgentInput } from './useCreateAgentService'

export const useUpdateAgentService = () => {
  const [mutation] = useMutation(updateAgentGql)
  const updateAgent = async (id: string, input: AgentInput) => {
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
    } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          agent: {
            name: name,
            description: description,
            role: role,
            is_template: is_template,
            is_memory: is_memory,
            avatar: avatar,
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
            source_flow
          },
        },
      },
    })
    return data
  }

  return [updateAgent]
}
