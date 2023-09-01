import { FormikProvider } from 'formik'

import { useAgents } from '../useAgents'
import AgentForm from './AgentForm'

import Button from '@l3-lib/ui-core/dist/Button'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

const CreateAgentForm = () => {
  const { formik, handleSubmit, closeCreateAgentModal, isLoading } = useAgents()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Agents</StyledSectionTitle>
            <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription>
          </div>

          <div>
            <Button onClick={() => {}}>Create Agent</Button>
          </div>
        </StyledHeaderGroup>
        <ComponentsWrapper>
          <AgentForm formik={formik} isLoading={isLoading} handleSubmit={handleSubmit} />
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateAgentForm
