// import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import Add from 'share-ui/components/Icon/Icons/components/Add'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledTableWrapper } from 'plugins/contact/pages/Contact/Contacts'
import Table from 'components/Table'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import useInviteUsers from './useInviteUsers'
import SharedAccess from './SharedAccess'

import ListHeader from 'routes/components/ListHeader'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import { useState } from 'react'
import styled from 'styled-components'

const InviteUsers = () => {
  const navigate = useNavigate()
  const { data, fetch_data_loading, columns } = useInviteUsers()

  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  return (
    <StyledSectionWrapper>
      <StyledTabsWrapper>
        <TabList size='small' activeTabId={activeTab} noBorder>
          <Tab onClick={() => handleTabClick(0)}>Invite Users</Tab>
          <Tab onClick={() => handleTabClick(1)}>Access</Tab>
        </TabList>
        <StyledHeaderGroup className='header_group'>
          {activeTab === 0 && (
            <ButtonPrimary
              onClick={() => navigate('/invite-user/invite')}
              size={Button.sizes?.SMALL}
            >
              Invite User
            </ButtonPrimary>
          )}
        </StyledHeaderGroup>
      </StyledTabsWrapper>

      <TabsContext activeTabId={activeTab}>
        <TabPanels noAnimation>
          <TabPanel>
            <ComponentsWrapper noPadding>
              <StyledTableWrapper>
                <Table columns={columns} data={data} isLoading={fetch_data_loading} />
              </StyledTableWrapper>
            </ComponentsWrapper>
          </TabPanel>

          <TabPanel>
            <SharedAccess />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </StyledSectionWrapper>
  )
}

export default InviteUsers

const StyledTabsWrapper = styled.div`
  display: flex;
`
