import { useMutation } from '@apollo/client'
import updateTeamOfAgentsGql from '../../gql/ai/teamOfAgents/updateTeamOfAgents.gql'

import { TeamOfAgentsInput } from './useCreateTeamOfAgentsService'

export const useUpdateTeamOfAgentsService = () => {
  const [mutation] = useMutation(updateTeamOfAgentsGql)
  const updateTeamOfAgents = async (id: string, input: TeamOfAgentsInput) => {
    const { name, description, source_type } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          name: name,
          description: description,
          source_type: source_type,
        },
      },
    })
    return data
  }

  return [updateTeamOfAgents]
}
