import styled, { css } from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'

type ToolCardProps = {
  title: string
  subTitle?: string
  onClick: () => void
  logoSrc: string
  isDisabled: boolean
  isReadOnly?: boolean
  selected?: boolean
  size?: 'small' | 'normal'
}

const ToolCard = ({
  title,
  subTitle,
  onClick,
  logoSrc,
  isDisabled,
  isReadOnly = false,
  selected = false,
  size = 'normal',
}: ToolCardProps) => {
  return (
    <StyledRoot
      onClick={onClick}
      bgImg={''}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      selected={selected}
      size={size}
    >
      <StyledWrapper>
        <StyledImg src={logoSrc} size={size} />
        {size !== 'small' && (
          <StyledTextWrapper>
            <TypographySecondary
              value={`By`}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
            />

            <TypographySecondary
              value={`L3`}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
              style={{ textDecoration: 'underline' }}
            />
          </StyledTextWrapper>
        )}
      </StyledWrapper>
      <StyledMainTextWrapper>
        <TypographyPrimary
          value={title}
          type={Typography.types.LABEL}
          size={size === 'small' ? Typography.sizes.xss : Typography.sizes.md}
        />
        <TypographyPrimary
          value={subTitle}
          type={Typography.types.LABEL}
          size={size === 'small' ? Typography.sizes.xss : Typography.sizes.md}
        />
      </StyledMainTextWrapper>
    </StyledRoot>
  )
}

export default ToolCard

const StyledRoot = styled.div<{
  bgImg: string
  size: string
  isDisabled: boolean
  isReadOnly: boolean
  selected: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px 8px;
  gap: 8px;
  width: 248px;
  min-width: 248px;
  height: 158px;
  min-height: 158px;
  background: ${({ theme }) => theme.body.toolkitCardBgColorPrimary};
  background: ${({ theme }) => theme.body.toolkitCardBgColorSecondary};
  backdrop-filter: blur(8px);
  /* border: ${({ theme }) => theme.body.border}; */
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

  border-radius: 16px;
  background-image: ${p =>
    p.bgImg &&
    `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%), url(${p.bgImg})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;

  ${p =>
    p.isDisabled &&
    css`
      pointer-events: none;
      opacity: 0.6;
      background: ${({ theme }) => theme.body.toolkitCardBgColorTertiary};
      border: ${({ theme }) => theme.body.border};
      box-shadow: none;
    `};

  ${p =>
    p.isReadOnly &&
    css`
      pointer-events: none;
    `};

  ${p =>
    p.selected &&
    css`
      outline: 2px solid #68b3fd;
    `};
  ${p =>
    p.size === 'small' &&
    css`
      width: 180px;
      min-width: 180px;
      height: 100px;
      min-height: 100px;
    `};
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const StyledImg = styled.img<{ size: string }>`
  border-radius: 8px;
  width: 48px;
  height: 48px;
  object-fit: contain;

  ${p =>
    p.size === 'small' &&
    css`
      width: 24px;
      height: 24px;
    `};
`
const StyledTextWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`
const StyledMainTextWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`
