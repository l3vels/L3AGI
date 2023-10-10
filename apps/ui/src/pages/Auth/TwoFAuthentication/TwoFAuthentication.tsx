import React from 'react'
import TextField from '@l3-lib/ui-core/dist/TextField'

// import useResetPassword from './useResetPassword'
import { FormikProvider } from 'formik'
import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'

import useTwoFA from './useTwoFA'
import { ButtonPrimary } from 'components/Button/Button'

const TwoFAuthentication = () => {
  const { formik, handleResendCode, alertMessage } = useTwoFA()
  return (
    <StyledContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}
      <span>Authentication code:</span>
      <br />
      <span>An authentication code has been sent to your email. Please enter it below:</span>
      <br />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextField name='code' placeholder='Authentication code' />
        </FormikProvider>
        <ButtonContainer>
          <ButtonPrimary onClick={formik.handleSubmit}>Submit</ButtonPrimary>
        </ButtonContainer>

        <ButtonContainer>
          <span>Didn’t receive the code or code expired?</span>
          <ButtonPrimary onClick={handleResendCode}>Resend code?</ButtonPrimary>
        </ButtonContainer>
      </StyledFormContainer>
    </StyledContainer>
  )
}

export default TwoFAuthentication

const StyledContainer = styled.div`
  padding-top: 40px;
`
const StyledFormContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-row-gap: 20px;
`
const ButtonContainer = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
`
