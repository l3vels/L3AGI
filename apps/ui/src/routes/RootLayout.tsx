import React from 'react'
import { AuthContext } from 'contexts'
import { useOutlet } from 'react-router-dom'

import useCheckRoute from 'hooks/useCheckRoute'

import ChatSwitcher from 'components/ChatSwitcher'
// import Spotlight from 'components/Spotlight'

import styled from 'styled-components'
import AvatarDropDown from 'components/AvatarDropDown'

import MediaButtons from 'components/MediaButtons'

const RootLayout = () => {
  const { user } = React.useContext(AuthContext)
  const { isCheckedRoute } = useCheckRoute('chat')

  const outlet = useOutlet()

  // if (!user) return <Navigate to='/discover' />

  return (
    <StyledRoot>
      {user && <ChatSwitcher isChatOpen={isCheckedRoute} user={user} />}
      <StyledOutletWrapper>{outlet}</StyledOutletWrapper>

      {/* {user && (
        <StyledAvatarContainer>
          <StyledInnerWrapper>
            <AvatarDropDown />
            <StyledFirstName>{user.name}</StyledFirstName>
          </StyledInnerWrapper>

          <MediaButtons />
        </StyledAvatarContainer>
      )} */}

      {/* <StyledChatInputWrapper isHidden={isCheckedRoute}>
        {user && <Spotlight />}
      </StyledChatInputWrapper> */}
    </StyledRoot>
  )
}

export default RootLayout

const StyledRoot = styled.div`
  display: flex;
  height: 100%;

  background: ${({ theme }) => theme.body.backgroundColorPrimary};
`
const StyledOutletWrapper = styled.div`
  width: 100%;

  margin: 0 auto;
`

// const StyledChatInputWrapper = styled.div<{ isHidden: boolean }>`
//   position: fixed;
//   /* left: 50%; */
//   z-index: 0;
//   bottom: 20px;
//   right: 30px;
//   /* transform: translateX(-50%); */

//   ${p =>
//     p.isHidden &&
//     css`
//       opacity: 0;
//       pointer-events: none;
//     `};
// `
const StyledFirstName = styled.span`
  color: ${({ theme }) => theme.body.textColorSecondary};
  @media (max-width: 1100px) {
    display: none;
  }
`
const StyledAvatarContainer = styled.div`
  display: flex;
  /* align-items: center; */
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
    /* color: rgba(255, 255, 255, 0.2); */
  }
`
const StyledInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
