import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import { StyledModalBody } from './ToolkitModal'
import EditCampaignForm from 'plugins/contact/pages/Campaign/CampaignForm/EditCampaignForm'

type CampaignModalProps = {
  data: {
    campaignId: string
  }
}

const EditCampaignModal = ({ data }: CampaignModalProps) => {
  const { closeModal } = useModal()

  return (
    <Modal onClose={() => closeModal('edit-campaign-modal')} show backgroundColor='light'>
      <StyledModalBody>
        <EditCampaignForm campaignId={data.campaignId} />
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('edit-campaign-modal')(EditCampaignModal)
