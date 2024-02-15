import { ButtonSecondary } from 'components/Button/Button'
import { StyledIconWrapper } from 'components/ChatCards/TeamChatCard'
import Table from 'components/Table'
import TableActionButtons from 'components/Table/components/TableActionButtons'
import { useModal } from 'hooks'
import { t } from 'i18next'
import { StyledOpenIcon } from 'pages/Sessions/columnConfig'
import { useCampaigns } from 'plugins/contact/pages/Campaign/useCampaigns'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from 'share-ui/components/IconButton/IconButton'
import styled from 'styled-components'

const AgentCampaignTable = ({ agentId }: { agentId: string }) => {
  const navigate = useNavigate()

  const { tableData, deleteCampaignHandler } = useCampaigns()

  const { openModal } = useModal()

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
              onEditClick={() =>
                openModal({ name: 'edit-campaign-modal', data: { campaignId: cell.value } })
              }
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

  return (
    <StyledRoot>
      <StyledButtonWrapper>
        <ButtonSecondary
          onClick={() => openModal({ name: 'create-campaign-modal', data: { agentId } })}
        >
          {t('add-campaign')}
        </ButtonSecondary>
      </StyledButtonWrapper>
      <Table columns={columns} data={filteredData} />
    </StyledRoot>
  )
}

export default AgentCampaignTable

export const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  height: 100%;
  position: relative;
`
export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: -50px;
  right: 0;
`
