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

import Checkbox from 'share-ui/components/Checkbox/Checkbox'
import TypographyPrimary from 'components/Typography/Primary'
import RadioButton from 'share-ui/components/RadioButton/RadioButton'
import Typography from 'share-ui/components/typography/Typography'
import { useEffect } from 'react'

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

  const {
    agent_voice_synthesizer,
    agent_voice_transcriber,
    agent_voice_id,
    agent_type,
    agent_voice_response,
    agent_voice_input_mode,
  } = values

  const { data: voiceOptions, loading } = useVoiceOptionsService({})

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
        language: '-',
        id: item.voice_id,
        gender: item.labels.gender,
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
            <ButtonSecondary
              disabled={loading}
              onClick={() =>
                openModal({
                  name: 'voice-options-modal',
                  data: { formik: formik, voiceList: pickedVoiceOptions },
                })
              }
            >
              {'Choose Voice'}
              {loading && <Loader size={20} />}
            </ButtonSecondary>
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

      {agent_type === 'text' && (
        <>
          <TypographyPrimary
            value={t('response-mode')}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />

          <RadioButton
            text={t('text')}
            name='agent_voice_response'
            onSelect={() => setFieldValue('agent_voice_response', ['Text'])}
            checked={agent_voice_response?.length === 1 && agent_voice_response?.includes('Text')}
          />
          <RadioButton
            text={t('voice')}
            name='agent_voice_response'
            onSelect={() => setFieldValue('agent_voice_response', ['Voice'])}
            checked={agent_voice_response?.length === 1 && agent_voice_response?.includes('Voice')}
          />
          <RadioButton
            text={`${t('text')} & ${t('voice')}`}
            name='agent_voice_response'
            onSelect={() => setFieldValue('agent_voice_response', ['Text', 'Voice'])}
            checked={agent_voice_response?.length === 2}
          />

          <TypographyPrimary
            value={t('input-mode')}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />
          <Checkbox
            label={t('text')}
            kind='secondary'
            // name='agent_is_template'
            checked={agent_voice_input_mode?.includes('Text')}
            onChange={() => {
              if (agent_voice_input_mode?.includes('Text')) {
                const filteredInput = agent_voice_input_mode?.filter(
                  (input: string) => input !== 'Text',
                )
                setFieldValue('agent_voice_input_mode', filteredInput)
              } else {
                setFieldValue('agent_voice_input_mode', [...agent_voice_input_mode, 'Text'])
              }
            }}
          />

          <Checkbox
            label={t('voice')}
            kind='secondary'
            // name='agent_is_template'
            checked={agent_voice_input_mode?.includes('Voice')}
            onChange={() => {
              if (agent_voice_input_mode?.includes('Voice')) {
                const filteredInput = agent_voice_input_mode?.filter(
                  (input: string) => input !== 'Voice',
                )
                setFieldValue('agent_voice_input_mode', filteredInput)
              } else {
                setFieldValue('agent_voice_input_mode', [...agent_voice_input_mode, 'Voice'])
              }
            }}
          />
        </>
      )}
    </StyledTabPanelInnerWrapper>
  )
}

export default VoicePreferences

const StyledButtonWrapper = styled.div`
  margin-top: 25px;
`
