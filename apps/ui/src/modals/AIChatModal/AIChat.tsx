import { useLocation } from 'react-router-dom'

import { ChatContextProvider } from './context/ChatContext'

import ChatV2 from './components/ChatV2'
import styled from 'styled-components'

import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import { useState } from 'react'

const AIChat = () => {
  const [activeTab, setActiveTab] = useState(0)

  const location = useLocation()

  return (
    <ChatContextProvider>
      {/* <StyledTabList size='small'>
        <Tab onClick={() => setActiveTab(0)}>Team</Tab>
        <Tab onClick={() => setActiveTab(1)}>Private</Tab>
      </StyledTabList> */}
      <ChatV2 />
      <StyledTabContext activeTabId={activeTab}>
        <TabPanels noAnimation className='TabsContextClass'>
          <TabPanel className='TabsContextClass'></TabPanel>

          <TabPanel>
            <ChatV2 />
          </TabPanel>
        </TabPanels>
      </StyledTabContext>
    </ChatContextProvider>
  )
}

export default AIChat

const StyledTabContext = styled(TabsContext)`
  width: 100%;

  .TabsContextClass {
    height: 100%;
  }
`
// const StyledTabList = styled(TabList)`
//   position: fixed;
//   z-index: 12000000;

//   left: 50%;

//   transform: translateX(-50%);
// `
