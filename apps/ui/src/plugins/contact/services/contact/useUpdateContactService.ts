import { useMutation } from '@apollo/client'
import UPDATE_CONTACT_GQL from '../../gql/contact/updateContact.gql'
import { ContactInput } from './useCreateContactService'

export const useUpdateContactService = () => {
  const [mutation] = useMutation(UPDATE_CONTACT_GQL)
  const updateContact = async (id: string, input: ContactInput) => {
    const { name, description, group_id, email, phone } = input

    const { data } = await mutation({
      variables: {
        id,
        input: {
          name,
          description,
          group_id,
          email,
          phone,
        },
      },
    })
    return data
  }

  return [updateContact]
}
