import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useCreateDatasourceService } from 'services/datasource/useCreateDatasourceService'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import { useDeleteDatasourcetByIdService } from 'services/datasource/useDeleteDatasourceById'

export const useDatasource = () => {
  const { setToast } = useContext(ToastContext)

  const [createDatasource] = useCreateDatasourceService()
  const { data: datasources, refetch: refetchDatasources } = useDatasourcesService()
  const { deleteDatasourceById } = useDeleteDatasourcetByIdService()

  const [createConfig] = useCreateConfigService()

  const [isLoading, setIsLoading] = useState(false)

  const { openModal, closeModal } = useModal()

  const openDatasourceModal = () => {
    openModal({ name: 'create-datasource-modal' })
  }

  const closeDatasourceModal = () => {
    closeModal('create-datasource-modal')
  }

  const openEditDatasourceModal = (datasource: any) => {
    openModal({
      name: 'edit-datasource-modal',
      data: {
        datasource: datasource,
        closeModal: () => closeModal('edit-datasource-modal'),
      },
    })
  }

  const initialValues = {
    datasource_name: '',
    datasource_description: '',
    datasource_source_type: '',
    config_key: '',
    config_value: '',
    config_key_type: '',
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const datasourceInput = {
        name: values.datasource_name,
        description: values.datasource_description,
        source_type: values.datasource_source_type,
      }

      const datasourceRes = await createDatasource(datasourceInput)

      const configInput = {
        key: values.config_key,
        value: values.config_value,
        key_type: values.config_key_type,
        datasource_id: datasourceRes.id,
      }
      await createConfig(configInput)

      await refetchDatasources()
      setToast({
        message: 'New Datasource was Created!',
        type: 'positive',
        open: true,
      })
      closeDatasourceModal()
    } catch (e) {
      console.log('rrorr', e)
      closeDatasourceModal()

      setToast({
        message: 'Failed to create Datasource!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    // validationSchema: gameValidationSchema,
    // enableReinitialize: true,
  })

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
        closeModal: () => {
          closeModal('delete-confirmation-modal')
        },
        label: 'Delete Datasource?',
        title: 'Delete Datasource?',
      },
    })
  }

  return {
    datasources,
    openDatasourceModal,
    closeDatasourceModal,
    handleSubmit,
    formik,
    isLoading,
    deleteDatasourceHandler,

    openEditDatasourceModal,
    refetchDatasources,
  }
}
