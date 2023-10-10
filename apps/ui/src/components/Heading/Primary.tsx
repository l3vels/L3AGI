import Heading from '@l3-lib/ui-core/dist/Heading'
import { useTheme } from 'styled-components'

export default function HeadingPrimary(props: any) {
  const theme = useTheme()
  return <Heading customColor={theme.heading.contentPrimary} {...props} />
}
