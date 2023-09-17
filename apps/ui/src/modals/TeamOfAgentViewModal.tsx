import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import TeamOfAgentView from 'pages/TeamOfAgents/TeamOfAgentView'
import { StyledButtonWrapper } from './AgentViewModal'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Close from '@l3-lib/ui-core/dist/icons/Close'

type TeamOfAgentsViewModalProps = {
  data: {
    teamOfAgents: any
  }
}

const TeamOfAgentViewModal = ({ data }: TeamOfAgentsViewModalProps) => {
  const { closeModal } = useModal()

  const { teamOfAgents } = data

  return (
    <StyledModal
      onClose={() => closeModal('team-of-agent-view-modal')}
      show
      backgroundColor='light'
      hideCloseButton
    >
      <StyledModalBody>
        <TeamOfAgentView teamOfAgentsData={teamOfAgents} />
      </StyledModalBody>

      <StyledButtonWrapper>
        <IconButton
          size={IconButton.sizes.XS}
          icon={() => <Close />}
          kind={IconButton.kinds.TERTIARY}
          onClick={() => closeModal('team-of-agent-view-modal')}
        />
      </StyledButtonWrapper>
    </StyledModal>
  )
}

export default withRenderModal('team-of-agent-view-modal')(TeamOfAgentViewModal)

const StyledModalBody = styled.div`
  max-width: 1000px;
  width: 100vw;
`
const StyledModal = styled(Modal)`
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: unset;
  }
`
