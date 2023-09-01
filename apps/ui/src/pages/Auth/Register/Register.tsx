import { FormikProvider } from 'formik'
import styled from 'styled-components'

import useRegister from 'pages/Auth/Register/useRegister'

import TextField from '@l3-lib/ui-core/dist/TextField'

import Button from '@l3-lib/ui-core/dist/Button'

import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import { StyledCenterFormContainer } from 'styles/globalStyle.css'

const Register = () => {
  const { formik, alertMessage } = useRegister()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextField name='name' placeholder='Full name' label='First name' />
          <TextField name='account_name' placeholder='Company name' label='Company name' />
          <TextField name='email' placeholder='Email' label='Email' />
          <TextField name='password' placeholder='Password' label='Password' password />
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
