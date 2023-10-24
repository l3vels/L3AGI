import { useMutation } from '@apollo/client'
import DELETE_GROUP_GQL from '../../gql/group/deleteGroup.gql'

export const useDeleteGroupByIdService = () => {
  const [mutation, { loading }] = useMutation(DELETE_GROUP_GQL)

  const deleteGroupById = async (id: string) => {
    const { data } = await mutation({ variables: { id } })
    const deleteGroup = data?.deleteGroup || { message: '', success: false }
    return deleteGroup
  }

  return { deleteGroupById, loading }
}
