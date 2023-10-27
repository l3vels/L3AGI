import {
  StyledForm,
  StyledInputWrapper,
  StyledRoot,
} from 'pages/Schedule/ScheduleFrom/ScheduleForm'

import FormikTextField from 'components/TextFieldFormik'
import ImportFile from 'components/ImportFile'
import TypographyPrimary from 'components/Typography/Primary'

import Typography from '@l3-lib/ui-core/dist/Typography'

const FineTuningForm = ({ formik }: { formik: any }) => {
  return (
    <StyledRoot>
      <StyledForm>
        <StyledInputWrapper>
          <FormikTextField name='fine_tuning_name' placeholder='Name' label='Name' />

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
