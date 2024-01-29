import ChatV2 from 'modals/AIChatModal/components/ChatV2'
import { ChatContext, ChatContextProvider } from 'modals/AIChatModal/context/ChatContext'

import { useContext, useEffect, useState } from 'react'

import styled from 'styled-components'

import ChatWindowHeader from './chatWidgetComponents/ChatWindowHeader'
import { ButtonPrimary } from 'components/Button/Button'

import SessionForm from './chatWidgetComponents/SessionForm'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'

const ChatWindow = ({
  closeWindow,
  getChatDetails,
}: {
  closeWindow: () => void
  getChatDetails: (name: string, avatar: string) => void
}) => {
  const [ShowForm, setShowForm] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem('storedSessionId') || null,
  )

  const handleSetSessionId = (id: string) => {
    setSessionId(id)
    localStorage.setItem('storedSessionId', id)
  }

  const handleShowSessionForm = () => {
    setShowForm(true)
  }

  const handleHideForm = () => {
    setShowForm(false)
  }
  const scriptElement = document.getElementById('myWidgetScript') as HTMLScriptElement
  const scriptURL = new URL(scriptElement.src)
  const widgetId = scriptURL.searchParams.get('widgetId') || ''

  // const widgetId = (window as any)?.widgetData?.widgetId || '66c9972f-7e36-41b2-a202-a64d760b6092'
  // const accountKey = (window as any)?.widgetData?.accountKey

  const { data: agentById } = useAgentByIdService({ id: widgetId })

  const { setChatId, setUserId } = useContext(ChatContext)

  useEffect(() => {
    if (sessionId) setChatId(sessionId)
    if (agentById?.agent.created_by) setUserId(agentById?.agent.created_by)
  }, [sessionId, agentById])

  const handleNewConversation = () => {
    setSessionId(null)
    localStorage.removeItem('storedSessionId')
  }

  useEffect(() => {
    if (sessionId && ShowForm) setShowForm(false)
  }, [sessionId])

  useEffect(() => {
    if (agentById?.agent.name && agentById?.agent.avatar)
      getChatDetails(agentById?.agent.name, agentById?.agent.avatar)
  }, [agentById])

  return (
    <StyledChatWindow>
      <ChatWindowHeader
        closeWindow={closeWindow}
        onBackClick={ShowForm ? handleHideForm : undefined}
        name={agentById?.agent.name}
        avatar={agentById?.agent.avatar}
        restart={sessionId ? handleNewConversation : undefined}
      />

      {sessionId ? (
        <StyledChatWrapper>
          <ChatV2 chatSessionId={sessionId} />
        </StyledChatWrapper>
      ) : (
        <StyledChatBody>
          {!ShowForm && (
            <ButtonPrimary onClick={handleShowSessionForm}>Start Conversation</ButtonPrimary>
          )}
          {ShowForm && <SessionForm setSessionId={handleSetSessionId} />}
        </StyledChatBody>
      )}
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
