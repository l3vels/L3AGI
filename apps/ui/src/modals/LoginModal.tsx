import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
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
    <StyledModal
      onClose={() => closeModal('login-modal')}
      show
      backgroundColor='light'
      //   hideCloseButton={true}
    >
      <StyledModalBody>{isRegister ? <Register /> : <Login />}</StyledModalBody>
    </StyledModal>
  )
}

export default withRenderModal('login-modal')(LoginModal)

const StyledModalBody = styled.div`
  /* height: 100vh; */
  /* max-height: 600px; */
  padding-bottom: 10px;
`
const StyledModal = styled(Modal)``
