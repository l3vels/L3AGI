import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Close from '@l3-lib/ui-core/dist/icons/Close'

import VoiceView from 'plugins/contact/pages/Voice/VoiceView'
import { useVoiceView } from 'plugins/contact/pages/Voice/VoiceView/useVoiceView'

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
    <>
      <StyledModal
        onClose={() => closeModal('voice-modal')}
        show
        backgroundColor='light'
        hideCloseButton
      >
        <StyledModalBody>
          <VoiceView voiceSlug={data.voiceSlug} />
        </StyledModalBody>

        <StyledButtonWrapper>
          <IconButton
            size={IconButton.sizes.XS}
            icon={() => <Close />}
            kind={IconButton.kinds.TERTIARY}
            onClick={() => closeModal('voice-modal')}
          />
        </StyledButtonWrapper>
      </StyledModal>
    </>
  )
}

export default withRenderModal('voice-modal')(VoiceModal)

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
