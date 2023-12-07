import useForgotPassword from 'pages/Auth/ForgotPassword/useForgotPassword'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Button from 'share-ui/components/Button/Button'

import Heading from 'share-ui/components/Heading/Heading'
import TextFieldFormik from 'components/TextFieldFormik'
import { StyledCenterFormContainer } from 'styles/globalStyle.css'
import HeadingTertiary from 'components/Heading/Tertiary'
import { ButtonPrimary } from 'components/Button/Button'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { formik } = useForgotPassword()
  return (
    <StyledCenterFormContainer>
      <HeadingTertiary
        value={t('add-email')}
        type={Heading.types?.h1}
        style={{ fontSize: 52, lineHeight: 'normal' }}
      />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextFieldFormik field_name='email' placeholder={`${t('email')}*`} size='large' />
        </FormikProvider>

        <ButtonPrimary
          style={{ width: 'fit-content', justifySelf: 'center', marginTop: 66 }}
          onClick={() => formik.handleSubmit()}
          size={Button.sizes?.LARGE}
        >
          {t('send')}
        </ButtonPrimary>
      </StyledFormContainer>
    </StyledCenterFormContainer>
  )
}

export default ForgotPassword

const StyledFormContainer = styled.div`
  margin-top: 64px;
  display: grid;
  grid-row-gap: 16px;
  padding: 0 87px;
  width: 550px;
  max-width: 550px;
`
