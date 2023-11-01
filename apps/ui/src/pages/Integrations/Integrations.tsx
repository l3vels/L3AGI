import { useState } from 'react'

import Toolkit from 'pages/Toolkit'
import Voices from 'plugins/contact/pages/Voice'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import { t } from 'i18next'
import { StyledTabListSpan, StyledTabListWrapper, StyledTabRootWrapper } from 'styles/tabStyles.css'
import { useGetAccountModule } from 'utils/useGetAccountModule'

const Integrations = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { getIntegrationModules } = useGetAccountModule()

  const toolkitModule = getIntegrationModules('toolkit')
  const voiceModule = getIntegrationModules('voices')

  const isToolkit = toolkitModule.list
  const isVoice = voiceModule.list

  return (
    <StyledTabRootWrapper>
      <StyledTabListWrapper>
        <TabList>
          <Tab onClick={() => setActiveTab(0)} disabled={!isToolkit}>
            <StyledTabListSpan>{`${t('toolkit')}s`}</StyledTabListSpan>
          </Tab>

          <Tab onClick={() => setActiveTab(1)} disabled={!isVoice}>
            <StyledTabListSpan>{`${t('voice')}s`}</StyledTabListSpan>
          </Tab>
        </TabList>
      </StyledTabListWrapper>

      <TabsContext activeTabId={activeTab}>
        <TabPanels noAnimation>
          <TabPanel>{isToolkit && <Toolkit />}</TabPanel>
          <TabPanel>{isVoice && <Voices />}</TabPanel>
        </TabPanels>
      </TabsContext>
    </StyledTabRootWrapper>
  )
}

export default Integrations
