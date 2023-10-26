import { useMutation } from '@apollo/client'

import CREATE_FINE_TUNING from '../../gql/ai/fineTuning/createFineTuning.gql'

export type FineTuningInput = {
  name: string
  file_url: string
}

export const useCreateFineTuningService = () => {
  const [mutation] = useMutation(CREATE_FINE_TUNING)

  const createFineTuningService = async (input: FineTuningInput) => {
    const { name, file_url } = input

    const {
      data: { createFineTuning },
    } = await mutation({
      variables: {
        input: {
          name,
          file_url,
        },
      },
    })

    return createFineTuning
  }

  return [createFineTuningService]
}
