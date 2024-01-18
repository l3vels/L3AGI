import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useCreateAgentService } from 'services/agent/useCreateAgentService'

import { agentValidationSchema } from 'utils/validationsSchema'
import { useCheckTwilioPhoneNumberSid } from './useCheckTwilioPhoneNumberSid'

export const useCreateAgent = () => {
  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()

  const { refetch: refetchAgents } = useAgentsService()

  const [createAgentService] = useCreateAgentService()

  const [isLoading, setIsLoading] = useState(false)

  const { checkTwilioPhoneNumberSid } = useCheckTwilioPhoneNumberSid({
    setIsLoading,
  })

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
    agent_source_flow: 'source_detection',

    agent_voice_synthesizer: '',
    agent_default_voice: '',
    agent_voice_id: '',
    agent_voice_transcriber: '',
    agent_voice_response: ['Text'],
    agent_voice_input_mode: ['Text'],

    agent_integrations: [],

    agent_type: 'text',
    agent_runners: [],
    agent_sentiment_analyzer: { task: '', runner: '' },
    agent_twilio_phone_number_sid: '',
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
      agent_model: agentById?.configs?.model,
      agent_suggestions: agentById.configs?.suggestions,
      agent_greeting: agentById.configs?.greeting,
      agent_text: agentById.configs?.text || '',
      agent_source_flow: agentById.configs?.source_flow,

      agent_voice_synthesizer: agentById.configs?.synthesizer || '',
      agent_default_voice: agentById.configs?.default_voice || '',
      agent_voice_id: agentById.configs?.voice_id || '',
      agent_voice_transcriber: agentById.configs?.transcriber || '',
      agent_voice_response: agentById.configs?.response_mode || ['Text'],
      agent_voice_input_mode: agentById.configs?.input_mode || ['Text'],

      agent_integrations: agentById.configs?.integrations || [],

      agent_type: agentById.agent?.agent_type,
      agent_runners: agentById.configs.runners || [],
      agent_sentiment_analyzer: agentById.configs?.sentiment_analyzer,
      agent_twilio_phone_number_sid: agentById.configs?.twilio_phone_number_sid,
    }
  }

  const handleCreate = async (input: any) => {
    try {
      const newAgent = await createAgentService(input)

      await refetchAgents()
      setToast({
        message: 'New Agent was Created!',
        type: 'positive',
        open: true,
      })

      navigate(`/chat?agent=${newAgent.agent.id}`)
    } catch (e) {
      // navigate('/agents')

      setToast({
        message: 'Failed to create Agent!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
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
      source_flow: values.agent_source_flow,
      instructions: values.agent_instructions,
      model: values.agent_model,
      is_memory: values.agent_is_memory,
      suggestions: values.agent_suggestions,
      greeting: values.agent_greeting,
      text: values.agent_text,
      avatar: values.agent_avatar,

      synthesizer: values.agent_voice_synthesizer,
      default_voice: values.agent_default_voice,
      voice_id: values.agent_voice_id,
      transcriber: values.agent_voice_transcriber,
      response_mode: values.agent_voice_response,
      input_mode: values.agent_voice_input_mode,

      integrations: values.agent_integrations,
      agent_type: values.agent_type,
      runners: values.agent_runners,
      sentiment_analyzer: values.agent_sentiment_analyzer,
      twilio_phone_number_sid: values.agent_twilio_phone_number_sid,
    }

    if (agentInput.agent_type === 'inbound') {
      await checkTwilioPhoneNumberSid(agentInput.twilio_phone_number_sid, null, () =>
        handleCreate(agentInput),
      )
    } else {
      await handleCreate(agentInput)
    }
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
