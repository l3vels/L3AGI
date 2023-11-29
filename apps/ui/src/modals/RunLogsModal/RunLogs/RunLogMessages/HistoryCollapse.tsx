import styled, { css } from 'styled-components'
import { StyledTitle } from './RunLogMessages'
import { useState, useEffect, useRef } from 'react'
import {
  StyledNavigationChevronDown,
  StyledNavigationChevronUp,
} from 'pages/Agents/AgentForm/components/ShowAdvancedButton'

const HistoryCollapse = ({ historyMessages }: { historyMessages: any }) => {
  const [show, setShow] = useState(false)

  const historyContainerRef = useRef(null as any)

  useEffect(() => {
    if (show) {
      historyContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [show])

  return (
    <StyledHistoryContainer show={show} onClick={() => setShow(!show)} ref={historyContainerRef}>
      <StyledHeaderWrapper onClick={() => setShow(!show)}>
        <StyledTitle>History</StyledTitle>

        {show ? <StyledNavigationChevronUp /> : <StyledNavigationChevronDown />}
      </StyledHeaderWrapper>

      {historyMessages.map(({ content }: { content: string }, index: number) => {
        return (
          <>
            {content && (
              <StyledCodeContent>
                {index + 1}. {content}
              </StyledCodeContent>
            )}
          </>
        )
      })}
    </StyledHistoryContainer>
  )
}

export default HistoryCollapse

//todo colors from theme
const StyledHistoryContainer = styled.div<{ show: boolean }>`
  padding: 16px;
  background-color: #fff;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  max-height: 55px;
  overflow: hidden;

  ${props =>
    props.show &&
    css`
      max-height: fit-content;
    `}
`

const StyledCodeContent = styled.pre`
  margin: 0;
  padding: 0;
  font-family: monospace;
  white-space: pre-wrap;
  font-size: 12px;
  color: #000;
`
const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  cursor: pointer;
`
