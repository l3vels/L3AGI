import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import { Login } from 'pages/Auth'
import { useModal } from 'hooks'

const LoginModal = () => {
  const { closeModal } = useModal()

  return (
    <Modal
      onClose={() => closeModal('login-modal')}
      show
      backgroundColor='dark'
      //   hideCloseButton={true}
    >
      <Login />
    </Modal>
  )
}

export default withRenderModal('login-modal')(LoginModal)
