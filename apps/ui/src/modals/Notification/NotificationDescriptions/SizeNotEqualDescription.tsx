import Typography from '@l3-lib/ui-core/dist/Typography'
import { MetadataDescriptionProps } from './UpdateMetadataDescription'

export const SizeNotEqualDescription = ({ collectionName }: MetadataDescriptionProps) => {
  return (
    <>
      <Typography
        value='Collection and contract size not equal in'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
      <Typography
        value={collectionName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
    </>
  )
}
