import styled from 'styled-components'
import DiscoverTeamAgents from './components/DiscoverTeamAgents'
import DiscoverTemplateAgents from './components/DiscoverTemplateAgents'

import { StyledTab, StyledTabListSpan, StyledTabListWrapper } from 'styles/tabStyles.css'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import { t } from 'i18next'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Discover = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const tabQuery = urlParams.get('tab')

  const defaultActiveTab = () => {
    if (tabQuery === 'agent') return 0
    if (tabQuery === 'team') return 1
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
          <StyledTab onClick={() => handleTabClick(0, 'agent')}>
            <StyledTabListSpan>{`${t('agent')}s`}</StyledTabListSpan>
          </StyledTab>
          <StyledTab onClick={() => handleTabClick(1, 'team')}>
            <StyledTabListSpan>{`${t('team')}s`}</StyledTabListSpan>
          </StyledTab>
        </TabList>
      </StyledTabListWrapper>

      <TabsContext activeTabId={activeTab}>
        <TabPanels noAnimation>
          <TabPanel>
            <DiscoverTemplateAgents />
          </TabPanel>
          <TabPanel>
            <DiscoverTeamAgents />
          </TabPanel>
        </TabPanels>
      </TabsContext>

      {/* {<DiscoverSystemAgents />} */}

      {/* {!user && <Toolkit isPublic />} */}
    </StyledRoot>
  )
}

export default Discover

export const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
`
