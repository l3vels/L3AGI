import React from 'react'
import { StyledInnerWrapper } from 'components/Layout/LayoutStyle'
import styled from 'styled-components'
import Agents from 'pages/Agents'
import { AuthContext } from 'contexts'
import DiscoverTeamAgents from 'pages/Discover/components/DiscoverTeamAgents'
import TeamOfAgents from 'pages/TeamOfAgents'
import { useTeamOfAgents } from 'pages/TeamOfAgents/useTeamOfAgents'
import { useAgents } from 'pages/Agents/useAgents'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import DiscoverSystemAgents from 'pages/Discover/components/DiscoverSystemAgents'

const Home = () => {
  const { user } = React.useContext(AuthContext)

  const { teamOfAgents } = useTeamOfAgents()
  const { agentsData } = useAgents()

  const { getHomeModules } = useGetAccountModule()
  const teamModules = getHomeModules('team')
  const agentModules = getHomeModules('agent')

  return (
    <StyledInnerWrapperEdit>
      {user ? (
        <StyledWrapper>
          {teamModules?.list &&
            (teamOfAgents?.length > 0 ? <TeamOfAgents isHome /> : <DiscoverTeamAgents />)}

          {agentModules?.list && agentsData?.length > 0 ? (
            <Agents isHome />
          ) : (
            <DiscoverSystemAgents />
          )}
        </StyledWrapper>
      ) : (
        <>
          <DiscoverTeamAgents />
          <DiscoverSystemAgents />
        </>
      )}
    </StyledInnerWrapperEdit>
  )
}

export default Home

const StyledInnerWrapperEdit = styled(StyledInnerWrapper)`
  display: grid;
  grid-auto-rows: max-content;
  gap: 30px;
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`
