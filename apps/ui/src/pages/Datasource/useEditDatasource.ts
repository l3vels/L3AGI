import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useConfigsService } from 'services/config/useConfigsService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useDatasourceByIdService } from 'services/datasource/useDatasourceByIdService'
import { useUpdateDatasourceService } from 'services/datasource/useUpdateDatasourceService'
import { useDatasource } from './useDatasource'

export const useEditDatasource = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { datasourceId } = params

  const { refetchDatasources } = useDatasource()

  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [updateDatasource] = useUpdateDatasourceService()
  const [updateConfig] = useUpdateConfigService()

  const { data: datasourceById } = useDatasourceByIdService({ id: datasourceId || '' })
  const { data: configsData, refetch: refetchConfigs } = useConfigsService()

  const filteredConfig = configsData?.filter((config: any) => config.datasource_id === datasourceId) // TODO: filter in backend

  const configs = filteredConfig?.reduce((prev: any, config: any) => {
    prev[config.key] = {
      id: config.id,
      key: config.key,
      key_type: config.key_type,
      value: config.value,
      is_secret: config.is_secret,
      is_required: config.is_required,
    }

    return prev
  }, {})

  const defaultValues = {
    datasource_name: datasourceById?.name,
    datasource_description: datasourceById?.description,
    datasource_source_type: datasourceById?.source_type,
    configs: configs || {},
  }

  const handleSubmit = async (values: any) => {
    if (!datasourceId) return

    setIsLoading(true)

    const updatedDatasourceValues = {
      name: values.datasource_name,
      description: values.datasource_description,
      source_type: values.datasource_source_type,
    }

    const promises = [
      updateDatasource(datasourceId, {
        ...updatedDatasourceValues,
      }),
    ]

    for (const key in values.configs) {
      const cfg = values.configs[key]

      const value = cfg.key_type === 'int' ? parseInt(cfg.value) : cfg.value

      const promise = updateConfig(cfg.id, {
        key: cfg.key,
        value,
        key_type: cfg.key_type,
        datasource_id: datasourceId,
        is_secret: cfg.is_secret,
        is_required: cfg.is_required,
      })

      promises.push(promise)
    }

    await Promise.all(promises)
    await Promise.all([refetchDatasources(), refetchConfigs()])

    navigate('/datasources')

    setToast({
      message: 'Datasource was updated!',
      type: 'positive',
      open: true,
    })

    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    handleSubmit,
    isLoading,
  }
}
