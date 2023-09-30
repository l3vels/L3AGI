import Typography from '@l3-lib/ui-core/dist/Typography'
import { useTheme } from 'styled-components'

export default function TypographyQuaternary(props: any) {
  const theme = useTheme()
  return <Typography customColor={theme.typography.contentQuaternary} {...props} />
}
