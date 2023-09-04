import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useCreateDatasourceService } from 'services/datasource/useCreateDatasourceService'
import { useDataLoadersService } from 'services/datasource/useDataLoadersService'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'

export const useCreateDatasource = () => {
  const navigate = useNavigate()
  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const { refetch: refetchDatasources } = useDatasourcesService()

  const [createDatasource] = useCreateDatasourceService()
  const [createConfig] = useCreateConfigService()

  const { data: dataLoaders } = useDataLoadersService()

  console.log(dataLoaders)

  const initialValues = {
    datasource_name: '',
    datasource_description: '',
    datasource_source_type: 'Postgres',
    configs: {},
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
  })

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const datasourceInput = {
        name: values.datasource_name,
        description: values.datasource_description,
        source_type: values.datasource_source_type,
      }

      const datasource = await createDatasource(datasourceInput)

      console.log({ datasource, values })

      const promises = []

      for (const key in values.configs) {
        const cfg = values.configs[key]

        const value = cfg.key_type === 'int' ? parseInt(cfg.value) : cfg.value

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

      await refetchDatasources()
      setToast({
        message: 'New Datasource was Created!',
        type: 'positive',
        open: true,
      })
      navigate('/datasources')
    } catch (e) {
      setToast({
        message: 'Failed to create Datasource!',
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
