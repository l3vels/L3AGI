import styled from 'styled-components'

import ReplyIcon from '@l3-lib/ui-core/dist/icons/Replay'
import CopyButton, { StyledActionButton } from 'components/CopyButton/CopyButton'

type MessageActionsProps = {
  onReplyClick?: () => void
  onCopyClick?: () => void
}

const MessageActions = ({ onReplyClick, onCopyClick }: MessageActionsProps) => {
  return (
    <StyledWrapper>
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
