import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useConfigsService } from 'services/config/useConfigsService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useDatasourceByIdService } from 'services/datasource/useDatasourceByIdService'
import { useUpdateDatasourceService } from 'services/datasource/useUpdateDatasourceService'
import { datasourceValidationSchema } from 'utils/validationsSchema'
import { useDatasource } from './useDatasource'

export const useEditDatasource = ({ incomingDatasourceId }: { incomingDatasourceId?: string }) => {
  const navigate = useNavigate()
  const params = useParams()
  const datasourceId = params?.datasourceId || incomingDatasourceId

  const { refetchDatasources } = useDatasource()

  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [updateDatasource] = useUpdateDatasourceService()
  const [updateConfig] = useUpdateConfigService()

  const { data: datasourceById } = useDatasourceByIdService({ id: datasourceId || '' })
  const { data: configsData, refetch: refetchConfigs } = useConfigsService()

  const filteredConfig = configsData?.filter((config: any) => config.datasource_id === datasourceId) // TODO: filter in backend

  const defaultValues = {
    datasource_name: datasourceById?.name,
    datasource_description: datasourceById?.description,
    datasource_source_type: datasourceById?.source_type,
    configs: {},
    index_type: '',
    response_mode: '',
    vector_store: '',
    chunk_size: '',
    similarity_top_k: '',
    files: [],
  }

  const configs = filteredConfig?.reduce((prev: any, config: any) => {
    let value = config.value

    if (config.key_type === 'files') {
      const { index_type, response_mode, vector_store, chunk_size, similarity_top_k, files } =
        JSON.parse(config.value)

      defaultValues.index_type = index_type
      defaultValues.response_mode = response_mode
      defaultValues.vector_store = vector_store
      defaultValues.chunk_size = chunk_size
      defaultValues.similarity_top_k = similarity_top_k
      defaultValues.files = files

      value = JSON.parse(config.value)
    }

    prev[config.key] = {
      id: config.id,
      key: config.key,
      key_type: config.key_type,
      value,
      is_secret: config.is_secret,
      is_required: config.is_required,
    }

    return prev
  }, {})

  defaultValues.configs = configs || {}

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

      let value = cfg.value

      if (cfg.key_type === 'int') {
        value = parseInt(cfg.value)
      } else if (cfg.key_type === 'files') {
        const { index_type, response_mode, vector_store, chunk_size, similarity_top_k, files } =
          values
        value = JSON.stringify({
          index_type,
          response_mode,
          vector_store,
          chunk_size: parseInt(chunk_size),
          similarity_top_k: parseInt(similarity_top_k),
          files,
        })
      }

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

    if (!incomingDatasourceId) navigate('/datasources')

    setToast({
      message: 'Datasource was updated!',
      type: 'positive',
      open: true,
    })

    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: datasourceValidationSchema,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    handleSubmit,
    isLoading,
  }
}
