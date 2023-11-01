import { useMutation } from '@apollo/client'

import createConfigGql from '../../gql/ai/config/createConfig.gql'

export type ConfigInput = {
  key: string
  value: string
  key_type: string
  datasource_id?: string
  tool_id?: string
  voice_id?: string
  team_id?: string
  is_secret: boolean
  is_required: boolean
}

export const useCreateConfigService = () => {
  const [mutation] = useMutation(createConfigGql)

  const createConfigService = async (input: ConfigInput) => {
    const {
      key,
      value,
      key_type,
      datasource_id,
      team_id,
      is_secret,
      is_required,
      tool_id,
      voice_id,
    } = input

    const {
      data: { createConfig },
    } = await mutation({
      variables: {
        input: {
          key,
          value,
          key_type,
          is_secret,
          is_required,
          datasource_id,
          team_id,
          agent_id: null,
          toolkit_id: tool_id,
          voice_id,
          workspace_id: null,
        },
      },
    })

    return createConfig
  }

  return [createConfigService]
}
