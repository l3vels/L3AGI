import { useMutation } from '@apollo/client'
import updateApiKeyGql from '../../gql/apiKey/updateApiKey.gql'

import { ApiKeyInput } from './useCreateApiKeyService'

export const useUpdateApiKeyService = () => {
  const [mutation] = useMutation(updateApiKeyGql)
  const updateApiKey = async (id: string, input: ApiKeyInput) => {
    const { name, description } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          name: name,
          description: description,
        },
      },
    })
    return data
  }

  return [updateApiKey]
}
