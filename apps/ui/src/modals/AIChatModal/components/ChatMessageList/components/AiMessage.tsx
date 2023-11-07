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
import TypographyPrimary from 'components/Typography/Primary'
import TypographyTertiary from 'components/Typography/Tertiary'
import { useModal } from 'hooks'
import { RUN_LOGS_MODAL_NAME } from 'modals/RunLogsModal'
import AudioPlayer from 'components/AudioPlayer'

type AiMessageProps = {
  agentName?: string
  teamName?: string
  avatarImg: string
  messageDate: string
  messageText: string
  version?: ChatMessageVersionEnum
  thoughts?: any[]
  isNewMessage: boolean
  runId: string
  setIsNewMessage: (state: boolean) => void
  onReplyClick?: () => void
  voice?: string
}

const AiMessage = ({
  agentName = '',
  teamName = '',
  avatarImg,
  messageDate,
  messageText,
  thoughts,
  isNewMessage,
  runId,
  setIsNewMessage,
  onReplyClick,
  voice,
}: AiMessageProps) => {
  function isMarkdownTable(markdownString: string) {
    const tableRegex = /(?<=(\r?\n){2}|^)([^\r\n]*\|[^\r\n]*(\r?\n)?)+(?=(\r?\n){2}|$)/
    return tableRegex.test(markdownString)
  }

  const isTable = isMarkdownTable(messageText)

  const name = agentName || teamName

  const { openModal } = useModal()

  const handleLogsClick = () => openModal({ name: RUN_LOGS_MODAL_NAME, data: { runId } })

  return (
    <>
      <StyledMessageWrapper>
        <StyledAvatarWrapper>
          <AvatarGenerator name={name} size={50} avatar={avatarImg} />
        </StyledAvatarWrapper>
        <StyledMainContent>
          <StyledMessageTop>
            <StyledMessageInfo>
              <TypographyPrimary
                value={agentName && teamName ? agentName : name}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
              />

              <TypographyTertiary
                value={messageDate}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
              />
            </StyledMessageInfo>

            <StyledMessageActionsWrapper className='actions'>
              <MessageActions
                onLogsClick={runId ? handleLogsClick : undefined}
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
            {voice && <AudioPlayer audioUrl={voice} />}
          </StyledMessageText>
        </StyledMainContent>
      </StyledMessageWrapper>
    </>
  )
}

export default memo(AiMessage)
