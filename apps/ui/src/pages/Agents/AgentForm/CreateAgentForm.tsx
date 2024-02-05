import { FormikProvider } from 'formik'
import AgentForm from './AgentForm'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import styled from 'styled-components'
import BackButton from 'components/BackButton'
// import { useNavigate } from 'react-router-dom'
import { ButtonPrimary } from 'components/Button/Button'
import { useCreateAgent } from '../useCreateAgent'
import { t } from 'i18next'
import { StyledFormWrapper } from 'styles/formStyles.css'
import { useGetAccountModule } from 'utils/useGetAccountModule'

import { StyledCombiner } from 'pages/Datasource/DatasourceForm/CreateDatasourceForm'
import AgentDemoButton from './components/AgentDemoButton'

const CreateAgentForm = () => {
  const { formik, isLoading } = useCreateAgent()

  const { getIntegrationModules } = useGetAccountModule()
  const voiceModule = getIntegrationModules('voices')
  const isVoiceCreate = voiceModule.create
  // const navigate = useNavigate()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <StyledCombiner>
            <StyledSectionTitle>{`${t('add-agent')}`}</StyledSectionTitle>

            <AgentDemoButton />
          </StyledCombiner>
        </StyledHeaderGroup>

        <StyledFormWrapper>
          <AgentForm formik={formik} isVoice={isVoiceCreate} />
        </StyledFormWrapper>
        <StyledButtonWrapper>
          <BackButton />

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

export default CreateAgentForm

export const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  gap: 5px;

  padding-right: 10px;

  margin-top: auto;
`
