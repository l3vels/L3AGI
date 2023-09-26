import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateConfigService } from 'services/config/useCreateConfigService'
import { useCreateTeamOfAgentsService } from 'services/team/useCreateTeamOfAgentsService'
import { useTeamTypesService } from 'services/team/useTeamTypesService'
import { useTeamOfAgentsService } from 'services/team/useTeamOfAgentsService'

export const useCreateTeamOfAgents = () => {
  const navigate = useNavigate()
  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const { refetch: refetchTeamOfAgents } = useTeamOfAgentsService()

  const [createTeamOfAgents] = useCreateTeamOfAgentsService()
  const [createConfig] = useCreateConfigService()

  const { data: teamTypes } = useTeamTypesService()

  const initialValues = {
    teamOfAgents_name: '',
    teamOfAgents_description: '',
    teamOfAgents_team_type: 'Plan and Execute',
    configs: {},
    agents: [],
    is_memory: true,
    // TODO: add agents selected in form
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
  })

  const team_type = formik.values.teamOfAgents_team_type

  const { setFieldValue } = formik

  useEffect(() => {
    if (!teamTypes) return

    const loader = teamTypes.find((loader: any) => loader.team_type === team_type)
    if (!loader) return

    const { fields } = loader

    const configs: any = {}

    fields?.forEach((field: any) => {
      configs[field.key] = {
        key: field.key,
        key_type: field.type,
        value: field.default,
        is_secret: field.is_secret,
        is_required: field.is_required,
      }
    })

    setFieldValue('configs', configs)
  }, [setFieldValue, team_type, teamTypes])

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const teamOfAgentsInput = {
        name: values.teamOfAgents_name,
        description: values.teamOfAgents_description,
        team_type: values.teamOfAgents_team_type,
        team_agents: values.agents.filter((agent: any) => agent?.agent_id),
        is_memory: values.is_memory,
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
          team_id: teamOfAgents.id,
          is_secret: cfg.is_secret,
          is_required: cfg.is_required,
        })

        promises.push(promise)
      }

      await refetchTeamOfAgents()
      setToast({
        message: 'New team was Created!',
        type: 'positive',
        open: true,
      })
      navigate('/team-of-agents')
    } catch (e) {
      setToast({
        message: 'Failed To Add Team!',
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
