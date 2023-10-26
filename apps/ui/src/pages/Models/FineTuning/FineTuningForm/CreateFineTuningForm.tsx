import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import { FormikProvider } from 'formik'
import { StyledButtonWrapper, StyledFormWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import {
  StyledForm,
  StyledInputWrapper,
  StyledRoot,
} from 'pages/Schedule/ScheduleFrom/ScheduleForm'
import { useCreateFineTuning } from '../useCreateFineTuning'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'
import FormikTextField from 'components/TextFieldFormik'
import ImportFile from 'components/ImportFile'

const CreateFineTuningForm = () => {
  const { formik, isLoading } = useCreateFineTuning()
  return (
    <FormikProvider value={formik}>
      <StyledFormWrapper>
        <StyledRoot>
          <StyledForm>
            <StyledInputWrapper>
              <FormikTextField name='fine_tuning_name' placeholder='Name' label='Name' />

              <ImportFile />
            </StyledInputWrapper>
          </StyledForm>
        </StyledRoot>
      </StyledFormWrapper>
      <StyledButtonWrapper>
        <BackButton />
        <ButtonPrimary onClick={formik.handleSubmit} size={Button.sizes.SMALL} disabled={isLoading}>
          {isLoading ? <Loader size={32} /> : 'Save'}
        </ButtonPrimary>
      </StyledButtonWrapper>
    </FormikProvider>
  )
}

export default CreateFineTuningForm
