import React from 'react'
import { useOutlet } from 'react-router-dom'

import styled from 'styled-components'

import { AuthContext } from 'contexts'

import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'
import { Footer, Header } from 'components/Layout'
import MainNavigation from 'pages/Navigation/MainNavigation'

import Button from '@l3-lib/ui-core/dist/Button'
import { useModal } from 'hooks'

const MarketplaceRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

  const { openModal, closeModal } = useModal()

  const outlet = useOutlet()

  return (
    <StyledAppContainer className='app_container'>
      <Header isPublicRoute={!user} />
      {user && (
        <StyledNavigationWrapper>
          <MainNavigation />
        </StyledNavigationWrapper>
      )}
      <StyledMainContainer>{outlet}</StyledMainContainer>
      {user && <Footer />}

      {!user && (
        <StyledLoginWrapper>
          <Button kind={Button.kinds.PRIMARY} onClick={() => openModal({ name: 'login-modal' })}>
            Login / Sign Up
          </Button>
        </StyledLoginWrapper>
      )}
    </StyledAppContainer>
  )
}

export default MarketplaceRouteLayout

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
const StyledLoginWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  left: 40px;
`
