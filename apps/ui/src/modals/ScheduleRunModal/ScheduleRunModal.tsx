import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'
import Modal from '@l3-lib/ui-core/dist/Modal'
import { useModal } from 'hooks'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Close from '@l3-lib/ui-core/dist/icons/Close'
import CreateScheduleForm from 'pages/Schedule/ScheduleFrom/CreateScheduleForm'

const ScheduleRunModal = () => {
  const { closeModal } = useModal()

  return (
    <StyledModal
      onClose={() => closeModal('schedule-run-modal')}
      show
      backgroundColor='light'
      hideCloseButton
    >
      <StyledModalBody>
        <CreateScheduleForm />
      </StyledModalBody>

      <StyledButtonWrapper>
        <IconButton
          size={IconButton.sizes.XS}
          icon={() => <Close />}
          kind={IconButton.kinds.TERTIARY}
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
  /* padding: 12px; */
  width: fit-content;
  height: fit-content;
  color: ${({ theme }) => theme.body.textColorPrimary} !important;
  min-width: 800px;
  min-height: 500px;
`

const StyledModalBody = styled.div`
  max-width: 1000px;
  width: 500px;
  margin: 0 auto;
`
export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`
