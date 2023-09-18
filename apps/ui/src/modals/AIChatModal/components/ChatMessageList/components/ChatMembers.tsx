import { useState } from 'react'
import styled from 'styled-components'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

import AgentVIewDetailBox from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import TeamOfAgentsDetailsBox from 'pages/TeamOfAgents/components/TeamOfAgentsDetailsBox'

const ChatMembers = ({
  agentById,
  teamOfAgents,
  userName,
}: {
  agentById?: any
  teamOfAgents?: any
  userName?: string
}) => {
  const [activeTab, setActiveTab] = useState(0)

  if (agentById) {
    return (
      <StyledRoot>
        <TabList size='small'>
          <Tab onClick={() => setActiveTab(0)}>Members</Tab>
          <Tab onClick={() => setActiveTab(1)}>Info</Tab>
        </TabList>

        <StyledContainer>
          <TabsContext activeTabId={activeTab}>
            <TabPanels noAnimation>
              <TabPanel>
                {userName && (
                  <StyledAgentWrapper>
                    <AvatarGenerator name={userName} size={30} />
                    {userName}
                  </StyledAgentWrapper>
                )}

                <>
                  <StyledAgentWrapper>
                    <AvatarGenerator name={agentById?.agent?.name} size={30} />
                    {agentById?.agent?.name}
                  </StyledAgentWrapper>
                </>
              </TabPanel>

              <TabPanel>
                <AgentVIewDetailBox agentData={agentById} />
              </TabPanel>
            </TabPanels>
          </TabsContext>
        </StyledContainer>
      </StyledRoot>
    )
  }

  if (teamOfAgents) {
    return (
      <StyledRoot>
        <TabList size='small'>
          <Tab onClick={() => setActiveTab(0)}>Members</Tab>
          <Tab onClick={() => setActiveTab(1)}>Info</Tab>
        </TabList>

        <StyledContainer>
          <TabsContext activeTabId={activeTab}>
            <TabPanels noAnimation>
              <TabPanel>
                {userName && (
                  <StyledAgentWrapper>
                    <AvatarGenerator name={userName} size={30} />
                    {userName}
                  </StyledAgentWrapper>
                )}

                {teamOfAgents &&
                  teamOfAgents.team_agents?.map((agentData: any, index: number) => {
                    return (
                      <StyledAgentWrapper key={index}>
                        <AvatarGenerator name={agentData.agent.name} size={30} />
                        {agentData.agent.name}
                      </StyledAgentWrapper>
                    )
                  })}
              </TabPanel>

              <TabPanel>
                <TeamOfAgentsDetailsBox teamData={teamOfAgents} />
              </TabPanel>
            </TabPanels>
          </TabsContext>
        </StyledContainer>
      </StyledRoot>
    )
  }

  return <div />
}

export default ChatMembers

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`

const StyledContainer = styled.div`
  overflow-y: auto;
`

const StyledAgentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  padding: 10px;
  width: 300px;

  padding-left: 15px;
  /* border-radius: 10px;
  background: rgba(0, 0, 0, 0.4); */
`
