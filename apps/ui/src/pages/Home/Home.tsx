import React from 'react'
import GetStartedComponent from './HomeComponents/GetStartedComponent'

import { StyledInnerWrapper } from 'components/Layout/LayoutStyle'

import styled from 'styled-components'

import Agents from 'pages/Agents'
import Datasource from 'pages/Datasource'
import { AuthContext } from 'contexts'
import Marketplace from 'pages/Marketplace'

const Home = () => {
  // const isProduction = import.meta.env.REACT_APP_ENV === 'production'
  const { user } = React.useContext(AuthContext)

  return (
    <>
      <StyledInnerWrapperEdit>
        {user ? (
          <>
            <GetStartedComponent />
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
