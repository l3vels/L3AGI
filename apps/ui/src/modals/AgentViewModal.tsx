import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'

import { useModal } from 'hooks'
import styled from 'styled-components'
import AgentView from 'pages/Agents/AgentView'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/Close'
import { useDiscoverAgentByIdService } from 'services/discover/useDiscoverAgentById'
import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import { AgentWithConfigs } from 'types'

type AgentViewModalProps = {
  data: {
    id: string
    agent: AgentWithConfigs
  }
}

const AgentViewModal = ({ data }: AgentViewModalProps) => {
  const { closeModal } = useModal()

  const { id, agent } = data

  const { data: agentObj } = useAgentByIdService({ id })

  const { data: agentById } = useDiscoverAgentByIdService({ id })

  return (
    <>
      <Modal onClose={() => closeModal('agent-view-modal')} show backgroundColor='light' noOverlay>
        <StyledModalBody>
          <AgentView agentData={agentObj || agentById || agent} />
        </StyledModalBody>

        {/* <StyledButtonWrapper>
          <IconButton
            size={IconButton.sizes?.XS}
            icon={() => <Close />}
            kind={IconButton.kinds?.TERTIARY}
            onClick={() => closeModal('agent-view-modal')}
          />
        </StyledButtonWrapper> */}
      </Modal>
    </>
  )
}

export default withRenderModal('agent-view-modal')(AgentViewModal)

const StyledModalBody = styled.div`
  width: 50vw;
`

export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`
