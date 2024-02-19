import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'

import CreateScheduleForm from 'pages/Schedule/ScheduleFrom/CreateScheduleForm'
import styled from 'styled-components'

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

export const StyledModalBody = styled.div`
  padding: 10px;

  width: 30vw;
`
