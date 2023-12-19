import { useMutation } from '@apollo/client'

import CREATE_CALL_GQL from '../../gql/call/createCall.gql'

export interface CreateCallInput {
  agent_id: string
  contact_id: string
  type: 'browser' | 'outbound'
}

type CreateCallServiceData = {
  createCall: {
    chat_id: string
    message: string
  }
}

export const useCreateCallService = () => {
  const [mutation] = useMutation<CreateCallServiceData>(CREATE_CALL_GQL)

  const createCallService = async (input: CreateCallInput) => {
    const { data } = await mutation({
      variables: {
        input,
      },
    })

    return data?.createCall
  }

  return [createCallService]
}
