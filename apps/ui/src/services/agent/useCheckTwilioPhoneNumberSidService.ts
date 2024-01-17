import { useMutation } from '@apollo/client'

import CHECK_TWILIO_PHONE_NUMBER_SID_GQL from '../../gql/ai/agent/checkTwilioPhoneNumberSid.gql'
import { Nullable } from 'types'

export type CheckTwilioPhoneNumberSidInput = {
  sid: string
  agent_id?: Nullable<string>
}

export type CheckTwilioPhoneNumberSidData = {
  checkTwilioPhoneNumberSid: {
    agent_name: Nullable<string>
  }
}

export const useCheckTwilioPhoneNumberSidService = () => {
  const [mutation] = useMutation<CheckTwilioPhoneNumberSidData>(CHECK_TWILIO_PHONE_NUMBER_SID_GQL)

  const checkTwilioPhoneNumberSid = async (input: CheckTwilioPhoneNumberSidInput) => {
    const { data } = await mutation({
      variables: {
        input,
      },
    })

    return data?.checkTwilioPhoneNumberSid
  }

  return [checkTwilioPhoneNumberSid]
}
