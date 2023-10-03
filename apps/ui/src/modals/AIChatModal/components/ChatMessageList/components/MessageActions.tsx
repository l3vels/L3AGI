import { useState } from 'react'

import styled from 'styled-components'

import ReplyIcon from '@l3-lib/ui-core/dist/icons/Replay'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import Check from '@l3-lib/ui-core/dist/icons/Check'
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

const StyledCopyIcon = styled(Copy)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledCheckIcon = styled(Check)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
