import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useCreateDatasourceService } from 'services/datasource/useCreateDatasourceService'
import { useDataLoadersService } from 'services/datasource/useDataLoadersService'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import { datasourceValidationSchema } from 'utils/validationsSchema'

export const useCreateDatasource = ({
  createCallback,
}: {
  createCallback?: (id: string) => void
}) => {
  const navigate = useNavigate()
  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const { refetch: refetchDatasources } = useDatasourcesService()

  const [createDatasource] = useCreateDatasourceService()
  const [createConfig] = useCreateConfigService()

  const { data: dataLoaders } = useDataLoadersService()

  const initialValues = {
    datasource_name: '',
    datasource_description: '',
    datasource_source_type: 'File',
    configs: {},
    files: [],
    index_type: 'vector_store',
    response_mode: 'compact',
    vector_store: 'zep',
    chunk_size: '1024',
    similarity_top_k: '2',
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: datasourceValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  const source_type = formik.values.datasource_source_type

  const { setFieldValue } = formik

  useEffect(() => {
    if (!dataLoaders) return

    const loader = dataLoaders.find((loader: any) => loader.source_type === source_type)
    if (!loader) return

    const { fields } = loader

    const configs: any = {}

    fields.forEach((field: any) => {
      configs[field.key] = {
        key: field.key,
        key_type: field.type,
        value: '',
        is_secret: field.is_secret,
        is_required: field.is_required,
      }
    })

    setFieldValue('configs', configs)
  }, [setFieldValue, source_type, dataLoaders])

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const datasourceInput = {
        name: values.datasource_name,
        description: values.datasource_description,
        source_type: values.datasource_source_type,
      }

      const datasource = await createDatasource(datasourceInput)

      const promises = []

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

        const promise = createConfig({
          key: cfg.key,
          value,
          key_type: cfg.key_type,
          datasource_id: datasource.id,
          is_secret: cfg.is_secret,
          is_required: cfg.is_required,
        })

        promises.push(promise)
      }

      await Promise.all(promises)

      await refetchDatasources()
      setToast({
        message: 'New Datasource was Created!',
        type: 'positive',
        open: true,
      })
      if (createCallback) createCallback(datasource.id)
      else navigate(`/datasources/${datasource.id}/edit-datasource`)
    } catch (e) {
      setToast({
        message: 'Failed To Add Datasource!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  return {
    formik,
    isLoading,
    handleSubmit,
  }
}
