import { useMutation } from '@apollo/client'

import { Nullable } from 'types'
import CREATE_CHAT_WIDGET_GQL from '../../gql/chat/createChatWidget.gql'
import { CreateChatInput } from './useCreateChat'

export const useCreateChatWidgetService = () => {
  const [mutation] = useMutation(CREATE_CHAT_WIDGET_GQL)

  const createChatWidgetService = async (input: CreateChatInput) => {
    const { name, agent_id, team_id } = input

    const {
      data: { createChatWidget },
    } = await mutation({
      variables: {
        input: {
          name: name || 'Chat Name',
          agent_id,
          team_id,
        },
      },
    })

    return createChatWidget
  }

  return [createChatWidgetService]
}
