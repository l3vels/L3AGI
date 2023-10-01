import React from 'react'
// import TextField from 'bf-ui/dist/TextField'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
// import Typography from 'bf-ui/dist/Typography'
// import Button from 'bf-ui/dist/Button'
import useUpdatePassword from './useUpdatePassword'
import TextField from '@l3-lib/ui-core/dist/TextField'

import Button from '@l3-lib/ui-core/dist/Button'
import { ButtonPrimary } from 'components/Button/Button'

const UpdatePassword = () => {
  const { formik } = useUpdatePassword()

  return (
    <StyledContainer>
      <span>Update password</span>
      <br />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextField name='password' placeholder='New password*' />

          <TextField name='confirm_password' placeholder='Confirm password*' />
        </FormikProvider>
        <ButtonContainer>
          <ButtonPrimary onClick={formik.handleSubmit}>Submit</ButtonPrimary>
        </ButtonContainer>
      </StyledFormContainer>
    </StyledContainer>
  )
}

export default UpdatePassword

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
