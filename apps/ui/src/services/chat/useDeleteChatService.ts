import { useMutation } from '@apollo/client'
import deleteChatGql from '../../gql/chat/deleteChat.gql'

export const useDeleteChatService = () => {
  const [mutation, { loading }] = useMutation(deleteChatGql)

  const deleteChat = async (id: string) => {
    const { data } = await mutation({ variables: { id } })
    const deleteChat = data?.deleteChat || { message: '', success: false }
    return deleteChat
  }

  return { deleteChat, loading }
}
