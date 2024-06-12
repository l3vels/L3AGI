import styled from 'styled-components'

import About from 'share-ui/components/Icon/Icons/components/About'
import Games from 'share-ui/components/Icon/Icons/components/Games'
import ValueOutline from 'share-ui/components/Icon/Icons/components/ValueOutline'
import Robot from 'share-ui/components/Icon/Icons/components/Robot'
import Basic from 'share-ui/components/Icon/Icons/components/Basic'
import SearchOutline from 'share-ui/components/Icon/Icons/components/SearchOutline'

import MainNavigation from 'pages/Navigation/MainNavigation'

type ChatSwitcherProps = {
  user: any
}

const ChatSwitcher = ({ user }: ChatSwitcherProps) => {
  return (
    <StyledRoot>
      <MainNavigation user={user} />
    </StyledRoot>
  )
}

export default ChatSwitcher

const StyledRoot = styled.div`
  height: 100vh;

  width: 80px;
  min-width: 80px;
  max-width: 80px;

  transition: left 0.1s ease-in-out;
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
