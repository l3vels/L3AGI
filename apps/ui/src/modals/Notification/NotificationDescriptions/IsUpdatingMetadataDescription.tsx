import Typography from '@l3-lib/ui-core/dist/Typography'
import { MetadataDescriptionProps } from './UpdateMetadataDescription'
import TypographyPrimary from 'components/Typography/TypographyPrimary'
import TypographyTertiary from 'components/Typography/TypographyTertiary'

export const IsUpdatingMetadataDescription = ({ collectionName }: MetadataDescriptionProps) => {
  return (
    <>
      <TypographyPrimary
        value={'Metadata'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
      <TypographyTertiary
        value='is updating in collection'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
      <TypographyPrimary
        value={collectionName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
    </>
  )
}
