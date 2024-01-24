import { useMutation } from '@apollo/client'

import { Nullable } from 'types'
import CREATE_CHAT_GQL from '../../gql/chat/createChat.gql'

export interface CreateChatInput {
  name?: string
  agent_id?: string
  team_id?: string
}

export const useCreateChatService = () => {
  const [mutation] = useMutation(CREATE_CHAT_GQL)

  const createChatService = async (input: CreateChatInput) => {
    const { name, agent_id, team_id } = input

    const {
      data: { createChat },
    } = await mutation({
      variables: {
        input: {
          name: name || 'Chat Name',
          agent_id,
          team_id,
        },
      },
    })

    return createChat
  }

  return [createChatService]
}
