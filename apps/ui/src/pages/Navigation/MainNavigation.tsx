import { useEffect, useState } from 'react'
import styled from 'styled-components'
import About from 'share-ui/components/Icon/Icons/components/About'
import Add from 'share-ui/components/Icon/Icons/components/Add'
import ValueOutline from 'share-ui/components/Icon/Icons/components/ValueOutline'
import Collection from 'share-ui/components/Icon/Icons/components/Collection'
import Team from 'share-ui/components/Icon/Icons/components/Team'
import Launch from 'share-ui/components/Icon/Icons/components/Launch'
import MyWeek from 'share-ui/components/Icon/Icons/components/MyWeek'
import Mobile from 'share-ui/components/Icon/Icons/components/Mobile'

import Session from 'share-ui/components/Icon/Icons/components/Teams'

import { useLocation, useNavigate } from 'react-router-dom'
import includes from 'lodash/includes'
import {
  StyledGamesIcon,
  StyledBasicIcon,
  StyledRobotIcon,
  StyledSearchOutlineIcon,
  StyledValueOutlineIcon,
} from 'components/ChatSwitcher/ChatSwitcher'

import Typography from 'share-ui/components/typography/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { t } from 'i18next'
import {
  TypographySizes,
  TypographyTypes,
} from 'share-ui/components/typography/TypographyConstants'
import AvatarDropDown from 'components/AvatarDropDown'
import { useDomainConfig } from 'utils/useDomainConfig'
import Tooltip from 'share-ui/components/Tooltip/Tooltip'

