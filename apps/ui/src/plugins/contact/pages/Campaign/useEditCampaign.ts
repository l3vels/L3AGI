import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useCampaignByIdService } from 'plugins/contact/services/campaign/useCampaignByIdService'
import { useCampaignsService } from 'plugins/contact/services/campaign/useCampaignsService'
import { useUpdateCampaignService } from 'plugins/contact/services/campaign/useUpdateCampaignService'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { campaignValidationSchema } from './CampaignForm/useCampaignForm'
import { getDateTime } from 'pages/Schedule/Schedule.utils'

export const useEditCampaign = () => {
  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()
  const params = useParams()

  const { campaignId } = params

  const [isLoading, setIsLoading] = useState(false)

  const { refetch: refetchCampaigns } = useCampaignsService()
  const { data: campaignById } = useCampaignByIdService({ id: campaignId || '' })

  const [updateCampaign] = useUpdateCampaignService()

  const defaultValues = {
    campaign_name: campaignById?.name,
    campaign_type: campaignById?.type,
    campaign_agent_id: campaignById?.agent_id,
    campaign_group_id: campaignById?.group_id,
    campaign_start_date: getDateTime(campaignById?.start_date),
    campaign_retry_attempts: campaignById?.retry_attempts,
    campaign_retry_interval: campaignById?.retry_interval,
    campaign_working_hours_start: campaignById?.working_hours_start,
    campaign_working_hours_end: campaignById?.working_hours_end,
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const updatedValues = {
        name: values.campaign_name,
        agent_id: values.campaign_agent_id,
        group_id: values.campaign_group_id,
        type: values.campaign_type,
        start_date: new Date(values.campaign_start_date).toISOString(),
        retry_attempts: values.campaign_retry_attempts,
        retry_interval: values.campaign_retry_interval,
        working_hours_start: values.campaign_working_hours_start,
        working_hours_end: values.campaign_working_hours_end,
      }

      await updateCampaign(campaignId || '', updatedValues)

      await refetchCampaigns()

      setToast({
        message: 'Campaign was Updated!',
        type: 'positive',
        open: true,
      })
      navigate('/schedules?tab=campaign')
    } catch (e) {
      setToast({
        message: 'Failed To Update Campaign!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: campaignValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    isLoading,
  }
}
