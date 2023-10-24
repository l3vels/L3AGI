import Textarea from '@l3-lib/ui-core/dist/Textarea'
import Typography from '@l3-lib/ui-core/dist/Typography'

import FormikTextField from 'components/TextFieldFormik'
import { StyledTextareaWrapper } from 'pages/Agents/AgentForm/AgentForm'
import TypographyPrimary from 'components/Typography/Primary'
import styled from 'styled-components'

const GroupForm = ({ formik }: { formik: any }) => {
  const { values, setFieldValue } = formik
  const { group_description } = values

  const onDescriptionChange = (value: string) => {
    setFieldValue('group_description', value)
  }

  return (
    <StyledRoot>
      <StyledForm>
        <StyledInputWrapper>
          <FormikTextField name='group_name' placeholder='Name' label='Name' />

          <StyledTextareaWrapper>
            <TypographyPrimary
              value='Description'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
            <Textarea
              hint=''
              rows={6}
              placeholder='Description'
              name='group_description'
              value={group_description}
              onChange={onDescriptionChange}
            />
          </StyledTextareaWrapper>
        </StyledInputWrapper>
      </StyledForm>
    </StyledRoot>
  )
}

export default GroupForm

const StyledDoubleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`
const StyledCronDescriptionWrapper = styled.div`
  width: 300px;
  height: 100%;
  padding-top: 45px;

  display: flex;
  justify-content: center;
`

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
