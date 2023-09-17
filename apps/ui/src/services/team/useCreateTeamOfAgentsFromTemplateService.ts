import { useMutation } from '@apollo/client'

import createTeamOfAgentsFromTemplateGql from '../../gql/ai/teamOfAgents/createTeamOfAgentsFromTemplate.gql'

export const useCreateTeamOfAgentsFromTemplateService = () => {
  const [mutation] = useMutation(createTeamOfAgentsFromTemplateGql)

  const createTeamOfAgentsFromTemplateService = async ({ id }: { id: string }) => {
    const {
      data: { createTeamOfAgentsFromTemplate },
    } = await mutation({
      variables: {
        id: id,
      },
    })

    return createTeamOfAgentsFromTemplate
  }

  return [createTeamOfAgentsFromTemplateService]
}
