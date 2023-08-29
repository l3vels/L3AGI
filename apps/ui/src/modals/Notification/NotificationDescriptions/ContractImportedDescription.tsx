import Typography from '@l3-lib/ui-core/dist/Typography'
import { useUserByIdService } from 'services'

type ContractImportedDescriptionProps = {
  collectionName: string
}

export const ContractImportedDescription = ({
  collectionName,
}: ContractImportedDescriptionProps) => {
  return (
    <>
      <Typography
        value={collectionName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <Typography
        value='was imported by'
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
