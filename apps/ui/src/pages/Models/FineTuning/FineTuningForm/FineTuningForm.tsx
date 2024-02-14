import FormikTextField from 'components/TextFieldFormik'
import ImportFile from 'components/ImportFile'

import { useFineTuningForm } from './useFineTuningForm'
import { t } from 'i18next'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'

import { StyledFormInputWrapper, StyledFormRoot } from 'styles/formStyles.css'
import { useEffect } from 'react'
import { templateData } from '../fineTuningTemplate'
import importColumnConfig from '../importColumnConfig'

const FineTuningForm = ({ formik }: { formik: any }) => {
  const { setFieldValue, values } = formik
  const { fine_tuning_model, fine_tuning_file_url } = values

  const { modelOptions } = useFineTuningForm()

  useEffect(() => {
    if (fine_tuning_model === '' && modelOptions?.length > 0) {
      setFieldValue('fine_tuning_model', modelOptions[0].value)
    }
  }, [fine_tuning_model])

  const columns = importColumnConfig()

  return (
    <StyledFormRoot>
      <StyledFormInputWrapper>
        <FormikTextField name='fine_tuning_name' placeholder='Name' label='Name' />

        <AgentDropdown
          label={t('model')}
          fieldName={'fine_tuning_model'}
          setFieldValue={setFieldValue}
          fieldValue={fine_tuning_model}
          options={modelOptions}
          onChange={() => {
            setFieldValue('fine_tuning_model', '')
          }}
          optionSize={'small'}
        />

        <ImportFile
          setFieldValue={formik?.setFieldValue}
          fieldName={'fine_tuning_file_url'}
          value={fine_tuning_file_url}
          templateData={templateData}
          columns={columns}
          fileValidationFields={['System', 'User', 'Assistant']}
        />
      </StyledFormInputWrapper>
    </StyledFormRoot>
  )
}

export default FineTuningForm
