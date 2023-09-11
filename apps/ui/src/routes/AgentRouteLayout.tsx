import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import { Footer, Header } from 'components/Layout'
import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'
import MainNavigation from 'pages/Navigation/MainNavigation'

const AgentRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()

  if (!user) return <Navigate to='/' />

  return (
    <StyledAppContainer className='app_container'>
      <Header />
      <StyledMainContainer>
        <MainNavigation />
        {outlet}
      </StyledMainContainer>
      <Footer />
    </StyledAppContainer>
  )
}

export default AgentRouteLayout
