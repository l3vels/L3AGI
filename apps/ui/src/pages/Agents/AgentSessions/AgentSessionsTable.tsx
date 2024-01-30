import Table from 'components/Table'
import { useColumn } from 'pages/Sessions/columnConfig'
import { useChatsService } from 'services/chat/useChatsService'
import styled from 'styled-components'

const AgentSessionsTable = ({ agentId }: { agentId: string }) => {
  const { data: chatData } = useChatsService({ filter: [agentId] })

  const columnConfig = useColumn({ noAgent: true })

  return (
    <StyledRoot>
      <Table
        columns={columnConfig}
        data={chatData}
        // setPage={setPage}
        // page={page}
        // totalPages={totalPages}
        // isLoading={chatsLoading}
        // selectedRow={sessionId}
      />
    </StyledRoot>
  )
}

export default AgentSessionsTable

const StyledRoot = styled.div``
