import { useMutation } from '@apollo/client'

import createConfigGql from '../../gql/ai/config/createConfig.gql'

export type ConfigInput = {
  key: string
  value: string
  key_type: string
  datasource_id: string
}

export const useCreateConfigService = () => {
  const [mutation] = useMutation(createConfigGql)

  const createConfigService = async (input: ConfigInput) => {
    const { key, value, key_type, datasource_id } = input

    const {
      data: { createConfig },
    } = await mutation({
      variables: {
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

    return createConfig
  }

  return [createConfigService]
}
