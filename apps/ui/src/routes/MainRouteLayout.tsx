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

  if (!user) return <Navigate to='/login' />

  return (
    <StyledAppContainer className='app_container'>
      <Header hideUsers />

      <StyledMainContainer>
        <StyledNavigatioNWrapper>
          <MainNavigation />
        </StyledNavigatioNWrapper>
        {outlet}
      </StyledMainContainer>
      <Footer />
    </StyledAppContainer>
  )
}

export default MainRouteLayout

const StyledNavigatioNWrapper = styled.div`
  margin-bottom: 50px;
  /* position: sticky;
  top: 0;
  z-index: 1000000; */
`
