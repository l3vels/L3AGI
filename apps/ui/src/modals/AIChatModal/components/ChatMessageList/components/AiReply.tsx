import {
  StyledReplyInfoWrapper,
  StyledReplyLine,
  StyledReplyLineWrapper,
  StyledReplyTextWrapper,
  StyledReplyWrapper,
  StyledSmallAvatarWrapper,
} from './HumanReply'

import Typography from 'share-ui/components/typography/Typography'

import AiMessageMarkdown from './AiMessageMarkdown'
import { ChatMessageVersionEnum } from 'services'
// import { useAiMessage } from './useAiMessage'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

const AiReply = ({
  // avatarImg,
  messageText,
  thoughts,
  // version,
  author,
}: {
  avatarImg: string
  messageText: string
  thoughts?: any[]
  version: ChatMessageVersionEnum
  author: string
}) => {
  // const { name } = useAiMessage(version)

  return (
    <StyledReplyWrapper>
      <StyledReplyLineWrapper>
        <StyledReplyLine />
      </StyledReplyLineWrapper>
      <StyledReplyInfoWrapper>
        <StyledSmallAvatarWrapper>
          <AvatarGenerator name={author} size={16} textSizeRatio={1.5} />
        </StyledSmallAvatarWrapper>
        <TypographySecondary
          value={`@${author}`}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
        />
      </StyledReplyInfoWrapper>
      <StyledReplyTextWrapper>
        <AiMessageMarkdown
          isReply
          // eslint-disable-next-line react/no-children-prop
          children={thoughts?.length ? thoughts[thoughts.length - 1].result : messageText}
        />
      </StyledReplyTextWrapper>
    </StyledReplyWrapper>
  )
}

export default AiReply
