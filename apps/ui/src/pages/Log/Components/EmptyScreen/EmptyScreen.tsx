import styled from 'styled-components'
import Heading from 'share-ui/components/Heading/Heading'
import Typography from 'share-ui/components/typography/Typography'

export const EmptyScreen = () => {
  return (
    <StyledContainer>
      <StyledResponseHeading
        type={Typography.types.HEADING}
        value='There are no logs yet.'
        size={Typography.sizes.lg}
        customColor={'#ffffff'}
      />
    </StyledContainer>
  )
}

export const StyledContainer = styled.div`
  display: flex;
  align-items: flex-end;
  mix-blend-mode: lighten;
  justify-content: center;
  flex-direction: column;
  width: 900px;
  margin-left: 100px;
`

export const StyledResponseHeading = styled(Typography)`
  font-family: 'Circular Std';
  font-style: normal;
  font-weight: 500 !important;
  font-size: 28px !important;
  line-height: 36px !important;
`
