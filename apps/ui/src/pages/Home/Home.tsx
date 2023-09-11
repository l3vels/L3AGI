import React from 'react'
import GetStartedComponent from './HomeComponents/GetStartedComponent'

import { StyledInnerWrapper } from 'components/Layout/LayoutStyle'

import styled from 'styled-components'

import Agents from 'pages/Agents'
import Datasource from 'pages/Datasource'
import { AuthContext } from 'contexts'
import Marketplace from 'pages/Marketplace'
import GetStartedCard from './GetStarted/GetStartedCard'

import cardBg4 from 'assets/images/whiteBg.png'

const Home = () => {
  // const isProduction = import.meta.env.REACT_APP_ENV === 'production'
  const { user } = React.useContext(AuthContext)

  return (
    <>
      <StyledInnerWrapperEdit>
        {user ? (
          <GetStartedComponent />
        ) : (
          <GetStartedCard
            subTitle={'Learn about'}
            title={'Empower your tasks with self-sufficient AI agents. Begin chatting today'}
            image={cardBg4}
            bgColor={'red'}
            link={import.meta.env.REACT_APP_DATASOURCES_LINK}
          />
        )}
        {user ? (
          <>
            <Agents />
            <StyledDivider />
            <Datasource />
          </>
        ) : (
          <Marketplace />
        )}
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
const StyledDivider = styled.div`
  height: 20px;
  width: 100%;
`
