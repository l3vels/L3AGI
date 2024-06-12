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
import Chats from 'share-ui/components/Icon/Icons/components/Chats'
import Integrations from 'share-ui/components/Icon/Icons/components/integrations'
import FineTuning from 'share-ui/components/Icon/Icons/components/FineTuning'
// eslint-disable-next-line import/no-named-as-default
import Cloud from 'share-ui/components/Icon/Icons/components/Cloud'
import { API, Payments, Person, Teams } from 'share-ui/components/Icon/Icons'

import ModeSwitcher from 'components/ModeSwitcher'
import { useAppModeContext } from 'context/AppModeContext'

const MainNavigation = ({ user }: { user: any }) => {
  const { computeMode, subnetMode } = useAppModeContext()

  const domainEnv = import.meta.env
  const isDatura = domainEnv.REACT_APP_ENV === 'datura'

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
    <StyledRoot>
      <StyledUl>
        {isHome && (
          <Tooltip content={t('home')} position={Tooltip.positions.LEFT}>
            <StyledLi isActive={active[1] === ''} onClick={() => onHandleClick('/')}>
              <StyledLogo src={domainLogo} />
            </StyledLi>
          </Tooltip>
        )}

        {!isDatura && isChat && (
          <Tooltip content={t('chat')} position={Tooltip.positions.LEFT}>
            <StyledLi isActive={includes(active, 'chat')} onClick={() => onHandleClick('/chat')}>
              <Chats size={40} />
              {includes(active, 'chat') && <StyledCorner />}
            </StyledLi>
          </Tooltip>
        )}

        {/* {isSession && (
          <Tooltip content={t('session')} position={Tooltip.positions.LEFT}>
            <StyledLi
              isActive={includes(active, 'sessions')}
              onClick={() => onHandleClick('/sessions')}
            >
              <StyledSessionIcon size={30} />
            </StyledLi>
          </Tooltip>
        )} */}

        {/* {isSchedule && (
          <Tooltip content={t('schedule')} position={Tooltip.positions.LEFT}>
            <StyledLi
              isActive={includes(active, 'schedules')}
              onClick={() => onHandleClick('/schedules')}
            >
              <StyledMyWeekIcon size={30} />
            </StyledLi>
          </Tooltip>
        )} */}

        {/* <StyledLi isActive={includes(active, 'Agents')} onClick={() => onHandleClick('/Agents')}>
        <StyledValueIcon>
          <StyledValueOutLineIcon size={38} />
        </StyledValueIcon>
        <span>Agents</span>
      </StyledLi> */}

        {/* {isContact && (
          <Tooltip content={t('contact')} position={Tooltip.positions.LEFT}>
            <StyledLi
              isActive={includes(active, 'contacts')}
              onClick={() => onHandleClick('/contacts')}
            >
              <StyledMobileIcon size={30} />
            </StyledLi>
          </Tooltip>
        )} */}

        {!isDatura && isDatasource && (
          <Tooltip content={t('datasource')} position={Tooltip.positions.LEFT}>
            <StyledLi
              isActive={includes(active, 'datasources')}
              onClick={() => onHandleClick('/datasources')}
            >
              <StyledValueOutlineIcon size={40} />
              {includes(active, 'datasources') && <StyledCorner />}
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

        {computeMode && isDatura && (
          <Tooltip content={'Pods'} position={Tooltip.positions.LEFT}>
            <StyledLi
              isActive={includes(active, 'pods')}
              onClick={() => onHandleClick('/pods/create-pod')}
            >
              <Cloud size={30} fill={includes(active, 'pods') ? '#ffffff' : '#000000'} />
              {includes(active, 'pods') && <StyledCorner />}
            </StyledLi>
          </Tooltip>
        )}

        {subnetMode && isDatura && (
          <Tooltip content={t('Subnets')} position={Tooltip.positions.LEFT}>
            <StyledLi
              isActive={includes(active, 'subnets')}
              onClick={() => onHandleClick('/subnets')}
            >
              <StyledImg
                src='https://icons.veryicon.com/png/o/application/cloud-supervision-platform-vr10/subnets.png'
                picked={includes(active, 'subnets')}
              />
              {includes(active, 'subnets') && <StyledCorner />}
            </StyledLi>
          </Tooltip>
        )}

        {isModel && (
          <Tooltip content={t('model')} position={Tooltip.positions.LEFT}>
            <StyledLi
              isActive={includes(active, 'models')}
              onClick={() => onHandleClick('/models')}
            >
              <FineTuning />
              {includes(active, 'models') && <StyledCorner />}
            </StyledLi>
          </Tooltip>
        )}

        <Tooltip content={t('api-keys')} position={Tooltip.positions.LEFT}>
          <StyledLi
            isActive={includes(active, 'api-key')}
            onClick={() => onHandleClick('/api-key')}
          >
            <StyledAPIIcon size={40} />
          </StyledLi>
        </Tooltip>

        <Tooltip content={t('Teams')} position={Tooltip.positions.LEFT}>
          <StyledLi
            isActive={includes(active, 'invite-user')}
            onClick={() => onHandleClick('/invite-user')}
          >
            <StyledTeamsIcon />
          </StyledLi>
        </Tooltip>

        <Tooltip content={t('Billing')} position={Tooltip.positions.LEFT}>
          <StyledLi
            isActive={includes(active, 'billing')}
            onClick={() => onHandleClick('/billing')}
          >
            <StyledPaymentsIcon />
            {includes(active, 'billing') && <StyledCorner />}
          </StyledLi>
        </Tooltip>

        {/* {isDiscover && (
          <Tooltip content={t('discover')} position={Tooltip.positions.LEFT}>
            <StyledLi
              isActive={includes(active, 'discover')}
              onClick={() => onHandleClick('/discover')}
            >
              <StyledSearchOutlineIcon size={40} />
            </StyledLi>
          </Tooltip>
        )} */}

        {/* <StyledSpace /> */}
      </StyledUl>
      <StyledBottomSection>
        {!isDatura ? (
          <>
            {isIntegration && (
              <Tooltip content={t('integration')} position={Tooltip.positions.LEFT}>
                <StyledLi
                  isActive={includes(active, 'integrations')}
                  onClick={() => onHandleClick('/integrations')}
                >
                  <Integrations size={40} />
                  {includes(active, 'integrations') && <StyledCorner />}
                </StyledLi>
              </Tooltip>
            )}
          </>
        ) : (
          <Tooltip content={t('Mode')} position={Tooltip.positions.LEFT}>
            <StyledInnerWrapper>
              <ModeSwitcher />
            </StyledInnerWrapper>
          </Tooltip>
        )}

        <StyledInnerWrapper>
          <AvatarDropDown />
        </StyledInnerWrapper>
        {/* <MediaButtons /> */}
      </StyledBottomSection>
    </StyledRoot>
  )
}

export default MainNavigation

const StyledRoot = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 24px;
`

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
  position: relative;
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  ${({ isActive, theme }) =>
    isActive &&
    `
    opacity: 1;
    
    border-radius: 100px;
    background: #000;

    span{
      color: #FFF;
    }
    

    path {
    stroke: #FFF;
  
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
export const StyledCloudOutlineIcon = styled(Cloud)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledBottomSection = styled.div`
  margin-top: auto;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;

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
const StyledImg = styled.img<{ picked: boolean }>`
  width: 22px;
  height: 22px;

  filter: ${({ picked }) => (picked ? 'brightness(0) invert(1)' : 'none')};
`

const StyledCorner = styled.div`
  width: 0;
  height: 0;
  border-right: 10px solid ${({ theme }) => theme.body.componentsWrapperBg}; /* One corner on the left */
  border-top: 16px solid transparent;
  border-bottom: 16px solid transparent;
  position: absolute;
  top: 8px; /* Adjust this value based on your design */
  right: -16px; /* Position the left corner */
`
const StyledAPIIcon = styled(API)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledTeamsIcon = styled(Teams)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledPaymentsIcon = styled(Payments)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
