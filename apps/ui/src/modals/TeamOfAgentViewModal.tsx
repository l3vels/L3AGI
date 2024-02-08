import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import TeamOfAgentView from 'pages/TeamOfAgents/TeamOfAgentView'
import { StyledButtonWrapper } from './AgentViewModal'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/Close'

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
    >
      <StyledModalBody>
        <TeamOfAgentView teamOfAgentsData={teamOfAgents} />
      </StyledModalBody>
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
