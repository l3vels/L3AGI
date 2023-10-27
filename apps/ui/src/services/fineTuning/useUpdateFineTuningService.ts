import { useMutation } from '@apollo/client'
import UPDATE_FINE_TUNING_GQL from '../../gql/ai/fineTuning/updateFineTuning.gql'
import { FineTuningInput } from './useCreateFineTuningService'

export const useUpdateFineTuningService = () => {
  const [mutation] = useMutation(UPDATE_FINE_TUNING_GQL)
  const updateFineTuning = async (id: string, input: FineTuningInput) => {
    const { name, file_url, model_id } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          name,
          file_url,
          model_id,
        },
      },
    })
    return data
  }

  return [updateFineTuning]
}
