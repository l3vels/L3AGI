import styled, { css } from 'styled-components'
import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'

type PluginItemProps = {
  image: string
  title: string
  description: string
  isActive: boolean
  onClick: () => void
}

const PluginItem = ({ image, title, description, isActive = false, onClick }: PluginItemProps) => {
  return (
    <StyledPluginItem active={isActive} onClick={onClick}>
      <StyledImg src={image} />
      <TypographyPrimary value={title} type={Typography.types.LABEL} size={Typography.sizes.sm} />
      <StyledDescription>{description}</StyledDescription>
    </StyledPluginItem>
  )
}

export default PluginItem

const StyledPluginItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;

  width: 170px;
  height: 180.78px;

  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1),
    inset 0px 0.620864px 4.96691px rgba(255, 255, 255, 0.35),
    inset -0.620864px 0.620864px 0.620864px -1.24173px rgba(255, 255, 255, 0.35);

  border-radius: 10px;

  cursor: pointer;

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }

  ${props =>
    props.active &&
    css`
      background: rgba(0, 0, 0, 0.8);
      :hover {
        background: rgba(0, 0, 0, 0.6);
      }
    `}
`
const StyledImg = styled.img`
  max-height: 80px;
  min-height: 80px;
`

const StyledDescription = styled.span`
  color: #fff;
  font-style: normal;
  font-weight: 450;
  font-size: 10px;
  line-height: 12px;
  /* or 120% */

  text-align: center;
`
