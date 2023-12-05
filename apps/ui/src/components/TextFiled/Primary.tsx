import TextField from 'share-ui/components/TextField/TextField'
import { useTheme } from 'styled-components'

export default function PrimaryTextField(props: any) {
  const theme = useTheme()
  return <TextField {...props} color={theme.textFiled.primary} />
}
