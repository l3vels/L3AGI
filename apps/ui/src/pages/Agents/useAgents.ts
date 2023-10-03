import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useCreateAgentService } from 'services/agent/useCreateAgentService'
import { useDeleteAgentByIdService } from 'services/agent/useDeleteAgentByIdService'
import { agentValidationSchema } from 'utils/validationsSchema'

export const useAgents = () => {
  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()

  const { openModal, closeModal } = useModal()

  const { data: agentsData, refetch: refetchAgents } = useAgentsService()

  const [createAgentService] = useCreateAgentService()
  const { deleteAgentById } = useDeleteAgentByIdService()

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
    agent_model_version: '',
    agent_greeting: '',
    agent_model_provider: 'OpenAI',
    agent_is_memory: true,
  }

  if (agentById) {
    initialValues = {
      agent_name: agentById.agent?.name,
      agent_role: agentById.agent?.role,
      agent_description: agentById.agent?.description,
      agent_is_template: agentById.agent?.is_template,
      agent_is_memory: agentById.agent?.is_memory,
      agent_temperature: agentById.configs?.temperature,
      agent_goals: agentById.configs?.goals,
      agent_constraints: agentById.configs?.constraints,
      agent_tools: agentById.configs?.tools,
      agent_instructions: agentById.configs?.instructions,
      agent_datasources: agentById.configs?.datasources,
      agent_model_version: agentById.configs?.model_version,
      agent_model_provider: agentById.configs?.model_provider,
      agent_suggestions: agentById.configs?.suggestions,
      agent_greeting: agentById.configs?.greeting,
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
        is_template: false,
        constraints: values.agent_constraints,
        tools: values.agent_tools,
        datasources: values.agent_datasources,
        instructions: values.agent_instructions,
        model_version: values.agent_model_version,
        model_provider: values.agent_model_provider,
        is_memory: values.agent_is_memory,
        suggestions: values.agent_suggestions,
        greeting: values.agent_greeting,
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

  const deleteAgentHandler = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            await deleteAgentById(id)
            await refetchAgents()
            closeModal('delete-confirmation-modal')
            closeModal('agent-view-modal')
            navigate('/chat')
            setToast({
              message: 'Agent was deleted!',
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete Agent!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete Agent?',
      },
    })
  }

  return {
    agentsData,
    formik,
    handleSubmit,
    deleteAgentHandler,
    refetchAgents,
    isLoading,
    refetchAgent,
  }
}
