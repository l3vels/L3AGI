import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import { Footer, Header } from 'components/Layout'
import { StyledAppContainer } from '../components/Layout/LayoutStyle'
import styled from 'styled-components'

const ChatRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()

  if (!user) return <Navigate to='/' />

  return (
    <StyledAppContainer className='app_container'>
      <Header />
      <StyledBodyContainer>{outlet}</StyledBodyContainer>
      <StyledFooterWrapper>
        <Footer />
      </StyledFooterWrapper>
    </StyledAppContainer>
  )
}

export default ChatRouteLayout

const StyledBodyContainer = styled.div`
  width: 100%;
`
const StyledFooterWrapper = styled.div`
  width: fit-content;
  margin-top: auto;
`
