import Heading from '@l3-lib/ui-core/dist/Heading'
import { useTheme } from 'styled-components'

export default function HeadingTertiary(props: any) {
  const theme = useTheme()
  return <Heading customColor={theme.heading.contentTertiary} {...props} />
}
