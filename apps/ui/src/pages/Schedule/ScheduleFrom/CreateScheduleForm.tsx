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

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

import { FormikProvider } from 'formik'

import { useCreateSchedule } from '../useCreateSchedule'
import ScheduleForm from './ScheduleForm'
import { StyledFormWrapper } from 'styles/formStyles.css'

type CreateScheduleFormProps = {
  initialValues?: Record<string, unknown>
}

const CreateScheduleForm = ({ initialValues = {} }: CreateScheduleFormProps) => {
  const { formik, isLoading } = useCreateSchedule({ initialValues })

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Add Schedule</StyledSectionTitle>
          </div>

          <StyledButtonWrapper>
            <BackButton />
            <ButtonPrimary
              onClick={formik.handleSubmit}
              size={Button.sizes.SMALL}
              disabled={isLoading}
            >
              {isLoading ? <Loader size={32} /> : 'Save'}
            </ButtonPrimary>
          </StyledButtonWrapper>
        </StyledHeaderGroup>

        <ComponentsWrapper noPadding>
          <StyledFormWrapper>
            <ScheduleForm formik={formik} />
          </StyledFormWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateScheduleForm
