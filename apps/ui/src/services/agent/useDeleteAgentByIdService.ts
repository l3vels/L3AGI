import { useMutation } from '@apollo/client'
import deleteAgentByIdGql from '../../gql/ai/agent/deleteAgent.gql'

export const useDeleteAgentByIdService = () => {
  const [mutation, { loading }] = useMutation(deleteAgentByIdGql)

  const deleteAgentById = async (id: string) => {
    const { data } = await mutation({ variables: { id } })
    const deleteAgent = data?.deleteAgent || { message: '', success: false }
    return deleteAgent
  }

  return { deleteAgentById, loading }
}
