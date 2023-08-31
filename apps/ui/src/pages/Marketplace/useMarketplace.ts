import { useAgentsService } from 'services/agent/useAgentsService'
import { useMarketplaceAgentsService } from 'services/marketplace/useMarketplaceAgentsService'

export const useMarketplace = () => {
  const { data: marketplaceAgents } = useMarketplaceAgentsService()

  const { systemAgents, templateAgents } = marketplaceAgents

  return {
    systemAgents,
    templateAgents,
  }
}
