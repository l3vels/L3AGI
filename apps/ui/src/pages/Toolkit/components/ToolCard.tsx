import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'

type ToolCardProps = {
  title: string
  subTitle?: string
  onClick: () => void
  logoSrc: string
  isDisabled: boolean
  isReadOnly?: boolean
}

const ToolCard = ({
  title,
  subTitle,
  onClick,
  logoSrc,
  isDisabled,
  isReadOnly = false,
}: ToolCardProps) => {
  return (
    <StyledRoot onClick={onClick} bgImg={''} isDisabled={isDisabled} isReadOnly={isReadOnly}>
      <StyledWrapper>
        <StyledImg src={logoSrc} />
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
      </StyledWrapper>
      <StyledMainTextWrapper>
        <TypographyPrimary value={title} type={Typography.types.LABEL} size={Typography.sizes.md} />
        <TypographyPrimary
          value={subTitle}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
        />
      </StyledMainTextWrapper>
    </StyledRoot>
  )
}

export default ToolCard

const StyledRoot = styled.div<{ bgImg: string; isDisabled: boolean; isReadOnly: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px 8px;
  gap: 8px;
  width: 260px;
  min-width: 260px;
  height: 158px;
  min-height: 158px;
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.4) 100%);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  border: ${({ theme }) => theme.body.border};
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
      background: #000;
    `};

  ${p =>
    p.isReadOnly &&
    css`
      pointer-events: none;
    `};
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const StyledImg = styled.img`
  border-radius: 8px;
  width: 48px;
  height: 48px;
  object-fit: contain;
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
