import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/Close'
import Settings from 'pages/Settings'

const SettingsModal = () => {
  const { closeModal } = useModal()

  return (
    <>
      <StyledModal onClose={() => closeModal('settings-modal')} show backgroundColor='light'>
        <StyledModalBody>
          <Settings isModal />
        </StyledModalBody>
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
