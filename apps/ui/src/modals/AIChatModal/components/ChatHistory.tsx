import { useContext, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useChatMessagesHistoryService } from 'services/chat/useChatMessagesService'

import ChatMessageListV2 from './ChatMessageList/ChatMessageListV2'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { useCreateAgentFromTemplateService } from 'services/agent/useCreateAgentFromTemplateService'
import { useCheckAgentIsCreatedService } from 'services/agent/useCheckAgentIsCreatedService'
import { useCreateTeamOfAgentsFromTemplateService } from 'services/team/useCreateTeamOfAgentsFromTemplateService'
import { useCheckTeamIsCreatedService } from 'services/team/useCheckTeamIsCreatedService'
import { AuthContext } from 'contexts'
import { useModal } from 'hooks'

import ChatMembers from './ChatMembers'

import { useDiscoverAgentByIdService } from 'services/discover/useDiscoverAgentById'
import { useDiscoverTeamByIdService } from 'services/discover/useDiscoverTeamById'

const ChatHistory = () => {
  const { t } = useTranslation()
  const { user } = useContext(AuthContext)

  const { openModal } = useModal()

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const urlParams = new URLSearchParams(location.search)

  const agentId = urlParams.get('agent')
  const teamId = urlParams.get('team')

  const { data: chatHistory, loading: historyLoading } = useChatMessagesHistoryService({
    agentId,
    teamId,
  })

  const { data: agentById } = useDiscoverAgentByIdService({ id: agentId || '' })
  const agentName = agentById?.agent?.name

  const { data: teamById } = useDiscoverTeamByIdService({ id: teamId || '' })

  const chatGreeting = agentById?.configs?.greeting || ''

  const [createAgentFromTemplate] = useCreateAgentFromTemplateService()
  const [createTeamOfAgentsFromTemplate] = useCreateTeamOfAgentsFromTemplateService()

  const { data: agentFromTemplate } = useCheckAgentIsCreatedService({ id: agentId || '' })
  const { data: teamFromTemplate } = useCheckTeamIsCreatedService({ id: teamId || '' })

  const handleCreate = async () => {
    if (!user) return openModal({ name: 'login-modal' })

    if (agentFromTemplate) return navigate(`/chat?agent=${agentFromTemplate.agent.id}`)

    if (teamFromTemplate) return navigate(`/chat?team=${teamFromTemplate.id}`)

    setIsLoading(true)
    try {
      if (agentId) {
        const res = await createAgentFromTemplate({ id: agentId })
        navigate(`/chat?agent=${res.agent.id}`)
      } else if (teamId) {
        const res = await createTeamOfAgentsFromTemplate({ id: teamId })
        navigate(`/chat?team=${res.id}`)
      }
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  return (
    <StyledRoot>
      {(agentById || teamById) && (
        <StyledMembersWrapper>
          <ChatMembers agentById={agentById} teamOfAgents={teamById} isHistory />
        </StyledMembersWrapper>
      )}

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
            !historyLoading &&
            chatHistory &&
            chatHistory?.length === 0 &&
            (!agentId ? `${t('greeting-description')}` : chatGreeting)
          }
          agentName={agentName || 'Agent'}
        />
      </StyledMessages>

      <StyledButtonWrapper>
        <StyledButton onClick={handleCreate} disabled={isLoading} size={Button.sizes?.MEDIUM}>
          {isLoading ? <Loader size={32} /> : `${t('start-your-chat')}`}
        </StyledButton>
      </StyledButtonWrapper>
    </StyledRoot>
  )
}

export default ChatHistory

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
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
  /* position: fixed;
  left: 50%;
  z-index: 100001;
  bottom: 20px;
  transform: translateX(-50%); */
  margin-top: 70px;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;

  width: 100%;
`
const StyledButton = styled(Button)`
  width: 400px;
`
const StyledMembersWrapper = styled.div`
  position: absolute;
  top: 80px;
  right: 5px;

  z-index: 12000000;

  overflow: auto;

  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  /* background: rgba(0, 0, 0, 0.3); */

  height: calc(100vh - 240px);

  @media only screen and (max-width: 1400px) {
    display: none;
  }
`
