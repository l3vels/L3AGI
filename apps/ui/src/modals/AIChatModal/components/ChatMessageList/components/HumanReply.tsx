import styled from 'styled-components'
import HumanMessageText from './HumanMessageText'

import Typography from 'share-ui/components/typography/Typography'
import { useHumanMessage } from './useHumanMessage'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import AiMessageMarkdown from './AiMessageMarkdown'

const HumanReply = ({
  messageText,
  userId,
  userName,
  avatarImg,
}: {
  messageText: string
  avatarImg: string
  userId: string
  userName: string
}) => {
  return (
    <StyledReplyWrapper>
      <StyledReplyLineWrapper>
        <StyledReplyLine />
      </StyledReplyLineWrapper>
      <StyledReplyInfoWrapper>
        <StyledSmallAvatarWrapper>
          <AvatarGenerator name={userName} size={16} textSizeRatio={1.5} avatar={avatarImg} />
        </StyledSmallAvatarWrapper>

        <TypographySecondary
          value={`@${userName}`}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
        />
      </StyledReplyInfoWrapper>
      <StyledReplyTextWrapper>
        <AiMessageMarkdown
          isReply
          // eslint-disable-next-line react/no-children-prop
          children={messageText}
        />
      </StyledReplyTextWrapper>
    </StyledReplyWrapper>
  )
}

export default HumanReply

export const StyledReplyWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  /* padding-left: 50px; */
  font-size: 14px;

  min-width: 400px;
  width: 100%;

  height: 20px;

  gap: 10px;
`

export const StyledReplyInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  min-width: fit-content;
`
export const StyledReplyTextWrapper = styled.div`
  overflow: hidden;
  margin-top: 2px;
`
export const StyledReplyLine = styled.div`
  width: 24px;
  height: 15px;

  border-top: 2px solid #000;
  border-left: 2px solid #000;

  border-top-left-radius: 10px;

  margin-top: 10px;
  margin-left: 16px;
`
export const StyledReplyLineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
`
export const StyledSmallAvatarWrapper = styled.div`
  margin-bottom: 6px;
`
