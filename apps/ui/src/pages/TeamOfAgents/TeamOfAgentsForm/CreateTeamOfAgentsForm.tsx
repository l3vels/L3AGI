import { FormikProvider } from 'formik'
import TeamOfAgentsForm from './TeamOfAgentsForm'

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
import { useCreateTeamOfAgents } from '../useCreateTeamOfAgents'
import BackButton from 'components/BackButton'
import { useNavigate } from 'react-router-dom'
import { ButtonPrimary } from 'components/Button/Button'

const CreateTeamOfAgentsForm = () => {
  const { formik, handleSubmit, isLoading } = useCreateTeamOfAgents()

  const navigate = useNavigate()

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>Add Team</StyledSectionTitle>
              {/* <StyledSectionDescription>
                Create and manage your team of AI agents for interactive experiences.
              </StyledSectionDescription> */}
            </div>

            <StyledButtonWrapper>
              <BackButton customOnClick={() => navigate('/chat')} />

              <ButtonPrimary
                onClick={() => handleSubmit(formik?.values)}
                size={Button.sizes.SMALL}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={32} /> : 'Save'}
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

export default CreateTeamOfAgentsForm
