import { StyledIconWrapper } from 'components/ChatCards/TeamChatCard'
import Table from 'components/Table'
import TableActionButtons from 'components/Table/components/TableActionButtons'
import { StyledOpenIcon } from 'pages/Sessions/columnConfig'
import { useCampaigns } from 'plugins/contact/pages/Campaign/useCampaigns'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from 'share-ui/components/IconButton/IconButton'

const AgentCampaignTable = ({ agentId }: { agentId: string }) => {
  const navigate = useNavigate()

  const { tableData, deleteCampaignHandler } = useCampaigns()

  const filteredData = tableData?.filter((item: any) => item.agentId === agentId)

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 120,
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: 100,
      },

      {
        Header: 'Group',
        accessor: 'groupId',
        width: 100,
      },
      {
        Header: 'Type',
        accessor: 'type',
        width: 70,
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        width: 100,
      },
      {
        Header: 'Total Calls',
        accessor: 'totalCalls',
        width: 100,
      },
      {
        Header: 'Busy',
        accessor: 'busyCalls',
        width: 50,
      },
      {
        Header: 'Completed',
        accessor: 'completedCalls',
        width: 100,
      },
      {
        Header: 'Actions',
        accessor: 'id',
        width: 100,

        Cell: ({ cell }: any) => {
          return (
            <TableActionButtons
              onDeleteClick={() => deleteCampaignHandler(cell.value)}
              onEditClick={() => navigate(`/schedules/${cell.value}/edit-campaign`)}
              customActions={
                <IconButton
                  onClick={() => navigate(`/sessions?campaign=${cell.value}`)}
                  icon={() => (
                    <StyledIconWrapper>
                      <StyledOpenIcon />
                    </StyledIconWrapper>
                  )}
                  size={IconButton.sizes?.SMALL}
                  kind={IconButton.kinds?.TERTIARY}
                  ariaLabel='Go to Threads'
                />
              }
            />
          )
        },
      },
    ],
    [],
  )

  return <Table columns={columns} data={filteredData} />
}

export default AgentCampaignTable
