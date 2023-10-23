import { useMutation } from '@apollo/client'

import CREATE_CONTACT_GQL from '../../gql/contact/createContact.gql'

export interface ContactInput {
  name: string
  description: string
  group_id: string
  email: string
  phone: string
}

export const useCreateContactService = () => {
  const [mutation] = useMutation(CREATE_CONTACT_GQL)

  const createContactService = async (input: ContactInput) => {
    const { name, description, group_id, email, phone } = input

    const {
      data: { createContact },
    } = await mutation({
      variables: {
        input: {
          name,
          description,
          group_id,
          email,
          phone,
        },
      },
    })

    return createContact
  }

  return [createContactService]
}
