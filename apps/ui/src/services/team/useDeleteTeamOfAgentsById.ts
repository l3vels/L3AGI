import { useMutation } from '@apollo/client'
import deleteTeamOfAgentsByIdGql from '../../gql/ai/teamOfAgents/deleteTeamOfAgents.gql'

export const useDeleteTeamOfAgentstByIdService = () => {
  const [mutation, { loading }] = useMutation(deleteTeamOfAgentsByIdGql)

  const deleteTeamOfAgentsById = async (id: string) => {
    const { data } = await mutation({ variables: { id } })
    const deleteTeamOfAgents = data?.deleteTeamOfAgents || { message: '', success: false }
    return deleteTeamOfAgents
  }

  return { deleteTeamOfAgentsById, loading }
}
