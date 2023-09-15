import { useContext, useState } from 'react'
import styled from 'styled-components'

import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import { useChatMessagesHistoryService } from 'services/chat/useChatMessagesService'
import { useCreateAgentService } from 'services/agent/useCreateAgentService'
import { ToastContext } from 'contexts'

import ChatMessageListV2 from './ChatMessageList/ChatMessageListV2'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'
import { useNavigate } from 'react-router-dom'

const ChatHistory = () => {
  const { setToast } = useContext(ToastContext)

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const urlParams = new URLSearchParams(location.search)

  const agentId = urlParams.get('agent')
  const teamId = urlParams.get('team')

  const { data: chatHistory } = useChatMessagesHistoryService({
    agentId,
    teamId,
    isPrivateChat: false,
  })

  const { data: agentById } = useAgentByIdService({ id: agentId || '' })
  const agentName = agentById?.agent?.name

  const chatGreeting = agentById?.configs?.greeting || ''

  const [createAgentService] = useCreateAgentService()

  const values = {
    name: agentById?.agent?.name,
    role: agentById?.agent?.role,
    description: agentById?.agent?.description,
    is_template: agentById?.agent?.is_template,
    is_memory: agentById?.agent?.is_memory,
    temperature: agentById?.configs?.temperature,
    goals: agentById?.configs?.goals,
    constraints: agentById?.configs?.constraints,
    tools: agentById?.configs?.tools,
    instructions: agentById?.configs?.instructions,
    datasources: agentById?.configs?.datasources,
    model_version: agentById?.configs?.model_version,
    model_provider: agentById?.configs?.model_provider,
    suggestions: agentById?.configs?.suggestions,
    greeting: agentById?.configs?.greeting,
  }

  const handleCreate = async () => {
    // setIsLoading(true)
    // try {
    //   const res = await createAgentService(values)
    //   navigate(`/copilot?agent=${res.agent.id}`)
    // } catch (e) {
    //   console.log(e)
    // }
    // setIsLoading(false)
  }

  return (
    <StyledRoot>
      <StyledMessages>
        <ChatMessageListV2
          data={chatHistory}
          thinking={false}
          isNewMessage={false}
          setIsNewMessage={() => {}}
          setReply={() => {}}
          reply={{
            isReply: false,
            messageId: undefined,
            userId: undefined,
            version: undefined,
            messageText: undefined,
            isHuman: undefined,
          }}
          greeting={
            chatHistory &&
            chatHistory?.length === 0 &&
            (!agentId
              ? `Hello, you can chat with agents and teams on your dashboard.`
              : chatGreeting)
          }
          agentName={agentName}
        />
      </StyledMessages>

      <StyledButtonWrapper>
        <StyledButton onClick={handleCreate} disabled={isLoading} size={Button.sizes.MEDIUM}>
          {isLoading ? <Loader size={32} /> : 'Start Your Chat'}
        </StyledButton>
      </StyledButtonWrapper>
    </StyledRoot>
  )
}

export default ChatHistory

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledMessages = styled.main`
  // flex-grow: 1;
  width: 100%;
  display: flex;
  /* overflow-y: auto; */
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 80px; // To make space for input */
  height: calc(100vh - 240px);
  margin-top: 30px;
`
const StyledButtonWrapper = styled.div`
  position: fixed;
  left: 50%;
  z-index: 100001;
  bottom: -120px;
  transform: translateX(-50%);

  display: flex;
  /* flex-direction: column; */
  justify-content: center;

  width: 100%;
`
const StyledButton = styled(Button)`
  width: 400px;
`
