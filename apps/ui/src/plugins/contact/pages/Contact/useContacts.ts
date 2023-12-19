import { useCallback, useContext, useEffect, useState } from 'react'
import { ApolloError } from '@apollo/client'
import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import {
  CreateCallInput,
  useCreateCallService,
} from 'plugins/contact/services/call/useCreateCallService'
import { useEndCallService } from 'plugins/contact/services/call/useEndCallService'
import { useContactsService } from 'plugins/contact/services/contact/useContactsService'
import { useDeleteContactByIdService } from 'plugins/contact/services/contact/useDeleteContactService'
import { useConversation, SelfHostedConversationConfig } from 'vocode'

const WS_URL = 'ws://localhost:7000/conversation'

export const useContacts = () => {
  const { data: contacts, refetch: refetchContacts } = useContactsService()

  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()

  const { deleteContactById } = useDeleteContactByIdService()

  const [createCallService] = useCreateCallService()
  const [endCallService] = useEndCallService()

  const [conversationId, setConversationId] = useState<string>()

  const config: SelfHostedConversationConfig = {
    backendUrl: WS_URL,
    audioDeviceConfig: {},
    conversationId,
  }

  const { status, start, stop, error } = useConversation(config)

  useEffect(() => {
    if (!conversationId) return

    start()
  }, [conversationId])

  const deleteContactHandler = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteContactById(id)
            await refetchContacts()
            closeModal('delete-confirmation-modal')
            setToast({
              message: 'Contact was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete Contact!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete Contact?',
      },
    })
  }

  const handleCall = async (input: CreateCallInput) => {
    // TODO: choose call type from UI
    const callType = 'browser' // or 'outbound'

    setToast({
      message: 'Call Started!',
      type: 'positive',
      open: true,
    })

    try {
      const data = await createCallService({
        ...input,
        type: callType,
      })

      if (!data) {
        throw new Error('Failed to create call!')
      }

      if (callType === 'browser') {
        setConversationId(data.chat_id)
      }
    } catch (e) {
      setConversationId(undefined)

      if (e instanceof ApolloError) {
        // @ts-expect-error result is not defined in networkError
        const message = e.networkError?.result?.detail || 'Something went wrong!'

        setToast({
          message,
          type: 'negative',
          open: true,
        })
      }
    }
  }

  const handleEndCall = useCallback(async () => {
    setConversationId(undefined)

    if (status !== 'idle') {
      stop()
    } else {
      await endCallService()
    }

    setToast({
      message: 'Call Ended!',
      type: 'positive',
      open: true,
    })
  }, [status, setToast])

  return {
    contacts,
    deleteContactHandler,
    handleCall,
    handleEndCall,
  }
}
