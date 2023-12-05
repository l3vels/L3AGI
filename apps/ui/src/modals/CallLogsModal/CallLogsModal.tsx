import withRenderModal from 'hocs/withRenderModal'
import styled from 'styled-components'
import Modal from 'share-ui/components/Modal/Modal'

import { useModal } from 'hooks'

import CallLogs from './CallLogs'
import IconButton from 'share-ui/components/IconButton/IconButton'
import Close from 'share-ui/components/Icon/Icons/components/Close'

export const CALL_LOGS_MODAL_NAME = 'call-logs-modal'

type CallLogsModalProps = {
  data: {
    chatId: string
  }
}

const CallLogsModal = ({ data }: CallLogsModalProps) => {
  const { closeModal } = useModal()

  return (
    <StyledModal
      onClose={() => closeModal(CALL_LOGS_MODAL_NAME)}
      show
      backgroundColor='light'
      hideCloseButton
    >
      <StyledModalBody>
        <CallLogs chatId={data.chatId} />
      </StyledModalBody>

      <StyledButtonWrapper>
        <IconButton
          size={IconButton.sizes?.XS}
          icon={() => <Close />}
          kind={IconButton.kinds?.TERTIARY}
          onClick={() => closeModal(CALL_LOGS_MODAL_NAME)}
        />
      </StyledButtonWrapper>
    </StyledModal>
  )
}

export default withRenderModal(CALL_LOGS_MODAL_NAME)(CallLogsModal)

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
