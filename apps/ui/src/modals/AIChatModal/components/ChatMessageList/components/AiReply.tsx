import {
  StyledReplyInfoWrapper,
  StyledReplyLine,
  StyledReplyLineWrapper,
  StyledReplyTextWrapper,
  StyledReplyWrapper,
  StyledSmallAvatarWrapper,
} from './HumanReply'

import Typography from '@l3-lib/ui-core/dist/Typography'

import AiMessageMarkdown from './AiMessageMarkdown'
import { ChatMessageVersionEnum } from 'services'
import { useAiMessage } from './useAiMessage'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import TypographyPrimary from 'components/Typography/Primary'

const AiReply = ({
  avatarImg,
  messageText,
  thoughts,
  version,
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
        <TypographyPrimary
          value={`@${author}`}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
      </StyledReplyInfoWrapper>
      <StyledReplyTextWrapper>
        <AiMessageMarkdown
          children={thoughts?.length ? thoughts[thoughts.length - 1].result : messageText}
        />
      </StyledReplyTextWrapper>
    </StyledReplyWrapper>
  )
}

export default AiReply
