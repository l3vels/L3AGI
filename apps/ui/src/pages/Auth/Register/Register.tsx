import { FormikProvider } from 'formik'
import styled from 'styled-components'

import useRegister from 'pages/Auth/Register/useRegister'
import { COMPANY_SIZE_OPTIONS, COMPANY_ROLE_OPTIONS } from 'utils/constants'

import TextField from '@l3-lib/ui-core/dist/TextField'

import Button from '@l3-lib/ui-core/dist/Button'

import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import { StyledCenterFormContainer } from 'styles/globalStyle.css'

const Register = () => {
  const { formik, alertMessage, countries } = useRegister()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextField name='first_name' placeholder='First name' label='First name' />
          <TextField name='last_name' placeholder='Last name' label='Last name' />
          <TextField name='company_name' placeholder='Company name' label='Company name' />
          <Dropdown
            name='company_role'
            placeholder='Please select'
            label='Role'
            options={COMPANY_ROLE_OPTIONS}
          />
          <Dropdown
            name='company_size'
            placeholder='Please select'
            label='Company size'
            options={COMPANY_SIZE_OPTIONS}
          />
          <Dropdown
            name='location'
            placeholder='Please select'
            label='Location'
            options={countries}
          />
          <TextField name='contact' placeholder='Contact number' label='Contact number' />
          <TextField name='email' placeholder='Email' label='Email' />
          <TextField name='password' placeholder='Password' label='Password' password />
          <TextField
            name='confirm_password'
            placeholder='Confirm password'
            label='Confirm password'
            password
          />
        </FormikProvider>
        {/* <ButtonContainer> */}
        <Button onClick={formik.handleSubmit}>Register</Button>
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
