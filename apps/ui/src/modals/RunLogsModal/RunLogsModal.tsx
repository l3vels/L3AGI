import withRenderModal from 'hocs/withRenderModal'
import styled from 'styled-components'
import Modal from 'share-ui/components/Modal/Modal'
import IconButton from 'share-ui/components/IconButton/IconButton'

import { useModal } from 'hooks'
import Close from 'share-ui/components/Icon/Icons/components/Close'
import RunLogs from './RunLogs'

export const RUN_LOGS_MODAL_NAME = 'run-logs-modal'

type RunLogsModalProps = {
  data: {
    runId: string
  }
}

const RunLogsModal = ({ data }: RunLogsModalProps) => {
  const { closeModal } = useModal()

  return (
    <StyledModal
      onClose={() => closeModal(RUN_LOGS_MODAL_NAME)}
      show
      backgroundColor='light'
      hideCloseButton
    >
      <StyledModalBody>
        <RunLogs runId={data.runId} />
      </StyledModalBody>

      <StyledButtonWrapper>
        <IconButton
          size={IconButton.sizes?.XS}
          icon={() => <Close />}
          kind={IconButton.kinds?.TERTIARY}
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
  min-height: 400px;

  max-width: 1200px;
  max-height: 800px;
  width: 100vw;
`

export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`
