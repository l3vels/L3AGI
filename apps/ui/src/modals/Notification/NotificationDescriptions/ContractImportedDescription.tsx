import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import TypographyTertiary from 'components/Typography/Tertiary'
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
