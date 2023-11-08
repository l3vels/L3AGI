import React from 'react'
import { AuthContext } from 'contexts'
import { useOutlet } from 'react-router-dom'

import ChatSwitcher from 'components/ChatSwitcher'

import styled from 'styled-components'
import AvatarDropDown from 'components/AvatarDropDown'

import MediaButtons from 'components/MediaButtons'

const RootLayout = () => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()

  return (
    <>
      <>{outlet}</>

      {user && (
        <StyledAvatarContainer>
          <StyledInnerWrapper>
            <AvatarDropDown />
            <StyledFirstName>{user.name}</StyledFirstName>
          </StyledInnerWrapper>

          <MediaButtons />
        </StyledAvatarContainer>
      )}

      {user && <ChatSwitcher />}
    </>
  )
}

export default RootLayout

const StyledFirstName = styled.span`
  color: ${({ theme }) => theme.body.textColorSecondary};

  @media (max-width: 1100px) {
    display: none;
  }
`

const StyledAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

  position: absolute;
  left: 40px;
  bottom: 0px;

  @media (max-width: 900px) {
    display: none;
  }

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }
`

const StyledInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
