import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import TypographyTertiary from 'components/Typography/Tertiary'
import { useUserByIdService } from 'services'

type GameDescriptionProps = {
  gameName: string
  userId: string
}

export const GameDescription = ({ userId, gameName }: GameDescriptionProps) => {
  return (
    <>
      <TypographyPrimary
        value={gameName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
      <TypographyTertiary
        value='was created by'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
      <TypographyPrimary
        value={'Levanion'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
    </>
  )
}
