import styled from 'styled-components'

export const StyledFormSection = styled.div<{ columns?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  width: 400px;
`

const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100vw;
  height: 100vh;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 40px;
  padding: 40px 41px;
`

const StyledHeaderGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const StyledCloseBtn = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
`

const StyledTypography = styled.p<{ disabled?: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  pointer-events: ${p => p.disabled && 'none'};
`

const StyledModalBody = styled.div<{ resetPosition?: boolean }>`
  display: flex;
  justify-content: center;
  height: 100%;

  ${({ resetPosition }) =>
    !resetPosition &&
    `
  align-items: center;
  
  `}
`

const StyledModalFooter = styled.div`
  padding: 30px 0px 50px 50px;
  display: flex;
  align-items: center;
  gap: 20px;

  margin-top: auto;
`

export {
  StyledModalWrapper,
  StyledModalFooter,
  StyledModalBody,
  StyledCloseBtn,
  StyledHeaderGroup,
  StyledHeader,
  StyledTypography,
}
