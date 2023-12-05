import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import TypographyTertiary from 'components/Typography/Tertiary'

type CollectionDescriptionProps = {
  collectionName: string
  gameName: string
}

export const CollectionDescription = ({ collectionName, gameName }: CollectionDescriptionProps) => {
  return (
    <>
      <TypographyPrimary
        value={collectionName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
      <TypographyTertiary
        value='was created in'
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
      <TypographyPrimary
        value={gameName}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
    </>
  )
}
