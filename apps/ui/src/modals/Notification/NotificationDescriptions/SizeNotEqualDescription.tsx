import Typography from 'share-ui/components/typography/Typography'
import { MetadataDescriptionProps } from './UpdateMetadataDescription'
import TypographyTertiary from 'components/Typography/Tertiary'
import TypographyPrimary from 'components/Typography/Primary'

export const SizeNotEqualDescription = ({ collectionName }: MetadataDescriptionProps) => {
  return (
    <>
      <TypographyTertiary
        value='Collection and contract size not equal in'
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
