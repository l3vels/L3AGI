import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Discord from '@l3-lib/ui-core/dist/icons/Discord'
import githubIcon from 'assets/icons/githubIcon.png'

const HeaderButtons = () => {
  const openLinkTab = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <StyledButtonsWrapper>
      <Button
        kind={Button.kinds.TERTIARY}
        size={Button.sizes.SMALL}
        onClick={() => openLinkTab(import.meta.env.REACT_APP_DISCORD_LINK)}
      >
        <StyledInnerButtonWrapper>
          <Discord size='20' />
          <Typography value='Discord' type={Typography.types.LABEL} size={Typography.sizes.sm} />
        </StyledInnerButtonWrapper>
      </Button>

      <Button
        kind={Button.kinds.TERTIARY}
        size={Button.sizes.SMALL}
        onClick={() => openLinkTab(import.meta.env.REACT_APP_GITHUB_LINK)}
      >
        <StyledInnerButtonWrapper>
          <StyledVideoWrapper>
            <StyledImg src={githubIcon} />
          </StyledVideoWrapper>
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
const StyledImg = styled.img`
  width: 16px;
  height: 16px;
  object-fit: cover;
  transform: scale(1.4);
`
const StyledVideoWrapper = styled.div`
  max-width: 20px;
  max-height: 20px;
  border-radius: 100px;
  overflow: hidden;
`
const StyledInnerButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`
