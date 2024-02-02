import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'
import TeamOfAgentsForm from './TeamOfAgentsForm'
import { useEditTeamOfAgents } from '../useEditTeamOfAgents'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledFormWrapper } from 'styles/formStyles.css'
import { StyledCombiner } from 'pages/Datasource/DatasourceForm/CreateDatasourceForm'
import TeamDemoButton from './components/TeamDemoButton'

const EditTeamOfAgentsForm = () => {
  const { t } = useTranslation()
  const { formik, handleSubmit, isLoading, handleNavigation } = useEditTeamOfAgents()

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'></StyledHeaderGroup>

          <StyledFormWrapper>
            <TeamOfAgentsForm formik={formik} isLoading={isLoading} />
          </StyledFormWrapper>
          <StyledButtonWrapper>
            <ButtonPrimary
              onClick={() => handleSubmit(formik?.values)}
              size={Button.sizes?.MEDIUM}
              disabled={isLoading}
            >
              {isLoading ? <Loader size={32} /> : t('save')}
            </ButtonPrimary>
          </StyledButtonWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
  )
}

export default EditTeamOfAgentsForm
