import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useEditAgent } from '../useEditAgent'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import { StyledButtonWrapper } from './CreateAgentForm'
import AgentForm from './AgentForm'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import { StyledFormWrapper } from 'styles/formStyles.css'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { StyledCombiner } from 'pages/Datasource/DatasourceForm/CreateDatasourceForm'
import AgentDemoButton from './components/AgentDemoButton'

const EditAgentForm = () => {
  const { t } = useTranslation()
  const { formik, isLoading, handleNavigation } = useEditAgent()

  const { getIntegrationModules } = useGetAccountModule()
  const voiceModule = getIntegrationModules('voices')
  const isVoiceEdit = voiceModule.edit

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'></StyledHeaderGroup>

        <StyledFormWrapper>
          <AgentForm formik={formik} isVoice={isVoiceEdit} />
        </StyledFormWrapper>
        <StyledButtonWrapper>
          <ButtonPrimary
            onClick={formik?.handleSubmit}
            disabled={isLoading}
            size={Button.sizes?.MEDIUM}
          >
            {isLoading ? <Loader size={32} /> : t('save')}
          </ButtonPrimary>
        </StyledButtonWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default EditAgentForm
