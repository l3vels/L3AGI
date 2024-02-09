import { ButtonSecondary, ButtonTertiary } from 'components/Button/Button'
import Table from 'components/Table'
import { useModal } from 'hooks'
import { t } from 'i18next'
import { StyledAddIcon } from 'pages/Navigation/MainNavigation'
import { useColumn } from 'pages/Sessions/columnConfig'
import { Chat } from 'pages/Sessions/useSession'
import { useCallsService } from 'plugins/contact/services/call/useCallsService'
import { useState } from 'react'
import { useChatsService } from 'services/chat/useChatsService'
import { Add } from 'share-ui/components/Icon/Icons'
import styled from 'styled-components'
import { getAgentTypeText } from 'utils/agentUtils'

const AgentSessionsTable = ({ agentId }: { agentId: string }) => {
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

  return (
    <StyledRoot>
      <Table
        columns={columnConfig}
        data={mappedData}
        setPage={setPage}
        page={page}
        totalPages={totalPages}
        isLoading={chatsLoading}
        // selectedRow={sessionId}
      />
    </StyledRoot>
  )
}

export default AgentSessionsTable

const StyledRoot = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`
