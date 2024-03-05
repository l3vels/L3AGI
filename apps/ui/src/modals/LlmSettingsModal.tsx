import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'

import ToolView from 'pages/Toolkit/ToolView'
import { useToolView } from 'pages/Toolkit/ToolView/useToolView'
import { StyledModalBody } from './ToolkitModal'
import SettingView from 'pages/Settings/SettingView'

type LlmSettingsModalProps = {
  data: {
    settingsSlug: string
  }
}

const LlmSettingsModal = ({ data }: LlmSettingsModalProps) => {
  const { closeModal } = useModal()

  const { configsData } = useToolView({})

  if (!configsData) return <div />

  return (
    <>
      <Modal onClose={() => closeModal('llm-settings-modal')} show backgroundColor='light'>
        <StyledModalBody>
          <SettingView settingSlug={data.settingsSlug} />
        </StyledModalBody>
      </Modal>
    </>
  )
}

export default withRenderModal('llm-settings-modal')(LlmSettingsModal)
