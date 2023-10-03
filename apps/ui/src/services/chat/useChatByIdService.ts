import { useQuery } from '@apollo/client'
import chatByIdGql from '../../gql/chat/chatById.gql'

export const useChatByIdService = ({ id }: { id: string }) => {
  const {
    data: { chatById } = {},
    error,
    loading,
    refetch,
  } = useQuery(chatByIdGql, {
    variables: { id },
    skip: !id,
  })

  return {
    data: chatById,
    error,
    loading,
    refetch,
  }
}
