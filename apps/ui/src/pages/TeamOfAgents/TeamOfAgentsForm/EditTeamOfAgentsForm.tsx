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

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledButtonWrapper, StyledFormWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'

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
              <ButtonPrimary
                onClick={() => handleSubmit(formik?.values)}
                size={Button.sizes.SMALL}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={32} /> : 'Save'}
              </ButtonPrimary>

              <BackButton />
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
