import Avatar from '@l3-lib/ui-core/dist/Avatar'
import { useEffect, useState } from 'react'

const useRandomImage = (imageArray: string[]) => {
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageArray.length)
    setImageSrc(imageArray[randomIndex])
  }, [imageArray])

  return imageSrc
}

const RandomAvatar: React.FC<{ imageArray: string[] }> = ({ imageArray }) => {
  const randomImageSrc = useRandomImage(imageArray)

  return <Avatar size={Avatar.sizes.SMALL} src={randomImageSrc} type={Avatar.types.IMG} rectangle />
}

export { RandomAvatar, useRandomImage }
