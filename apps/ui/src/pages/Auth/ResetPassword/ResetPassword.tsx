import useResetPassword from 'pages/Auth/ResetPassword/useResetPassword'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Button from 'share-ui/components/Button/Button'
import TextFieldFormik from 'components/TextFieldFormik'

import { StyledCenterFormContainer } from 'styles/globalStyle.css'
import Heading from 'share-ui/components/Heading/Heading'
import Checkbox from 'share-ui/components/Checkbox/Checkbox'

import HeadingTertiary from 'components/Heading/Tertiary'
import { ButtonPrimary } from 'components/Button/Button'

const ResetPassword = () => {
  const { t } = useTranslation()
  const { formik, alertMessage } = useResetPassword()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}
      <HeadingTertiary
        value={t('forgot-password')}
        type={Heading.types?.h1}
        style={{ fontSize: 52, lineHeight: 'normal' }}
      />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextFieldFormik
            field_name='password'
            placeholder={`${t('new-password')}*`}
            size='large'
          />
          <TextFieldFormik
            field_name='confirm_password'
            placeholder={`${t('confirm-password')}*`}
            size='large'
          />
          <StyledColumnContainer>
            <Checkbox
              size='small'
              kind='secondary'
              label={`${t('accept-you-will-not-forget-it-again')}🤨`}
              labelClassName='checkbox_label'
            />
          </StyledColumnContainer>
        </FormikProvider>
        <ButtonPrimary
          style={{ width: 'fit-content', justifySelf: 'center', marginTop: 66 }}
          onClick={() => formik.handleSubmit()}
          size={Button.sizes?.LARGE}
        >
          {t('update')}
        </ButtonPrimary>
      </StyledFormContainer>
    </StyledCenterFormContainer>
  )
}

export default ResetPassword

const StyledFormContainer = styled.div`
  margin-top: 64px;
  display: grid;
  grid-row-gap: 16px;
  padding: 0 87px;
  width: 550px;
  max-width: 550px;
`

const StyledColumnContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 9px;
  padding-left: 9px;
`
