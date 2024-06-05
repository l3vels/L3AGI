import { useState } from 'react'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import {
  StyledChatWrapper,
  StyledContainer,
  StyledHorizontalDivider,
  StyledLeftColumn,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import { SUBNETS } from './constants'

import ListHeader from 'routes/components/ListHeader'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'

import ApiKeysPanel from './panels/ApiKeysPanel'
import GeneralPanel from './panels/GeneralPanel'
import LogsPanel from './panels/LogsPanel'

const Subnets = () => {
  const [activeSubnet, setActiveSubnet] = useState(SUBNETS[0])

  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          <StyledLeftColumn>
            <ListHeader title={'Subnet APIs'} />
            {SUBNETS.map(subnet => {
              return (
                <MiniToolCard
                  key={subnet.name}
                  onClick={() => {
                    setActiveTab(0)
                    setActiveSubnet(subnet)
                  }}
                  name={subnet.name}
                  logo={subnet.logo}
                  picked={activeSubnet === subnet}
                />
              )
            })}
          </StyledLeftColumn>
          <StyledChatWrapper>
            <TabList size='small' activeTabId={activeTab} noBorder>
              <Tab onClick={() => handleTabClick(0)}>General</Tab>
              <Tab onClick={() => handleTabClick(1)}>Api keys</Tab>
              <Tab onClick={() => handleTabClick(2)}>Logs</Tab>
            </TabList>

            <StyledHorizontalDivider />

            <TabsContext activeTabId={activeTab}>
              <TabPanels noAnimation>
                <TabPanel>
                  <GeneralPanel activeSubnet={activeSubnet} />
                </TabPanel>

                <TabPanel>
                  <ApiKeysPanel />
                </TabPanel>

                <TabPanel>
                  <LogsPanel />
                </TabPanel>
              </TabPanels>
            </TabsContext>
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default Subnets
