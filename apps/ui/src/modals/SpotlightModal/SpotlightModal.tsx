import { useModal } from 'hooks'

import withRenderModal from 'hocs/withRenderModal'

import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

import CommandMenu from 'components/CommandMenu/CommandMenu'

import { StyledModalWrapper, StyledModalBody, StyledCloseBtn, StyledHeader } from '../modalStyle'
import './spotlightStyle.css'
import Modal from '@l3-lib/ui-core/dist/Modal'
import BgWrapper from 'modals/components/BgWrapper'

const SpotlightModal = () => {
  const { closeModal } = useModal()

  return (
    <Modal
      fullscreen
      show
      isClean
      classNames={{
        overlay: 'spotlight_overlay',
        modal: 'spotlight_modal_container',
        container: 'spotlight_modal_container',
      }}
    >
      {/* <StyledModalWrapper className='modal_wrapper'> */}
      {/* <StyledModalBody> */}
      <CommandMenu />
      {/* </StyledModalBody> */}
      {/* </StyledModalWrapper>  */}
    </Modal>
  )
}

export default withRenderModal('spotlight-modal')(SpotlightModal)
