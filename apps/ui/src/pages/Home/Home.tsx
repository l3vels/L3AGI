import React from 'react'
import GetStartedComponent from './HomeComponents/GetStartedComponent'

import { StyledInnerWrapper } from 'components/Layout/LayoutStyle'

import styled from 'styled-components'

import Agents from 'pages/Agents'

import { AuthContext } from 'contexts'
import Discover from 'pages/Discover'
import GetStartedCard from './GetStarted/GetStartedCard'

import cardBg4 from 'assets/images/whiteBg.png'
import DiscoverTeamAgents from 'pages/Discover/components/DiscoverTeamAgents'
import DiscoverSystemAgents from 'pages/Discover/components/DiscoverSystemAgents'
import TeamOfAgents from 'pages/TeamOfAgents'
import { useTeamOfAgents } from 'pages/TeamOfAgents/useTeamOfAgents'
import { useAgents } from 'pages/Agents/useAgents'

import HeaderText from './HomeComponents/HeaderText'

const Home = () => {
  // const isProduction = import.meta.env.REACT_APP_ENV === 'production'
  const { user } = React.useContext(AuthContext)

  const { teamOfAgents } = useTeamOfAgents()
  const { agentsData } = useAgents()

  return (
    <>
      <StyledInnerWrapperEdit>
        <HeaderText />
        {user ? (
          <>
            {/* <GetStartedComponent /> */}
            <StyledWrapper>
              {teamOfAgents?.length > 0 ? <TeamOfAgents isHome /> : <DiscoverTeamAgents />}

              {agentsData?.length > 0 && <Agents isHome />}
            </StyledWrapper>
          </>
        ) : (
          <>
            {/* <GetStartedCard
              fullWidth
              subTitle={'Learn about'}
              title={'Empower your tasks with self-sufficient AI agents. Begin chatting today!'}
              image={cardBg4}
              bgColor={'red'}
              link={''}
            /> */}

            <StyledIframe
              width='560'
              height='315'
              src={`https://www.youtube.com/embed/${import.meta.env.REACT_APP_YOUTUBE_VIDEO_ID}`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></StyledIframe>

            <Discover />
          </>
        )}

        {/* {user ? (
          <>
            <Agents />
            <StyledDivider />
            <Datasource />
          </>
        ) : (
          <Discover />
        )} */}
        {/* 
        <TopCharts />
        <Documentation /> */}
      </StyledInnerWrapperEdit>
    </>
  )
}

export default Home

const StyledInnerWrapperEdit = styled(StyledInnerWrapper)`
  display: grid;
  grid-auto-rows: max-content;
  gap: 20px;
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
