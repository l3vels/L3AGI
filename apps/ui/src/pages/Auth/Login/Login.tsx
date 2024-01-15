import { FormikProvider } from 'formik'

import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Heading from 'share-ui/components/Heading/Heading'

import useLogin from 'pages/Auth/Login/useLogin'
import useGithubLogin from 'pages/Auth/Login/useGithubLogin'
import TextFieldFormik from 'components/TextFieldFormik'
import { StyledCenterFormContainer, StyledFormContainer } from 'styles/globalStyle.css'

import Typography from 'share-ui/components/typography/Typography'
import Button from 'share-ui/components/Button/Button'

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
import { useDomainConfig } from 'utils/useDomainConfig'

const ErrorResendVerification = ({ resendVerifyEmail }: any) => (
  <p className='mb-0'>
    Please verify your email, didn’t receive verification email link?
    <StyledNavLink onClick={() => resendVerifyEmail()} className='text-secondary d-inline-block'>
      <u> Resend</u>
    </StyledNavLink>
  </p>
)

const Login = () => {
  const { getDomainConfig } = useDomainConfig()
  const loginConfig = getDomainConfig('login_page')

  const { t } = useTranslation()
  const { formik, alertMessage, showResendAlert, resendVerifyEmailHandle } = useLogin()
  const { githubLogin } = useGithubLogin()
  const { openModal } = useModal()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}

      {showResendAlert && <ErrorResendVerification resendVerifyEmail={resendVerifyEmailHandle} />}

      <StyledHeaderWrapper>
        <HeadingSecondary
          value={t('complete-your-mission')}
          type={Heading.types?.h2}
          style={{ fontSize: 24, lineHeight: 'normal' }}
        />
        <TypographyTertiary
          value={t('ai-agents-description')}
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
        {loginConfig?.github && (
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
              {t('log-in-with-github')}
            </StyledInnerButtonWrapper>
          </ButtonPrimary>
        )}

        {loginConfig?.github && loginConfig?.email_password && <OrDivider />}

        {loginConfig?.email_password && (
          <FormikProvider value={formik}>
            <StyledInputWrapper>
              <TextFieldFormik
                label='Email'
                field_name='email'
                placeholder={t('enter-email')}
                size='small'
              />
              <TextFieldFormik
                label='Password'
                field_name='password'
                placeholder={t('enter-password')}
                type='password'
                size='small'
              />
            </StyledInputWrapper>
          </FormikProvider>
        )}

        <ButtonPrimary onClick={() => formik.handleSubmit()} size={Button.sizes?.MEDIUM}>
          {t('start')}
        </ButtonPrimary>

        <StyledSignUpWrapper>
          <TypographyTertiary
            value={t('dont-have-account')}
            type={Typography.types.label}
            size={Typography.sizes.md}
          />
          <button
            onClick={() => {
              openModal({ name: 'login-modal', data: { isRegister: true } })
            }}
          >
            <TypographyPrimary
              value={t('sign-up')}
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
