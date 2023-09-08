import { useEffect } from 'react'
import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Heading from '@l3-lib/ui-core/dist/Heading'

import useLogin from 'pages/Auth/Login/useLogin'
import useGithubLogin from 'pages/Auth/Login/useGithubLogin'
import TextFieldFormik from 'components/TextFieldFormik'
import { StyledCenterFormContainer, StyledFormContainer } from 'styles/globalStyle.css'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

import './login.css'
import { useModal } from 'hooks'

const ErrorResendVerification = ({ resendVerifyEmail }: any) => (
  <p className='mb-0'>
    Please verify your email, didn’t receive verification email link?
    <StyledNavLink onClick={() => resendVerifyEmail()} className='text-secondary d-inline-block'>
      <u> Resend</u>
    </StyledNavLink>
  </p>
)

const Login = () => {
  const { formik, alertMessage, showResendAlert, resendVerifyEmailHandle } = useLogin()
  const { githubLogin } = useGithubLogin()
  const { openModal } = useModal()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}

      {showResendAlert && <ErrorResendVerification resendVerifyEmail={resendVerifyEmailHandle} />}

      <Heading
        value={'Complete your mission'}
        type={Heading.types.h2}
        customColor='rgba(255, 255, 255, 0.4)'
        style={{ fontSize: 24, lineHeight: 'normal', marginTop: '50px' }}
      />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextFieldFormik field_name='email' placeholder='Email*' size='small' />
          <TextFieldFormik
            field_name='password'
            placeholder='Password*'
            type='password'
            size='small'
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

        {/* <Typography
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
        /> */}
        <div
          onClick={() => {
            openModal({ name: 'login-modal', data: { isRegister: true } })
          }}
        >
          <Typography
            value='Sign up'
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
        </div>
        <Button
          style={{ width: 'fit-content', justifySelf: 'center', marginTop: 66 }}
          onClick={() => formik.handleSubmit()}
          size={Button.sizes.MEDIUM}
        >
          Start
        </Button>

        <Button
          style={{ width: 'fit-content', justifySelf: 'center', marginTop: 5 }}
          onClick={async () => {
            const res = await githubLogin()
            // console.log(res, "www")
            window.location.href = res.auth_url
          }}
          size={Button.sizes.MEDIUM}
        >
          Login with Github
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
