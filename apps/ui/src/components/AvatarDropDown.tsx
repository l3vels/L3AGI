import { Arrow, Content, Item, Root, Trigger } from '@radix-ui/react-dropdown-menu'

import API from '@l3-lib/ui-core/dist/icons/API'

import styled, { css, keyframes } from 'styled-components'

import { logout as logOutCookies } from 'helpers/authHelper'
import { useNavigate } from 'react-router-dom'
import { useLogoutService } from 'services'
import { useTranslation } from 'react-i18next'

import Settings from 'share-ui/components/Icon/Icons/components/Settings'
import LogOut from 'share-ui/components/Icon/Icons/components/LogOut'
import AvatarGenerator from './AvatarGenerator/AvatarGenerator'
import React from 'react'
import { AuthContext } from 'contexts'
import TypographyPrimary from './Typography/Primary'
import {
  TypographySizes,
  TypographyTypes,
} from 'share-ui/components/typography/TypographyConstants'

const AvatarDropDown = () => {
  const { t } = useTranslation()

  const [logout] = useLogoutService()
  const navigate = useNavigate()

  const { user } = React.useContext(AuthContext)

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
        <AvatarGenerator name={user.name} size={50} arcShape avatar={user.avatar} />
      </StyledDropDownMenuTrigger>
      <StyledDropdownContent>
        {/* <StyledDropDownMenuItem onClick={() => navigate('/settings')}>
          <StyledSettingsIcon size={20} />

          <TypographyPrimary
            value={t('settings')}
            type={TypographyTypes.P}
            size={TypographySizes.xss}
            style={{ fontSize: '12px', fontStyle: 'normal', fontWeight: '500', lineHeight: '16px' }}
          />
        </StyledDropDownMenuItem> */}
        <StyledDropDownMenuItem onClick={() => navigate('api-key')}>
          <StyledAPIIcon size={20} />

          <TypographyPrimary
            value='API Keys'
            type={TypographyTypes.P}
            size={TypographySizes.xss}
            style={{
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '16px',
            }}
          />
        </StyledDropDownMenuItem>
        <StyledDropDownMenuItem onClick={() => navigate('invite-user')}>
          <StyledAPIIcon size={20} />

          <TypographyPrimary
            value='Invite User'
            type={TypographyTypes.P}
            size={TypographySizes.xss}
            style={{
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '16px',
            }}
          />
        </StyledDropDownMenuItem>
        <StyledDropDownMenuItem onClick={handleLogout}>
          <StyledLogOutIcon size={20} />
          <TypographyPrimary
            value={t('logout')}
            type={TypographyTypes.P}
            size={TypographySizes.xss}
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

export const StyledDropdownContent = styled(Content)`
  margin-bottom: 15px;
  margin-left: 20px;
  min-width: 200px;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 10203000;
  border-radius: 8px;
  background: ${({ theme }) => theme.body.avatarDropDownColor};
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

export const StyledDropDownMenuRoot = styled(Root)``

export const StyledDropDownMenuItem = styled(Item)`
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
    background: ${({ theme }) => theme.body.humanMessageBgColor};
  }
`

export const StyledDropDownMenuTrigger = styled(Trigger)`
  all: unset;
  cursor: pointer;
`

const StyledLogOutIcon = styled(LogOut)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledAPIIcon = styled(API)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
