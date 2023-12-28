import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import styled from 'styled-components'

import { AuthContext } from 'contexts'

import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'
import { Footer, Header } from 'components/Layout'
import MainNavigation from 'pages/Navigation/MainNavigation'

import Button from 'share-ui/components/Button/Button'

import { useModal } from 'hooks'
import TermsAndPrivacyButtons from 'components/TermsAndPrivacyButtons'
import { ButtonPrimary } from 'components/Button/Button'
import { useDomainConfig } from 'utils/useDomainConfig'
import { Login } from 'pages/Auth'

const HomeRouteLayout = () => {
  const { getDomainConfig } = useDomainConfig()

  const loginConfig = getDomainConfig('login_page')

  const { user } = React.useContext(AuthContext)

  const { openModal } = useModal()

  const outlet = useOutlet()
  console.log('loginConfig', loginConfig)

  return (
    <StyledAppContainer className='app_container'>
      <Header isPublicRoute={!user} />
      {/* {user && (
            <StyledNavigationWrapper>
            <MainNavigation />
            </StyledNavigationWrapper>
          )} */}
      {((loginConfig?.popup && !user) || user) && (
        <StyledMainContainer>{outlet}</StyledMainContainer>
      )}
      {user && <Footer />}

      {!user && !loginConfig?.popup ? (
        <Login />
      ) : (
        <>
          {!user && (
            <StyledLoginWrapper>
              <ButtonPrimary onClick={() => openModal({ name: 'login-modal' })}>
                Login / Sign Up
              </ButtonPrimary>

              <TermsAndPrivacyButtons />
            </StyledLoginWrapper>
          )}
          {!user && <StyledSpace />}
        </>
      )}
    </StyledAppContainer>
  )
}

export default HomeRouteLayout

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
  height: 50px;
`
