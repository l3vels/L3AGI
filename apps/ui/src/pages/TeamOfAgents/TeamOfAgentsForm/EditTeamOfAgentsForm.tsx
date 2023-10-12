import { FormikProvider } from 'formik'

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

import { StyledButtonWrapper, StyledFormWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import ComponentsSecondaryWrapper from 'components/ComponentsSecondaryWrapper/Wrapper'

const EditTeamOfAgentsForm = () => {
  const { formik, handleSubmit, isLoading } = useEditTeamOfAgents()

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>Edit Team Of Agents</StyledSectionTitle>
              <StyledSectionDescription>
                Edit and manage your team of AI agents for interactive experiences
              </StyledSectionDescription>
            </div>

            <StyledButtonWrapper>
              <BackButton />
              <ButtonPrimary
                onClick={() => handleSubmit(formik?.values)}
                size={Button.sizes.SMALL}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={32} /> : 'Save'}
              </ButtonPrimary>
            </StyledButtonWrapper>
          </StyledHeaderGroup>

          <ComponentsSecondaryWrapper noPadding>
            <StyledFormWrapper>
              <TeamOfAgentsForm formik={formik} isLoading={isLoading} />
            </StyledFormWrapper>
          </ComponentsSecondaryWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
  )
}

export default EditTeamOfAgentsForm
