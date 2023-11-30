import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'
import TeamOfAgentsForm from './TeamOfAgentsForm'
import { useEditTeamOfAgents } from '../useEditTeamOfAgents'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { t } from 'i18next'
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
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledCombiner>
                <StyledSectionTitle>{`${t('edit-team')}`}</StyledSectionTitle>

                <TeamDemoButton />
              </StyledCombiner>
              {/* <StyledSectionDescription>
                Edit and manage your team of AI agents for interactive experiences
              </StyledSectionDescription> */}
            </div>

            <StyledButtonWrapper>
              <BackButton customOnClick={handleNavigation} />
              <ButtonPrimary
                onClick={() => handleSubmit(formik?.values)}
                size={Button.sizes.SMALL}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={32} /> : t('save')}
              </ButtonPrimary>
            </StyledButtonWrapper>
          </StyledHeaderGroup>

          <ComponentsWrapper noPadding>
            <StyledFormWrapper>
              <TeamOfAgentsForm formik={formik} isLoading={isLoading} />
            </StyledFormWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
  )
}

export default EditTeamOfAgentsForm
