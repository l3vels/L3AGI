import Button from '@l3-lib/ui-core/dist/Button'
import styled, { useTheme } from 'styled-components'

const ButtonPrimary = (props: any) => {
  const theme = useTheme()
  const currentKind = theme.button.primary
  return (
    <Button kind={Button.kinds[currentKind]} {...props}>
      {props.children}
    </Button>
  )
}

const ButtonSecondary = (props: any) => {
  const theme = useTheme()
  const currentKind = theme.button.secondary
  return (
    <Button kind={Button.kinds[currentKind]} {...props}>
      {props.children}
    </Button>
  )
}

const ButtonTertiary = (props: any) => {
  const theme = useTheme()
  const currentKind = theme.button.tertiary
  return (
    <StyledButtonTertiaryWrapper>
      <Button kind={Button.kinds[currentKind]} {...props}>
        {props.children}
      </Button>
    </StyledButtonTertiaryWrapper>
  )
}

export { ButtonSecondary, ButtonPrimary, ButtonTertiary }

const StyledButtonTertiaryWrapper = styled.div`
  .l3-style-button--kind-secondary.l3-style-button--color-primary {
    &: hover {
      background: ${({ theme }) => theme.body.placeHolderColor};
    }
  }
`
