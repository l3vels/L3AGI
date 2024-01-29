import { useLocation, useNavigate, useParams } from 'react-router-dom'

import styled, { DefaultTheme, css } from 'styled-components'

// import Mention from 'share-ui/components/Icon/Icons/components/Mention'

import Collection from 'share-ui/components/Icon/Icons/components/Collection'

import { useChatSwitcher } from './useChatSwitcher'

import About from 'share-ui/components/Icon/Icons/components/About'
// import Add from 'share-ui/components/Icon/Icons/components/Add'
import Games from 'share-ui/components/Icon/Icons/components/Games'
import ValueOutline from 'share-ui/components/Icon/Icons/components/ValueOutline'
import Robot from 'share-ui/components/Icon/Icons/components/Robot'
import Basic from 'share-ui/components/Icon/Icons/components/Basic'

// import Team from 'share-ui/components/Icon/Icons/components/Team'
// import Launch from 'share-ui/components/Icon/Icons/components/Launch'
import SearchOutline from 'share-ui/components/Icon/Icons/components/SearchOutline'

import { useEffect, useState } from 'react'
import MainNavigation from 'pages/Navigation/MainNavigation'

// import includes from 'lodash/includes'

type ChatSwitcherProps = {
  isChatOpen?: boolean
  user: any
}

const ChatSwitcher = ({ isChatOpen = false, user }: ChatSwitcherProps) => {
  const navigate = useNavigate()

  const { setShowSwitcher, showSwitcher, handleMouseHover, handleMouseLeave } = useChatSwitcher()

  const params = useParams()
  const { agentId } = params

  let route = '/chat'

  if (agentId) {
    route = `/chat?agent=${agentId}`
  }

  const handleChatButton = () => {
    if (!isChatOpen) {
      navigate(route, {
        state: {
          agentId,
        },
      })
    }
  }

  const { pathname } = useLocation()

  const [active, setActive] = useState<string[]>([])

  const onHandleClick = (navigation_name: string) => {
    // setActive(navigation_name)
    navigate(navigation_name)
  }

  useEffect(() => {
    const pathArr = pathname ? pathname.split('/') : []

    setActive(pathArr)
  }, [pathname])

  return (
    <StyledRoot
      collapsed={!showSwitcher}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      onClick={() => setShowSwitcher(true)}
    >
      <MainNavigation user={user} />
    </StyledRoot>
  )
}

export default ChatSwitcher

// for different version
const StyledRoot = styled.div<{ collapsed: boolean; theme: DefaultTheme }>`
  /* position: absolute; */

  /* transform: translateY(-50%); */
  /* overflow: auto;
  display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */

  height: 100vh;

  @keyframes slideAnimation {
    from {
      left: 0; /* Element slides to the right and is fully visible */
    }
    to {
      left: -100px; /* Element starts from the left and is off the screen */
    }
  }

  transition: left 0.1s ease-in-out;

  ${p =>
    p.collapsed &&
    css`
      /* width: 10px; */
      left: -100px;
      overflow: hidden;
      /* animation: slideAnimation 0.2s ease-in-out; */

      cursor: pointer;
      :hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `};

  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge add Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
`

export const StyledBasicIcon = styled(Basic)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledGamesIcon = styled(Games)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledAboutIcon = styled(About)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledValueOutlineIcon = styled(ValueOutline)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledRobotIcon = styled(Robot)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledSearchOutlineIcon = styled(SearchOutline)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
