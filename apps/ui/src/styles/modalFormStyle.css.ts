import styled from 'styled-components'

const StyledContainer = styled.div`
  width: 600px;
  background: rgba(0, 0, 0, 0.2);
  mix-blend-mode: normal;
  backdrop-filter: blur(100px);
  padding: 20px 40px;
  border-radius: 16px;
  overflow: auto;
  height: fit-content;
  max-height: 690px;

  .l3-style-toggle_toggle {
    margin: 0;
  }
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`

const StyledHeader = styled.div`
  padding: 18px 10px 18px 21px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 53px;
  align-items: center;
`

const StyledHeaderRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const StyledTypography = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`

const StyleToggleContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

const StyledTypographySm = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`

const StyledTextFieldForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StyledBodyContainer = styled.div`
  margin-top: 16px;
  display: flex;

  flex-direction: column;
  gap: 16px;
`

const StyledCustomFiedlsContainer = styled.div`
  margin-top: 16px;
`

const StyledGenerateBtn = styled.div`
  display: flex;
  .l3-style-clickable {
    width: 25px !important;
    height: 25px !important;
    &svg {
      width: 25px !important;
      height: 25px !important;
    }
  }
`

export {
  StyledContainer,
  StyledHeader,
  StyleToggleContainer,
  StyledBodyContainer,
  StyledHeaderRightContainer,
  StyledTypography,
  StyledTextFieldForm,
  StyledTypographySm,
  StyledCustomFiedlsContainer,
  StyledGenerateBtn,
}
