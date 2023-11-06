import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import FormikTextField from 'components/TextFieldFormik'
import { useTranslation } from 'react-i18next'
import Textarea from '@l3-lib/ui-core/dist/Textarea'
import Button from '@l3-lib/ui-core/dist/Button'
import { useParams } from 'react-router-dom'
import TypographyPrimary from 'components/Typography/Primary'
import { StyledTextareaWrapper } from 'pages/Agents/AgentForm/AgentForm'
import { useCreateApiKey } from './useCreateApiKey'

type ApiKeyFormProps = {
  formik: any
  isLoading?: boolean
  isEdit?: boolean
}

const ApiKeysForm = ({ formik, isLoading, isEdit = false }: ApiKeyFormProps) => {
  const { t } = useTranslation()
  const { apiKeyId } = useParams()
  const { values, setFieldValue } = formik
  const { name, description } = values

  const onTextareaChange = (field: string, value: string) => {
    formik.setFieldValue(field, value)
  }

  return (
    <StyledFormContainer>
      <StyledInputWrapper>
        <FormikTextField name='name' placeholder={t('name')} label={t('name')} />

        <StyledTextareaWrapper>
          <TypographyPrimary
            value={t('description')}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />
          <Textarea
            hint=''
            rows={6}
            placeholder={t('description')}
            value={description}
            name='description'
            onChange={(value: string) => onTextareaChange('description', value)}
          />
        </StyledTextareaWrapper>
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
const StyledSourceTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const StyledCardWrapper = styled.div`
  display: flex;

  align-items: center;
  gap: 12px;
  width: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`
const StyledText = styled.span`
  color: #fff;
`
const StyledUploadFileWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`

const StyledUploadedFiles = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`
