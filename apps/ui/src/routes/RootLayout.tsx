import React from 'react'
import { AuthContext } from 'contexts'
import { Navigate, useOutlet, useParams } from 'react-router-dom'

import useCheckRoute from 'hooks/useCheckRoute'

import ChatSwitcher from 'components/ChatSwitcher'
import Spotlight from 'components/Spotlight'

import styled, { css } from 'styled-components'
import AvatarDropDown from 'components/AvatarDropDown'

const RootLayout = () => {
  const { user } = React.useContext(AuthContext)
  const { isCheckedRoute } = useCheckRoute('chat')

  const outlet = useOutlet()

  // if (!user) return <Navigate to='/discover' />

  return (
    <>
      <>{outlet}</>

      {user && (
        <StyledAvatarContainer>
          <AvatarDropDown />
          <StyledFirstName>{user.name}</StyledFirstName>
        </StyledAvatarContainer>
      )}

      <StyledChatInputWrapper isHidden={isCheckedRoute}>
        {user && <Spotlight />}
      </StyledChatInputWrapper>

      {/* {user && <ChatSwitcher isChatOpen={isCheckedRoute} />} */}
    </>
  )
}

export default RootLayout

const StyledChatInputWrapper = styled.div<{ isHidden: boolean }>`
  position: fixed;
  /* left: 50%; */
  z-index: 0;
  bottom: 20px;
  right: 30px;
  /* transform: translateX(-50%); */

  ${p =>
    p.isHidden &&
    css`
      opacity: 0;
      pointer-events: none;
    `};
`
const StyledFirstName = styled.span`
  color: ${({ theme }) => theme.body.textColorSecondary};
  @media (max-width: 1100px) {
    display: none;
  }
`
const StyledAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  position: absolute;
  left: 40px;
  bottom: 24px;

  @media (max-width: 900px) {
    display: none;
  }

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    /* color: rgba(255, 255, 255, 0.2); */
  }
`
