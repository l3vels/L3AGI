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

import AiMessageThoughts from './AiMessageThoughts'
import { ChatMessageVersionEnum } from 'services'

import MessageActions from './MessageActions'

import AiMessageMarkdown from './AiMessageMarkdown'
import Typewriter from 'components/ChatTypingEffect/Typewriter'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import { copyMessageText } from 'modals/AIChatModal/utils/copyMessageText'
import {
  StyledNameTypographyWrapper,
  StyledTypographyWrapper,
} from 'pages/Agents/AgentView/components/AgentViewDetailBox'

type AiMessageProps = {
  agentName?: string
  teamName?: string
  avatarImg: string
  messageDate: string
  messageText: string
  version?: ChatMessageVersionEnum
  thoughts?: any[]
  isNewMessage: boolean
  setIsNewMessage: (state: boolean) => void
  onReplyClick?: () => void
}

const AiMessage = ({
  agentName = '',
  teamName = '',
  avatarImg,
  messageDate,
  messageText,
  thoughts,
  isNewMessage,
  setIsNewMessage,
  onReplyClick,
}: AiMessageProps) => {
  function isMarkdownTable(markdownString: string) {
    const tableRegex = /(?<=(\r?\n){2}|^)([^\r\n]*\|[^\r\n]*(\r?\n)?)+(?=(\r?\n){2}|$)/
    return tableRegex.test(markdownString)
  }

  const isTable = isMarkdownTable(messageText)

  const name = agentName || teamName

  return (
    <>
      <StyledMessageWrapper>
        <StyledAvatarWrapper>
          <AvatarGenerator name={name} size={50} avatar={avatarImg} />
        </StyledAvatarWrapper>
        <StyledMainContent>
          <StyledMessageTop>
            <StyledMessageInfo>
              <StyledNameTypographyWrapper>
                <Typography
                  value={agentName && teamName ? agentName : name}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                />
              </StyledNameTypographyWrapper>
              <StyledTypographyWrapper>
                <Typography
                  value={messageDate}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                />
              </StyledTypographyWrapper>
            </StyledMessageInfo>

            <StyledMessageActionsWrapper className='actions'>
              <MessageActions
                onReplyClick={onReplyClick}
                onCopyClick={() => copyMessageText(messageText)}
              />
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
