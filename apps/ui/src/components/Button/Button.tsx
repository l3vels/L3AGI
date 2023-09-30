import Button from '@l3-lib/ui-core/dist/Button'
import { useTheme } from 'styled-components'

const ButtonPrimary = (props: any) => {
  const theme = useTheme()
  const currentKind = theme.button.kind
  return (
    <Button kind={Button.kinds[currentKind]} {...props}>
      {props.children}
    </Button>
  )
}

const ButtonSecondary = (props: any) => {
  const theme = useTheme()
  const currentKind = theme.button.tertiary
  return (
    <Button kind={Button.kinds[currentKind]} {...props}>
      {props.children}
    </Button>
  )
}

export { ButtonSecondary, ButtonPrimary }
