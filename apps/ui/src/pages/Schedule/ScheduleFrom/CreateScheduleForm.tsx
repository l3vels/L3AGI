import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import { FormikProvider } from 'formik'

import { useCreateSchedule } from '../useCreateSchedule'
import ScheduleForm from './ScheduleForm'
import { StyledFormWrapper } from 'styles/formStyles.css'

type CreateScheduleFormProps = {
  initialValues?: Record<string, unknown>
  agentId?: string
}

const CreateScheduleForm = ({ initialValues = {}, agentId }: CreateScheduleFormProps) => {
  const { formik, isLoading } = useCreateSchedule({
    initialValues: initialValues,
    agentId: agentId,
  })

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Add Schedule</StyledSectionTitle>
          </div>
        </StyledHeaderGroup>

        <StyledFormWrapper>
          <ScheduleForm formik={formik} />
        </StyledFormWrapper>
        <StyledButtonWrapper>
          <ButtonPrimary
            onClick={formik.handleSubmit}
            size={Button.sizes?.MEDIUM}
            disabled={isLoading}
          >
            {isLoading ? <Loader size={32} /> : 'Save'}
          </ButtonPrimary>
        </StyledButtonWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateScheduleForm
