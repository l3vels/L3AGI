import Table from 'components/Table'
import { useColumn } from 'pages/Sessions/columnConfig'
import { useChatsService } from 'services/chat/useChatsService'

const AgentSessionsTable = ({ agentId }: { agentId: string }) => {
  const { data: chatData } = useChatsService({ filter: [agentId] })

  const columnConfig = useColumn({ noAgent: true })

  return (
    <Table
      columns={columnConfig}
      data={chatData}
      // setPage={setPage}
      // page={page}
      // totalPages={totalPages}
      // isLoading={chatsLoading}
      // selectedRow={sessionId}
    />
  )
}

export default AgentSessionsTable
