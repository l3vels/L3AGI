import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/Close'

import VoiceView from 'plugins/contact/pages/Voice/VoiceView'
import { useVoiceView } from 'plugins/contact/pages/Voice/VoiceView/useVoiceView'
import { StyledModalBody } from './ToolkitModal'

type VoiceModalProps = {
  data: {
    voiceSlug: string
  }
}

const VoiceModal = ({ data }: VoiceModalProps) => {
  const { closeModal } = useModal()

  const { configsData } = useVoiceView({})

  if (!configsData) return <div />

  return (
    <Modal onClose={() => closeModal('voice-modal')} show backgroundColor='light'>
      <StyledModalBody>
        <VoiceView voiceSlug={data.voiceSlug} />
      </StyledModalBody>
    </Modal>
  )
}

export default withRenderModal('voice-modal')(VoiceModal)
