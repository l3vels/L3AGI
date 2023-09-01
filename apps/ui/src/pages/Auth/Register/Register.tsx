import { FormikProvider } from 'formik'
import styled from 'styled-components'

import useRegister from 'pages/Auth/Register/useRegister'
import TextFieldFormik from 'components/TextFieldFormik'
import Button from '@l3-lib/ui-core/dist/Button'

import { StyledCenterFormContainer } from 'styles/globalStyle.css'

const Register = () => {
  const { formik, alertMessage } = useRegister()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextFieldFormik name='name' placeholder='Full name' label='First name' />
          <TextFieldFormik name='account_name' placeholder='Company name' label='Company name' />
          <TextFieldFormik name='email' placeholder='Email' label='Email' />
          <TextFieldFormik name='password' placeholder='Password' label='Password' type="password" />
          {/* <TextFieldFormik
            name='confirm_password'
            placeholder='Confirm password'
            label='Confirm password'
            type="password"
          /> */}
        </FormikProvider>
        {/* <ButtonContainer> */}
        <Button onClick={formik.handleSubmit}>Register</Button>

        <Button onClick={formik.handleSubmit}>Register with Github</Button>
        {/* </ButtonContainer> */}
      </StyledFormContainer>

      {/* <StyledFormContainer>
        <FormikProvider value={formik}>
          <CheatCode />
        </FormikProvider>
      </StyledFormContainer> */}
    </StyledCenterFormContainer>
  )
}

export default Register

const StyledFormContainer = styled.div`
  margin-top: 64px;
  display: grid;
  grid-row-gap: 16px;
  padding: 0 87px;
  width: 550px;
  max-width: 550px;
`
