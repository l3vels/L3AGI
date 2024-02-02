import Avatar, { ConfigProvider } from 'react-avatar'
import styled, { css } from 'styled-components'
import { boolean } from 'yup'

type AvatarGeneratorProps = {
  name: string
  size: number
  isRound?: boolean
  textSizeRatio?: number
  avatar?: string
  arcShape?: boolean
}

const AVATAR_COLORS = ['#A822F3', '#50B1D7', '#4CA6F8']

const AvatarGenerator = ({
  name,
  size = 40,
  isRound = true,
  textSizeRatio = 3,
  avatar,
  arcShape = false,
}: AvatarGeneratorProps) => {
  return (
    <StyledAvatarWrapper size={size} arcShape={arcShape}>
      <ConfigProvider colors={AVATAR_COLORS}>
        <StyledAvatar
          mainShape={true}
          name={name}
          size={`${size}`}
          textSizeRatio={textSizeRatio}
          round={isRound}
          src={avatar}
        />
      </ConfigProvider>
    </StyledAvatarWrapper>
  )
}

export default AvatarGenerator

const StyledAvatarWrapper = styled.div<{ size: number; arcShape: boolean }>`
  border-radius: 100px 100px 100px 20px;

  /* border: 2px solid #000; */

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.size &&
    css`
      width: calc(${props.size}px - 20px);
      height: calc(${props.size}px - 20px);
    `}
  ${props =>
    props.arcShape &&
    css`
      border-radius: 100px 100px 40px 40px;
      height: calc(${props.size}px - 16px);
      border: 2px solid #000;
    `}
`

const StyledAvatar = styled(Avatar)<{ mainShape?: boolean }>`
  font-family: unset !important;

  object-fit: cover !important;

  /* outline: 2px solid #000 !important; */

  /* ${props =>
    props.mainShape &&
    css`
      border-radius: 100px 100px 100px 0 !important;
    `} */
`
