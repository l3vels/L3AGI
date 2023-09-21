import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Close from '@l3-lib/ui-core/dist/icons/Close'
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
      <StyledModal
        onClose={() => closeModal('toolkit-modal')}
        show
        backgroundColor='light'
        hideCloseButton
      >
        <StyledModalBody>
          <ToolView toolSlug={data.toolSlug} />
        </StyledModalBody>

        <StyledButtonWrapper>
          <IconButton
            size={IconButton.sizes.XS}
            icon={() => <Close />}
            kind={IconButton.kinds.TERTIARY}
            onClick={() => closeModal('toolkit-modal')}
          />
        </StyledButtonWrapper>
      </StyledModal>
    </>
  )
}

export default withRenderModal('toolkit-modal')(ToolkitModal)

const StyledModalBody = styled.div`
  max-width: 1000px;
  width: 400px;
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
