import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'

import { useModal } from 'hooks'
import styled from 'styled-components'
import ContactListTable from './contactListComponents/ContactListTable'

type ContactListModalProps = {
  //   data: {
  //     isRegister?: boolean
  //   }
}

const ContactListModal = () => {
  const { closeModal } = useModal()

  return (
    <Modal
      onClose={() => closeModal('contact-list-modal')}
      show
      backgroundColor='light'
      noOverlay
      //   title='BIG'
      //   hideCloseButton={true}
    >
      <StyledModalBody>
        <ContactListTable />
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('contact-list-modal')(ContactListModal)

const StyledModalBody = styled.div`
  /* height: 100vh; */
  /* max-height: 600px; */
  padding-bottom: 10px;
  width: 100vw;

  max-width: 800px;
`
