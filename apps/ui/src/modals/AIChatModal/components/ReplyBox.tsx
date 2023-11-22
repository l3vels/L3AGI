import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Typography from 'share-ui/components/typography/Typography'
import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/Close'

import { useHumanMessage } from './ChatMessageList/components/useHumanMessage'
import HumanMessageText from './ChatMessageList/components/HumanMessageText'
import { useAiMessage } from './ChatMessageList/components/useAiMessage'
import { ChatMessageVersionEnum } from 'services'
import AiMessageMarkdown from './ChatMessageList/components/AiMessageMarkdown'
import TypographyTertiary from 'components/Typography/Tertiary'
import TypographySecondary from 'components/Typography/Secondary'

type ReplyBoxProps = {
  reply: ReplyStateProps
  onClose: () => void
}

export type ReplyStateProps = {
  isReply: boolean
  messageId?: string
  userId?: string
  version?: ChatMessageVersionEnum
  messageText?: string
  isHuman?: boolean
}
export const defaultReplyState = {
  isReply: false,
}

const ReplyBox = ({ onClose, reply }: ReplyBoxProps) => {
  const { t } = useTranslation()
  const { wordArray, authorName } = useHumanMessage({
    messageText: reply.messageText || '',
    userId: reply.userId || '',
  })

  const { name } = useAiMessage(reply.version || ChatMessageVersionEnum.ChatConversational)

  return (
    <StyledReplyBox>
      <StyledReplyText>
        <StyledWidth>
          <TypographyTertiary
            value={t('replying-to')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledWidth>
        <StyledWidth>
          <TypographySecondary
            value={reply.isHuman ? `@${authorName}:` : `@${name}:`}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledWidth>
        {reply.isHuman ? (
          <StyledTextWrapper>
            <HumanMessageText textArray={wordArray} />
          </StyledTextWrapper>
        ) : (
          <StyledTextWrapper>
            <AiMessageMarkdown children={reply.messageText} />
          </StyledTextWrapper>
        )}
      </StyledReplyText>
      <IconButton
        size={IconButton.sizes?.SMALL}
        icon={() => <StyledCloseIcon size='22' />}
        kind={IconButton.kinds?.TERTIARY}
        onClick={onClose}
      />
    </StyledReplyBox>
  )
}

export default ReplyBox

const StyledReplyBox = styled.div`
  position: absolute;
  /* z-index: 100000000; */
  /* background: var(--primitives-gray-800, #383f4b); */
  width: 100%;
  height: 40px;
  top: -40px;
  left: 0;

  /* overflow: hidden; */

  background: ${({ theme }) => theme.body.replyBoxBgColor};
  backdrop-filter: blur(100px);
  /* box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25); */

  display: flex;

  justify-content: space-between;
  padding: 2px 10px;
  padding-left: 15px;

  border-radius: 8px;
  overflow: hidden;
`
const StyledReplyText = styled.div`
  display: flex;
  margin-top: 6px;
  gap: 5px;
  width: 100%;
`
const StyledTextWrapper = styled.div`
  font-size: 16px;
  opacity: 0.8;
  line-height: 26px;
`
const StyledWidth = styled.div`
  min-width: fit-content;
  margin-top: 1px;
`

const StyledCloseIcon = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.body.secondaryIconColor};
  }
`
