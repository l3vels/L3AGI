import { ApolloError } from '@apollo/client'
import { ToastContext } from 'contexts'
import { useFormik } from 'formik'

import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useUpdateAgentService } from 'services/agent/useUpdateAgentService'

import { agentValidationSchema } from 'utils/validationsSchema'
import { useCheckTwilioPhoneNumberSid } from './useCheckTwilioPhoneNumberSid'

export const useEditAgent = () => {
  const navigate = useNavigate()
  const params = useParams()

  const { refetch: refetchAgents } = useAgentsService()

  const { setToast } = useContext(ToastContext)

  const urlParams = new URLSearchParams(location.search)

  const agentId = urlParams.get('agent') || params.agentId

  const { data: agentById, refetch: refetchAgent } = useAgentByIdService({ id: agentId || '' })

  const [isLoading, setIsLoading] = useState(false)

  const [updateAgent] = useUpdateAgentService()
  const { checkTwilioPhoneNumberSid } = useCheckTwilioPhoneNumberSid({ setIsLoading })

  const handleNavigation = () => {
    navigate(`/chat?agent=${agentId}`)
  }

  const defaultValues = {
    agent_name: agentById?.agent?.name,
    agent_role: agentById?.agent?.role,
    agent_avatar: agentById?.agent?.avatar,
    agent_description: agentById?.agent?.description,
    agent_is_template: agentById?.agent?.is_template,
    agent_is_memory: agentById?.agent?.is_memory,
    agent_temperature: agentById?.configs?.temperature,
    agent_goals: agentById?.configs?.goals,
    agent_constraints: agentById?.configs?.constraints,
    agent_tools: agentById?.configs?.tools,
    agent_instructions: agentById?.configs?.instructions,
    agent_datasources: agentById?.configs?.datasources,
    agent_source_flow: agentById?.configs?.source_flow || 'source_detection',
    agent_model: agentById?.configs?.model,
    agent_suggestions: agentById?.configs?.suggestions,
    agent_greeting: agentById?.configs?.greeting,
    agent_text: agentById?.configs?.text || '',

    agent_voice_synthesizer: agentById?.configs?.synthesizer || '',
    agent_default_voice: agentById?.configs?.default_voice || '',
    agent_voice_id: agentById?.configs?.voice_id || '',
    agent_voice_transcriber: agentById?.configs?.transcriber || '',
    agent_voice_response: agentById?.configs?.response_mode || ['Text'],
    agent_voice_input_mode: agentById?.configs?.input_mode || ['Text'],

    agent_integrations: agentById?.configs?.integrations || [],

    agent_type: agentById?.agent?.agent_type,
    agent_runners: agentById?.configs?.runners || [],
    agent_sentiment_analyzer: agentById?.configs?.sentiment_analyzer || { task: '', runner: '' },
    agent_twilio_phone_number_sid: agentById?.configs?.twilio_phone_number_sid || '',
  }

  const handleUpdate = async (updatedValues: any) => {
    try {
      await updateAgent(agentId || '', {
        ...updatedValues,
      })

      await refetchAgent()
      await refetchAgents()

      setToast({
        message: 'Agent was updated!',
        type: 'positive',
        open: true,
      })
    } catch (err) {
      let message = 'Could not update agent!'

      if (err instanceof ApolloError) {
        // @ts-expect-error result is not defined in networkError
        message = err.networkError?.result?.detail || message
      }

      setToast({
        message: message,
        type: 'negative',
        open: true,
      })
    }

    setIsLoading(false)
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    const updatedValues = {
      name: values.agent_name,
      role: values.agent_role,
      description: values.agent_description,
      avatar: values.agent_avatar,
      temperature: values.agent_temperature,
      goals: values.agent_goals,
      is_template: values.agent_is_template,
      is_memory: values.agent_is_memory,
      constraints: values.agent_constraints,
      tools: values.agent_tools,
      datasources: values.agent_datasources,
      source_flow: values.agent_source_flow,
      instructions: values.agent_instructions,
      model: values.agent_model,
      suggestions: values.agent_suggestions,
      greeting: values.agent_greeting,
      text: values.agent_text,

      synthesizer: values.agent_voice_synthesizer,
      default_voice: values.agent_default_voice,
      voice_id: values.agent_voice_id,
      transcriber: values.agent_voice_transcriber,
      response_mode: values.agent_voice_response,
      input_mode: values.agent_voice_input_mode,

      agent_type: values.agent_type,
      integrations: values.agent_integrations,
      runners: values.agent_runners,
      sentiment_analyzer: values.agent_sentiment_analyzer,
      twilio_phone_number_sid: values.agent_twilio_phone_number_sid,
    }

    if (updatedValues.agent_type === 'inbound') {
      await checkTwilioPhoneNumberSid(updatedValues.twilio_phone_number_sid, agentId, () =>
        handleUpdate(updatedValues),
      )
    } else {
      await handleUpdate(updatedValues)
    }
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
    agentId,
    handleNavigation,
    agentById,
  }
}
