import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import includes from 'lodash/includes'

import Games from 'share-ui/components/Icon/Icons/components/Games'
import Logs from 'share-ui/components/Icon/Icons/components/Logs'
import TagsOutline from 'share-ui/components/Icon/Icons/components/TagsOutline'

const DevelopersNavigation = () => {
  const { t } = useTranslation()
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
      <StyledLi
        isActive={active.length === 2 && includes(active, '')}
        onClick={() => onHandleClick('')}
      >
        <Games />
        <span>{t('api-keys')}</span>
      </StyledLi>
      <StyledLi isActive={includes(active, 'logs')} onClick={() => onHandleClick('logs')}>
        <Logs />
        <span>{t('logs')}</span>
      </StyledLi>
      <StyledLi isActive={includes(active, 'webhook')} onClick={() => onHandleClick('webhook')}>
        <TagsOutline />
        <span>{t('webhooks')}</span>
      </StyledLi>
      {/* <StyledLi isActive={includes(active, 'players')} onClick={() => onHandleClick('players')}>
        <Doc />
        <span>Docs</span>
      </StyledLi> */}
    </StyledUl>
  )
}

export default DevelopersNavigation

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 16px;
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
    color: var(--content-content-tertiary, rgba(255, 255, 255, 0.6));
  }
  ${({ isActive }) =>
    isActive &&
    `
    border-radius: 6px;
    background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.10));
    span{
      color: var(--content-content-primary, #FFF);
    }
    svg{
      path{
        fill-opacity: 1
      }
    }
`}
`
