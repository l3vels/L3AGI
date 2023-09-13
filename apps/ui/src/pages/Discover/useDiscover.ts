import { useDiscoverAgentsService } from 'services/discover/useDiscoverAgentsService'

export const useDiscover = () => {
  const { data: discoverAgents } = useDiscoverAgentsService()

  const { systemAgents, templateAgents } = discoverAgents

  return {
    systemAgents,
    templateAgents,
  }
}
