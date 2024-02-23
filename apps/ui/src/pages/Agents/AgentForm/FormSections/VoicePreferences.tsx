import { t } from 'i18next'
import { StyledCombinedFields, StyledTabPanelInnerWrapper } from '../AgentForm'
import AgentDropdown from '../components/AgentDropdown'

import FormikTextField from 'components/TextFieldFormik'
import styled from 'styled-components'
import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'
import { ButtonSecondary } from 'components/Button/Button'
import VoiceOptionCard from '../components/VoiceOptionCard'
import { useVoiceOptionsService } from 'plugins/contact/services/voice/useVoiceOptionsService'
import { useModal } from 'hooks'
import Loader from 'share-ui/components/Loader/Loader'

const VoicePreferences = ({
  formik,
  voiceSynthesizerOptions,
  voiceTranscriberOptions,
}: {
  formik: any
  voiceSynthesizerOptions: { label: string; value: string }[]
  voiceTranscriberOptions: { label: string; value: string }[]
}) => {
  const { openModal } = useModal()

  const { setFieldValue, values } = formik

  const { agent_voice_synthesizer, agent_voice_transcriber, agent_voice_id, agent_type } = values

  const { data: voiceOptions, loading: optionsLoading } = useVoiceOptionsService()

  const pickedSynthesizer = voiceSynthesizerOptions?.find(
    (option: any) => option.value === agent_voice_synthesizer,
  )?.label

  let pickedVoiceOptions: any = []
  if (pickedSynthesizer === 'Play.HT')
    pickedVoiceOptions = voiceOptions['playHtVoices']?.map((item: any) => {
      return {
        name: item.name,
        sample: item.sample,
        language: item.language_code,
        id: item.id,
        gender: item.gender,
      }
    })

  if (pickedSynthesizer === 'ElevenLabs')
    pickedVoiceOptions = voiceOptions['elevenLabsVoices']?.voices?.map((item: any) => {
      return {
        name: item.name,
        sample: item.preview_url,
        language: item.language,
        id: item.voice_id,
        gender: item.gender,
      }
    })

  if (pickedSynthesizer === 'Azure')
    pickedVoiceOptions = voiceOptions['azureVoices']?.map((item: any) => {
      return {
        name: item.DisplayName,
        sample: '',
        language: item.language_code || '-',
        id: item.ShortName,
        gender: item.Gender,
      }
    })

  const pickedVoice = pickedVoiceOptions?.find((item: any) => item.id === agent_voice_id)

  console.log('voiceOptions', voiceOptions)

  return (
    <StyledTabPanelInnerWrapper>
      <AgentDropdown
        label={t('synthesizer')}
        fieldName={'agent_voice_synthesizer'}
        setFieldValue={setFieldValue}
        fieldValue={agent_voice_synthesizer}
        options={voiceSynthesizerOptions}
        onChange={() => {
          // setFieldValue('agent_voice_synthesizer', '')
          setFieldValue('agent_voice_id', '')
        }}
        optionSize={'small'}
      />

      {agent_voice_synthesizer && (
        <StyledCombinedFields>
          <FormikTextField
            name='agent_voice_id'
            // placeholder={t('voice-id')}
            label={t('voice-id')}
          />

          <StyledButtonWrapper>
            {optionsLoading ? (
              <Loader size={40} />
            ) : (
              <ButtonSecondary
                onClick={() =>
                  openModal({
                    name: 'voice-options-modal',
                    data: { voiceList: pickedVoiceOptions, formik: formik },
                  })
                }
              >
                Choose Voice
              </ButtonSecondary>
            )}
          </StyledButtonWrapper>
        </StyledCombinedFields>
      )}

      {pickedVoice && (
        <VoiceOptionCard
          title={pickedVoice?.name}
          audioUrl={pickedVoice?.sample}
          onRemoveClick={() => setFieldValue('agent_voice_id', '')}
        />
      )}

      <AgentDropdown
        label={t('transcriber')}
        fieldName={'agent_voice_transcriber'}
        setFieldValue={setFieldValue}
        fieldValue={agent_voice_transcriber}
        options={voiceTranscriberOptions}
        optionSize={'small'}
      />

      {agent_type === 'inbound' && (
        <FormikTextField
          onHelpClick={() => openLinkTab(import.meta.env.REACT_APP_TWILIO_PHONE_NUMBER_SID_LINK)}
          name='agent_twilio_phone_number_sid'
          placeholder={'Please enter value'}
          label='Twilio Phone Number SID'
        />
      )}
    </StyledTabPanelInnerWrapper>
  )
}

export default VoicePreferences

const StyledButtonWrapper = styled.div`
  margin-top: 25px;
`
