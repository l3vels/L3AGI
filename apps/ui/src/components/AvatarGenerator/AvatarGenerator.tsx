import Avatar, { ConfigProvider } from 'react-avatar'

type AvatarGeneratorProps = {
  name: string
  size: number
  isRound?: boolean
}

const AVATAR_COLORS = [
  'linear-gradient(180deg, #E332E6 0%, #A822F3 100%)',
  'linear-gradient(180deg, #73FAFD 0%, #50B1D7 100%)',
  'linear-gradient(180deg, #4CA6F8 0%, #2152F3 100%)',
]

const AvatarGenerator = ({ name, size, isRound = true }: AvatarGeneratorProps) => {
  return (
    <ConfigProvider colors={AVATAR_COLORS}>
      <Avatar name={name} size={`${size}`} textSizeRatio={3} round={isRound} />
    </ConfigProvider>
  )
}

export default AvatarGenerator
