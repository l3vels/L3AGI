import Heading from 'share-ui/components/Heading/Heading'
import { useTheme } from 'styled-components'

export default function HeadingTertiary(props: any) {
  const theme = useTheme()
  return <Heading customColor={theme.heading.contentTertiary} {...props} />
}
