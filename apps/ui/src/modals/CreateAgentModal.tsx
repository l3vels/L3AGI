import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import Loader from '@l3-lib/ui-core/dist/Loader'

import styled from 'styled-components'

import { useAgents } from 'pages/Agents/useAgents'
import AgentForm from 'pages/Agents/AgentForm'
import {
  StyledBody,
  StyledCloseButton,
  StyledFooter,
  StyledFormContainer,
  StyledHeader,
  StyledHeaderText,
  StyledSecondColumn,
} from './CreateDatasourceModal'
import { Footer } from 'components/Layout'
import Spotlight from 'components/Spotlight'

const CreateAgentModal = () => {
  const { formik, handleSubmit, closeCreateAgentModal, isLoading } = useAgents()

  return (
    <Modal show isClean fullscreen onClose={closeCreateAgentModal}>
      <FormikProvider value={formik}>
        <StyledFormContainer>
          <StyledHeader>
            <StyledHeaderText>Create Agent</StyledHeaderText>
            <StyledCloseButton onClick={closeCreateAgentModal}>
              <Typography
                value='Close'
                type={Typography.types.HEADING}
                size={Typography.sizes.xss}
                customColor={'color: rgba(255, 255, 255, 0.6)'}
              />
            </StyledCloseButton>
          </StyledHeader>

          <StyledBody>
            <AgentForm formik={formik} isLoading={isLoading} handleSubmit={handleSubmit} />

            <StyledSecondColumn />
          </StyledBody>
          <StyledFooter id='main_footer'>
            <Footer />
            <div>
              <Spotlight />
            </div>
            <div></div>
          </StyledFooter>
        </StyledFormContainer>
      </FormikProvider>
    </Modal>
  )
}

export default withRenderModal('create-agent-modal')(CreateAgentModal)
