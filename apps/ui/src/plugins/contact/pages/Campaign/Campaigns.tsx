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
        width: 150,
      },
      {
        Header: 'Agent',
        accessor: 'agentId',
        width: 150,
      },
      {
        Header: 'Group',
        accessor: 'groupId',
        width: 150,
      },
      {
        Header: 'Type',
        accessor: 'type',
        width: 100,
      },
      {
        Header: 'Actions',
        accessor: 'id',
        width: 50,
        Cell: ({ cell }: any) => {
          return (
            <TableActionButtons
              onDeleteClick={() => deleteCampaignHandler(cell.value)}
              onEditClick={() => navigate(`/schedule/${cell.value}/edit-campaign`)}
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
        <StyledTableWrapper>
          <Table columns={columns} data={tableData} />
        </StyledTableWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Campaigns
