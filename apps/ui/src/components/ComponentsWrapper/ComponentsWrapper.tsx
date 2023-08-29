import styled from 'styled-components'

const ComponentsWrapper = ({ children }: any) => {
  return <StyledMainWrapper id='components_wrapper'>{children}</StyledMainWrapper>
}

export default ComponentsWrapper

const StyledMainWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);
  border-radius: 27.5px;
  padding: 55px 35px;
  padding-top: 20px;
  // padding-bottom: 90px;
  position: relative;
  min-height: 325px;
`
