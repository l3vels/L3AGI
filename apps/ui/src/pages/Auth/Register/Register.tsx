import { FormikProvider } from 'formik'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

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
import { StyledHeaderWrapper, StyledInputWrapper } from '../Login/Login'

import Heading from '@l3-lib/ui-core/dist/Heading'

import OrDivider from 'components/OrDivider/OrDivider'
import useGithubLogin from '../Login/useGithubLogin'
import TypographyTertiary from 'components/Typography/Tertiary'
import TypographyPrimary from 'components/Typography/Primary'
import HeadingSecondary from 'components/Heading/Secondary'
import { ButtonPrimary } from 'components/Button/Button'

const Register = () => {
  const { t } = useTranslation()
  const { formik, alertMessage } = useRegister()
  const { openModal } = useModal()

  const { githubLogin } = useGithubLogin()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}

      <StyledHeaderWrapper>
        <HeadingSecondary
          value={t('join-our-community')}
          type={Heading.types.h2}
          customColor='rgba(255, 255, 255, 0.9)'
          style={{ fontSize: 24, lineHeight: 'normal' }}
        />

        <TypographyTertiary
          value={t('ai-agents-description')}
          type={Typography.types.label}
          size={Typography.sizes.sm}
        />
      </StyledHeaderWrapper>
      <StyledFormContainer>
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
            {t('sign-up-with-github')}
          </StyledInnerButtonWrapper>
        </ButtonPrimary>

        <OrDivider />

        <FormikProvider value={formik}>
          <StyledInputWrapper>
            <TextFieldFormik name='name' placeholder='Full name' label={t('first-name')} />
            <TextFieldFormik
              name='account_name'
              placeholder='Company name'
              label={t('company-name')}
            />
            <TextFieldFormik name='email' placeholder='Email' label={t('email')} />
            <TextFieldFormik
              name='password'
              placeholder={t('password')}
              label={t('password')}
              type='password'
            />
            {/* <TextFieldFormik
            name='confirm_password'
            placeholder='Confirm password'
            label='Confirm password'
            type="password"
          /> */}
          </StyledInputWrapper>
        </FormikProvider>

        <ButtonPrimary onClick={formik.handleSubmit}>{t('sign-up')}</ButtonPrimary>

        <StyledLoginWrapper>
          <TypographyTertiary
            value={t('already-have-an-account')}
            type={Typography.types.label}
            size={Typography.sizes.md}
          />
          <button
            onClick={() => {
              openModal({ name: 'login-modal', data: { isRegister: false } })
            }}
          >
            <TypographyPrimary
              value={t('login')}
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
        </StyledLoginWrapper>
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
  margin-top: 22px;
  display: grid;
  grid-row-gap: 22px;
  padding: 0 87px;
  width: 550px;
  max-width: 550px;
`
const StyledLoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`
