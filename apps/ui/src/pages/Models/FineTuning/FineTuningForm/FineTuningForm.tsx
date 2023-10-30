import { StyledForm, StyledInputWrapper } from 'pages/Schedule/ScheduleFrom/ScheduleForm'

import FormikTextField from 'components/TextFieldFormik'
import ImportFile from 'components/ImportFile'

import { useFineTuningForm } from './useFineTuningForm'
import { t } from 'i18next'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'

import { StyledFormRoot } from 'styles/formStyles.css'

const FineTuningForm = ({ formik }: { formik: any }) => {
  const { setFieldValue, values } = formik
  const { fine_tuning_model, fine_tuning_file_url } = values

  const { modelOptions } = useFineTuningForm()

  return (
    <StyledFormRoot>
      <StyledForm>
        <StyledInputWrapper>
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

          <ImportFile setFieldValue={formik?.setFieldValue} value={fine_tuning_file_url} />
        </StyledInputWrapper>
      </StyledForm>
    </StyledFormRoot>
  )
}

export default FineTuningForm
