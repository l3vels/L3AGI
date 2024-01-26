import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'

import { Footer, Header } from 'components/Layout'

import styled from 'styled-components'

const MainRouteLayout = ({ expand }: { expand?: boolean }) => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()

  if (!user) return <Navigate to='/' />

  return (
    <StyledAppContainer className='app_container'>
      <Header />

      <StyledMainContainer expand={expand}>{outlet}</StyledMainContainer>
      <Footer />
    </StyledAppContainer>
  )
}

export default MainRouteLayout
