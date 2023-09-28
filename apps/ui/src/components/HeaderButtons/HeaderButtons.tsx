import styled, { css } from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Discord from '@l3-lib/ui-core/dist/icons/Discord'
import githubIcon from 'assets/icons/githubIcon.png'
import TwitterLogo from 'assets/tools/twitter.png'

export const openLinkTab = (url: string) => {
  window.open(url, '_blank')
}

const HeaderButtons = () => {
  return (
    <StyledButtonsWrapper>
      <Button
        kind={Button.kinds.TERTIARY}
        size={Button.sizes.SMALL}
        onClick={() => openLinkTab(import.meta.env.REACT_APP_TWITTER_LINK)}
      >
        <StyledInnerButtonWrapper>
          <StyledImageWrapper>
            <StyledImg src={TwitterLogo} customScale={1} />
          </StyledImageWrapper>
          <Typography value='Twitter' type={Typography.types.LABEL} size={Typography.sizes.sm} />
        </StyledInnerButtonWrapper>
      </Button>

      <Button
        kind={Button.kinds.TERTIARY}
        size={Button.sizes.SMALL}
        onClick={() => openLinkTab(import.meta.env.REACT_APP_DISCORD_LINK)}
      >
        <StyledInnerButtonWrapper>
          <StyledDiscordIcon size='20' />
          <Typography value='Discord' type={Typography.types.LABEL} size={Typography.sizes.sm} />
        </StyledInnerButtonWrapper>
      </Button>

      <Button
        kind={Button.kinds.TERTIARY}
        size={Button.sizes.SMALL}
        onClick={() => openLinkTab(import.meta.env.REACT_APP_GITHUB_LINK)}
      >
        <StyledInnerButtonWrapper>
          <StyledImageWrapper>
            <StyledImg src={githubIcon} />
          </StyledImageWrapper>
          <Typography value='Github' type={Typography.types.LABEL} size={Typography.sizes.sm} />
        </StyledInnerButtonWrapper>
      </Button>
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
  color: ${({ theme }) => theme.body.textColorPrimary};
`

const StyledDiscordIcon = styled(Discord)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
