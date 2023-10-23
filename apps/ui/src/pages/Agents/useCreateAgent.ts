import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useCreateAgentService } from 'services/agent/useCreateAgentService'
import { agentValidationSchema } from 'utils/validationsSchema'

export const useCreateAgent = () => {
  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()

  const { refetch: refetchAgents } = useAgentsService()

  const [createAgentService] = useCreateAgentService()

  const [isLoading, setIsLoading] = useState(false)

  const urlParams = new URLSearchParams(window.location.search)

  const agentId = urlParams.get('agentId')

  const { data: agentById, refetch: refetchAgent } = useAgentByIdService({ id: agentId || '' })

  let initialValues = {
    agent_name: '',
    agent_role: '',
    agent_description: '',
    agent_is_template: false,
    agent_temperature: 0.2,
    agent_goals: [],
    agent_constraints: [],
    agent_tools: [],
    agent_instructions: [],
    agent_datasources: [],
    agent_suggestions: [],
    agent_greeting: '',
    agent_model: '',
    agent_is_memory: true,
    agent_text: '',
    agent_avatar: '',
  }

  if (agentById) {
    initialValues = {
      agent_name: agentById.agent?.name,
      agent_role: agentById.agent?.role,
      agent_description: agentById.agent?.description,
      agent_is_template: agentById.agent?.is_template,
      agent_is_memory: agentById.agent?.is_memory,
      agent_avatar: agentById.agent?.avatar,
      agent_temperature: agentById.configs?.temperature,
      agent_goals: agentById.configs?.goals,
      agent_constraints: agentById.configs?.constraints,
      agent_tools: agentById.configs?.tools,
      agent_instructions: agentById.configs?.instructions,
      agent_datasources: agentById.configs?.datasources,
      agent_model: agentById?.configs?.agent_model,
      agent_suggestions: agentById.configs?.suggestions,
      agent_greeting: agentById.configs?.greeting,
      agent_text: agentById.configs?.text,
    }
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const agentInput = {
        name: values.agent_name,
        role: values.agent_role,
        description: values.agent_description,
        temperature: values.agent_temperature,
        goals: values.agent_goals,
        is_template: values.agent_is_template,
        constraints: values.agent_constraints,
        tools: values.agent_tools,
        datasources: values.agent_datasources,
        instructions: values.agent_instructions,
        model: values.agent_model,
        is_memory: values.agent_is_memory,
        suggestions: values.agent_suggestions,
        greeting: values.agent_greeting,
        text: values.agent_text,
        avatar: values.agent_avatar,
      }

      const newAgent = await createAgentService(agentInput)
      await refetchAgents()
      setToast({
        message: 'New Agent was Created!',
        type: 'positive',
        open: true,
      })

      navigate(`/chat?agent=${newAgent.agent.id}`)
    } catch (e) {
      console.log('rrorr', e)
      // navigate('/agents')

      setToast({
        message: 'Failed to create Agent!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    validationSchema: agentValidationSchema,
    // enableReinitialize: true,
  })

  return {
    formik,
    handleSubmit,
    isLoading,
    refetchAgent,
  }
}
