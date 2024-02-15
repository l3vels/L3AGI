import FormikTextField from 'components/TextFieldFormik'

import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import { useContactForm } from './useContactForm'
import styled from 'styled-components'
import { t } from 'i18next'
import TextareaFormik from 'components/TextareaFormik'
import { StyledFormInputWrapper, StyledFormRoot } from 'styles/formStyles.css'

const ContactForm = ({ formik }: { formik: any }) => {
  const { groupOptions } = useContactForm()

  const { values, setFieldValue } = formik
  const { contact_description, contact_group_id } = values

  return (
    <StyledFormRoot>
      <StyledFormInputWrapper>
        <FormikTextField name='contact_name' placeholder='Name' label='Name' size='small' />

        <FormikTextField name='contact_phone' placeholder='Phone' label='Phone' size='small' />

        {/* <AgentDropdown
            label={'Group'}
            fieldName={'contact_group_id'}
            setFieldValue={setFieldValue}
            fieldValue={contact_group_id}
            options={groupOptions}
            optionSize={'small'}
          /> */}

        <FormikTextField name='contact_email' placeholder='Email' label='Email' size='small' />

        <TextareaFormik
          setFieldValue={setFieldValue}
          label={t('description')}
          value={contact_description}
          fieldName={'contact_description'}
        />
      </StyledFormInputWrapper>
    </StyledFormRoot>
  )
}

export default ContactForm

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
