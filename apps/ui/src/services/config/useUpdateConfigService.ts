import { useMutation } from '@apollo/client'
import updateConfigGql from '../../gql/ai/config/updateConfig.gql'

import { ConfigInput } from './useCreateConfigService'

export const useUpdateConfigService = () => {
  const [mutation] = useMutation(updateConfigGql)
  const updateConfig = async (id: string, input: ConfigInput) => {
    const { key, value, key_type, datasource_id } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          key: key,
          value: value,
          key_type: key_type,
          is_secret: true,
          is_required: false,
          agent_id: null,
          tool_id: null,
          datasource_id: datasource_id,
          project_id: null,
        },
      },
    })
    return data
  }

  return [updateConfig]
}
