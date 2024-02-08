import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import IconButton from 'share-ui/components/IconButton/IconButton'

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
import { StyledTabListWrapper } from 'styles/tabStyles.css'
import AudioPlayer from 'components/AudioPlayer'
import { Nullable } from 'types'
import { CALL_LOGS_MODAL_NAME } from 'modals/CallLogsModal'
import TypographyPrimary from 'components/Typography/Primary'
import Logs from 'share-ui/components/Icon/Icons/components/Logs'
import Typography from 'share-ui/components/typography/Typography'

import TypographySecondary from 'components/Typography/Secondary'

const ChatMembers = ({
  agentById,
  teamOfAgents,
  isHistory,
  voiceUrl,
  call,
}: {
  agentById?: any
  teamOfAgents?: any
  isHistory?: boolean
  voiceUrl?: Nullable<string>
  call?: any
}) => {
  const { t } = useTranslation()
  const { user } = React.useContext(AuthContext)

  const [activeTab, setActiveTab] = useState(0)

  const navigate = useNavigate()

  const { openModal } = useModal()

  const theme = useTheme()

  if (agentById) {
    const isCreator = user?.id === agentById.agent?.created_by

    const handleEdit = () => {
      navigate(`/agents/${agentById.agent?.id}/edit-agent`)
    }

    return (
      <StyledRoot>
        {/* <StyledTabListWrapper>
          <TabList size='small'>
            <Tab onClick={() => setActiveTab(0)}>{t('info')}</Tab>
            <Tab onClick={() => setActiveTab(1)}>{t('members')}</Tab>
          </TabList>
        </StyledTabListWrapper> */}

        <StyledContainer>
          <TabsContext activeTabId={activeTab}>
            <TabPanels noAnimation>
              <TabPanel>
                <AgentViewDetailBox agentData={agentById} />
                <StyledAudioContainer>
                  {voiceUrl && (
                    <>
                      <>
                        <AudioPlayer audioUrl={voiceUrl} />
                      </>

                      <StyledStatusWrapper>
                        {call?.status && (
                          <>
                            <TypographySecondary
                              value={'Status: '}
                              type={Typography.types.P}
                              size={Typography.sizes.sm}
                            />
                            <TypographySecondary
                              value={call?.status}
                              type={Typography.types.P}
                              size={Typography.sizes.sm}
                            />
                          </>
                        )}
                      </StyledStatusWrapper>

                      <StyledLogsButton
                        onClick={() =>
                          openModal({
                            name: CALL_LOGS_MODAL_NAME,
                            data: {
                              chatId: call?.chat_id,
                            },
                          })
                        }
                      >
                        <StyledLogsIcon size={32} />

                        <TypographyPrimary
                          value={t('logs')}
                          type={Typography.types.P}
                          size={Typography.sizes.sm}
                        />
                      </StyledLogsButton>
                    </>
                  )}
                </StyledAudioContainer>
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
                            <StyledEyeOpenIcon />
                          </StyledIconWrapper>
                        )}
                        size={IconButton.sizes?.SMALL}
                        kind={IconButton.kinds?.TERTIARY}
                        // ariaLabel='View'
                      />

                      {isCreator && (
                        <IconButton
                          onClick={handleEdit}
                          icon={() => <StyledEditIcon />}
                          size={IconButton.sizes?.SMALL}
                          kind={IconButton.kinds?.TERTIARY}
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
        {/* <StyledTabListWrapper>
          <TabList size='small'>
            <Tab onClick={() => setActiveTab(0)}>{t('info')}</Tab>
            <Tab onClick={() => setActiveTab(1)}>{t('members')}</Tab>
          </TabList>
        </StyledTabListWrapper> */}

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
                                <StyledEyeOpenIcon />
                              </StyledIconWrapper>
                            )}
                            size={IconButton.sizes?.SMALL}
                            kind={IconButton.kinds?.TERTIARY}
                            // ariaLabel='View'
                          />

                          {isCreator && (
                            <IconButton
                              onClick={handleEdit}
                              icon={() => <StyledEditIcon />}
                              size={IconButton.sizes?.SMALL}
                              kind={IconButton.kinds?.TERTIARY}
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

const StyledAudioContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 12px;
  gap: 16px;
`

const StyledStatusWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;
`

const StyledLogsIcon = styled(Logs)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledLogsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;

  margin-top: -10px;
`
