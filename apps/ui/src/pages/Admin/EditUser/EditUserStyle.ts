import styled from 'styled-components'
import { Field } from 'formik'

export const StyledContainer = styled.div`
  background: #e7edf2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledContent = styled.div`
  margin: 40px 0;
  display: grid;
  justify-items: center;
`

export const StyledFormContainer = styled.div`
  width: 430px;
  border-radius: 2px;
  border-top: 5px solid #3998db;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 2px 1px 0 rgb(0 0 0 / 12%);
  background: #fff;
  padding: 30px 40px 40px;
  box-sizing: border-box;
  display: grid;
  grid-row-gap: 20px;
`

export const StyledCheckBoxField = styled.div`
  display: flex;
`

export const StyledField = styled(Field)`
  font: inherit;
  width: 1.15em;
  height: 1.15em;
`
