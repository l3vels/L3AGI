import styled from 'styled-components'

import ReplyIcon from 'share-ui/components/Icon/Icons/components/Replay'
import LogsIcon from 'share-ui/components/Icon/Icons/components/Logs'
import CopyButton, { StyledActionButton } from 'components/CopyButton/CopyButton'

type MessageActionsProps = {
  onLogsClick?: () => void
  onReplyClick?: () => void
  onCopyClick?: () => void
}

const MessageActions = ({ onLogsClick, onReplyClick, onCopyClick }: MessageActionsProps) => {
  return (
    <StyledWrapper>
      {onLogsClick && (
        <StyledActionButton onClick={onLogsClick}>
          <StyledLogsIcon size={20} />
        </StyledActionButton>
      )}

      {onCopyClick && <CopyButton onCopyClick={onCopyClick} />}

      {onReplyClick && (
        <StyledActionButton onClick={onReplyClick}>
          <StyledReplyIcon />
        </StyledActionButton>
      )}
    </StyledWrapper>
  )
}

export default MessageActions

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
`

const StyledReplyIcon = styled(ReplyIcon)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledLogsIcon = styled(LogsIcon)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
