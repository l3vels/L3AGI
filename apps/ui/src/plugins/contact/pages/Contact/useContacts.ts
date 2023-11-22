import { ApolloError } from '@apollo/client'
import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useCreateCallService } from 'plugins/contact/services/call/useCreateCallService'
import { useEndCallService } from 'plugins/contact/services/call/useEndCallService'
import { useContactsService } from 'plugins/contact/services/contact/useContactsService'
import { useDeleteContactByIdService } from 'plugins/contact/services/contact/useDeleteContactService'
import { useContext } from 'react'

export const useContacts = () => {
  const { data: contacts, refetch: refetchContacts } = useContactsService()

  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()

  const { deleteContactById } = useDeleteContactByIdService()

  const [createCallService] = useCreateCallService()
  const [endCallService] = useEndCallService()

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

  const handleCall = async (input: any) => {
    setToast({
      message: 'Call Started!',
      type: 'positive',
      open: true,
    })

    try {
      await createCallService(input)
    } catch (e) {
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

  const handleEndCall = async () => {
    await endCallService()

    setToast({
      message: 'Call Ended!',
      type: 'positive',
      open: true,
    })
  }

  return {
    contacts,
    deleteContactHandler,
    handleCall,
    handleEndCall,
  }
}
