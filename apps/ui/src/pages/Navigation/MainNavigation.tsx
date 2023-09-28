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
        <StyledAboutIcon />

        <span>Home</span>
      </StyledLi>
      <StyledLi isActive={includes(active, 'agents')} onClick={() => onHandleClick('/agents')}>
        <StyledCollectionIcon />
        <span>Agents</span>
      </StyledLi>
      <StyledLi
        isActive={includes(active, 'team-of-agents')}
        onClick={() => onHandleClick('/team-of-agents')}
      >
        <StyledIconWrapper>
          <StyledTeamIcon size={30} />
        </StyledIconWrapper>
        <span>Team</span>
      </StyledLi>
      <StyledLi
        isActive={includes(active, 'datasources')}
        onClick={() => onHandleClick('/datasources')}
      >
        <StyledValueIcon>
          <StyledValueOutLineIcon size={38} />
        </StyledValueIcon>
        <span>Data sources</span>
      </StyledLi>
      <StyledLi isActive={includes(active, 'toolkits')} onClick={() => onHandleClick('/toolkits')}>
        <StyledAddIcon size={40} />
        <span>Toolkits</span>
      </StyledLi>
      <StyledLi isActive={includes(active, 'discover')} onClick={() => onHandleClick('/discover')}>
        <StyledIconWrapper>
          <StyledLaunchIcon size={30} />
        </StyledIconWrapper>
        <span>Discover</span>
      </StyledLi>
    </StyledUl>
  )
}

export default MainNavigation

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 16px;
  /* margin-bottom: 25px; */
  padding-bottom: 10px;
`
const StyledLi = styled.li<{ isActive?: boolean }>`
  width: 90px;
  height: 64px;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
    border-radius: 6px;
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
const StyledAboutIcon = styled(About)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledCollectionIcon = styled(Collection)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledTeamIcon = styled(Team)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledValueOutLineIcon = styled(ValueOutline)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledAddIcon = styled(Add)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledLaunchIcon = styled(Launch)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

export const StyledValueIcon = styled.div`
  color: transparent;
  background: transparent;
`
