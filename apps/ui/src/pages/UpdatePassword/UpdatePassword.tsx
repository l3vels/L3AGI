import { FormikProvider } from 'formik'
import styled from 'styled-components'
import useUpdatePassword from './useUpdatePassword'
import TextField from 'share-ui/components/TextField/TextField'

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
