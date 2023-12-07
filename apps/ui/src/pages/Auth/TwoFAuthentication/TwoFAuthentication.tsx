import TextField from 'share-ui/components/TextField/TextField'

// import useResetPassword from './useResetPassword'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Button from 'share-ui/components/Button/Button'

import useTwoFA from './useTwoFA'
import { ButtonPrimary } from 'components/Button/Button'

const TwoFAuthentication = () => {
  const { t } = useTranslation()
  const { formik, handleResendCode, alertMessage } = useTwoFA()
  return (
    <StyledContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}
      <span>{t('authentication-code')}:</span>
      <br />
      <span>{t('authentication-send')}:</span>
      <br />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextField name='code' placeholder={t('authentication-code')} />
        </FormikProvider>
        <ButtonContainer>
          <ButtonPrimary onClick={formik.handleSubmit}>{t('submit')}</ButtonPrimary>
        </ButtonContainer>

        <ButtonContainer>
          <span>{t('receive-code')}</span>
          <ButtonPrimary onClick={handleResendCode}>{t('resend-code')}</ButtonPrimary>
        </ButtonContainer>
      </StyledFormContainer>
    </StyledContainer>
  )
}

export default TwoFAuthentication

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
