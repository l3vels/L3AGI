import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'
import AgentView from 'pages/Agents/AgentView'

type AgentViewModalProps = {
  data: {
    agent: any
  }
}

const AgentViewModal = ({ data }: AgentViewModalProps) => {
  const { closeModal } = useModal()

  const { agent } = data

  return (
    <StyledModal
      onClose={() => closeModal('agent-view-modal')}
      show
      backgroundColor='light'
      hideCloseButton
    >
      <StyledModalBody>
        <AgentView agentData={agent} />
      </StyledModalBody>
    </StyledModal>
  )
}

export default withRenderModal('agent-view-modal')(AgentViewModal)

const StyledModalBody = styled.div`
  max-width: 1000px;
`
const StyledModal = styled(Modal)`
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: unset;
  }
`
