import styled from 'styled-components'

const MainComponent = ({ value }: any) => (
  <StyledContainer>
    <h1 style={{ color: 'white', textAlign: 'center' }}>{value || 'empty'}</h1>
  </StyledContainer>
)

export default MainComponent

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
