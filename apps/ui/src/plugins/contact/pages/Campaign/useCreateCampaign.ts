import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useCampaignsService } from 'plugins/contact/services/campaign/useCampaignsService'
import { useCreateCampaignService } from 'plugins/contact/services/campaign/useCreateCampaignService'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { campaignValidationSchema } from './CampaignForm/useCampaignForm'
import { getDateTimeFromDate } from './Campaign.utils'
import { useModal } from 'hooks'

export const useCreateCampaign = ({ agentId }: { agentId?: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { closeModal } = useModal()

  const { setToast } = useContext(ToastContext)

  const { refetch: refetchCampaigns } = useCampaignsService()
  const [createCampaign] = useCreateCampaignService()

  const initialStartDate = getDateTimeFromDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))

  const initialValues = {
    campaign_name: null,

    campaign_group_id: null,
    campaign_type: 'Outbound',
    campaign_start_date: initialStartDate,
    campaign_retry_attempts: 2,
    campaign_retry_interval: 15,
    campaign_working_hours_start: '10:00',
    campaign_working_hours_end: '18:00',
    campaign_timezone: 'US/Central',
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    try {
      const campaignInput = {
        name: values.campaign_name,
        agent_id: agentId || '',
        group_id: values.campaign_group_id,
        type: values.campaign_type,
        start_date: values.campaign_start_date,
        retry_attempts: values.campaign_retry_attempts,
        retry_interval: values.campaign_retry_interval,
        working_hours_start: values.campaign_working_hours_start,
        working_hours_end: values.campaign_working_hours_end,
        timezone: values.campaign_timezone,
      }

      await createCampaign(campaignInput)

      await refetchCampaigns()
      setToast({
        message: 'New Campaign was Created!',
        type: 'positive',
        open: true,
      })
      closeModal('create-campaign-modal')
    } catch (e) {
      setToast({
        message: 'Failed To Add Campaign!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: campaignValidationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    isLoading,
  }
}
