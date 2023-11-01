import styled, { createGlobalStyle, css } from 'styled-components'

export const StyledFormWrapper = styled.div`
  width: 100%;

  height: calc(100vh - 250px);

  max-height: 1500px;
`
export const StyledFormRoot = styled.div`
  width: 100%;

  height: 100%;
  overflow-y: scroll;

  display: flex;
`
export const StyledFormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
