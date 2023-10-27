import { useMutation } from '@apollo/client'
import DELETE_FINE_TUNING_GQL from '../../gql/ai/fineTuning/deleteFineTuning.gql'

export const useDeleteFineTuningByIdService = () => {
  const [mutation, { loading }] = useMutation(DELETE_FINE_TUNING_GQL)

  const deleteFineTuningById = async (id: string) => {
    const { data } = await mutation({ variables: { id } })
    const deleteFineTuning = data?.deleteFineTuning || { message: '', success: false }
    return deleteFineTuning
  }

  return { deleteFineTuningById, loading }
}
