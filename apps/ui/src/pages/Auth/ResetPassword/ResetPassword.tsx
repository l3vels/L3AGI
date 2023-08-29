import useResetPassword from 'pages/Auth/ResetPassword/useResetPassword'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import Button from '@l3-lib/ui-core/dist/Button'
import TextFieldFormik from 'components/TextFieldFormik'

import { StyledCenterFormContainer } from 'styles/globalStyle.css'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'

const ResetPassword = () => {
  const { formik, alertMessage } = useResetPassword()

  return (
    <StyledCenterFormContainer>
      {alertMessage.message && alertMessage.type && <span>{alertMessage.message}</span>}
      <Heading
        value={'Forgot password'}
        type={Heading.types.h1}
        customColor='rgba(255, 255, 255, 0.4)'
        style={{ fontSize: 52, lineHeight: 'normal' }}
      />
      <StyledFormContainer>
        <FormikProvider value={formik}>
          <TextFieldFormik field_name='password' placeholder='New password*' size='large' />
          <TextFieldFormik
            field_name='confirm_password'
            placeholder='Confirm password*'
            size='large'
          />
          <StyledColumnContainer>
            <Checkbox
              size='small'
              kind='secondary'
              label='Accept you will not forget it again 🤨'
              labelClassName='checkbox_label'
            />
          </StyledColumnContainer>
        </FormikProvider>
        <Button
          style={{ width: 'fit-content', justifySelf: 'center', marginTop: 66 }}
          onClick={() => formik.handleSubmit()}
          size={Button.sizes.LARGE}
        >
          Update
        </Button>
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
