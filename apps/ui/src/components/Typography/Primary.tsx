import Typography from 'share-ui/components/typography/Typography'
import { useTheme } from 'styled-components'

export default function TypographyPrimary(props: any) {
  const theme = useTheme()
  return <Typography customColor={theme.typography.contentPrimary} {...props} />
}
