import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import { FormikProvider } from 'formik'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'

import { useCreateFineTuning } from '../useCreateFineTuning'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { t } from 'i18next'
import FineTuningForm from './FineTuningForm'
import { StyledFormWrapper } from 'styles/formStyles.css'
import { StyledCombiner } from 'pages/Datasource/DatasourceForm/CreateDatasourceForm'

const CreateFineTuningForm = () => {
  const { formik, isLoading, handleErrorAlert } = useCreateFineTuning()

  const handleFormSubmit = () => {
    if (formik?.errors?.fine_tuning_file_url) {
      handleErrorAlert(`${formik?.errors?.fine_tuning_file_url}!`)
    } else {
      formik?.handleSubmit()
    }
  }

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <StyledCombiner>
            <StyledSectionTitle>{`${t('add-fine-tuning')}`}</StyledSectionTitle>
          </StyledCombiner>
        </StyledHeaderGroup>

        <StyledFormWrapper>
          <FineTuningForm formik={formik} />
        </StyledFormWrapper>

        <StyledButtonWrapper>
          <BackButton />
          <ButtonPrimary
            onClick={handleFormSubmit}
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

export default CreateFineTuningForm
