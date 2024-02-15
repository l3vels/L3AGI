import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/Close'
import ToolView from 'pages/Toolkit/ToolView'
import { useToolView } from 'pages/Toolkit/ToolView/useToolView'

type ToolkitModalProps = {
  data: {
    toolSlug: string
  }
}

const ToolkitModal = ({ data }: ToolkitModalProps) => {
  const { closeModal } = useModal()

  const { configsData } = useToolView({})

  if (!configsData) return <div />

  return (
    <>
      <Modal onClose={() => closeModal('toolkit-modal')} show backgroundColor='light'>
        <StyledModalBody>
          <ToolView toolSlug={data.toolSlug} />
        </StyledModalBody>
      </Modal>
    </>
  )
}

export default withRenderModal('toolkit-modal')(ToolkitModal)

export const StyledModalBody = styled.div`
  width: 100%;

  padding: 10px;
`
