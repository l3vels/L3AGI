import Avatar, { ConfigProvider } from 'react-avatar'
import styled from 'styled-components'

type AvatarGeneratorProps = {
  name: string
  size: number
  isRound?: boolean
  textSizeRatio?: number
  avatar?: string
}

const AVATAR_COLORS = [
  'linear-gradient(180deg, #E332E6 0%, #A822F3 100%)',
  'linear-gradient(180deg, #73FAFD 0%, #50B1D7 100%)',
  'linear-gradient(180deg, #4CA6F8 0%, #2152F3 100%)',
]

const AvatarGenerator = ({
  name,
  size,
  isRound = true,
  textSizeRatio = 3,
  avatar,
}: AvatarGeneratorProps) => {
  return (
    // @ts-expect-error https://github.com/ambassify/react-avatar/issues/258
    <ConfigProvider colors={AVATAR_COLORS}>
      <StyledAvatar
        name={name}
        size={`${size}`}
        textSizeRatio={textSizeRatio}
        round={isRound}
        src={avatar}
      />
    </ConfigProvider>
  )
}

export default AvatarGenerator

const StyledAvatar = styled(Avatar)`
  font-family: unset !important;

  object-fit: cover !important;
`
