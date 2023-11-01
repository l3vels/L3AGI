import { useMutation } from '@apollo/client'
import updateConfigGql from '../../gql/ai/config/updateConfig.gql'

import { ConfigInput } from './useCreateConfigService'

export const useUpdateConfigService = () => {
  const [mutation] = useMutation(updateConfigGql)
  const updateConfig = async (id: string, input: ConfigInput) => {
    const {
      key,
      value,
      key_type,
      datasource_id,
      is_secret,
      is_required,
      tool_id,
      team_id,
      voice_id,
    } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          key: key,
          value: value,
          key_type: key_type,
          is_secret,
          is_required,
          datasource_id: datasource_id,
          team_id: team_id,
          agent_id: null,
          toolkit_id: tool_id,
          workspace_id: null,
          voice_id,
        },
      },
    })
    return data
  }

  return [updateConfig]
}
