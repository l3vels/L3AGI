import { Avatar_1, Avatar_2, Avatar_3 } from 'assets/avatars'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

const RandomAvatarIcon = () => {
  const avatarArray: any = [Avatar_1, Avatar_2, Avatar_3]

  function getRandomAvatar() {
    const randomIndex = Math.floor(Math.random() * avatarArray.length)
    return avatarArray[randomIndex]
  }

  const randomAvatar = getRandomAvatar()
  return <Avatar size={Avatar.sizes.SMALL} src={randomAvatar} type={Avatar.types.IMG} rectangle />
}

export default RandomAvatarIcon
