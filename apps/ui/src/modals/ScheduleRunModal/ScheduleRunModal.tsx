import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'
import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/Close'
import CreateScheduleForm from 'pages/Schedule/ScheduleFrom/CreateScheduleForm'

type ScheduleRunModalProps = {
  data: {
    id: string
    type: 'agent' | 'team' | 'chat'
  }
}

const ScheduleRunModal = ({ data }: ScheduleRunModalProps) => {
  const { closeModal } = useModal()

  return (
    <StyledModal
      onClose={() => closeModal('schedule-run-modal')}
      show
      backgroundColor='light'
      hideCloseButton
    >
      <StyledModalBody>
        <CreateScheduleForm
          initialValues={{
            schedule_agent_id: data.id,
            agent_type: data.type,
          }}
        />
      </StyledModalBody>

      <StyledButtonWrapper>
        <IconButton
          size={IconButton.sizes?.XS}
          icon={() => <Close />}
          kind={IconButton.kinds?.TERTIARY}
          onClick={() => closeModal('schedule-run-modal')}
        />
      </StyledButtonWrapper>
    </StyledModal>
  )
}

export default withRenderModal('schedule-run-modal')(ScheduleRunModal)

const StyledModal = styled(Modal)`
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: unset;
  }

  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  color: ${({ theme }) => theme.body.textColorPrimary} !important;
  min-width: 800px;
  min-height: 500px;
`

const StyledModalBody = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding-top: 32px;
`
export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`
