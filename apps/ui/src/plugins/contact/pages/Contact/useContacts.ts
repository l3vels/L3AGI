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

export const useContacts = () => {
  const { data: contacts, refetch: refetchContacts } = useContactsService()

  const { setToast } = useContext(ToastContext)

  const { openModal, closeModal } = useModal()

  const { deleteContactById } = useDeleteContactByIdService()

  const [createCallService] = useCreateCallService()
  const [endCallService] = useEndCallService()

  const [conversationId, setConversationId] = useState<string>()

  const config: SelfHostedConversationConfig = {
    backendUrl: `${import.meta.env.REACT_APP_PR_SERVICES_WS_URL}/conversation`,
    audioDeviceConfig: {},
    conversationId,
  }

  const {
    status,
    start,
    stop,
    error,
    analyserNode,
    transcripts,
    currentSpeaker,
    toggleActive,
    active,
  } = useConversation(config)

  useEffect(() => {
    if (!conversationId) return

    start()
  }, [conversationId])

  useEffect(() => {
    if (!error) return

    setToast({
      message: error.message,
      type: 'negative',
      open: true,
    })
  }, [error, setToast])

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
    const callType = input.type

    try {
      const data = await createCallService({
        ...input,
        type: callType,
      })

      if (!data) {
        throw new Error('Failed to create call!')
      } else if (data && callType === 'outbound') {
        setToast({
          message: 'Call Started!',
          type: 'positive',
          url: `/sessions?chat=${data.chat_id}`,
          linkLabel: 'Go to Thread',
          open: true,
        })
      }

      if (callType === 'browser') {
        setConversationId(data.chat_id)
      }
    } catch (e) {
      setConversationId(undefined)

      let message = 'Something went wrong!'

      if (e instanceof ApolloError) {
        // @ts-expect-error result is not defined in networkError
        message = e.networkError?.result?.detail || message
      }

      setToast({
        message,
        type: 'negative',
        open: true,
      })
    }
  }

  const handleEndCall = useCallback(async () => {
    const sessionId = conversationId
    setConversationId(undefined)

    await stop()
    await endCallService()

    if (sessionId === undefined) {
      setToast({
        message: `Call cancelled!`,
        type: 'positive',
        open: true,
      })
    } else {
      setToast({
        message: `Call Ended!`,
        url: `/sessions?chat=${sessionId}`,
        linkLabel: 'Go to Thread',
        type: 'positive',
        open: true,
      })
    }
  }, [status, setToast])

  return {
    contacts,
    deleteContactHandler,
    handleCall,
    handleEndCall,
    status,
    currentSpeaker,
    toggleActive,
    active,
    error,
    transcripts,
  }
}
