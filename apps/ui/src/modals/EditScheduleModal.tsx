import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'

import { StyledModalBody } from './ToolkitModal'

import EditScheduleForm from 'pages/Schedule/ScheduleFrom/EditScheduleForm'

type ScheduleModalProps = {
  data: {
    scheduleId: string
  }
}

const EditScheduleModal = ({ data }: ScheduleModalProps) => {
  const { closeModal } = useModal()

  return (
    <Modal onClose={() => closeModal('edit-schedule-modal')} show backgroundColor='light'>
      <StyledModalBody>
        <EditScheduleForm scheduleId={data.scheduleId} />
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('edit-schedule-modal')(EditScheduleModal)
