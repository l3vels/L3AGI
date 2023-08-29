import styled from 'styled-components'
import ReplyIcon from '@l3-lib/ui-core/dist/icons/Replay'

const MessageActions = ({ onReplyClick }: { onReplyClick: () => void }) => {
  return (
    <StyledWrapper>
      <StyledReplyButton onClick={onReplyClick}>
        <ReplyIcon />
      </StyledReplyButton>
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
const StyledReplyButton = styled.div`
  opacity: 0.5;
  :hover {
    opacity: 1;
    cursor: pointer;
  }
`
