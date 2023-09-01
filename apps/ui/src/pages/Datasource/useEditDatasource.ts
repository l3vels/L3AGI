import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useConfigsService } from 'services/config/useConfigsService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useDatasourceByIdService } from 'services/datasource/useDatasourceByIdService'
import { useUpdateDatasourceService } from 'services/datasource/useUpdateDatasourceService'
import { useDatasource } from './useDatasource'

export const useEditDatasource = () => {
  const params = useParams()
  const { datasourceId } = params

  const { refetchDatasources } = useDatasource()

  const { closeModal } = useModal()
  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [updateDatasource] = useUpdateDatasourceService()
  const [updateConfig] = useUpdateConfigService()

  const { data: datasourceById } = useDatasourceByIdService({ id: datasourceId || '' })
  const { data: configsData } = useConfigsService()

  const filteredConfig = configsData?.filter((config: any) => config.datasource_id === datasourceId)

  const defaultValues = {
    datasource_name: datasourceById?.name,
    datasource_description: datasourceById?.description,
    datasource_source_type: datasourceById?.source_type,
    config_key: filteredConfig[0]?.key,
    config_value: filteredConfig[0]?.value,
    config_key_type: filteredConfig[0]?.key_type,
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    const updatedDatasourceValues = {
      name: values.datasource_name,
      description: values.datasource_description,
      source_type: values.datasource_source_type,
    }
    const updatedConfigData = {
      key: values.config_key,
      value: values.config_value,
      key_type: values.config_key_type,
      datasource_id: datasourceById,
    }
    await updateDatasource(datasourceId || '', {
      ...updatedDatasourceValues,
    })
    await updateConfig(filteredConfig[0]?.id, {
      ...updatedConfigData,
    })
    await refetchDatasources()

    closeModal('edit-datasource-modal')

    setToast({
      message: 'Datasource was updated!',
      type: 'positive',
      open: true,
    })

    setIsLoading(false)
  }

  const closeEditDatasourceModal = () => {
    closeModal('edit-datasource-modal')
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    closeEditDatasourceModal,
    handleSubmit,

    isLoading,
  }
}
