import { memo } from 'react'
import {
  StyledAvatarWrapper,
  StyledMainContent,
  StyledMessageTop,
  StyledMessageText,
  StyledMessageWrapper,
  StyledMessageInfo,
  StyledMessageActionsWrapper,
} from './HumanMessage'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import AiMessageThoughts from './AiMessageThoughts'
import { ChatMessageVersionEnum } from 'services'

import MessageActions from './MessageActions'

import AiMessageMarkdown from './AiMessageMarkdown'
import { useAiMessage } from './useAiMessage'
import Typewriter from 'components/ChatTypingEffect/Typewriter'

type AiMessageProps = {
  avatarImg: string
  messageDate: string
  messageText: string
  version: ChatMessageVersionEnum
  thoughts?: any[]
  isNewMessage: boolean
  setIsNewMessage: (state: boolean) => void
  onReplyClick?: () => void
}

const AiMessage = ({
  avatarImg,
  messageDate,
  messageText,
  thoughts,
  version,
  isNewMessage,
  setIsNewMessage,
  onReplyClick,
}: AiMessageProps) => {
  const { name } = useAiMessage(version)

  function isMarkdownTable(markdownString: string) {
    const tableRegex = /(?<=(\r?\n){2}|^)([^\r\n]*\|[^\r\n]*(\r?\n)?)+(?=(\r?\n){2}|$)/
    return tableRegex.test(markdownString)
  }

  const isTable = isMarkdownTable(messageText)

  return (
    <>
      <StyledMessageWrapper>
        <StyledAvatarWrapper>
          <Avatar size={Avatar.sizes.MEDIUM} src={avatarImg} type={Avatar.types.IMG} rectangle />
        </StyledAvatarWrapper>
        <StyledMainContent>
          <StyledMessageTop>
            <StyledMessageInfo>
              <Typography
                value={name}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor={'#FFF'}
              />
              <Typography
                value={messageDate}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'rgba(255, 255, 255, 0.60)'}
              />
            </StyledMessageInfo>

            <StyledMessageActionsWrapper className='actions'>
              {onReplyClick && <MessageActions onReplyClick={onReplyClick} />}
            </StyledMessageActionsWrapper>
          </StyledMessageTop>
          <StyledMessageText secondary>
            {thoughts && <AiMessageThoughts thoughts={thoughts} />}
            {isNewMessage && !isTable ? (
              <Typewriter
                delay={10}
                message={messageText}
                callFunction={() => setIsNewMessage(false)}
              />
            ) : (
              <AiMessageMarkdown
                children={thoughts?.length ? thoughts[thoughts.length - 1].result : messageText}
              />
            )}
          </StyledMessageText>
        </StyledMainContent>
      </StyledMessageWrapper>
    </>
  )
}

export default memo(AiMessage)
