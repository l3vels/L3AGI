import Button from 'share-ui/components/Button/Button'
import styled from 'styled-components'

const ButtonPrimary = (props: any) => {
  return (
    <Button kind={Button.kinds?.PRIMARY} {...props}>
      {props.children}
    </Button>
  )
}

const ButtonSecondary = (props: any) => {
  return (
    <Button kind={Button.kinds?.SECONDARY} {...props}>
      {props.children}
    </Button>
  )
}

const ButtonTertiary = (props: any) => {
  return (
    <StyledButtonTertiaryWrapper>
      <Button kind={Button.kinds?.TERTIARY} {...props}>
        {props.children}
      </Button>
    </StyledButtonTertiaryWrapper>
  )
}

export { ButtonSecondary, ButtonPrimary, ButtonTertiary }

const StyledButtonTertiaryWrapper = styled.div`
  .l3-style-button--kind-secondary.l3-style-button--color-primary {
    &:hover {
      background: ${({ theme }) => theme.body.placeHolderColor};
    }
  }
`
