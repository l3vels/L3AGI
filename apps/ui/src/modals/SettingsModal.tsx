import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import Settings from 'pages/Settings'

const SettingsModal = () => {
  const { closeModal } = useModal()

  return (
    <>
      <StyledModal
        onClose={() => closeModal('settings-modal')}
        show
        backgroundColor='light'
        hideCloseButton
      >
        <StyledModalBody>
          <Settings isModal />
        </StyledModalBody>

        <StyledButtonWrapper>
          <IconButton
            size={IconButton.sizes.XS}
            icon={() => <Close />}
            kind={IconButton.kinds.TERTIARY}
            onClick={() => closeModal('settings-modal')}
          />
        </StyledButtonWrapper>
      </StyledModal>
    </>
  )
}

export default withRenderModal('settings-modal')(SettingsModal)

const StyledModalBody = styled.div`
  max-width: 1000px;
  width: 500px;
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
