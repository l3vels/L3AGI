import styled from 'styled-components'

import FormikTextField from 'components/TextFieldFormik'
import { useTranslation } from 'react-i18next'

import TextareaFormik from 'components/TextareaFormik'

type ApiKeyFormProps = {
  formik: any
  isLoading?: boolean
  isEdit?: boolean
}

const ApiKeysForm = ({ formik }: ApiKeyFormProps) => {
  const { t } = useTranslation()

  const { values, setFieldValue } = formik
  const { description } = values

  return (
    <StyledFormContainer>
      <StyledInputWrapper>
        <FormikTextField name='name' placeholder={t('name')} label={t('name')} />
        <TextareaFormik
          setFieldValue={setFieldValue}
          label={t('description')}
          fieldName={'description'}
          value={description}
        />
      </StyledInputWrapper>
    </StyledFormContainer>
  )
}

export default ApiKeysForm

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  overflow-y: auto;
  height: 100%;
  width: 100%;
`

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 25px;

  width: 100%;
  max-width: 800px;
  /* max-width: 600px; */
  /* margin: auto; */
  height: calc(100% - 100px);
  /* max-height: 800px; */

  padding: 0 20px;
`
