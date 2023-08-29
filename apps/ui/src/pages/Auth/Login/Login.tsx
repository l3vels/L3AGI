import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Heading from '@l3-lib/ui-core/dist/Heading'

import useLogin from 'pages/Auth/Login/useLogin'
import TextFieldFormik from 'components/TextFieldFormik'
import { StyledCenterFormContainer, StyledFormContainer } from 'styles/globalStyle.css'

import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

import './login.css'

const ErrorResendVerification = ({ resendVerifyEmail }: any) => (
  <p className='mb-0'>
    Please verify your email, didn’t receive verification email link?
    <StyledNavLink onClick={() => resendVerifyEmail()} className='text-secondary d-inline-block'>
      <u> Resend</u>
    </StyledNavLink>
  </p>
)

const Login = () => {
  const { formik, alertMessage, showResendAlert, resendVerifyEmailHandle, handleCloseAlert } =
    useLogin()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}

      {showResendAlert && <ErrorResendVerification resendVerifyEmail={resendVerifyEmailHandle} />}

      <Heading
        value={'Complete your mission'}
        type={Heading.types.h1}
        customColor='rgba(255, 255, 255, 0.4)'
        style={{ fontSize: 52, lineHeight: 'normal' }}
      />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextFieldFormik field_name='email' placeholder='Email*' size='large' />
          <TextFieldFormik
            field_name='password'
            placeholder='Password*'
            type='password'
            size='large'
          />
        </FormikProvider>
        {/* <StyledColumnContainer>
          <Checkbox
            size='small'
            kind='secondary'
            label='You will keep this between us 😉'
            labelClassName='checkbox_label'
          />
        </StyledColumnContainer> */}

        <Typography
          value='Forget password?'
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

        <Button
          style={{ width: 'fit-content', justifySelf: 'center', marginTop: 66 }}
          onClick={() => formik.handleSubmit()}
          size={Button.sizes.LARGE}
        >
          Start
        </Button>
      </StyledFormContainer>
    </StyledCenterFormContainer>
  )
}

export default Login

const StyledNavLink = styled.a`
  color: #19b3ff;
  cursor: pointer;
`

const StyledColumnContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 9px;
  padding-left: 9px;
`
