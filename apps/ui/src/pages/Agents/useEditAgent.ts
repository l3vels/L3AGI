import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import { useUpdateAgentService } from 'services/agent/useUpdateAgentService'
import { useAgents } from './useAgents'

export const useEditAgent = (agentObj: any) => {
  const { refetchAgents } = useAgents()
  const { closeModal } = useModal()
  const { setToast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [updateAgent] = useUpdateAgentService()

  const { agent, configs } = agentObj

  const { id, name, role, description, is_template } = agent

  const {
    temperature,
    goals,
    constraints,
    tools,
    datasources,
    instructions,
    model_version,
    mode_provider,
  } = configs

  const defaultValues = {
    agent_name: name,
    agent_role: role,
    agent_description: description,
    agent_is_template: is_template,
    agent_temperature: temperature,
    agent_goals: goals,
    agent_constraints: constraints,
    agent_tools: tools,
    agent_instructions: instructions,
    agent_datasources: datasources,
    agent_model_version: model_version,
    agent_mode_provider: mode_provider,
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
      constraints: values.agent_constraints,
      tools: values.agent_tools,
      datasources: values.agent_datasources,
      instructions: values.agent_instructions,
      model_version: values.agent_model_version,
      mode_provider: values.agent_mode_provider,
    }

    await updateAgent(id, {
      ...updatedValues,
    })
    await refetchAgents()

    closeModal('edit-agent-modal')

    setToast({
      message: 'Agent was updated!',
      type: 'positive',
      open: true,
    })

    setIsLoading(false)
  }

  const closeEditAgentModal = () => {
    closeModal('edit-agent-modal')
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  //   useEffect(() => {
  //     agentRefetch()
  //   }, [])

  return {
    formik,
    handleSubmit,
    closeEditAgentModal,
    isLoading,
  }
}
