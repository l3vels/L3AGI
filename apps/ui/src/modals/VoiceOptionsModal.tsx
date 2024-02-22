import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import { StyledModalBody } from './IntegrationListModal'
import { StyledSectionTitle, StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import { ButtonSecondary } from 'components/Button/Button'

import TypographyPrimary from 'components/Typography/Primary'

import AudioPlayer from 'components/AudioPlayer'
import VoiceOptionCard from 'pages/Agents/AgentForm/components/VoiceOptionCard'

type VoiceOptionsModalProps = {
  data: {
    voiceList: any
    formik: any
  }
}

const VoiceOptionsModal = ({ data }: VoiceOptionsModalProps) => {
  const { closeModal } = useModal()

  const { voiceList, formik } = data

  console.log(voiceList)

  return (
    <>
      <Modal onClose={() => closeModal('voice-options-modal')} show backgroundColor='light'>
        <StyledModalBody>
          <StyledSectionWrapper>
            <StyledHeader>
              <StyledSectionTitle>Pick Voice</StyledSectionTitle>
            </StyledHeader>

            <StyledWrapper>
              {voiceList?.slice(0, 15)?.map((voice: any) => {
                const id = voice.id

                return (
                  <VoiceOptionCard
                    key={id}
                    title={`${voice.name} - ${voice.gender}`}
                    audioUrl={voice.sample}
                    onAddClick={() => {
                      formik.setFieldValue('agent_voice_id', id)
                      closeModal('voice-options-modal')
                    }}
                  />
                )
              })}
            </StyledWrapper>
          </StyledSectionWrapper>
        </StyledModalBody>
      </Modal>
    </>
  )
}

export default withRenderModal('voice-options-modal')(VoiceOptionsModal)

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;

  overflow: auto;

  padding: 0 20px;

  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  gap: 15px;
`
const StyledVoiceCard = styled.div`
  min-width: 280px;
  width: 280;
  min-height: 100px;
  height: 100px;

  border-radius: 8px;

  background: white;

  display: flex;
  flex-direction: column;

  gap: 20px;

  padding: 20px;

  cursor: pointer;

  :hover {
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.5);
  }
`
const StyledCardHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`
const StyledHeader = styled.div`
  display: flex;
  align-items: center;

  height: 50px;
  padding: 0 20px;
`
