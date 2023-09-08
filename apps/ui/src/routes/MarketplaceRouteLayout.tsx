import React from 'react'
import { useOutlet } from 'react-router-dom'

import styled from 'styled-components'

import { AuthContext } from 'contexts'

import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'
import { Footer, Header } from 'components/Layout'
import MainNavigation from 'pages/Navigation/MainNavigation'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import { useModal } from 'hooks'
import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'

const MarketplaceRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

  const { openModal } = useModal()

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

          <StyledWrapper>
            <button onClick={() => openLinkTab(import.meta.env.REACT_APP_TERMS_LINK)}>
              <Typography
                value='Terms of Use'
                type={Typography.types.label}
                size={Typography.sizes.xss}
                as={'a'}
                customColor='rgba(255,255,255, 0.5)'
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              />
            </button>

            <StyledDivider />

            <button onClick={() => openLinkTab(import.meta.env.REACT_APP_PRIVACY)}>
              <Typography
                value='Privacy Policy'
                type={Typography.types.label}
                size={Typography.sizes.xss}
                as={'a'}
                customColor='rgba(255,255,255, 0.5)'
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              />
            </button>
          </StyledWrapper>
        </StyledLoginWrapper>
      )}
      {!user && <StyledSpace />}
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
  bottom: 5px;
  left: 40px;

  display: flex;
  flex-direction: column;

  gap: 20px;
`
const StyledSpace = styled.div`
  height: 200px;
`
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: fit-content;
`
const StyledDivider = styled.div`
  width: 1px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
`
