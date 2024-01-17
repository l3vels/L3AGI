import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { useLocation, useNavigate } from 'react-router-dom'

import { useSchedules } from './useSchedules'
import { StyledTableWrapper } from 'plugins/contact/pages/Contact/Contacts'
import TableActionButtons from 'components/Table/components/TableActionButtons'
import { useMemo, useState } from 'react'
import Table from 'components/Table'
import { useScheduleForm } from './ScheduleFrom/useScheduleForm'
import Campaigns from 'plugins/contact/pages/Campaign/Campaigns'

import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import { StyledTabListWrapper, StyledTabRootWrapper } from 'styles/tabStyles.css'
import { t } from 'i18next'
import styled from 'styled-components'

const Schedules = () => {
  const navigate = useNavigate()

  const { deleteScheduleHandler, schedules } = useSchedules()
  const { options } = useScheduleForm()

  const tableData =
    schedules?.map(({ schedule, configs }) => ({
      id: schedule.id,
      name: schedule.name,
      recurring: schedule.interval ? schedule.interval : '-',
      status: schedule.is_active ? 'Active' : 'Inactive',
      create_session: configs.create_session_on_run ? 'True' : 'False',
      runner: options?.find((option: { label: string; value: string }) => {
        return (
          option.value === configs.agent_id ||
          option.value === configs.team_id ||
          option.value === configs.chat_id
        )
      })?.label,
    })) || []

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 290,
      },
      {
        Header: 'Runner',
        accessor: 'runner',
        width: 200,
      },
      {
        Header: 'Recurring Interval',
        accessor: 'recurring',
        width: 160,
      },
      {
        Header: 'Session Each Run',
        accessor: 'create_session',
        width: 160,
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: 70,
      },

      {
        Header: 'Actions',
        accessor: 'id',
        width: 100,
        Cell: ({ cell }: any) => {
          return (
            <TableActionButtons
              onDeleteClick={() => deleteScheduleHandler(cell.value)}
              onEditClick={() => navigate(`/schedules/${cell.value}/edit-schedule`)}
            />
          )
        },
      },
    ],
    [],
  )

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const tabQuery = urlParams.get('tab')

  const defaultActiveTab = () => {
    if (tabQuery === 'campaign') return 0
    if (tabQuery === 'schedule') return 1
  }

  const [activeTab, setActiveTab] = useState(defaultActiveTab || 0)
  const handleTabClick = (tabId: number, tabName: string) => {
    setActiveTab(tabId)
    navigate(`/schedules?tab=${tabName}`)
  }

  return (
    <StyledTabRootWrapper>
      <StyledPositionDiv>
        <StyledTabListWrapper>
          <TabList activeTabId={activeTab}>
            <Tab onClick={() => handleTabClick(0, 'campaign')}>{`${t('campaigns')}`}</Tab>
            <Tab onClick={() => handleTabClick(1, 'schedule')}>{`${t('schedules')}`}</Tab>
          </TabList>
        </StyledTabListWrapper>
      </StyledPositionDiv>

      <TabsContext activeTabId={activeTab}>
        <TabPanels noAnimation>
          <TabPanel>
            <Campaigns />
          </TabPanel>
          <TabPanel>
            <StyledSectionWrapper>
              <StyledHeaderGroup className='header_group'>
                <div>
                  <StyledSectionTitle>{`${t('schedules')}`}</StyledSectionTitle>
                </div>
                <div>
                  <ButtonPrimary
                    onClick={() => navigate('/schedules/create-schedule')}
                    size={'small'}
                  >
                    {`${t('add-schedule')}`}
                  </ButtonPrimary>
                </div>
              </StyledHeaderGroup>

              <ComponentsWrapper noPadding>
                <Table columns={columns} data={tableData} expand />
              </ComponentsWrapper>
            </StyledSectionWrapper>
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </StyledTabRootWrapper>
  )
}

export default Schedules

const StyledPositionDiv = styled.div`
  margin-right: 100px;
`
