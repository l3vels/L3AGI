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

import { StyledTextAreaWrapper } from 'pages/ApiKeys/EditApiKey/EditApiModal'
import TypographyPrimary from 'components/Typography/Primary'

import Typography from '@l3-lib/ui-core/dist/Typography'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { t } from 'i18next'
import FineTuningForm from './FineTuningForm'

const CreateFineTuningForm = () => {
  const { formik, isLoading } = useCreateFineTuning()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>{`${t('add-fine-tuning')}`}</StyledSectionTitle>
            {/* <StyledSectionDescription>{`${t('agent-description')}`}</StyledSectionDescription> */}
          </div>

          <StyledButtonWrapper>
            <BackButton />
            <ButtonPrimary
              onClick={formik?.handleSubmit}
              size={Button.sizes.SMALL}
              disabled={isLoading}
            >
              {isLoading ? <Loader size={32} /> : 'Save'}
            </ButtonPrimary>
          </StyledButtonWrapper>
        </StyledHeaderGroup>

        <ComponentsWrapper noPadding>
          <StyledFormWrapper>
            <FineTuningForm formik={formik} />
          </StyledFormWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateFineTuningForm
