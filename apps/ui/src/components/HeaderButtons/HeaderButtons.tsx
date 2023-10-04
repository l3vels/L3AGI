import styled, { css } from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Tooltip from '@l3-lib/ui-core/dist/Tooltip'

import Discord from '@l3-lib/ui-core/dist/icons/Discord'
import githubIcon from 'assets/icons/githubIcon.png'
import TwitterLogo from 'assets/tools/twitter.png'
import TypographyPrimary from 'components/Typography/Primary'
import { ButtonTertiary } from 'components/Button/Button'

import Hide from '@l3-lib/ui-core/dist/icons/Hide'
import Show from '@l3-lib/ui-core/dist/icons/Show'
import { useContext } from 'react'
import { LayoutContext } from 'contexts'

export const openLinkTab = (url: string) => {
  window.open(url, '_blank')
}

const HeaderButtons = () => {
  const { expand, onChangeLayout } = useContext(LayoutContext)

  return (
    <StyledButtonsWrapper>
      <Tooltip
        content={() => <span>Focus Mode</span>}
        position={Tooltip.positions.BOTTOM}
        tooltipSize='small'
      >
        <ButtonTertiary size={'small'} onClick={() => onChangeLayout(!expand)}>
          {expand ? <Hide size={26} /> : <Show size={26} />}
        </ButtonTertiary>
      </Tooltip>

      <Tooltip
        content={() => <span>Twitter</span>}
        position={Tooltip.positions.BOTTOM}
        tooltipSize='small'
      >
        <ButtonTertiary
          size={Button.sizes.SMALL}
          onClick={() => openLinkTab(import.meta.env.REACT_APP_TWITTER_LINK)}
        >
          <StyledInnerButtonWrapper>
            <StyledImageWrapper>
              <StyledImg src={TwitterLogo} customScale={1} />
            </StyledImageWrapper>
            {/* <TypographyPrimary
            value='Twitter'
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          /> */}
          </StyledInnerButtonWrapper>
        </ButtonTertiary>
      </Tooltip>

      <Tooltip
        content={() => <span>Discord</span>}
        position={Tooltip.positions.BOTTOM}
        tooltipSize='small'
      >
        <ButtonTertiary
          size={Button.sizes.SMALL}
          onClick={() => openLinkTab(import.meta.env.REACT_APP_DISCORD_LINK)}
        >
          <StyledInnerButtonWrapper>
            <StyledDiscordIcon size='20' />
            {/* <TypographyPrimary
            value='Discord'
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          /> */}
          </StyledInnerButtonWrapper>
        </ButtonTertiary>
      </Tooltip>

      <Tooltip
        content={() => <span>Github</span>}
        position={Tooltip.positions.BOTTOM}
        tooltipSize='small'
      >
        <ButtonTertiary
          size={Button.sizes.SMALL}
          onClick={() => openLinkTab(import.meta.env.REACT_APP_GITHUB_LINK)}
        >
          <StyledInnerButtonWrapper>
            <StyledImageWrapper>
              <StyledImg src={githubIcon} />
            </StyledImageWrapper>
            {/* <TypographyPrimary
            value='Github'
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          /> */}
          </StyledInnerButtonWrapper>
        </ButtonTertiary>
      </Tooltip>
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
