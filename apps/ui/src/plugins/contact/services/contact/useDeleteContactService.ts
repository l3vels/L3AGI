import { useMutation } from '@apollo/client'
import DELETE_CONTACT_GQL from '../../gql/contact/deleteContact.gql'

export const useDeleteContactByIdService = () => {
  const [mutation, { loading }] = useMutation(DELETE_CONTACT_GQL)

  const deleteContactById = async (id: string) => {
    const { data } = await mutation({ variables: { id } })
    const deleteContact = data?.deleteContact || { message: '', success: false }
    return deleteContact
  }

  return { deleteContactById, loading }
}
