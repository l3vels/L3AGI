import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/TypographyPrimary'
import TypographyTertiary from 'components/Typography/TypographyTertiary'

export type MetadataDescriptionProps = {
  collectionName: string
}

export const UpdateMetadataDescription = ({ collectionName }: MetadataDescriptionProps) => {
  return (
    <>
      <TypographyPrimary
        value={'Metadata'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
      <TypographyTertiary
        value='update required in collection'
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
