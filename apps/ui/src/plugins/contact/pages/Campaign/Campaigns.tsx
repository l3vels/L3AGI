import { useCampaignsService } from 'plugins/contact/services/campaign/useCampaignsService'
import { useCreateCampaignService } from 'plugins/contact/services/campaign/useCreateCampaignService'

const Campaigns = () => {
  const [createCampaign] = useCreateCampaignService()

  const { data: campaignsData } = useCampaignsService()

  console.log('campaignsData', campaignsData)

  const handleCreate = () => {
    createCampaign({
      name: 'test',
      agent_id: 'a0111379-637a-4136-89e2-d58ff144c49f',
      group_id: '26989bef-3420-4bb4-af8b-dd0e598f5bd5',
      type: 'outbound',
      start_date: '2023-12-19 13:31:21.160022+00',
    })
  }

  return (
    <span style={{ color: 'red' }}>
      <button onClick={handleCreate}>Create</button>
    </span>
  )
}

export default Campaigns
