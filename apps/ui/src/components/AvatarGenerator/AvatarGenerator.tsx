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

const AVATAR_COLORS = ['#A822F3', '#F0A300', '#EF5533']

const AvatarGenerator = ({
  name,
  size = 40,
  isRound = false,
  textSizeRatio = 3,
  avatar,
  arcShape = false,
}: AvatarGeneratorProps) => {
  return (
    <StyledAvatarWrapper size={size} arcShape={arcShape} isRound={isRound}>
      <ConfigProvider colors={AVATAR_COLORS}>
        <StyledAvatar
          mainShape={true}
          name={name}
          size={`${size}`}
          textSizeRatio={textSizeRatio}
          round={true}
          src={avatar}
        />
      </ConfigProvider>
    </StyledAvatarWrapper>
  )
}

export default AvatarGenerator

const StyledAvatarWrapper = styled.div<{ size: number; arcShape: boolean; isRound: boolean }>`
  border-radius: 100px 100px 100px 20px;

  /* border: 2px solid #000; */

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    !props.isRound &&
    props.size &&
    css`
      width: calc(${props.size}px - 20px);
      height: calc(${props.size}px - 20px);
    `}
  ${props =>
    !props.isRound &&
    props.arcShape &&
    css`
      border-radius: 100px 100px 40px 40px;
      height: calc(${props.size}px - 14px);
      width: calc(${props.size}px - 16px);

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
