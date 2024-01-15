import { useQuery } from '@apollo/client'
import DOMAIN_CONFIG_GQL from '../../gql/domainConfig/domainConfig.gql'

export const useDomainConfigService = () => {
  const { data, error, loading, refetch } = useQuery(DOMAIN_CONFIG_GQL)

  return {
    data: data?.getDomainConfig || null,
    error,
    loading,
    refetch,
    fetchPolicy: 'cache-first',
  }
}
