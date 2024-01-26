import React from 'react'
import { useOutlet } from 'react-router-dom'

import styled from 'styled-components'

import { AuthContext } from 'contexts'

import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'
import { Footer, Header } from 'components/Layout'

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

  return (
    <StyledAppContainer className='app_container'>
      <Header isPublicRoute={!user} />

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
