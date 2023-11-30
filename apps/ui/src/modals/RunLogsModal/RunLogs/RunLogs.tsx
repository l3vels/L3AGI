import styled from 'styled-components'
import { useRunLogsService } from 'services/run'
import Loader from '@l3-lib/ui-core/dist/Loader'
import { StyledTab } from 'styles/tabStyles.css'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import { useState } from 'react'
import { StyledFormTabList, StyledFormTabsWrapper } from 'pages/Agents/AgentForm/AgentForm'
import RunLogMessages from './RunLogMessages'

type RunLogsProps = {
  runId: string
}

const RunLogs = ({ runId }: RunLogsProps) => {
  const { data, loading } = useRunLogsService({ run_id: runId })
  const [activeTab, setActiveTab] = useState(0)

  if (loading)
    return (
      <StyledLoaderWrapper>
        <Loader size={40} />
      </StyledLoaderWrapper>
    )

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  return (
    <StyledWrapper>
      <StyledFormTabsWrapper>
        <StyledFormTabList size='small' activeTabId={activeTab}>
          {data.map(({ name }, index) => (
            <StyledTab key={index} onClick={() => handleTabClick(index)}>
              <StyledSpan>
                {index + 1}. {name}
              </StyledSpan>
            </StyledTab>
          ))}
        </StyledFormTabList>
      </StyledFormTabsWrapper>

      <StyledTabContextWrapper>
        <TabsContext activeTabId={activeTab}>
          <TabPanels noAnimation>
            {data.map((log, index) => (
              <TabPanel key={index}>
                <RunLogMessages log={log} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabsContext>
      </StyledTabContextWrapper>
    </StyledWrapper>
  )
}

export default RunLogs

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  overflow-y: scroll;
`

const StyledLoaderWrapper = styled.div`
  position: absolute;
  width: 40px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  margin-bottom: 20px;
  margin-left: 5px;
`
const StyledTabContextWrapper = styled.div`
  /* overflow: hidden; */
  max-height: calc(100vh - 120px);
  margin-right: 10px;
`
const StyledSpan = styled.span`
  color: ${({ theme }) => theme.body.textColorPrimary};
  width: 150px;
`
