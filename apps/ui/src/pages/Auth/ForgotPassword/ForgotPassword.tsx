import useForgotPassword from 'pages/Auth/ForgotPassword/useForgotPassword'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import Button from '@l3-lib/ui-core/dist/Button'

import Heading from '@l3-lib/ui-core/dist/Heading'
import TextFieldFormik from 'components/TextFieldFormik'
import { StyledCenterFormContainer } from 'styles/globalStyle.css'
import HeadingTertiary from 'components/Heading/Tertiary'
import { ButtonPrimary } from 'components/Button/Button'

const ForgotPassword = () => {
  const { formik, alertMessage, handleCloseAlert } = useForgotPassword()
  return (
    <StyledCenterFormContainer>
      <HeadingTertiary
        value={'Add email'}
        type={Heading.types.h1}
        style={{ fontSize: 52, lineHeight: 'normal' }}
      />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextFieldFormik field_name='email' placeholder='Email*' size='large' />
        </FormikProvider>

        <ButtonPrimary
          style={{ width: 'fit-content', justifySelf: 'center', marginTop: 66 }}
          onClick={() => formik.handleSubmit()}
          size={Button.sizes.LARGE}
        >
          Send
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
