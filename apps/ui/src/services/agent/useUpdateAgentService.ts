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

      synthesizer,
      default_voice,
      voice_id,
      transcriber,
      response_mode,
      input_mode,

      agent_type,
      integrations,
      runners,
      sentiment_analyzer,
      twilio_phone_number_sid,
    } = input

    const { data } = await mutation({
      variables: {
        id,
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
    return data
  }

  return [updateAgent]
}
