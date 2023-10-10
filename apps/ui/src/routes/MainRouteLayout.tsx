import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'

import { Footer, Header } from 'components/Layout'
import MainNavigation from 'pages/Navigation/MainNavigation'
import styled from 'styled-components'

const MainRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()

  if (!user) return <Navigate to='/' />

  return (
    <StyledAppContainer className='app_container'>
      <Header />
      {/* <StyledNavigationWrapper>
        <MainNavigation />
      </StyledNavigationWrapper> */}
      <StyledMainContainer>{outlet}</StyledMainContainer>
      <Footer />
    </StyledAppContainer>
  )
}

export default MainRouteLayout

const StyledNavigationWrapper = styled.div`
  position: sticky;
  top: 0;

  z-index: 102030;
  /* max-height: 62px; */
  padding: 0 165px;

  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`
