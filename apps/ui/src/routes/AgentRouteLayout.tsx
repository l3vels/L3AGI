import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import { Footer, Header } from 'components/Layout'
import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'

const AgentRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <StyledAppContainer className='app_container'>
      <Header />
      <StyledMainContainer>{outlet}</StyledMainContainer>
      <Footer />
    </StyledAppContainer>
  )
}

export default AgentRouteLayout
