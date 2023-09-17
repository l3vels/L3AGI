import { useMutation } from '@apollo/client'

import createAgentFromTemplateGql from '../../gql/ai/agent/createAgentFromTemplate.gql'

export const useCreateAgentFromTemplateService = () => {
  const [mutation] = useMutation(createAgentFromTemplateGql)

  const createAgentFromTemplateService = async ({ id }: { id: string }) => {
    const {
      data: { createAgentFromTemplate },
    } = await mutation({
      variables: {
        id: id,
      },
    })

    return createAgentFromTemplate
  }

  return [createAgentFromTemplateService]
}
