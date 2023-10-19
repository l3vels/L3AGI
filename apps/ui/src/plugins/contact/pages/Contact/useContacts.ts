import { useContactsService } from 'services/contact/useContactsService'

import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { useDeleteContactByIdService } from 'services/contact/useDeleteContactService'

export const useContacts = () => {
  const { data: contacts, refetch: refetchContacts } = useContactsService()

  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()

  const { deleteContactById } = useDeleteContactByIdService()

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

  return {
    contacts,
    deleteContactHandler,
  }
}
