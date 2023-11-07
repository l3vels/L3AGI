import { useQuery } from '@apollo/client'
import integrationsGql from '../../gql/ai/integration/integrations.gql'

export const useIntegrationsToolService = () => {
  const { data, error, loading, refetch } = useQuery(integrationsGql)

  return {
    data: data?.getIntegrations || [],
    error,
    loading,
    refetch,
  }
}
