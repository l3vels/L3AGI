import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useConfigsService } from 'services/config/useConfigsService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useTeamOfAgentsByIdService } from 'services/teamOfAgents/useTeamOfAgentsByIdService'
import { useUpdateTeamOfAgentsService } from 'services/teamOfAgents/useUpdateTeamOfAgentsService'
import { useTeamOfAgents } from './useTeamOfAgents'

export const useEditTeamOfAgents = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { teamId } = params

  const { refetchTeamOfAgents } = useTeamOfAgents()

  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [updateTeamOfAgents] = useUpdateTeamOfAgentsService()
  const [updateConfig] = useUpdateConfigService()

  const { data: teamOfAgentsById } = useTeamOfAgentsByIdService({ id: teamId || '' })
  const { data: configsData, refetch: refetchConfigs } = useConfigsService()

  const filteredConfig = configsData?.filter((config: any) => config.team_id === teamId) // TODO: filter in backend

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
    teamOfAgents_name: teamOfAgentsById?.name,
    teamOfAgents_description: teamOfAgentsById?.description,
    teamOfAgents_team_type: teamOfAgentsById?.team_type,
    configs: configs || {},
  }

  const handleSubmit = async (values: any) => {
    if (!teamId) return

    setIsLoading(true)

    const updatedTeamOfAgentsValues = {
      name: values.teamOfAgents_name,
      description: values.teamOfAgents_description,
      team_type: values.teamOfAgents_team_type,
    }

    const promises = [
      updateTeamOfAgents(teamId, {
        ...updatedTeamOfAgentsValues,
      }),
    ]

    for (const key in values.configs) {
      const cfg = values.configs[key]

      const value = cfg.key_type === 'int' ? parseInt(cfg.value) : cfg.value

      const promise = updateConfig(cfg.id, {
        key: cfg.key,
        value,
        key_type: cfg.key_type,
        team_id: teamId,
        is_secret: cfg.is_secret,
        is_required: cfg.is_required,
      })

      promises.push(promise)
    }

    await Promise.all(promises)
    await Promise.all([refetchTeamOfAgents(), refetchConfigs()])

    navigate('/team-of-agents')

    setToast({
      message: 'Team was updated!',
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
