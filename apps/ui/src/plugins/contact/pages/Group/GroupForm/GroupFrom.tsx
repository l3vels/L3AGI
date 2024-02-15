import FormikTextField from 'components/TextFieldFormik'

import styled from 'styled-components'
import TextareaFormik from 'components/TextareaFormik'
import { t } from 'i18next'
import { StyledFormInputWrapper, StyledFormRoot } from 'styles/formStyles.css'

const GroupForm = ({ formik }: { formik: any }) => {
  const { values, setFieldValue } = formik
  const { group_description } = values

  return (
    <StyledFormRoot>
      <StyledFormInputWrapper>
        <FormikTextField name='group_name' placeholder='Name' label='Name' />

        <TextareaFormik
          setFieldValue={setFieldValue}
          label={t('description')}
          value={group_description}
          fieldName={'group_description'}
        />
      </StyledFormInputWrapper>
    </StyledFormRoot>
  )
}

export default GroupForm
