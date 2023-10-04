import { useLocation, useNavigate, useParams } from 'react-router-dom'

import styled, { DefaultTheme, css } from 'styled-components'

import Mention from '@l3-lib/ui-core/dist/icons/Mention'

import Collection from '@l3-lib/ui-core/dist/icons/Collection'
import Tooltip from '@l3-lib/ui-core/dist/Tooltip'
import { useChatSwitcher } from './useChatSwitcher'
import MainNavigation from 'pages/Navigation/MainNavigation'

import About from '@l3-lib/ui-core/dist/icons/About'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import Games from '@l3-lib/ui-core/dist/icons/Games'
import ValueOutline from '@l3-lib/ui-core/dist/icons/ValueOutline'

import Team from '@l3-lib/ui-core/dist/icons/Team'
import Launch from '@l3-lib/ui-core/dist/icons/Launch'
import SearchOutline from '@l3-lib/ui-core/dist/icons/SearchOutline'

import { useEffect, useState } from 'react'

import includes from 'lodash/includes'

type ChatSwitcherProps = {
  isChatOpen?: boolean
}

const ChatSwitcher = ({ isChatOpen = false }: ChatSwitcherProps) => {
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
      <StyledChatSwitcher>
        {/* <Tooltip content={() => <span>Dashboard</span>} position={Tooltip.positions.TOP}>
          <StyledIcon
            picked={!isChatOpen}
            onClick={() => {
              if (!isChatOpen) return
              navigate(-1)
            }}
          >
            <StyledCollectionIcon />
          </StyledIcon>
        </Tooltip> */}
        {/* <Tooltip content={() => <span>Chat</span>} position={Tooltip.positions.BOTTOM}>
          <StyledIcon picked={isChatOpen} onClick={handleChatButton}>
            <StyledMentionIcon size='46' />
          </StyledIcon>
        </Tooltip> */}

        <Tooltip
          content={() => <span>Home</span>}
          position={Tooltip.positions.RIGHT}
          tooltipSize='large'
        >
          <StyledIcon picked={active[1] === ''} onClick={() => onHandleClick('/')}>
            <StyledAboutIcon />
          </StyledIcon>
        </Tooltip>

        <Tooltip
          content={() => <span>Chat</span>}
          position={Tooltip.positions.RIGHT}
          tooltipSize='large'
        >
          <StyledIcon picked={includes(active, 'chat')} onClick={() => onHandleClick('/chat')}>
            <StyledMentionIcon size={46} />
          </StyledIcon>
        </Tooltip>

        <Tooltip
          content={() => <span>Data sources</span>}
          position={Tooltip.positions.RIGHT}
          tooltipSize='large'
        >
          <StyledIcon
            picked={includes(active, 'datasources')}
            onClick={() => onHandleClick('/datasources')}
          >
            <StyledValueOutlineIcon />
          </StyledIcon>
        </Tooltip>

        <Tooltip
          content={() => <span>Toolkits</span>}
          position={Tooltip.positions.RIGHT}
          tooltipSize='large'
        >
          <StyledIcon
            picked={includes(active, 'toolkits')}
            onClick={() => onHandleClick('/toolkits')}
          >
            <StyledGamesIcon />
          </StyledIcon>
        </Tooltip>

        <Tooltip
          content={() => <span>Discover</span>}
          position={Tooltip.positions.RIGHT}
          tooltipSize='large'
        >
          <StyledIcon
            picked={includes(active, 'discover')}
            onClick={() => onHandleClick('/discover')}
          >
            <StyledSearchOutlineIcon />
          </StyledIcon>
        </Tooltip>
      </StyledChatSwitcher>
      {/* <MainNavigation /> */}
    </StyledRoot>
  )
}

export default ChatSwitcher

// for different version
// const StyledRoot = styled.div<{ collapsed: boolean; theme: DefaultTheme }>`
//   padding: 0 10px;
//   position: absolute;
//   top: 70px;
//   left: 0;
//   z-index: 2147483647;
//   /* transform: translateY(-50%); */
//   overflow: auto;
//   display: flex;
//   flex-direction: column;
//   /* justify-content: center; */

//   height: calc(100% - 150px);
//   width: 110px;

//   @keyframes slideAnimation {
//     from {
//       left: 0; /* Element slides to the right and is fully visible */
//     }
//     to {
//       left: -100px; /* Element starts from the left and is off the screen */
//     }
//   }

//   transition: left 0.1s ease-in-out;

//   ${p =>
//     p.collapsed &&
//     css`
//       /* width: 10px; */
//       left: -100px;
//       overflow: hidden;
//       /* animation: slideAnimation 0.2s ease-in-out; */

//       cursor: pointer;
//       :hover {
//         background: rgba(255, 255, 255, 0.1);
//       }
//     `};
// `
const StyledRoot = styled.div<{ collapsed: boolean; theme: DefaultTheme }>`
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 2000000;
  transform: translateY(-50%);
  /* background: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* height: 80%; */
  /* width: 110px; */
  padding-right: 10px;
  /* margin-left: 20px; */
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
      left: -80px;
      overflow: hidden;
      /* animation: slideAnimation 0.2s ease-in-out; */

      cursor: pointer;
      :hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `};
`

const StyledChatSwitcher = styled.div`
  display: inline-flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: ${({ theme }) => theme.body.border};
  background: ${({ theme }) => theme.body.breadCrumbsBg};
  /* Style */
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(255, 255, 255, 0.25) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.1) inset;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);

  margin-left: 10px;

  width: fit-content;
`
const StyledIcon = styled.div<{ picked: boolean }>`
  color: transparent;

  border-radius: 100px;

  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.body.breadCrumbsBg};
    cursor: pointer;
  }

  ${p =>
    p.picked &&
    css`
      background: rgba(255, 255, 255, 0.3);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        background: ${({ theme }) => theme.body.breadCrumbsBg};
    }
        cursor: auto;
      }
    `};
`

const StyledCollectionIcon = styled(Collection)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledMentionIcon = styled(Mention)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledGamesIcon = styled(Games)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledAboutIcon = styled(About)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledValueOutlineIcon = styled(ValueOutline)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledSearchOutlineIcon = styled(SearchOutline)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
