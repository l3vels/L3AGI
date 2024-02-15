import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'

import { StyledModalBody } from './ToolkitModal'
import CreateScheduleForm from 'pages/Schedule/ScheduleFrom/CreateScheduleForm'

type ScheduleModalProps = {
  data: {
    agentId: string
  }
}

const CreateScheduleModal = ({ data }: ScheduleModalProps) => {
  const { closeModal } = useModal()

  return (
    <Modal onClose={() => closeModal('create-schedule-modal')} show backgroundColor='light'>
      <StyledModalBody>
        <CreateScheduleForm agentId={data.agentId} />
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('create-schedule-modal')(CreateScheduleModal)
