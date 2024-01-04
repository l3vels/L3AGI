import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useCampaignsService } from 'plugins/contact/services/campaign/useCampaignsService'

import { StyledTableWrapper } from '../Contact/Contacts'
import Table from 'components/Table'
import TableActionButtons from 'components/Table/components/TableActionButtons'
import { useMemo } from 'react'
import { t } from 'i18next'

const Campaigns = () => {
  const { data: campaignsData } = useCampaignsService()

  const tableData =
    campaignsData?.map((campaign: any) => ({
      id: campaign.id,
      name: campaign.name,
      agentId: campaign.agent_id,
      groupId: campaign.group_id,
      type: campaign.type,
    })) || []

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 290,
      },

      {
        Header: 'Actions',
        accessor: 'id',
        width: 100,
        Cell: ({ cell }: any) => {
          return <TableActionButtons onDeleteClick={() => {}} onEditClick={() => {}} />
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
          <ButtonPrimary onClick={() => {}} size={'small'}>
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
