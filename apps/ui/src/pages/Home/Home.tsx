import React from 'react'

import { StyledInnerWrapper } from 'components/Layout/LayoutStyle'

import styled from 'styled-components'

import Agents from 'pages/Agents'

import { AuthContext } from 'contexts'

import DiscoverTeamAgents from 'pages/Discover/components/DiscoverTeamAgents'
import DiscoverTemplateAgents from 'pages/Discover/components/DiscoverTemplateAgents'

import TeamOfAgents from 'pages/TeamOfAgents'
import { useTeamOfAgents } from 'pages/TeamOfAgents/useTeamOfAgents'
import { useAgents } from 'pages/Agents/useAgents'


import { useGetAccountModule } from 'utils/useGetAccountModule'
import DiscoverSystemAgents from 'pages/Discover/components/DiscoverSystemAgents'

const Home = () => {
  // const isProduction = import.meta.env.REACT_APP_ENV === 'production'
  const { user } = React.useContext(AuthContext)

  const { teamOfAgents } = useTeamOfAgents()
  const { agentsData } = useAgents()

  const { getHomeModules } = useGetAccountModule()
  const teamModules = getHomeModules('team')
  const agentModules = getHomeModules('agent')

  return (
    <>
      <StyledInnerWrapperEdit>
        {/* {!user && <HeaderText />} */}
        {user ? (
          <>
            <StyledWrapper>
              {teamModules?.list &&
                (teamOfAgents?.length > 0 ? <TeamOfAgents isHome /> : <DiscoverTeamAgents />)}

              {agentModules?.list && agentsData?.length > 0 ? (
                <Agents isHome />
              ) : (
                <DiscoverTemplateAgents />
              )}
            </StyledWrapper>
          </>
        ) : (
          <>
            {/* <StyledIframe
              width='560'
              height='315'
              src={`https://www.youtube.com/embed/${import.meta.env.REACT_APP_YOUTUBE_VIDEO_ID}`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></StyledIframe> */}

            <DiscoverTeamAgents />
            <DiscoverSystemAgents />
          </>
        )}
      </StyledInnerWrapperEdit>
    </>
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

const StyledIframe = styled.iframe`
  border-radius: 10px;
  margin: auto;
`
