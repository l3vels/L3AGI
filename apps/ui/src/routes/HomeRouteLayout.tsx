import React from 'react'
import { useOutlet } from 'react-router-dom'

import styled from 'styled-components'

import { AuthContext } from 'contexts'

import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'
import { Footer } from 'components/Layout'

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
    <StyledHomeRoot>
      {((loginConfig?.popup && !user) || user) && (
        <StyledOutletWrapper>{outlet}</StyledOutletWrapper>
      )}
      {user && <Footer />}

      {!user && !loginConfig?.popup ? (
        <StyledLoginWrapper>
          <Login />
        </StyledLoginWrapper>
      ) : (
        <>
          {!user && (
            <StyledLoginButtonsWrapper>
              <ButtonPrimary onClick={() => openModal({ name: 'login-modal' })}>
                Login / Sign Up
              </ButtonPrimary>

              <TermsAndPrivacyButtons />
            </StyledLoginButtonsWrapper>
          )}
        </>
      )}
    </StyledHomeRoot>
  )
}

export default HomeRouteLayout

const StyledLoginWrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;

  gap: 20px;
`
const StyledLoginButtonsWrapper = styled.div`
  position: fixed;
  bottom: 5px;
  left: 40px;

  display: flex;
  flex-direction: column;

  gap: 20px;
`

const StyledHomeRoot = styled.div`
  width: 100%;
  height: 100%;

  overflow: auto;
`
const StyledOutletWrapper = styled.div`
  width: 100%;
  height: 100%;

  max-width: 1110px;

  margin: 0 auto;

  padding-top: 20px;
`
