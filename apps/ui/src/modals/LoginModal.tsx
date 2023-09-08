import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import { Login, Register } from 'pages/Auth'
import { useModal } from 'hooks'
import styled from 'styled-components'

type LoginModalProps = {
  data: {
    isRegister?: boolean
  }
}

const LoginModal = ({ data }: LoginModalProps) => {
  const { closeModal } = useModal()

  const { isRegister } = data

  return (
    <Modal
      onClose={() => closeModal('login-modal')}
      show
      backgroundColor='light'
      //   hideCloseButton={true}
    >
      <StyledModalBody>{isRegister ? <Register /> : <Login />}</StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('login-modal')(LoginModal)

const StyledModalBody = styled.div`
  height: 100vh;
  max-height: 800px;
`
