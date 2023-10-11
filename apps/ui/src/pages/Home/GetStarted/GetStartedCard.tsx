import styled from 'styled-components'

type GetStartedCardProps = {
  title: string
  subTitle: string
  subTitleUnderLine?: boolean
  image: string
  bgColor?: string
  link: string
  fullWidth?: boolean
}

const GetStartedCard = ({
  title,
  subTitle,
  // subTitleUnderLine = false,
  image,
  bgColor = 'pink',
  link,
  fullWidth = false,
}: GetStartedCardProps) => {
  const openNewTabHandler = () => {
    if (link) {
      window.open(link, '_blank')
    }
  }

  return (
    <StyledLinkCard onClick={openNewTabHandler} bgColor={bgColor} fullWidth={fullWidth}>
      <StyledTextWrapper>
        <h2>{subTitle}</h2>
        <h1>{title}</h1>
      </StyledTextWrapper>
      <StyledImg src={image} />
    </StyledLinkCard>
  )
}

export default GetStartedCard

const StyledLinkCard = styled.div<{ bgColor: string; fullWidth: boolean }>`
  padding: 28px 24px;
  min-width: 240px;
  box-sizing: border-box;
  padding-bottom: 16px;
  background: ${p => (p.bgColor ? `var(--color-gradient-${p.bgColor})` : p.bgColor)};
  width: ${p => (p.fullWidth ? `100%` : 'auto')};
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`
const StyledImg = styled.img`
  position: absolute;
  width: 56px;
  height: 62px;
  right: 0px;
  bottom: 0px;
  // box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px 0px 0px 0px;
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.6);
  }
  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.8);
  }
`
