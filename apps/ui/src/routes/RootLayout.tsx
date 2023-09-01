import React from 'react'
import { AuthContext } from 'contexts'
import { Navigate, useOutlet, useParams } from 'react-router-dom'

import useCheckRoute from 'hooks/useCheckRoute'

import ChatSwitcher from 'components/ChatSwitcher'
import Spotlight from 'components/Spotlight'

import styled, { css } from 'styled-components'

const RootLayout = () => {
  const { user } = React.useContext(AuthContext)
  const { isCheckedRoute } = useCheckRoute('copilot')

  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <>
      <>{outlet}</>

      <StyledChatInputWrapper isHidden={isCheckedRoute}>
        <Spotlight />
      </StyledChatInputWrapper>
      <ChatSwitcher isChatOpen={isCheckedRoute} />
    </>
  )
}

export default RootLayout

const StyledChatInputWrapper = styled.div<{ isHidden: boolean }>`
  ${p =>
    p.isHidden &&
    css`
      opacity: 0;
      pointer-events: none;
    `};
`
