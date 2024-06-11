import { useState } from 'react'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import {
  StyledChatWrapper,
  StyledContainer,
  StyledHorizontalDivider,
  StyledLeftColumn,
  StyledMainWrapper,
  StyledRightColumn,
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
import LogsPanel from './panels/LogsPanel/LogsPanel'
import { StyledDetailsBox } from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import styled from 'styled-components'
import TypographyPrimary from 'components/Typography/Primary'
import Dropdown from 'share-ui/components/Dropdown/Dropdown'

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

        {activeTab === 2 && (
          <StyledRightColumn>
            <StyledDetailsBox>
              <StyledFiltersContainer>
                <StyledFilterWrapper>
                  <TypographyPrimary value='Start date' size='small' />
                  <StyledDateInput type='date' placeholder='Start date' />
                </StyledFilterWrapper>
                <StyledFilterWrapper>
                  <TypographyPrimary value='End date' size='small' />
                  <StyledDateInput type='date' />
                </StyledFilterWrapper>

                <StyledFilterWrapper>
                  <TypographyPrimary value='HTTP Method' size='small' />
                  <Dropdown options={METHOD_OPTIONS} />
                </StyledFilterWrapper>

                <StyledFilterWrapper>
                  <TypographyPrimary value='Status Code' size='small' />
                  <Dropdown options={STATUS_OPTIONS} />
                </StyledFilterWrapper>
              </StyledFiltersContainer>
            </StyledDetailsBox>
          </StyledRightColumn>
        )}
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default Subnets

const StyledDateInput = styled.input`
  border-radius: 4px;
  border: 2px solid transparent; // Ensures the border size is consistent

  &:hover,
  &:focus {
    border-color: black;
  }
`
const StyledFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyledFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`
const METHOD_OPTIONS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'HEAD', label: 'HEAD' },
  { value: 'OPTIONS', label: 'OPTIONS' },
]

const STATUS_OPTIONS = [
  { value: '200 - OK', label: '200 - OK' },
  { value: '201 - Created', label: '201 - Created' },
  { value: '202 - Accepted', label: '202 - Accepted' },
  { value: '204 - No Content', label: '204 - No Content' },
  { value: '301 - Moved Permanently', label: '301 - Moved Permanently' },
  { value: '302 - Found', label: '302 - Found' },
  { value: '304 - Not Modified', label: '304 - Not Modified' },
  { value: '400 - Bad Request', label: '400 - Bad Request' },
  { value: '401 - Unauthorized', label: '401 - Unauthorized' },
  { value: '403 - Forbidden', label: '403 - Forbidden' },
  { value: '404 - Not Found', label: '404 - Not Found' },
  { value: '500 - Internal Server Error', label: '500 - Internal Server Error' },
  { value: '502 - Bad Gateway', label: '502 - Bad Gateway' },
  { value: '503 - Service Unavailable', label: '503 - Service Unavailable' },
  { value: '504 - Gateway Timeout', label: '504 - Gateway Timeout' },
]
