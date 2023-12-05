import styled from 'styled-components'
import DiscoverTeamAgents from './components/DiscoverTeamAgents'

import { StyledTabListWrapper } from 'styles/tabStyles.css'

import { t } from 'i18next'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DiscoverSystemAgents from './components/DiscoverSystemAgents'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'

const Discover = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const tabQuery = urlParams.get('tab')

  const defaultActiveTab = () => {
    if (tabQuery === 'team') return 0
    if (tabQuery === 'agent') return 1
  }

  const [activeTab, setActiveTab] = useState(defaultActiveTab || 0)
  const handleTabClick = (tabId: number, tabName: string) => {
    setActiveTab(tabId)
    navigate(`/discover?tab=${tabName}`)
  }

  return (
    <StyledRoot>
      <StyledTabListWrapper>
        <TabList activeTabId={activeTab}>
          <Tab onClick={() => handleTabClick(0, 'team')}>{`${t('team')}s`}</Tab>
          <Tab onClick={() => handleTabClick(1, 'agent')}>{`${t('agent')}s`}</Tab>
        </TabList>
      </StyledTabListWrapper>

      <TabsContext activeTabId={activeTab}>
        <TabPanels noAnimation>
          <TabPanel>
            <DiscoverTeamAgents />
          </TabPanel>
          <TabPanel>
            <DiscoverSystemAgents />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </StyledRoot>
  )
}

export default Discover

export const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
`
