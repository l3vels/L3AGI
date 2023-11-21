import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

import AgentViewDetailBox from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import TeamOfAgentsDetailsBox from 'pages/TeamOfAgents/components/TeamOfAgentsDetailsBox'

import { AuthContext } from 'contexts'

import { useModal } from 'hooks'
import MemberText from './components/MemberText'
import {
  StyledEditIcon,
  StyledEyeOpenIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { StyledTabListSpan, StyledTabListWrapper } from 'styles/tabStyles.css'
import AudioPlayer from 'components/AudioPlayer'
import { Nullable } from 'types'

const ChatMembers = ({
  agentById,
  teamOfAgents,
  isHistory,
  voiceUrl,
}: {
  agentById?: any
  teamOfAgents?: any
  isHistory?: boolean
  voiceUrl?: Nullable<string>
}) => {
  const { t } = useTranslation()
  const { user } = React.useContext(AuthContext)

  const [activeTab, setActiveTab] = useState(0)

  const navigate = useNavigate()

  const { openModal } = useModal()

  if (agentById) {
    const isCreator = user?.id === agentById.agent?.created_by

    const handleEdit = () => {
      navigate(`/agents/${agentById.agent?.id}/edit-agent`)
    }

    return (
      <StyledRoot>
        <StyledTabListWrapper>
          <TabList size='small'>
            <Tab onClick={() => setActiveTab(0)}>
              <StyledTabListSpan>{t('info')}</StyledTabListSpan>
            </Tab>
            <Tab onClick={() => setActiveTab(1)}>
              <StyledTabListSpan>{t('members')}</StyledTabListSpan>
            </Tab>
          </TabList>
        </StyledTabListWrapper>

        <StyledContainer>
          <TabsContext activeTabId={activeTab}>
            <TabPanels noAnimation>
              <TabPanel>
                <AgentViewDetailBox agentData={agentById} />
                <div style={{ height: '100px', width: '100%' }}>
                  {voiceUrl && (
                    <StyledAudioPlayerWrapper>
                      <AudioPlayer audioUrl={voiceUrl} />
                    </StyledAudioPlayerWrapper>
                  )}
                </div>
              </TabPanel>

              <TabPanel>
                {!isHistory && user?.name && (
                  <StyledAgentWrapper>
                    <AvatarGenerator name={user.name} size={30} avatar={user.avatar} />
                    <MemberText name={user.name} />
                  </StyledAgentWrapper>
                )}

                <>
                  <StyledAgentWrapper>
                    <AvatarGenerator
                      name={agentById?.agent?.name}
                      size={30}
                      avatar={agentById?.agent.avatar}
                    />
                    <MemberText name={agentById?.agent?.name} role={agentById?.agent?.role} />

                    <StyledIconButtonWrapper className='hiddenButton'>
                      <IconButton
                        onClick={() =>
                          openModal({
                            name: 'agent-view-modal',
                            data: {
                              agent: agentById,
                            },
                          })
                        }
                        icon={() => (
                          <StyledIconWrapper>
                            <StyledEyeOpenIcon size={50} />
                          </StyledIconWrapper>
                        )}
                        size={IconButton.sizes.SMALL}
                        kind={IconButton.kinds.TERTIARY}
                        // ariaLabel='View'
                      />

                      {isCreator && (
                        <IconButton
                          onClick={handleEdit}
                          icon={() => <StyledEditIcon />}
                          size={IconButton.sizes.SMALL}
                          kind={IconButton.kinds.TERTIARY}
                          // ariaLabel='Edit'
                        />
                      )}
                    </StyledIconButtonWrapper>
                  </StyledAgentWrapper>
                </>
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
        <StyledTabListWrapper>
          <TabList size='small'>
            <Tab onClick={() => setActiveTab(0)}>
              <StyledTabListSpan>{t('info')}</StyledTabListSpan>
            </Tab>
            <Tab onClick={() => setActiveTab(1)}>
              <StyledTabListSpan>{t('members')}</StyledTabListSpan>
            </Tab>
          </TabList>
        </StyledTabListWrapper>

        <StyledContainer>
          <TabsContext activeTabId={activeTab}>
            <TabPanels noAnimation>
              <TabPanel>
                <TeamOfAgentsDetailsBox teamData={teamOfAgents} />
              </TabPanel>

              <TabPanel>
                {!isHistory && user?.name && (
                  <StyledAgentWrapper>
                    <AvatarGenerator name={user.name} size={30} avatar={user.avatar} />
                    <MemberText name={user.name} />
                  </StyledAgentWrapper>
                )}

                {teamOfAgents &&
                  teamOfAgents.team_agents?.map((agentData: any, index: number) => {
                    const handleEdit = () => {
                      navigate(`/agents/${agentData.agent?.id}/edit-agent`)
                    }

                    const isCreator = user?.id === agentData.agent?.created_by

                    return (
                      <StyledAgentWrapper key={index}>
                        <AvatarGenerator
                          name={agentData.agent.name}
                          size={30}
                          avatar={agentData.agent.avatar}
                        />

                        <MemberText name={agentData.agent.name} role={agentData?.agent?.role} />

                        <StyledIconButtonWrapper className='hiddenButton'>
                          <IconButton
                            onClick={() =>
                              openModal({
                                name: 'agent-view-modal',
                                data: {
                                  id: agentData.agent.id,
                                },
                              })
                            }
                            icon={() => (
                              <StyledIconWrapper>
                                <StyledEyeOpenIcon size={50} />
                              </StyledIconWrapper>
                            )}
                            size={IconButton.sizes.SMALL}
                            kind={IconButton.kinds.TERTIARY}
                            // ariaLabel='View'
                          />

                          {isCreator && (
                            <IconButton
                              onClick={handleEdit}
                              icon={() => <StyledEditIcon />}
                              size={IconButton.sizes.SMALL}
                              kind={IconButton.kinds.TERTIARY}
                              // ariaLabel='Edit'
                            />
                          )}
                        </StyledIconButtonWrapper>
                      </StyledAgentWrapper>
                    )
                  })}
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
  border-radius: 10px;

  :hover {
    background: rgba(0, 0, 0, 0.1);
    .hiddenButton {
      opacity: 1;
    }
  }
`
const StyledIconWrapper = styled.div`
  color: transparent;
`
const StyledIconButtonWrapper = styled.div`
  margin-left: auto;

  opacity: 0;
  /* transition: opacity 300ms; */

  display: flex;
  align-items: center;
`

const StyledAudioPlayerWrapper = styled.div`
  margin-top: 12px;
`
