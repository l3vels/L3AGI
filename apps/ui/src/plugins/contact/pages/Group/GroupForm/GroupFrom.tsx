import FormikTextField from 'components/TextFieldFormik'

import styled from 'styled-components'
import TextareaFormik from 'components/TextareaFormik'
import { t } from 'i18next'
import { StyledForm, StyledInputWrapper, StyledRoot } from '../../Contact/ContactForm/ContactForm'

const GroupForm = ({ formik }: { formik: any }) => {
  const { values, setFieldValue } = formik
  const { group_description } = values

  return (
    <StyledRoot>
      <StyledForm>
        <StyledInputWrapper>
          <FormikTextField name='group_name' placeholder='Name' label='Name' />

          <TextareaFormik
            setFieldValue={setFieldValue}
            label={t('description')}
            value={group_description}
            fieldName={'group_description'}
          />
        </StyledInputWrapper>
      </StyledForm>
    </StyledRoot>
  )
}

export default GroupForm
