import { useMutation } from '@apollo/client'

import createConfigGql from '../../gql/ai/config/createConfig.gql'

export type ConfigInput = {
  key: string
  value: string
  key_type: string
  datasource_id: string
  is_secret: boolean
  is_required: boolean
}

export const useCreateConfigService = () => {
  const [mutation] = useMutation(createConfigGql)

  const createConfigService = async (input: ConfigInput) => {
    const { key, value, key_type, datasource_id, is_secret, is_required } = input

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
          datasource_id: datasource_id,
          agent_id: null,
          tool_id: null,
          project_id: null,
        },
      },
    })

    return createConfig
  }

  return [createConfigService]
}
