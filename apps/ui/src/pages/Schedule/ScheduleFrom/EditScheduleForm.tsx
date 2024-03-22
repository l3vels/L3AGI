import { FormikProvider } from 'formik'
import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import { useEditSchedule } from '../useEditSchedule'
import ScheduleForm from './ScheduleForm'
import { StyledFormWrapper } from 'styles/formStyles.css'

const EditScheduleForm = ({ scheduleId }: { scheduleId?: string }) => {
  const { formik, isLoading } = useEditSchedule({ incomingScheduleId: scheduleId })

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Edit Schedule</StyledSectionTitle>
          </div>
        </StyledHeaderGroup>
        <StyledFormWrapper>
          <ScheduleForm formik={formik} />
        </StyledFormWrapper>{' '}
        <StyledButtonWrapper>
          <ButtonPrimary
            onClick={formik?.handleSubmit}
            disabled={isLoading}
            size={Button.sizes?.MEDIUM}
          >
            {isLoading ? <Loader size={32} /> : 'Save'}
          </ButtonPrimary>
        </StyledButtonWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default EditScheduleForm
