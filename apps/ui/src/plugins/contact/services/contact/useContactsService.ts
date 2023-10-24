import { useQuery } from '@apollo/client'
import CONTACTS_GQL from '../../gql/contact/contacts.gql'

export const useContactsService = () => {
  const { data, error, loading, refetch } = useQuery(CONTACTS_GQL)

  return {
    data: data?.getContacts || [],
    error,
    loading,
    refetch,
  }
}
