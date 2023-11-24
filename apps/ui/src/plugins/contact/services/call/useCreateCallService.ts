import { useMutation } from '@apollo/client'

import CREATE_CALL_GQL from '../../gql/call/createCall.gql'

export const useCreateCallService = () => {
  const [mutation] = useMutation(CREATE_CALL_GQL)

  const createCallService = async (input: any) => {
    const { data } = await mutation({
      variables: {
        input,
      },
    })

    return data.createCall
  }

  return [createCallService]
}
