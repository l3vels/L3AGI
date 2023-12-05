import Typography from 'share-ui/components/typography/Typography'
import { MetadataDescriptionProps } from './UpdateMetadataDescription'
import TypographyPrimary from 'components/Typography/Primary'
import TypographyTertiary from 'components/Typography/Tertiary'

export const MetadataUpdatedDescription = ({ collectionName }: MetadataDescriptionProps) => {
  return (
    <>
      <TypographyPrimary
        value={'Metadata'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
      <TypographyTertiary
        value='updated in collection'
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
