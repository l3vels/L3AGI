import styled from 'styled-components'
import HumanMessageText from './HumanMessageText'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import { useHumanMessage } from './useHumanMessage'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import { StyledTypographyNameWrapper } from '../../ChatMembers/components/MemberText'

const HumanReply = ({
  messageText,
  avatarImg,
  userId,
}: {
  messageText: string
  avatarImg: string
  userId: string
}) => {
  const { wordArray, authorName } = useHumanMessage({
    userId,
    messageText,
  })

  return (
    <StyledReplyWrapper>
      <StyledReplyLineWrapper>
        <StyledReplyLine />
      </StyledReplyLineWrapper>
      <StyledReplyInfoWrapper>
        <StyledSmallAvatarWrapper>
          <AvatarGenerator name={authorName} size={16} textSizeRatio={1.5} />
        </StyledSmallAvatarWrapper>
        <StyledTypographyNameWrapper>
          <Typography
            value={`@${authorName}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            // customColor={'#FFF'}
          />
        </StyledTypographyNameWrapper>
      </StyledReplyInfoWrapper>
      <StyledReplyTextWrapper>
        <HumanMessageText textArray={wordArray} />
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

  width: calc(100vw - 100px);

  max-width: 850px;
  height: 30px;
  /* background: red; */
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
  margin-top: 4px;
`
export const StyledReplyLine = styled.div`
  width: 24px;
  height: 15px;

  border-top: 2px solid var(--primitives-gray-500, #a8bee2);
  border-left: 2px solid var(--primitives-gray-500, #a8bee2);

  border-top-left-radius: 10px;

  margin-top: 10px;
  margin-left: 24px;
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
