import { useLocation } from 'react-router-dom'

import { ChatContextProvider } from './context/ChatContext'

import ChatV2 from './components/ChatV2'
import styled from 'styled-components'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import { useState } from 'react'
import ChatMessageListV2 from './components/ChatMessageList/ChatMessageListV2'
import { ReplyStateProps } from './components/ReplyBox'
import { useChatMessagesHistoryService } from 'services/chat/useChatMessagesService'

const AIChat = () => {
  const [activeTab, setActiveTab] = useState(0)

  const location = useLocation()

  const text = location?.state?.text
  const apiVersion = location?.state?.apiVersion

  return (
    <ChatContextProvider initialApiVersion={apiVersion} isPrivateChat={activeTab === 1}>
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
            <ChatV2 isPrivate />
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
