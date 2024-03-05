import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

import Button from 'share-ui/components/Button/Button'
import Typography from 'share-ui/components/typography/Typography'
import Tooltip from 'share-ui/components/Tooltip/Tooltip'
// import Tooltip from 'share-ui/components/Tooltip/Tooltip'

import Discord from 'share-ui/components/Icon/Icons/components/Discord'
import githubIcon from 'assets/icons/githubIcon.png'
import TypographyPrimary from 'components/Typography/Primary'
import { ButtonTertiary } from 'components/Button/Button'

import Hide from 'share-ui/components/Icon/Icons/components/Hide'
import Show from 'share-ui/components/Icon/Icons/components/Show'
import { useContext } from 'react'
import { LayoutContext } from 'contexts'
import { useLocation } from 'react-router-dom'
import { isMacOS } from 'utils/isMac'
import { useGetAccountModule } from 'utils/useGetAccountModule'

export const openLinkTab = (url: string) => {
  window.open(url, '_blank')
}

const HeaderButtons = () => {
  const { t } = useTranslation()
  const { expand, onChangeLayout } = useContext(LayoutContext)
  const location = useLocation()

  const { getExternalLinksModule } = useGetAccountModule()
  const isLinkModule = getExternalLinksModule()

  return (
    <StyledButtonsWrapper>
      {location.pathname.includes('/chat') && (
        <Tooltip
          content={
            <span>
              {t('focus')} {isMacOS ? `${t('ctrl+f')}` : `${t('ctrl+shift+f')}`}
            </span>
          }
          position={Tooltip.positions.BOTTOM}
          tooltipSize={Tooltip.tooltipSize.Small}
        >
          <ButtonTertiary size={'small'} onClick={() => onChangeLayout(!expand)}>
            {expand ? <Show size={26} /> : <Hide size={26} />}
          </ButtonTertiary>
        </Tooltip>
      )}

      {/* <Tooltip
        content={<span>{t('docs')}</span>}
        position={Tooltip.positions.BOTTOM}
        tooltipSize={Tooltip.tooltipSize.Small}
      >
        <ButtonTertiary
          size={Button.sizes?.SMALL}
          onClick={() => openLinkTab(import.meta.env.REACT_APP_BASICS_LINK)}
        >
          <StyledInnerButtonWrapper>
            <TypographyPrimary
              value={t('docs')}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
          </StyledInnerButtonWrapper>
        </ButtonTertiary>
      </Tooltip> */}

      {/* <Tooltip
        content={() => <span>Twitter</span>}
        position={Tooltip.positions.BOTTOM}
        tooltipSize='small'
      >
        <ButtonTertiary
          size={Button.sizes?.SMALL}
          onClick={() => openLinkTab(import.meta.env.REACT_APP_TWITTER_LINK)}
        >
          <StyledInnerButtonWrapper>
            <StyledImageWrapper>
              <StyledImg src={TwitterLogo} customScale={1} />
            </StyledImageWrapper>
        
          </StyledInnerButtonWrapper>
        </ButtonTertiary>
      </Tooltip> */}

      {/* <Tooltip
        content={() => <span>Discord</span>}
        position={Tooltip.positions.BOTTOM}
        tooltipSize='small'
      >
        <ButtonTertiary
          size={Button.sizes?.SMALL}
          onClick={() => openLinkTab(import.meta.env.REACT_APP_DISCORD_LINK)}
        >
          <StyledInnerButtonWrapper>
            <StyledDiscordIcon size='20' />
          </StyledInnerButtonWrapper>
        </ButtonTertiary>
      </Tooltip> */}

      {/* {isLinkModule && (
        <Tooltip
          content={<span>{t('github')}</span>}
          position={Tooltip.positions.BOTTOM}
          tooltipSize={Tooltip.tooltipSize.Small}
        >
          <ButtonTertiary
            size={Button.sizes?.SMALL}
            onClick={() => openLinkTab(import.meta.env.REACT_APP_GITHUB_LINK)}
          >
            <StyledInnerButtonWrapper>
              <StyledImageWrapper>
                <StyledImg src={githubIcon} />
              </StyledImageWrapper>
              {!location.pathname.includes('/chat') && (
                <TypographyPrimary
                  value={t('star-us-on-github')}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                />
              )}
            </StyledInnerButtonWrapper>
          </ButtonTertiary>
        </Tooltip>
      )} */}
    </StyledButtonsWrapper>
  )
}

export default HeaderButtons

const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;
`
export const StyledImg = styled.img<{ customScale?: number }>`
  width: 16px;
  height: 16px;
  object-fit: cover;
  transform: scale(1.4);

  ${p =>
    p.customScale &&
    css`
      transform: scale(${p.customScale});
    `};
`
export const StyledImageWrapper = styled.div<{ secondary?: boolean }>`
  max-width: 20px;
  max-height: 20px;
  border-radius: 100px;
  border: 1px solid transparent;
  overflow: hidden;

  margin-bottom: 2px;

  ${p =>
    p.secondary &&
    css`
      border: 1px solid #fff;
    `};
`
export const StyledInnerButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const StyledDiscordIcon = styled(Discord)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
