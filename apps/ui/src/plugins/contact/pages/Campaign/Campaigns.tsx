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
import { useCreateCampaignService } from 'plugins/contact/services/campaign/useCreateCampaignService'
import { useGroupsService } from 'plugins/contact/services/group/useGroupsService'
import { useAgentsService } from 'services/agent/useAgentsService'

const Campaigns = () => {
  const { data: campaignsData } = useCampaignsService()

  const { data: groupsData } = useGroupsService()
  const { data: agentData } = useAgentsService()

  const [createCampaign] = useCreateCampaignService()

  const handleCreate = () => {
    createCampaign({
      name: 'test',
      agent_id: 'a0111379-637a-4136-89e2-d58ff144c49f',
      group_id: '26989bef-3420-4bb4-af8b-dd0e598f5bd5',
      type: 'outbound',
      start_date: '2023-12-19 13:31:21.160022+00',
    })
  }

  const tableData =
    campaignsData?.map((campaign: any) => ({
      id: campaign.id,
      name: campaign.name,
      agentId: agentData?.find(({ agent }) => agent.id === campaign.agent_id)?.agent.name,
      groupId: groupsData?.find(({ id }: { id: string }) => id === campaign.group_id)?.name,
      type: campaign.type,
    })) || []

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
