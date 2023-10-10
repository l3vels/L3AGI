import {
  Arrow,
  Content,
  DropdownMenuSubContent,
  Item,
  Portal,
  Root,
  Sub,
  SubTrigger,
  Trigger,
} from '@radix-ui/react-dropdown-menu'

import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled, { css, keyframes } from 'styled-components'

import { logout as logOutCookies, setAccountId } from 'helpers/authHelper'
import { useNavigate } from 'react-router-dom'
import { useLogoutService, useUserAccountsService } from 'services'
import { useTranslation } from 'react-i18next'

import defaultAvatar from '../assets/images/defaultAvatar.png'

import Settings from '@l3-lib/ui-core/dist/icons/Settings'
import LogOut from '@l3-lib/ui-core/dist/icons/LogOut'
import AvatarGenerator from './AvatarGenerator/AvatarGenerator'
import React from 'react'
import { AuthContext } from 'contexts'
import TypographyPrimary from './Typography/Primary'

const AvatarDropDown = () => {
  const { t } = useTranslation()

  const [logout] = useLogoutService()
  const navigate = useNavigate()

  const { user } = React.useContext(AuthContext)

  // const { data: userAccounts } = useUserAccountsService()

  const handleLogout = async () => {
    try {
      await logout()
      logOutCookies()
      localStorage.clear()
      window.location.href = '/'
    } catch (err) {
      logOutCookies()
      localStorage.clear()
      window.location.href = '/'
    }
  }

  return (
    <StyledDropDownMenuRoot>
      <StyledDropDownMenuTrigger>
        {/* <Avatar size={Avatar.sizes.SMALL} src={defaultAvatar} type={Avatar.types.IMG} rectangle /> */}
        <AvatarGenerator name={user.name} size={40} avatar={user.avatar} />
      </StyledDropDownMenuTrigger>
      <StyledDropdownContent>
        {/* <StyledDropDownMenuItem onClick={() => navigate('/account')}>
          <img src={profileIcon} alt='profile' />
          {t('profile')}
        </StyledDropDownMenuItem> */}
        {/* {userAccounts && userAccounts.length > 0 && (
          <></>
          <Sub>
            <DropdownMenuSubTrigger>
              <DropdownMenuSubTriggerGroup>
                <img src={teamIcon} alt='switch account' />
                Switch account
              </DropdownMenuSubTriggerGroup>
              <ArrowRightSvg />
            </DropdownMenuSubTrigger>
            <Portal>
              <DropdownMenuDropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                {userList}
                <StyledDropDownMenuItem>Account +1</StyledDropDownMenuItem>
              <StyledDropDownMenuItem>Account +2</StyledDropDownMenuItem>
              <StyledDropDownMenuItem>Account +3</StyledDropDownMenuItem>
              <StyledDropDownMenuItem>Account +4</StyledDropDownMenuItem>
              </DropdownMenuDropdownMenuSubContent>
            </Portal>
          </Sub>
        )} */}
        {/* <StyledDropDownMenuItem onClick={() => navigate('/teams')}>
          <img src={teamIcon} alt='team' />
          {t('Team')}
        </StyledDropDownMenuItem> */}
        {/* <StyledDropDownMenuItem onClick={() => navigate('/developers')}>
          <img src={developersIcon} alt='team' />
          {t('Developers')}
        </StyledDropDownMenuItem> */}
        <StyledDropDownMenuItem onClick={() => navigate('/settings')}>
          <StyledSettingsIcon size={20} />

          <TypographyPrimary
            value={'Settings'}
            type={Typography.types.P}
            size={Typography.sizes.xss}
            style={{ fontSize: '12px', fontStyle: 'normal', fontWeight: '500', lineHeight: '16px' }}
          />
        </StyledDropDownMenuItem>
        <StyledDropDownMenuItem onClick={handleLogout}>
          <StyledLogOutIcon size={20} />

          <TypographyPrimary
            value={t('logout')}
            type={Typography.types.P}
            size={Typography.sizes.xss}
            style={{ fontSize: '12px', fontStyle: 'normal', fontWeight: '500', lineHeight: '16px' }}
          />
        </StyledDropDownMenuItem>
        <Arrow className='text-white' fill='currentColor' />
      </StyledDropdownContent>
    </StyledDropDownMenuRoot>
  )
}

export default AvatarDropDown

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`
const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`
const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`
const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`

const StyledDropdownContent = styled(Content)`
  margin-bottom: 15px;
  margin-left: 20px;
  min-width: 200px;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 102030;
  border-radius: 8px;
  background: ${({ theme }) => theme.body.avatarDropDownColor}
  /* background-color: white; */
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);
  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 400ms;
    -moz-animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;

    &[data-state="open"] {
      &[data-side="top"] {
        animation-name: ${slideDownAndFade}
      },
    '&[data-side="right"]': {
      animation-name: ${slideLeftAndFade}
    },
    '&[data-side="bottom"]': {
      animation-name: ${slideUpAndFade}
    },
    '&[data-side="left"]': {
      animation-name: ${slideRightAndFade}
    },
    }

  ,
  },
`
const DropdownMenuDropdownMenuSubContent = styled(DropdownMenuSubContent)`
  min-width: 180px;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 102030;
  border-radius: 8px;
  background: var(--color-gradient-blue);

  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 400ms;
    -moz-animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;

    &[data-state="open"] {
      &[data-side="top"] {
        animation-name: ${slideDownAndFade}
      },
    '&[data-side="right"]': {
      animation-name: ${slideLeftAndFade}
    },
    '&[data-side="bottom"]': {
      animation-name: ${slideUpAndFade}
    },
    '&[data-side="left"]': {
      animation-name: ${slideRightAndFade}
    },
    }

  ,
  },
`

const StyledDropDownMenuRoot = styled(Root)``

const DropdownMenuSubTrigger = styled(SubTrigger)`
  all: unset;
  font-size: 13px;
  line-height: 1;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  position: relative;
  user-select: none;
  cursor: pointer;
  :hover {
    background: rgba(255, 255, 255, 0.3);
  }
`
const StyledDropDownMenuItem = styled(Item)`
  all: unset;
  font-size: 13px;
  line-height: 1;
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 12px 10px;
  position: relative;
  cursor: pointer;
  user-select: none;
  display: flex;
  gap: 10px;
  color: var(--content-content-primary, #fff);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  :hover {
    background: rgba(255, 255, 255, 0.3);
  }
`
const DropdownMenuSubTriggerGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  color: var(--content-content-primary, #fff);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`

// const StyledAvatar = styled(AvatarRadix.Root)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   vertical-align: middle;
//   overflow: hidden;
//   width: 40px;
//   height: 40px;
//   border-radius: 100%;
// `

// const StyledImageAvatar = styled(AvatarRadix.Image)`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   border-radius: inherit;
// `

const StyledDropDownMenuTrigger = styled(Trigger)`
  all: unset;
  cursor: pointer;
  /* display: flex;
  align-items: center;
  gap: 10px;
  width: 200px;
  padding: 6px 8px;
  border-radius: 8px;
  :hover {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  } */
`
const StyledPickedText = styled.span<{ picked: boolean }>`
  ${p =>
    p.picked &&
    css`
      pointer-events: none;
      opacity: 0.6;
    `};
`

const StyledLogOutIcon = styled(LogOut)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledSettingsIcon = styled(Settings)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
