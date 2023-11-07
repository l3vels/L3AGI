import FormikTextField from 'components/TextFieldFormik'

import styled from 'styled-components'
import TextareaFormik from 'components/TextareaFormik'
import { t } from 'i18next'

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

export const StyledCheckboxWrapper = styled.div`
  height: fit-content;
  padding-bottom: 5px;
  .l3-style-checkbox--kind-secondary .l3-style-checkbox__checkbox {
    border-color: ${({ theme }) => theme.typography.contentPrimary};
  }
  .l3-style-checkbox--kind-secondary .l3-style-checkbox__label {
    color: ${({ theme }) => theme.typography.contentPrimary};
  }
`

export const StyledForm = styled.div`
  width: 100%;
  /* max-width: 600px; */
  height: 100%;
  max-height: 100%;
  /* overflow: scroll; */

  /* margin-top: 40px; */
  display: flex;
  justify-content: center;
`

export const StyledRoot = styled.div`
  width: 100%;

  height: 100%;
  overflow-y: scroll;
`

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 20px;

  gap: 20px;
  width: 100%;
  max-width: 800px;
  /* margin: auto; */
  height: 100%;
  /* max-height: 800px; */
`
