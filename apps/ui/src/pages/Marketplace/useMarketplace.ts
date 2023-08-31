import { useAgentsService } from 'services/agent/useAgentsService'

export const useMarketplace = () => {
  const { data: agentsData, refetch: refetchAgents } = useAgentsService()

  return {
    agentsData,
  }
}
