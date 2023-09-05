import { FormikProvider } from 'formik'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useEditAgent } from '../useEditAgent'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledFormWrapper } from './CreateAgentForm'
import AgentForm from './AgentForm'

const EditAgentForm = () => {
  const { formik, handleSubmit, isLoading } = useEditAgent()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Edit Agent</StyledSectionTitle>
            <StyledSectionDescription>
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

export default EditAgentForm
