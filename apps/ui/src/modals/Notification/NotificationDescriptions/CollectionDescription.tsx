import Typography from '@l3-lib/ui-core/dist/Typography'

type CollectionDescriptionProps = {
  collectionName: string
  gameName: string
}

export const CollectionDescription = ({ collectionName, gameName }: CollectionDescriptionProps) => {
  return (
    <>
      <Typography
        value={collectionName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <Typography
        value='was created in'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
      <Typography
        value={gameName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
    </>
  )
}
