import ChatV2 from 'modals/AIChatModal/components/ChatV2'
import { ChatContextProvider } from 'modals/AIChatModal/context/ChatContext'

import { useState } from 'react'

import styled from 'styled-components'

import ChatWindowHeader from './chatWidgetComponents/ChatWindowHeader'
import { ButtonPrimary } from 'components/Button/Button'

import SessionForm from './chatWidgetComponents/SessionForm'

const ChatWindow = ({ closeWindow }: { closeWindow: () => void }) => {
  const [ShowForm, setShowForm] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

  const handleShowSessionForm = () => {
    setShowForm(true)
  }

  const handleHideForm = () => {
    setShowForm(false)
  }

  return (
    <StyledChatWindow>
      <ChatWindowHeader
        closeWindow={closeWindow}
        onBackClick={ShowForm ? handleHideForm : undefined}
      />

      <ChatContextProvider>
        {sessionId ? (
          <StyledChatWrapper>
            <ChatV2 chatSessionId={sessionId} />
          </StyledChatWrapper>
        ) : (
          <StyledChatBody>
            {!ShowForm && (
              <ButtonPrimary onClick={handleShowSessionForm}>Start Conversation</ButtonPrimary>
            )}
            {ShowForm && <SessionForm setSessionId={setSessionId} />}
          </StyledChatBody>
        )}
      </ChatContextProvider>
    </StyledChatWindow>
  )
}

export default ChatWindow

const StyledChatWindow = styled.div`
  width: calc(100vw - 30px);
  max-width: 450px;

  height: calc(75vh);

  border-radius: 10px;

  background-color: #fff;
  /* border: 1px solid #000; */

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

  /* padding: 0 10px; */
`
const StyledChatBody = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledChatWrapper = styled.div`
  height: calc(100% - 60px);

  padding: 0 10px;
`
