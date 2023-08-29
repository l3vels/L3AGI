import Typography from '@l3-lib/ui-core/dist/Typography'

export type MetadataDescriptionProps = {
  collectionName: string
}

export const UpdateMetadataDescription = ({ collectionName }: MetadataDescriptionProps) => {
  return (
    <>
      <Typography
        value={'Metadata'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <Typography
        value='update required in collection'
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
