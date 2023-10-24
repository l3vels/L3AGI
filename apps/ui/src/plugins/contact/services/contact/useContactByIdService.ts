import { useQuery } from '@apollo/client'
import CONTACT_BY_ID_GQL from '../../gql/contact/contactById.gql'

export const useContactByIdService = ({ id }: { id: string }) => {
  const {
    data: { contactById } = {},
    error,
    loading,
    refetch,
  } = useQuery(CONTACT_BY_ID_GQL, {
    variables: { id },
    skip: !id,
  })

  return {
    data: contactById,
    error,
    loading,
    refetch,
  }
}
