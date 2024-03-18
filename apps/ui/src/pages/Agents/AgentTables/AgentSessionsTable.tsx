import Table from 'components/Table'

import ChatV2 from 'modals/AIChatModal/components/ChatV2'
import { ChatContextProvider } from 'modals/AIChatModal/context/ChatContext'
import { StyledCloseIcon } from 'pages/Home/GetStarted/GetStartedContainer'

import { useColumn } from 'pages/Sessions/columnConfig'
import { Chat } from 'pages/Sessions/useSession'
import { useCallsService } from 'plugins/contact/services/call/useCallsService'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useChatsService } from 'services/chat/useChatsService'
import { Close, NavigationDoubleChevronLeft } from 'share-ui/components/Icon/Icons'
import IconButton from 'share-ui/components/IconButton/IconButton'
import styled from 'styled-components'
import { getAgentTypeText } from 'utils/agentUtils'

const AgentSessionsTable = ({ agentId }: { agentId: string }) => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)

  const {
    data: chatData,
    count: chatsCount,
    loading: chatsLoading,
  } = useChatsService({ filter: [agentId], itemsCount: 20, page })

  const { data: calls } = useCallsService()

  const totalPages = Math.ceil(chatsCount / 20)

  const columnConfig = useColumn({ noAgent: true })

  const mappedData = chatData?.map((chat: Chat) => ({
    id: chat?.id,
    name: chat?.name,
    agent_name: `${chat?.agent?.agent?.name} · ${getAgentTypeText(chat?.agent?.agent?.agent_type)}`,
    gent_role: chat?.agent?.agent?.role,
    gent_description: chat?.agent?.agent?.description,
    agent_id: chat?.agent?.agent?.id,
    team_name: chat?.team?.team?.name,
    added_At: chat?.created_on,
    voice_url: chat?.voice_url,
    sentiment: calls?.find((call: any) => call.chat_id === chat.id)?.sentiment,
    status: calls?.find((call: any) => call.chat_id === chat.id)?.status,
  }))

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const sessionId = urlParams.get('session')

  return (
    <StyledRoot>
      <Table
        columns={columnConfig}
        data={mappedData}
        setPage={setPage}
        page={page}
        totalPages={totalPages}
        isLoading={chatsLoading}
        selectedRow={sessionId}
      />

      <StyledChatWrapper isHidden={sessionId ? false : true}>
        <IconButton
          icon={() => <StyledIcon />}
          onClick={() => navigate(`/chat?tab=sessions&agent=${agentId}`)}
          kind={IconButton.kinds?.TERTIARY}
          size={IconButton.sizes?.SMALL}
        />
        {sessionId && (
          <ChatContextProvider>
            <ChatV2 />
          </ChatContextProvider>
        )}
      </StyledChatWrapper>
    </StyledRoot>
  )
}

export default AgentSessionsTable

const StyledRoot = styled.div`
  height: 100%;
  width: 100%;

  display: flex;

  gap: 20px;

  position: relative;

  overflow: hidden;
`

const StyledChatWrapper = styled.div<{ isHidden?: boolean }>`
  position: absolute;
  background: ${({ theme }) => theme.body.componentsWrapperBg};
  top: 0;

  right: ${({ isHidden }) => (isHidden ? '-50%' : '0')}; // Hide or show based on isHidden
  z-index: 2;
  width: 50%;
  height: calc(100% - 50px);
  padding: 10px 20px;

  transition: right 0.5s ease-in-out; // Smooth transition for the sliding effect

  display: flex;
  flex-direction: column;
  gap: 10px;

  border: ${({ theme }) => theme.body.border};
  border-radius: 8px;
`
const StyledIcon = styled(NavigationDoubleChevronLeft)`
  transform: rotate(180deg);
`
