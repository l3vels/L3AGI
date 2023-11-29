import styled from 'styled-components'
import { RunLog } from 'types'
import HistoryCollapse from './HistoryCollapse'

type RunLogMessagesProps = {
  log: RunLog
}

const RunLogMessages = ({ log }: RunLogMessagesProps) => {
  const { messages } = log

  const filteredMessages = messages?.filter((message: any) => message.is_chat_history !== true)
  const historyMessages = messages?.filter((message: any) => message.is_chat_history === true)

  return (
    <StyledCards>
      <HistoryCollapse historyMessages={historyMessages} />

      {filteredMessages.map(({ name, content, is_chat_history }, index: number) => {
        // TODO: use is_chat_history to render chat history in collapse
        if (content?.length === 0) return <div />

        return (
          <StyledCard key={index}>
            <StyledTitle>{name}</StyledTitle>

            {content && (
              <StyledCodeCard>
                <StyledCodeContent>{content}</StyledCodeContent>
              </StyledCodeCard>
            )}
          </StyledCard>
        )
      })}
    </StyledCards>
  )
}

export default RunLogMessages

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: 20px;
`
//todo colors from theme
const StyledCard = styled.div`
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  background: #fff;
  color: #000;
`

export const StyledTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 18px;
  color: #000;
`

const StyledCodeCard = styled.div`
  margin-top: 15px;
  padding: 16px;
  background-color: #f1f1f1;
  border-radius: 10px;
`

const StyledCodeContent = styled.pre`
  margin: 0;
  padding: 0;
  font-family: monospace;
  white-space: pre-wrap;
  font-size: 12px;
  color: #000;
`
