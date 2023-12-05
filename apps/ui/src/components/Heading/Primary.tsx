import Heading from 'share-ui/components/Heading/Heading'
import { useTheme } from 'styled-components'

export default function HeadingPrimary(props: any) {
  const theme = useTheme()
  return <Heading customColor={theme.heading.contentPrimary} {...props} />
}
