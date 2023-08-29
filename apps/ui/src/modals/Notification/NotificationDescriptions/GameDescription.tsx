import Typography from '@l3-lib/ui-core/dist/Typography'
import { useUserByIdService } from 'services'

type GameDescriptionProps = {
  gameName: string
  userId: string
}

export const GameDescription = ({ userId, gameName }: GameDescriptionProps) => {
  return (
    <>
      <Typography
        value={gameName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <Typography
        value='was created by'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
      <Typography
        value={'Levanion'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
    </>
  )
}
