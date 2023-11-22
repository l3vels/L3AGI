import { useState } from 'react'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'

import styled from 'styled-components'
import Filter from './Components/Filter'
import LogList from './Components/LogList'
import Details from './Components/Details'
import useLog from './useLog'
// import HeaderWrapper from 'components/HeaderWrapper'
// import { StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'
// import useFilter from './Components/useFilter'
import HeaderWrapper from 'components/HeaderWrapper'
import {
  StyledHeaderGroup,
  // StyledContainerWrapper,
  StyledInnerWrapper,
} from 'styles/globalStyle.css'
import SuccessfulPage from './Components/SuccessfulPage/SuccessfulPage'
import SuccessfulPageDetails from './Components/SuccessfulPage/SuccessfulPageDetails'
import FailedPage from './Components/FailedPage/FailedPage'
import FailedPageDetails from './Components/FailedPage/FailedPageDetails'
import { EmptyScreen } from './Components/EmptyScreen/EmptyScreen'
import { StyledGroupContainer } from 'components/Layout/LayoutStyle'

const Log = () => {
  const [activeTab, setActiveTab] = useState(0)

  const { log_list, filter } = useLog()

  const log = log_list

  const successLog = log_list.filter((log: { status: string }) => log.status === '200')
  const failedLog = log_list.filter((log: { status: string }) => log.status === '400')

  return (
    <StyledGroupContainer mt='20'>
      <div id='header_group'>
        <div id='inner_navigation'>
          <HeaderWrapper>
            <StyledHeaderGroup>
              <TabList>
                <Tab onClick={() => setActiveTab(0)}>All</Tab>
                <Tab onClick={() => setActiveTab(1)}>Successful</Tab>
                <Tab onClick={() => setActiveTab(2)}>Failed</Tab>
              </TabList>
            </StyledHeaderGroup>
          </HeaderWrapper>

          <StyledInnerWrapper>
            <TabsContext activeTabId={activeTab}>
              <TabPanels>
                <TabPanel>
                  <Filter filter={filter} />
                  <StyledPanelContainer>
                    {log.length > 0 ? (
                      <>
                        <LogList items={log_list} />
                        <Details log={log} />
                      </>
                    ) : (
                      <EmptyScreen />
                    )}
                  </StyledPanelContainer>
                </TabPanel>

                <TabPanel>
                  <Filter filter={filter} />
                  <StyledPanelContainer>
                    {successLog.length > 0 ? (
                      <>
                        <SuccessfulPage items={successLog} />
                        <SuccessfulPageDetails log={successLog} />
                      </>
                    ) : (
                      <EmptyScreen />
                    )}
                  </StyledPanelContainer>
                </TabPanel>

                <TabPanel>
                  <Filter filter={filter} />
                  <StyledPanelContainer>
                    {failedLog.length > 0 ? (
                      <>
                        <FailedPage items={failedLog} />
                        <FailedPageDetails log={failedLog} />
                      </>
                    ) : (
                      <EmptyScreen />
                    )}
                  </StyledPanelContainer>
                </TabPanel>
              </TabPanels>
            </TabsContext>
          </StyledInnerWrapper>
        </div>
      </div>
    </StyledGroupContainer>
  )
}

export default Log

export const StyledRoot = styled.div`
  margin-top: 30px;
  position: relative;
  display: flex;
  flex-direction: column;

  gap: 24px;
`

const StyledPanelContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 33px;
  padding-top: 37px;
`
