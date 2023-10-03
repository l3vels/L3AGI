import { useMutation } from '@apollo/client'
import STOP_CHAT_GQL from '../../gql/chat/stopChat.gql'
import { Nullable } from 'types'

interface Variables {
  input: {
    agent_id: Nullable<string>
    team_id: Nullable<string>
  }
}

interface Data {
  stopChat: Record<string, unknown>
}

const useStopChatService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(STOP_CHAT_GQL)

  const stopChatService = async (variables: Variables) => {
    await mutation({ variables })
  }

  return { stopChatService, loading }
}

export default useStopChatService
