import { useQuery } from '@apollo/client'
import MODELS_GQL from '../../gql/ai/model/models.gql'
import { Model } from 'types'

type UseModelsServiceData = {
  models: Model[]
}

export const useModelsService = () => {
  const { data, error, loading, refetch } = useQuery<UseModelsServiceData>(MODELS_GQL)

  return {
    data: data?.models || [],
    error,
    loading,
    refetch,
  }
}
