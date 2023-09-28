import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'
import AgentView from 'pages/Agents/AgentView'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import { useDiscoverAgentByIdService } from 'services/discover/useDiscoverAgentById'

type AgentViewModalProps = {
  data: {
    id: string
    agent: any
  }
}

const AgentViewModal = ({ data }: AgentViewModalProps) => {
  const { closeModal } = useModal()

  const { id, agent } = data

  const { data: agentById } = useDiscoverAgentByIdService({ id: id })

  return (
    <>
      <StyledModal
        onClose={() => closeModal('agent-view-modal')}
        show
        backgroundColor='light'
        hideCloseButton
      >
        <StyledModalBody>
          <AgentView agentData={agentById || agent} />
        </StyledModalBody>

        <StyledButtonWrapper>
          <IconButton
            size={IconButton.sizes.XS}
            icon={() => <Close />}
            kind={IconButton.kinds.TERTIARY}
            onClick={() => closeModal('agent-view-modal')}
          />
        </StyledButtonWrapper>
      </StyledModal>
    </>
  )
}

export default withRenderModal('agent-view-modal')(AgentViewModal)

const StyledModalBody = styled.div`
  max-width: 1000px;
  width: 100vw;
`
const StyledModal = styled(Modal)`
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: unset;
  }
`
export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`
