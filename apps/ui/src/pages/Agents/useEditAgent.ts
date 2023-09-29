import { ToastContext } from 'contexts'
import { useFormik } from 'formik'

import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import { useUpdateAgentService } from 'services/agent/useUpdateAgentService'
import { agentValidationSchema } from 'utils/validationsSchema'
import { useAgents } from './useAgents'

export const useEditAgent = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { refetchAgents } = useAgents()

  const { setToast } = useContext(ToastContext)

  const { agentId } = params

  const { data: agentById } = useAgentByIdService({ id: agentId || '' })

  const [isLoading, setIsLoading] = useState(false)

  const [updateAgent] = useUpdateAgentService()

  const defaultValues = {
    agent_name: agentById?.agent?.name,
    agent_role: agentById?.agent?.role,
    agent_description: agentById?.agent?.description,
    agent_is_template: agentById?.agent?.is_template,
    agent_is_memory: agentById?.agent?.is_memory,
    agent_temperature: agentById?.configs?.temperature,
    agent_goals: agentById?.configs?.goals,
    agent_constraints: agentById?.configs?.constraints,
    agent_tools: agentById?.configs?.tools,
    agent_instructions: agentById?.configs?.instructions,
    agent_datasources: agentById?.configs?.datasources,
    agent_model_version: agentById?.configs?.model_version,
    agent_model_provider: agentById?.configs?.model_provider,
    agent_suggestions: agentById?.configs?.suggestions,
    agent_greeting: agentById?.configs?.greeting,
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    const updatedValues = {
      name: values.agent_name,
      role: values.agent_role,
      description: values.agent_description,
      temperature: values.agent_temperature,
      goals: values.agent_goals,
      is_template: false,
      is_memory: values.agent_is_memory,
      constraints: values.agent_constraints,
      tools: values.agent_tools,
      datasources: values.agent_datasources,
      instructions: values.agent_instructions,
      model_version: values.agent_model_version,
      model_provider: values.agent_model_provider,
      suggestions: values.agent_suggestions,
      greeting: values.agent_greeting,
    }

    await updateAgent(agentId || '', {
      ...updatedValues,
    })
    await refetchAgents()

    navigate(`/chat?agent=${agentId}`)

    setToast({
      message: 'Agent was updated!',
      type: 'positive',
      open: true,
    })

    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: agentValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    handleSubmit,
    isLoading,
  }
}
