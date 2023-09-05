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
import BackButton from 'components/BackButton'

const CreateAgentForm = () => {
  const { formik, handleSubmit, isLoading } = useAgents()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Create Agent</StyledSectionTitle>
            <StyledSectionDescription>
              Here are all your agents, managing tasks and operations.
            </StyledSectionDescription>
          </div>

          <StyledButtonWrapper>
            <Button
              onClick={() => handleSubmit(formik?.values)}
              disabled={isLoading}
              size={Button.sizes.SMALL}
            >
              {isLoading ? <Loader size={32} /> : 'Save'}
            </Button>

            <BackButton />
          </StyledButtonWrapper>
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

  height: calc(100vh - 340px);
`
export const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
`
