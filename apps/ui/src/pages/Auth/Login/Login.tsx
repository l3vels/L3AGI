import { FormikProvider } from 'formik'

import styled from 'styled-components'
import Heading from '@l3-lib/ui-core/dist/Heading'

import useLogin from 'pages/Auth/Login/useLogin'
import useGithubLogin from 'pages/Auth/Login/useGithubLogin'
import TextFieldFormik from 'components/TextFieldFormik'
import { StyledCenterFormContainer, StyledFormContainer } from 'styles/globalStyle.css'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

import githubIcon from 'assets/icons/githubIcon.png'

import './login.css'
import { useModal } from 'hooks'
import {
  StyledImageWrapper,
  StyledImg,
  StyledInnerButtonWrapper,
} from 'components/HeaderButtons/HeaderButtons'
import OrDivider from 'components/OrDivider/OrDivider'
import TypographyTertiary from 'components/Typography/Tertiary'
import TypographyPrimary from 'components/Typography/Primary'
import HeadingSecondary from 'components/Heading/Secondary'
import { ButtonPrimary } from 'components/Button/Button'

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

      <StyledHeaderWrapper>
        <HeadingSecondary
          value={'Complete your mission'}
          type={Heading.types.h2}
          style={{ fontSize: 24, lineHeight: 'normal' }}
        />
        <TypographyTertiary
          value={`AI agents' team collaboration as effective as human collaboration.`}
          type={Typography.types.label}
          size={Typography.sizes.sm}
        />
      </StyledHeaderWrapper>

      <StyledFormContainer>
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
        <ButtonPrimary
          onClick={async () => {
            const res = await githubLogin()
            window.location.href = res.auth_url
          }}
        >
          <StyledInnerButtonWrapper>
            <StyledImageWrapper secondary>
              <StyledImg src={githubIcon} />
            </StyledImageWrapper>
            Login with Github
          </StyledInnerButtonWrapper>
        </ButtonPrimary>

        <OrDivider />

        <FormikProvider value={formik}>
          <StyledInputWrapper>
            <TextFieldFormik
              label='Email'
              field_name='email'
              placeholder='Enter email...'
              size='small'
            />
            <TextFieldFormik
              label='Password'
              field_name='password'
              placeholder='Enter password...'
              type='password'
              size='small'
            />
          </StyledInputWrapper>
        </FormikProvider>

        <ButtonPrimary onClick={() => formik.handleSubmit()} size={Button.sizes.MEDIUM}>
          Start
        </ButtonPrimary>

        <StyledSignUpWrapper>
          <TypographyTertiary
            value={`Don't have an account?`}
            type={Typography.types.label}
            size={Typography.sizes.md}
          />
          <button
            onClick={() => {
              openModal({ name: 'login-modal', data: { isRegister: true } })
            }}
          >
            <TypographyPrimary
              value='Sign up'
              type={Typography.types.label}
              size={Typography.sizes.md}
              as={'a'}
              style={{
                textDecorationLine: 'underline',
                cursor: 'pointer',
                textAlign: 'center',
                textUnderlineOffset: 5,
                marginTop: 18,
              }}
            />
          </button>
        </StyledSignUpWrapper>
      </StyledFormContainer>
    </StyledCenterFormContainer>
  )
}

export default Login

const StyledNavLink = styled.a`
  color: #19b3ff;
  cursor: pointer;
`
const StyledSignUpWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const StyledHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 87px;
  align-items: center;
  text-align: center;
  gap: 22px;

  margin-top: 10px;
`
