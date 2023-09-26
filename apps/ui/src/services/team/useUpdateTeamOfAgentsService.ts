import { useMutation } from '@apollo/client'
import updateTeamOfAgentsGql from '../../gql/ai/teamOfAgents/updateTeamOfAgents.gql'

import { TeamOfAgentsInput } from './useCreateTeamOfAgentsService'

export const useUpdateTeamOfAgentsService = () => {
  const [mutation] = useMutation(updateTeamOfAgentsGql)
  const updateTeamOfAgents = async (id: string, input: TeamOfAgentsInput) => {
    const { name, description, team_type, team_agents, is_memory } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          name: name,
          description: description,
          team_type: team_type,
          team_agents,
          is_memory,
        },
      },
    })
    return data
  }

  return [updateTeamOfAgents]
}
