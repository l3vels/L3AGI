import { useMutation } from '@apollo/client'

import CREATE_END_CALL_GQL from '../../gql/call/endCall.gql'

export const useEndCallService = () => {
  const [mutation] = useMutation(CREATE_END_CALL_GQL)

  const endCallService = async () => {
    const {
      data: { endCall },
    } = await mutation({
      variables: {
        input: {},
      },
    })

    return endCall
  }

  return [endCallService]
}
