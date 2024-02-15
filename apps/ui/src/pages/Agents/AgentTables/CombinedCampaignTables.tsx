import { useState } from 'react'
import AgentCampaignTable from './AgentCampaignTable'
import AgentScheduleTable from './AgentScheduleTable'

import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import { t } from 'i18next'
import styled from 'styled-components'
import { ButtonSecondary } from 'components/Button/Button'
import { useModal } from 'hooks'

const CombinedCampaignTables = ({ agentId }: { agentId: string }) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (id: number) => {
    setActiveTab(id)
  }

  return (
    <StyledRoot>
      <TabList noBorder size='small' customWidth={200} activeTabId={activeTab}>
        <Tab onClick={() => handleTabClick(0)}>{t('campaigns')}</Tab>
        <Tab onClick={() => handleTabClick(1)}>{t('schedules')}</Tab>
      </TabList>

      <TabsContext activeTabId={activeTab}>
        <TabPanels noAnimation>
          <TabPanel>
            <AgentCampaignTable agentId={agentId} />
          </TabPanel>

          <TabPanel>
            <AgentScheduleTable agentId={agentId} />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </StyledRoot>
  )
}

export default CombinedCampaignTables

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 100%;
`
