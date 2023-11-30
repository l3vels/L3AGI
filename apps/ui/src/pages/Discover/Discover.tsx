import styled from 'styled-components'
import DiscoverTeamAgents from './components/DiscoverTeamAgents'

import { StyledTab, StyledTabListSpan, StyledTabListWrapper } from 'styles/tabStyles.css'

import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import { t } from 'i18next'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DiscoverSystemAgents from './components/DiscoverSystemAgents'

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
          <StyledTab onClick={() => handleTabClick(0, 'team')}>
            <StyledTabListSpan>{`${t('team')}s`}</StyledTabListSpan>
          </StyledTab>
          <StyledTab onClick={() => handleTabClick(1, 'agent')}>
            <StyledTabListSpan>{`${t('agent')}s`}</StyledTabListSpan>
          </StyledTab>
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
