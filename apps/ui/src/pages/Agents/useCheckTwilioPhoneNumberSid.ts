import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { Dispatch, SetStateAction, useContext } from 'react'
import { useCheckTwilioPhoneNumberSidService } from 'services/agent/useCheckTwilioPhoneNumberSidService'
import { Nullable } from 'types'

export const useCheckTwilioPhoneNumberSid = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>
}) => {
  const [checkTwilioPhoneNumberSidService] = useCheckTwilioPhoneNumberSidService()
  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()

  const confirmationHandler = (label: string, handler: Function) => {
    openModal({
      name: 'twilio-phone-number-sid-modal',
      data: {
        saveItem: async () => {
          try {
            await handler()
            closeModal('twilio-phone-number-sid-modal')

            setToast({
              message: 'Agent was saved!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to save Agent!',
              type: 'negative',
              open: true,
            })
            closeModal('twilio-phone-number-sid-modal')
          }
        },
        label,
      },
    })
  }

  const checkTwilioPhoneNumberSid = async (
    sid: string,
    agentId: Nullable<string | undefined>,
    onConfirmation: () => Promise<void>,
  ) => {
    const data = await checkTwilioPhoneNumberSidService({
      sid,
      agent_id: agentId,
    })

    if (!data) {
      setToast({
        message: 'Could not check Twilio phone number SID!',
        type: 'negative',
        open: true,
      })

      setIsLoading(false)
      return
    }

    if (data.agent_name) {
      setIsLoading(false)

      confirmationHandler(
        `This Twilio phone number SID is already being used by ${data.agent_name}! Would you like to save and overwrite?`,
        onConfirmation,
      )
    } else {
      await onConfirmation()
    }
  }

  return {
    checkTwilioPhoneNumberSid,
  }
}
