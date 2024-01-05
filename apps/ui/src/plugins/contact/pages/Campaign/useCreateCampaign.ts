import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useCampaignsService } from 'plugins/contact/services/campaign/useCampaignsService'
import { useCreateCampaignService } from 'plugins/contact/services/campaign/useCreateCampaignService'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { campaignValidationSchema } from './CampaignForm/useCampaignForm'
import { getDateTimeFromDate } from 'pages/Schedule/Schedule.utils'

export const useCreateCampaign = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { setToast } = useContext(ToastContext)

  const { refetch: refetchCampaigns } = useCampaignsService()
  const [createCampaign] = useCreateCampaignService()

  const initialValues = {
    campaign_name: null,
    campaign_agent_id: null,
    campaign_group_id: null,
    campaign_type: 'outbound',
    campaign_start_date: getDateTimeFromDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)),
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const campaignInput = {
        name: values.campaign_name,
        agent_id: values.campaign_agent_id,
        group_id: values.campaign_group_id,
        type: values.campaign_type,
        start_date: values.campaign_start_date,
      }

      await createCampaign(campaignInput)

      await refetchCampaigns()
      setToast({
        message: 'New Campaign was Created!',
        type: 'positive',
        open: true,
      })
      navigate('/schedules?tab=campaign')
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
