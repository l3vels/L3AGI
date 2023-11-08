import styled, { DefaultTheme, css } from 'styled-components'
import About from '@l3-lib/ui-core/dist/icons/About'
import Games from '@l3-lib/ui-core/dist/icons/Games'
import ValueOutline from '@l3-lib/ui-core/dist/icons/ValueOutline'
import Robot from '@l3-lib/ui-core/dist/icons/Robot'
import Basic from '@l3-lib/ui-core/dist/icons/Basic'
import SearchOutline from '@l3-lib/ui-core/dist/icons/SearchOutline'

import MainNavigation from 'pages/Navigation/MainNavigation'
import { useChatSwitcher } from './useChatSwitcher'

const ChatSwitcher = () => {
  const { setShowSwitcher, showSwitcher, handleMouseHover, handleMouseLeave } = useChatSwitcher()

  return (
    <StyledRoot
      collapsed={!showSwitcher}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      onClick={() => setShowSwitcher(true)}
    >
      <MainNavigation />
    </StyledRoot>
  )
}

export default ChatSwitcher

const StyledRoot = styled.div<{ collapsed: boolean; theme: DefaultTheme }>`
  padding: 0 10px;
  position: absolute;
  top: 70px;
  left: 0;
  z-index: 100000;
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: calc(100% - 170px);
  width: 110px;

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
      left: -100px;
      overflow: hidden;

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
