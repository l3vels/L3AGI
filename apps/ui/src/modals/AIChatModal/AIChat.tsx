import { useLocation } from 'react-router-dom'

import { ChatContextProvider } from './context/ChatContext'

import ChatV2 from './components/ChatV2'
import styled from 'styled-components'

import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
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
      <StyledTabContext activeTabId={activeTab}>
        <TabPanels noAnimation className='TabsContextClass'>
          <TabPanel className='TabsContextClass'>
            <ChatV2 />
          </TabPanel>

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
