import { FormikProvider } from 'formik'
import styled from 'styled-components'

import useRegister from 'pages/Auth/Register/useRegister'
import TextFieldFormik from 'components/TextFieldFormik'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import { StyledCenterFormContainer } from 'styles/globalStyle.css'
import { useModal } from 'hooks'

import githubIcon from 'assets/icons/githubIcon.png'
import {
  StyledImageWrapper,
  StyledImg,
  StyledInnerButtonWrapper,
} from 'components/HeaderButtons/HeaderButtons'

const Register = () => {
  const { formik, alertMessage } = useRegister()
  const { openModal } = useModal()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextFieldFormik name='name' placeholder='Full name' label='First name' />
          <TextFieldFormik name='account_name' placeholder='Company name' label='Company name' />
          <TextFieldFormik name='email' placeholder='Email' label='Email' />
          <TextFieldFormik
            name='password'
            placeholder='Password'
            label='Password'
            type='password'
          />
          {/* <TextFieldFormik
            name='confirm_password'
            placeholder='Confirm password'
            label='Confirm password'
            type="password"
          /> */}
        </FormikProvider>
        <StyledWrapper
          onClick={() => {
            openModal({ name: 'login-modal', data: { isRegister: false } })
          }}
        >
          <Typography
            value='Login?'
            type={Typography.types.label}
            size={Typography.sizes.lg}
            as={'a'}
            customColor='#FFFFFF'
            style={{
              textDecorationLine: 'underline',
              cursor: 'pointer',
              textAlign: 'center',
              textUnderlineOffset: 5,
              marginTop: 18,
            }}
          />
        </StyledWrapper>

        <Button onClick={formik.handleSubmit}>Sign up</Button>

        <Button onClick={formik.handleSubmit}>
          <StyledInnerButtonWrapper>
            <StyledImageWrapper secondary>
              <StyledImg src={githubIcon} />
            </StyledImageWrapper>
            Sign up with Github
          </StyledInnerButtonWrapper>
        </Button>
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
const StyledWrapper = styled.div``
