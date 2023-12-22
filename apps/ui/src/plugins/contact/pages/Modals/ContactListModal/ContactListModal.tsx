import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'

import { useModal } from 'hooks'
import styled from 'styled-components'
import ContactListTable from './contactListComponents/ContactListTable'
import { CreateCallInput } from 'plugins/contact/services/call/useCreateCallService'

type ContactListModalProps = {
  data: {
    callType: CreateCallInput['type']
  }
}

const ContactListModal = ({ data }: ContactListModalProps) => {
  const { closeModal } = useModal()

  const { callType } = data

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
        <ContactListTable callType={callType} />
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
