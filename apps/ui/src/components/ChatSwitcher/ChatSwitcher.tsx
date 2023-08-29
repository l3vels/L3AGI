import { useNavigate, useParams } from 'react-router-dom'

import styled, { css } from 'styled-components'

import Mention from '@l3-lib/ui-core/dist/icons/Mention'

import Collection from '@l3-lib/ui-core/dist/icons/Collection'
import Tooltip from '@l3-lib/ui-core/dist/Tooltip'
import { useChatSwitcher } from './useChatSwitcher'

type ChatSwitcherProps = {
  isChatOpen?: boolean
}

const ChatSwitcher = ({ isChatOpen = false }: ChatSwitcherProps) => {
  const navigate = useNavigate()

  const { setShowSwitcher, showSwitcher, handleMouseHover, handleMouseLeave } = useChatSwitcher()

  const params = useParams()
  const { collectionId, gameId } = params

  let route = 'copilot'

  if (collectionId) {
    route = `/copilot?game=${gameId}&collection=${collectionId}`
  } else if (gameId) {
    route = `/copilot?game=${gameId}`
  }

  const handleChatButton = () => {
    if (!isChatOpen) {
      navigate(route, {
        state: {
          collectionId,
          gameId,
        },
      })
    }
  }

  return (
    <StyledRoot
      collapsed={!showSwitcher}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      onClick={() => setShowSwitcher(true)}
    >
      <StyledChatSwitcher>
        <Tooltip content={() => <span>Dashboard</span>} position={Tooltip.positions.TOP}>
          <StyledIcon
            picked={!isChatOpen}
            onClick={() => {
              navigate(-1)
            }}
          >
            <Collection />
          </StyledIcon>
        </Tooltip>
        <Tooltip content={() => <span>Copilot</span>} position={Tooltip.positions.BOTTOM}>
          <StyledIcon picked={isChatOpen} onClick={handleChatButton}>
            <Mention size='46' />
          </StyledIcon>
        </Tooltip>
      </StyledChatSwitcher>
    </StyledRoot>
  )
}

export default ChatSwitcher

const StyledRoot = styled.div<{ collapsed: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 2147483647;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 80%;
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
      /* width: 10px; */
      left: -100px;
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
  background: rgba(255, 255, 255, 0.1);
  /* background: var(--gradient-blue, linear-gradient(180deg, #4f71e0 0%, #5370d1 100%)); */

  /* Style */
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(255, 255, 255, 0.25) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.1) inset;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);

  margin-left: 32px;

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
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  ${p =>
    p.picked &&
    css`
      background: rgba(255, 255, 255, 0.3);
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        cursor: auto;
      }
    `};
`
