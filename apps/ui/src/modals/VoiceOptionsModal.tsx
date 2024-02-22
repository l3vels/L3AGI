/* eslint-disable jsx-a11y/media-has-caption */
import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import { StyledModalBody } from './IntegrationListModal'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import { useEditAgent } from 'pages/Agents/useEditAgent'
import TypographyPrimary from 'components/Typography/Primary'
import { StyledCombiner } from 'pages/Datasource/DatasourceForm/CreateDatasourceForm'
import AudioPlayer from 'components/AudioPlayer'

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
                  <StyledVoiceCard
                    key={id}
                    // onClick={() => {
                    //   formik.setFieldValue('agent_voice_id', id)
                    //   closeModal('voice-options-modal')
                    // }}
                  >
                    <StyledCardHeader>
                      <TypographyPrimary
                        value={`${voice.name} - ${voice.gender}`}
                        size={'medium'}
                      />
                    </StyledCardHeader>

                    {/* <div>
                      <audio controls src={voice.sample}>
                        Your browser does not support the audio element.
                      </audio>
                    </div> */}
                    {voice.sample && <AudioPlayer audioUrl={voice.sample} />}

                    <TypographyPrimary value={voice.language} size={'small'} />
                  </StyledVoiceCard>
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
  width: 100%;
  /* min-height: 100px;
  height: 100px; */

  border-radius: 8px;

  background: white;

  display: flex;

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
  gap: 15px;
`
const StyledHeader = styled.div`
  display: flex;
  align-items: center;

  height: 50px;
  padding: 0 20px;
`
