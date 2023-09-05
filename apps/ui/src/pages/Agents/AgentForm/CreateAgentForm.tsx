import { FormikProvider } from 'formik'

import { useAgents } from '../useAgents'
import AgentForm from './AgentForm'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import styled from 'styled-components'

const CreateAgentForm = () => {
  const { formik, handleSubmit, isLoading } = useAgents()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle secondary>Create Agent</StyledSectionTitle>
            <StyledSectionDescription secondary>
            Here are all your agents, managing tasks and operations.
            </StyledSectionDescription>
          </div>

          <div>
            <Button onClick={() => handleSubmit(formik?.values)} disabled={isLoading}>
              {isLoading ? <Loader size={32} /> : 'Save'}
            </Button>
          </div>
        </StyledHeaderGroup>

        <ComponentsWrapper noPadding>
          <StyledFormWrapper>
            <AgentForm formik={formik} />
          </StyledFormWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateAgentForm

export const StyledFormWrapper = styled.div`
  width: 100%;

  height: calc(100vh - 350px);
`
