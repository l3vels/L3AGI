import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import Loader from '@l3-lib/ui-core/dist/Loader'

import AgentForm from 'pages/Agents/AgentForm'
import { useEditAgent } from 'pages/Agents/useEditAgent'
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

type EditAgentModalProps = {
  data: {
    closeModal: () => void
    agentObj: any
  }
}

const EditAgentModal = ({ data }: EditAgentModalProps) => {
  const { formik, handleSubmit, closeEditAgentModal, isLoading } = useEditAgent(data.agentObj)

  return (
    <Modal show isClean fullscreen onClose={closeEditAgentModal}>
      <FormikProvider value={formik}>
        <StyledFormContainer>
          <StyledHeader>
            <StyledHeaderText>Edit Agent</StyledHeaderText>
            <StyledCloseButton onClick={closeEditAgentModal}>
              <Typography
                value='Close'
                type={Typography.types.HEADING}
                size={Typography.sizes.xss}
                customColor={'color: rgba(255, 255, 255, 0.6)'}
              />
            </StyledCloseButton>
          </StyledHeader>

          <StyledBody>
            <AgentForm formik={formik} isLoading={isLoading} handleSubmit={handleSubmit} isEdit />

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

export default withRenderModal('edit-agent-modal')(EditAgentModal)
