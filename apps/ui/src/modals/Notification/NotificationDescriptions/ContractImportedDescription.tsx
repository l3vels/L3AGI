import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/TypographyPrimary'
import TypographyTertiary from 'components/Typography/TypographyTertiary'
import { useUserByIdService } from 'services'

type ContractImportedDescriptionProps = {
  collectionName: string
}

export const ContractImportedDescription = ({
  collectionName,
}: ContractImportedDescriptionProps) => {
  return (
    <>
      <TypographyPrimary
        value={collectionName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <TypographyTertiary
        value='was imported by'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
      <TypographyPrimary
        value={'Levanion'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
    </>
  )
}
