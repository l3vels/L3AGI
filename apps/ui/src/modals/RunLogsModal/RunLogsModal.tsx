import withRenderModal from 'hocs/withRenderModal'
import styled from 'styled-components'
import Modal from '@l3-lib/ui-core/dist/Modal'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import { useModal } from 'hooks'
import Close from '@l3-lib/ui-core/dist/icons/Close'
import RunLogs from './RunLogs'

export const RUN_LOGS_MODAL_NAME = 'run-logs-modal'

const RunLogsModal = () => {
  const { closeModal } = useModal()

  return (
    <StyledModal
      onClose={() => closeModal(RUN_LOGS_MODAL_NAME)}
      show
      backgroundColor='light'
      hideCloseButton
    >
      <StyledModalBody>
        <RunLogs />
      </StyledModalBody>

      <StyledButtonWrapper>
        <IconButton
          size={IconButton.sizes.XS}
          icon={() => <Close />}
          kind={IconButton.kinds.TERTIARY}
          onClick={() => closeModal(RUN_LOGS_MODAL_NAME)}
        />
      </StyledButtonWrapper>
    </StyledModal>
  )
}

export default withRenderModal(RUN_LOGS_MODAL_NAME)(RunLogsModal)

const StyledModal = styled(Modal)`
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: unset;
  }
`

const StyledModalBody = styled.div`
  max-width: 1000px;
  max-height: 800px;
  width: 100vw;
`

export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`
