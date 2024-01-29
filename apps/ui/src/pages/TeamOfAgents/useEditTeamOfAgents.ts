import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useConfigsService } from 'services/config/useConfigsService'
import { useUpdateConfigService } from 'services/config/useUpdateConfigService'
import { useTeamOfAgentsByIdService } from 'services/team/useTeamOfAgentsByIdService'
import { useUpdateTeamOfAgentsService } from 'services/team/useUpdateTeamOfAgentsService'
import { useTeamOfAgents } from './useTeamOfAgents'

export const useEditTeamOfAgents = () => {
  const navigate = useNavigate()
  const params = useParams()
  const urlParams = new URLSearchParams(location.search)

  const teamId = urlParams.get('team') || params.teamId

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

  const handleNavigation = () => {
    navigate(`/chat?team=${teamId}`)
  }

  const defaultValues = {
    teamOfAgents_name: teamOfAgentsById?.name,
    teamOfAgents_description: teamOfAgentsById?.description,
    teamOfAgents_team_type: teamOfAgentsById?.team_type,
    configs: configs || {},
    agents:
      teamOfAgentsById?.team_agents.map((team_agent: any) => ({
        agent_id: team_agent.agent.id,
        role: team_agent.role,
      })) || [],
    is_memory: teamOfAgentsById?.is_memory,
    //configs
    team_constraints: teamOfAgentsById?.configs.constraints,
    team_datasources: teamOfAgentsById?.configs.datasources,
    team_goals: teamOfAgentsById?.configs.goals,
    team_greeting: teamOfAgentsById?.configs.greeting,
    team_instructions: teamOfAgentsById?.configs.instructions,
    team_suggestions: teamOfAgentsById?.configs.suggestions || [],
    team_temperature: teamOfAgentsById?.configs.temperature,
    team_text: teamOfAgentsById?.configs.text,
    team_tools: teamOfAgentsById?.configs.tools,
    team_model: teamOfAgentsById?.configs.model,
  }

  const handleSubmit = async (values: any) => {
    if (!teamId) return

    setIsLoading(true)

    const updatedTeamOfAgentsValues = {
      name: values.teamOfAgents_name,
      description: values.teamOfAgents_description,
      team_type: values.teamOfAgents_team_type,
      team_agents: values.agents.filter((agent: any) => agent?.agent_id),
      is_memory: values.is_memory,
      constraints: values.team_constraints,
      datasources: values.team_datasources,
      goals: values.team_goals,
      greeting: values.team_greeting,
      instructions: values.team_instructions,
      suggestions: values.team_suggestions,
      temperature: values.team_temperature,
      text: values.team_text,
      tools: values.team_tools,
      model: values.team_model,
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
    handleNavigation,
  }
}
