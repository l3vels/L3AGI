import { useEffect, useState } from 'react'
import styled, { DefaultTheme } from 'styled-components'

import About from '@l3-lib/ui-core/dist/icons/About'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import ValueOutline from '@l3-lib/ui-core/dist/icons/ValueOutline'
import Collection from '@l3-lib/ui-core/dist/icons/Collection'
import Team from '@l3-lib/ui-core/dist/icons/Team'
import Launch from '@l3-lib/ui-core/dist/icons/Launch'

import { useLocation, useNavigate } from 'react-router-dom'
import includes from 'lodash/includes'
import {
  StyledGamesIcon,
  StyledMentionIcon,
  StyledSearchOutlineIcon,
  StyledValueOutlineIcon,
} from 'components/ChatSwitcher/ChatSwitcher'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographySecondary from 'components/Typography/Secondary'

const MainNavigation = () => {
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
      <StyledLi isActive={active[1] === ''} onClick={() => onHandleClick('/')}>
        <StyledAboutIcon size={40} />
        <TypographySecondary
          value={'Home'}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
      </StyledLi>

      <StyledLi isActive={includes(active, 'chat')} onClick={() => onHandleClick('/chat')}>
        <StyledMentionIcon size={40} />
        <TypographySecondary
          value={'Chat'}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
      </StyledLi>

      {/* <StyledLi isActive={includes(active, 'Agents')} onClick={() => onHandleClick('/Agents')}>
        <StyledValueIcon>
          <StyledValueOutLineIcon size={38} />
        </StyledValueIcon>
        <span>Agents</span>
      </StyledLi> */}

      <StyledLi
        isActive={includes(active, 'datasources')}
        onClick={() => onHandleClick('/datasources')}
      >
        <StyledValueOutlineIcon size={40} />
        <TypographySecondary
          value={'Data sources'}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
      </StyledLi>

      <StyledLi isActive={includes(active, 'toolkits')} onClick={() => onHandleClick('/toolkits')}>
        <StyledGamesIcon size={40} />
        <TypographySecondary
          value={'Toolkits'}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
      </StyledLi>

      <StyledLi isActive={includes(active, 'discover')} onClick={() => onHandleClick('/discover')}>
        <StyledSearchOutlineIcon size={40} />
        <TypographySecondary
          value={'Discover'}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
      </StyledLi>
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
const StyledIconWrapper = styled.div`
  color: #fff;
  background: transparent;
  /* margin-bottom: 10px; */
  margin-top: 10px;
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
`
