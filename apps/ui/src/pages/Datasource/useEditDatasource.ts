import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useConfigsService } from 'services/config/useConfigsService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useUpdateDatasourceService } from 'services/datasource/useUpdateDatasourceService'
import { useDatasource } from './useDatasource'

export const useEditDatasource = (datasource: any) => {
  const { refetchDatasources } = useDatasource()

  const { closeModal } = useModal()
  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [updateDatasource] = useUpdateDatasourceService()
  const [updateConfig] = useUpdateConfigService()

  const { data: configsData } = useConfigsService()

  const { id, name, description, source_type } = datasource
  const filteredConfig = configsData?.filter((config: any) => config.datasource_id === id)

  const defaultValues = {
    datasource_name: name,
    datasource_description: description,
    datasource_source_type: source_type,
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
      datasource_id: id,
    }
    await updateDatasource(id, {
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
