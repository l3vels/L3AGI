import Typography from 'share-ui/components/typography/Typography'
import { useTheme } from 'styled-components'

export default function TypographyTertiary(props: any) {
  const theme = useTheme()
  return <Typography customColor={theme.typography.contentTertiary} {...props} />
}
