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
      instructions,
      model_version,
      mode_provider,
      is_memory,
      suggestions,
      welcome_text,
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
            suggestions: suggestions,
            welcome_text: welcome_text,
          },
        },
      },
    })
    return data
  }

  return [updateAgent]
}