const MainNavigation = ({ user }: { user: any }) => {
  const { getDomainConfig } = useDomainConfig()
  const domainLogo = getDomainConfig('logo')

  const {
    getHomeModules,
    getChatModules,
    getModelModules,
    // getToolkitModules,
    getDiscoveryModules,
    getDatasourceModules,
    getScheduleModules,
    getContactModules,
    // getGroupModules,
    getIntegrationModules,
    getSessionModules,
    // moduleNames,
  } = useGetAccountModule()

  const isHome = getHomeModules('active')
  const isChat = getChatModules('active')
  const isModel = getModelModules('active')
  const isIntegration = getIntegrationModules('active')
  // const isToolkit = getToolkitModules()
  const isDiscover = getDiscoveryModules()
  const isDatasource = getDatasourceModules()
  const isSchedule = getScheduleModules()
  const isContact = getContactModules()
  // const isGroup = getGroupModules()
  const isSession = getSessionModules()

  // const { chat, home, datasource, models, discovery, schedule, toolkits, sessions } = moduleNames

  const navigate = useNavigate()

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
    <StyledUl>
      {isHome && (
        <Tooltip content={t('home')} position={Tooltip.positions.LEFT}>
          <StyledLi isActive={active[1] === ''} onClick={() => onHandleClick('/')}>
            <StyledLogo src={domainLogo} />
          </StyledLi>
        </Tooltip>
      )}

      {isChat && (
        <Tooltip content={t('chat')} position={Tooltip.positions.LEFT}>
          <StyledLi isActive={includes(active, 'chat')} onClick={() => onHandleClick('/chat')}>
            <StyledRobotIcon size={40} />
          </StyledLi>
        </Tooltip>
      )}

      {isSession && (
        <Tooltip content={t('session')} position={Tooltip.positions.LEFT}>
          <StyledLi
            isActive={includes(active, 'sessions')}
            onClick={() => onHandleClick('/sessions')}
          >
            <StyledSessionIcon size={30} />
          </StyledLi>
        </Tooltip>
      )}

      {isSchedule && (
        <Tooltip content={t('schedule')} position={Tooltip.positions.LEFT}>
          <StyledLi
            isActive={includes(active, 'schedules')}
            onClick={() => onHandleClick('/schedules')}
          >
            <StyledMyWeekIcon size={30} />
          </StyledLi>
        </Tooltip>
      )}

      {/* <StyledLi isActive={includes(active, 'Agents')} onClick={() => onHandleClick('/Agents')}>
        <StyledValueIcon>
          <StyledValueOutLineIcon size={38} />
        </StyledValueIcon>
        <span>Agents</span>
      </StyledLi> */}

      {isContact && (
        <Tooltip content={t('contact')} position={Tooltip.positions.LEFT}>
          <StyledLi
            isActive={includes(active, 'contacts')}
            onClick={() => onHandleClick('/contacts')}
          >
            <StyledMobileIcon size={30} />
          </StyledLi>
        </Tooltip>
      )}

      {isDatasource && (
        <Tooltip content={t('datasource')} position={Tooltip.positions.LEFT}>
          <StyledLi
            isActive={includes(active, 'datasources')}
            onClick={() => onHandleClick('/datasources')}
          >
            <StyledValueOutlineIcon size={40} />
          </StyledLi>
        </Tooltip>
      )}

      {/* {isToolkit && (
        <StyledLi
          isActive={includes(active, 'toolkits')}
          onClick={() => onHandleClick('/toolkits')}
        >
          <StyledGamesIcon size={40} />
          <TypographySecondary
            value={t('toolkit')}
            type={TypographyTypes.LABEL}
            size={TypographySizes.sm}
          />
        </StyledLi>
      )} */}

      {isIntegration && (
        <Tooltip content={t('integration')} position={Tooltip.positions.LEFT}>
          <StyledLi
            isActive={includes(active, 'integrations')}
            onClick={() => onHandleClick('/integrations')}
          >
            <StyledGamesIcon size={40} />
          </StyledLi>
        </Tooltip>
      )}

      {isModel && (
        <Tooltip content={t('model')} position={Tooltip.positions.LEFT}>
          <StyledLi isActive={includes(active, 'models')} onClick={() => onHandleClick('/models')}>
            <StyledBasicIcon size={30} />
          </StyledLi>
        </Tooltip>
      )}

      {isDiscover && (
        <Tooltip content={t('discover')} position={Tooltip.positions.LEFT}>
          <StyledLi
            isActive={includes(active, 'discover')}
            onClick={() => onHandleClick('/discover')}
          >
            <StyledSearchOutlineIcon size={40} />
          </StyledLi>
        </Tooltip>
      )}

      <StyledAvatarWrapper>
        <StyledInnerWrapper>
          <AvatarDropDown />
        </StyledInnerWrapper>

        {/* <MediaButtons /> */}
      </StyledAvatarWrapper>
    </StyledUl>
  )
}

export default MainNavigation

const StyledUl = styled.ul`
  height: 100%;

  list-style: none;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  padding: 24px 16px;
`
const StyledLi = styled.li<{ isActive?: boolean }>`
  color: transparent;

  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  opacity: 0.8;
  ${({ isActive, theme }) =>
    isActive &&
    `
    opacity: 1;
    
    border-radius: 100px;
    background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.10));
    span{
      color: ${theme.body.mainNavColorActive};
    svg{
      path{
        fill-opacity: 1
      }
    }
`}
`
export const StyledAboutIcon = styled(About)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledCollectionIcon = styled(Collection)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledTeamIcon = styled(Team)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledValueOutLineIcon = styled(ValueOutline)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledAddIcon = styled(Add)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledLaunchIcon = styled(Launch)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledValueIcon = styled.div`
  color: transparent;
  background: transparent;
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledMyWeekIcon = styled(MyWeek)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
export const StyledMobileIcon = styled(Mobile)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledSessionIcon = styled(Session)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledAvatarWrapper = styled.div`
  margin-top: auto;

  position: sticky;
  bottom: 0;

  display: flex;
  /* align-items: center; */
  flex-direction: column;
  gap: 0px;

  z-index: 100000000;

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
const StyledLogo = styled.img`
  width: 40px;
  height: 40px;
`
