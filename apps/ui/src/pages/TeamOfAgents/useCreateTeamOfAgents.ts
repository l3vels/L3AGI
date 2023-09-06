import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useCreateTeamOfAgentsService } from 'services/teamOfAgents/useCreateTeamOfAgentsService'
import { useTeamTypesService } from 'services/teamOfAgents/useTeamTypesService'
import { useTeamOfAgentsService } from 'services/teamOfAgents/useTeamOfAgentsService'

export const useCreateTeamOfAgents = () => {
  const navigate = useNavigate()
  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const { refetch: refetchTeamOfAgents } = useTeamOfAgentsService()

  const [createTeamOfAgents] = useCreateTeamOfAgentsService()
  const [createConfig] = useCreateConfigService()

  const { data: dataLoaders } = useTeamTypesService()

  const initialValues = {
    teamOfAgents_name: '',
    teamOfAgents_description: '',
    teamOfAgents_source_type: 'Postgres',
    configs: {},
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
  })

  const source_type = formik.values.teamOfAgents_source_type

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
      const teamOfAgentsInput = {
        name: values.teamOfAgents_name,
        description: values.teamOfAgents_description,
        source_type: values.teamOfAgents_source_type,
      }

      const teamOfAgents = await createTeamOfAgents(teamOfAgentsInput)

      const promises = []

      for (const key in values.configs) {
        const cfg = values.configs[key]

        const value = cfg.value && cfg.key_type === 'int' ? parseInt(cfg.value) : cfg.value

        const promise = createConfig({
          key: cfg.key,
          value,
          key_type: cfg.key_type,
          teamOfAgents_id: teamOfAgents.id,
          is_secret: cfg.is_secret,
          is_required: cfg.is_required,
        })

        promises.push(promise)
      }

      await refetchTeamOfAgents()
      setToast({
        message: 'New TeamOfAgents was Created!',
        type: 'positive',
        open: true,
      })
      navigate('/teamOfAgents')
    } catch (e) {
      setToast({
        message: 'Failed To Add TeamOfAgents!',
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
