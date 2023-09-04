import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'

type ToolCardProps = {
  title: string
  subTitle?: string
  onClick: () => void
  logoSrc: string
}

const ToolCard = ({ title, subTitle, onClick, logoSrc }: ToolCardProps) => {
  return (
    <StyledRoot onClick={onClick} bgImg={''}>
      <StyledWrapper>
        <StyledImg src={logoSrc} />
        <StyledTextWrapper>
          <Typography
            value={`By`}
            type={Typography.types.LABEL}
            size={Typography.sizes.xss}
            customColor={'rgba(255,255,255,0.8'}
          />

          <Typography
            value={`L3`}
            type={Typography.types.LABEL}
            size={Typography.sizes.xss}
            customColor={'rgba(255,255,255,0.8'}
            style={{ textDecoration: 'underline' }}
          />
        </StyledTextWrapper>
      </StyledWrapper>
      <StyledMainTextWrapper>
        <Typography
          value={title}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
          customColor={'#FFF'}
        />
        <Typography
          value={subTitle}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor={'#FFF'}
        />
      </StyledMainTextWrapper>
    </StyledRoot>
  )
}

export default ToolCard

const StyledRoot = styled.div<{ bgImg: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px 8px;
  gap: 8px;
  width: 250px;
  min-width: 250px;
  height: 158px;
  min-height: 158px;
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.4) 100%);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  background-image: ${p =>
    p.bgImg &&
    `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%), url(${p.bgImg})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
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
