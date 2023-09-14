import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import TeamOfAgentView from 'pages/TeamOfAgents/TeamOfAgentView'

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
    </StyledModal>
  )
}

export default withRenderModal('team-of-agent-view-modal')(TeamOfAgentViewModal)

const StyledModalBody = styled.div`
  max-width: 650px;
`
const StyledModal = styled(Modal)`
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: unset;
  }
`
