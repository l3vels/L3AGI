import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { StyledTableWrapper } from '../Contact/Contacts'
import Table from 'components/Table'
import TableActionButtons from 'components/Table/components/TableActionButtons'
import { useMemo } from 'react'
import { t } from 'i18next'
import { useCampaigns } from './useCampaigns'
import { useNavigate } from 'react-router-dom'
import IconButton from 'share-ui/components/IconButton/IconButton'
import { StyledIconWrapper } from 'components/ChatCards/TeamChatCard'
import { StyledOpenIcon } from 'pages/Sessions/columnConfig'

const Campaigns = () => {
  const navigate = useNavigate()
  const { tableData, deleteCampaignHandler } = useCampaigns()

  const handleCreate = () => {
    navigate(`/schedules/create-campaign`)
  }

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
        Header: 'Agent',
        accessor: 'agentId',
        width: 80,
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
        width: 50,
      },
      {
        Header: 'Busy',
        accessor: 'busyCalls',
        width: 50,
      },
      {
        Header: 'Completed',
        accessor: 'completedCalls',
        width: 50,
      },
      {
        Header: 'Actions',
        accessor: 'id',
        width: 80,
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

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{`${t('campaigns')}`}</StyledSectionTitle>
        </div>
        <div>
          <ButtonPrimary onClick={handleCreate} size={'small'}>
            {`${t('add-campaign')}`}
          </ButtonPrimary>
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <Table columns={columns} data={tableData} expand />
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Campaigns
