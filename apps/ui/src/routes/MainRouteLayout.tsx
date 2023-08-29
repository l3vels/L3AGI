import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'

import { Footer, Header } from 'components/Layout'

const MainRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <StyledAppContainer className='app_container'>
      <Header hideUsers />
      <StyledMainContainer>{outlet}</StyledMainContainer>
      <Footer />
    </StyledAppContainer>
  )
}

export default MainRouteLayout
