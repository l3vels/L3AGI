import { useQuery } from '@apollo/client'
import FINE_TUNING_BY_ID_GQL from '../../gql/ai/fineTuning/fineTuningById.gql'

export const useFineTuningByIdService = ({ id }: { id: string }) => {
  const {
    data: { fineTuningById } = {},
    error,
    loading,
    refetch,
  } = useQuery(FINE_TUNING_BY_ID_GQL, {
    variables: { id },
    skip: !id,
  })

  return {
    data: fineTuningById,
    error,
    loading,
    refetch,
  }
}
