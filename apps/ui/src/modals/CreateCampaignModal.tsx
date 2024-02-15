import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import CreateCampaignForm from 'plugins/contact/pages/Campaign/CampaignForm/CreateCampaignForm'
import { StyledModalBody } from './ToolkitModal'

type CampaignModalProps = {
  data: {
    agentId: string
  }
}

const CreateCampaignModal = ({ data }: CampaignModalProps) => {
  const { closeModal } = useModal()

  return (
    <Modal onClose={() => closeModal('create-campaign-modal')} show backgroundColor='light'>
      <StyledModalBody>
        <CreateCampaignForm agentId={data.agentId} />
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('create-campaign-modal')(CreateCampaignModal)
