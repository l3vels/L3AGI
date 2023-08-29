import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useCreateAgentService } from 'services/agent/useCreateAgentService'
import { useDeleteAgentByIdService } from 'services/agent/useDeleteAgentByIdService'

export const useAgents = () => {
  const { setToast } = useContext(ToastContext)

  const { openModal, closeModal } = useModal()

  const openCreateAgentModal = () => {
    openModal({ name: 'create-agent-modal' })
  }
  const closeCreateAgentModal = () => {
    closeModal('create-agent-modal')
  }
  const openEditAgentModal = (agentObj: any) => {
    openModal({
      name: 'edit-agent-modal',
      data: {
        agentObj: agentObj,
        closeModal: () => closeModal('edit-agent-modal'),
      },
    })
  }

  const { data: agentsData, refetch: refetchAgents } = useAgentsService()

  const [createAgentService] = useCreateAgentService()
  const { deleteAgentById } = useDeleteAgentByIdService()

  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    agent_name: '',
    agent_role: '',
    agent_description: '',
    agent_is_template: false,
    agent_temperature: 0.2,
    agent_goals: [''],
    agent_constraints: [''],
    agent_tools: [''],
    agent_instructions: [''],
    agent_datasources: [],
    agent_model_version: '',
    agent_mode_provider: '',
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
        mode_provider: values.agent_mode_provider,
      }
      await createAgentService(agentInput)
      await refetchAgents()
      setToast({
        message: 'New Agent was Created!',
        type: 'positive',
        open: true,
      })
      closeCreateAgentModal()
    } catch (e) {
      console.log('rrorr', e)
      closeCreateAgentModal()
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
    // validationSchema: gameValidationSchema,
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
        closeModal: () => {
          closeModal('delete-confirmation-modal')
        },
        label: 'Delete Agent?',
        title: 'Delete Agent?',
      },
    })
  }

  return {
    agentsData,
    openCreateAgentModal,
    formik,
    closeCreateAgentModal,
    handleSubmit,
    deleteAgentHandler,
    openEditAgentModal,
    refetchAgents,
    isLoading,
  }
}
