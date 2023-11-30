import { useEffect, useState } from 'react'
import styled from 'styled-components'

import About from '@l3-lib/ui-core/dist/icons/About'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import ValueOutline from '@l3-lib/ui-core/dist/icons/ValueOutline'
import Collection from '@l3-lib/ui-core/dist/icons/Collection'
import Team from '@l3-lib/ui-core/dist/icons/Team'
import Launch from '@l3-lib/ui-core/dist/icons/Launch'
import MyWeek from '@l3-lib/ui-core/dist/icons/MyWeek'
import Mobile from '@l3-lib/ui-core/dist/icons/Mobile'
import Group from '@l3-lib/ui-core/dist/icons/Group'
import Session from '@l3-lib/ui-core/dist/icons/Teams'

import { useLocation, useNavigate } from 'react-router-dom'
import includes from 'lodash/includes'
import {
  StyledGamesIcon,
  StyledBasicIcon,
  StyledRobotIcon,
  StyledSearchOutlineIcon,
  StyledValueOutlineIcon,
} from 'components/ChatSwitcher/ChatSwitcher'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { t } from 'i18next'

const MainNavigation = () => {
  const {
    getHomeModules,
    getChatModules,
    getModelModules,
    getToolkitModules,
    getDiscoveryModules,
    getDatasourceModules,
    getScheduleModules,
    getContactModules,
    getGroupModules,
    getIntegrationModules,
    getSessionModules,
    moduleNames,
  } = useGetAccountModule()

  const isHome = getHomeModules('active')
  const isChat = getChatModules('active')
  const isModel = getModelModules('active')
  const isIntegration = getIntegrationModules('active')
  const isToolkit = getToolkitModules()
  const isDiscover = getDiscoveryModules()
  const isDatasource = getDatasourceModules()
  const isSchedule = getScheduleModules()
  const isContact = getContactModules()
  const isGroup = getGroupModules()
  const isSession = getSessionModules()

  const { chat, home, datasource, models, discovery, schedule, toolkits, sessions } = moduleNames

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
        <StyledLi isActive={active[1] === ''} onClick={() => onHandleClick('/')}>
          <StyledAboutIcon size={40} />
          <TypographySecondary
            value={t('home')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledLi>
      )}

      {isChat && (
        <StyledLi isActive={includes(active, 'chat')} onClick={() => onHandleClick('/chat')}>
          <StyledRobotIcon size={40} />
          <TypographySecondary
            value={t('chat')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledLi>
      )}

      {isSchedule && (
        <StyledLi
          isActive={includes(active, 'schedules')}
          onClick={() => onHandleClick('/schedules')}
        >
          <StyledMyWeekIcon size={30} />
          <TypographySecondary
            value={t('schedule')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledLi>
      )}

      {/* <StyledLi isActive={includes(active, 'Agents')} onClick={() => onHandleClick('/Agents')}>
        <StyledValueIcon>
          <StyledValueOutLineIcon size={38} />
        </StyledValueIcon>
        <span>Agents</span>
      </StyledLi> */}

      {isContact && (
        <StyledLi
          isActive={includes(active, 'contacts')}
          onClick={() => onHandleClick('/contacts')}
        >
          <StyledMobileIcon size={30} />
          <TypographySecondary
            value={t('contacts')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledLi>
      )}

      {isDatasource && (
        <StyledLi
          isActive={includes(active, 'datasources')}
          onClick={() => onHandleClick('/datasources')}
        >
          <StyledValueOutlineIcon size={40} />
          <TypographySecondary
            value={t('datasources')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledLi>
      )}

      {/* {isToolkit && (
        <StyledLi
          isActive={includes(active, 'toolkits')}
          onClick={() => onHandleClick('/toolkits')}
        >
          <StyledGamesIcon size={40} />
          <TypographySecondary
            value={t('toolkit')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledLi>
      )} */}

      {isIntegration && (
        <StyledLi
          isActive={includes(active, 'integrations')}
          onClick={() => onHandleClick('/integrations')}
        >
          <StyledGamesIcon size={40} />
          <TypographySecondary
            value={t('integrations')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledLi>
      )}

      {isModel && (
        <StyledLi isActive={includes(active, 'models')} onClick={() => onHandleClick('/models')}>
          <StyledBasicIcon size={30} />
          <TypographySecondary
            value={t('models')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledLi>
      )}

      {isSession && (
        <StyledLi
          isActive={includes(active, 'sessions')}
          onClick={() => onHandleClick('/sessions')}
        >
          <StyledSessionIcon size={30} />
          <TypographySecondary
            value={t('sessions')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledLi>
      )}

      {isDiscover && (
        <StyledLi
          isActive={includes(active, 'discover')}
          onClick={() => onHandleClick('/discover')}
        >
          <StyledSearchOutlineIcon size={40} />
          <TypographySecondary
            value={t('discovery')}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledLi>
      )}
    </StyledUl>
  )
}

export default MainNavigation

const StyledUl = styled.ul`
  backdrop-filter: blur(100px);

  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* margin-bottom: 25px; */
  padding-bottom: 10px;
`
const StyledLi = styled.li<{ isActive?: boolean }>`
  color: transparent;
  display: flex;
  padding: 4px 2px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  cursor: pointer;
  span {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: ${({ theme }) => theme.body.mainNavColor};
  }
  opacity: 0.8;
  ${({ isActive, theme }) =>
    isActive &&
    `
    opacity: 1;
    
    border-radius: 8px;
    background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.10));
    span{
      color: ${theme.body.mainNavColorActive};
    svg{
      path{
        fill-opacity: 1
      }
    }
`}/* background: red; */
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
const StyledMobileIcon = styled(Mobile)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledGroupIcon = styled(Group)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledSessionIcon = styled(Session)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
