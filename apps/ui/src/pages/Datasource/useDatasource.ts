import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useContext } from 'react'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import { useDeleteDatasourcetByIdService } from 'services/datasource/useDeleteDatasourceById'

export const useDatasource = () => {
  const { setToast } = useContext(ToastContext)

  const { data: datasources, refetch: refetchDatasources } = useDatasourcesService()
  const { deleteDatasourceById } = useDeleteDatasourcetByIdService()

  const { openModal, closeModal } = useModal()

  const deleteDatasourceHandler = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteDatasourceById(id)
            await refetchDatasources()
            closeModal('delete-confirmation-modal')
            setToast({
              message: 'Datasource was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete Datasource!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete Datasource?',
      },
    })
  }

  return {
    datasources,
    deleteDatasourceHandler,
    refetchDatasources,
  }
}
