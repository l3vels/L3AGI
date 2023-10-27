import {
  StyledForm,
  StyledInputWrapper,
  StyledRoot,
} from 'pages/Schedule/ScheduleFrom/ScheduleForm'

import FormikTextField from 'components/TextFieldFormik'
import ImportFile from 'components/ImportFile'
import TypographyPrimary from 'components/Typography/Primary'

import Typography from '@l3-lib/ui-core/dist/Typography'
import { useFineTuningForm } from './useFineTuningForm'
import { t } from 'i18next'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'

const FineTuningForm = ({ formik }: { formik: any }) => {
  const { setFieldValue, values } = formik
  const { fine_tuning_model } = values

  const { modelOptions } = useFineTuningForm()

  return (
    <StyledRoot>
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

          <TypographyPrimary
            value={'Data'}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />

          <ImportFile setFieldValue={formik?.setFieldValue} />
        </StyledInputWrapper>
      </StyledForm>
    </StyledRoot>
  )
}

export default FineTuningForm
