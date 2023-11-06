import { useMutation } from '@apollo/client'

import createApiKeyGql from '../../gql/apiKey/createApiKey.gql'

export type ApiKeyInput = {
  name: string
  description: string
}

export const useCreateApiKeyService = () => {
  const [mutation] = useMutation(createApiKeyGql)

  const createApiKeyService = async (input: ApiKeyInput) => {
    const { name, description } = input

    const {
      data: { createApiKey },
    } = await mutation({
      variables: {
        input: {
          name,
          description,
        },
      },
    })

    return createApiKey
  }

  return [createApiKeyService]
}
