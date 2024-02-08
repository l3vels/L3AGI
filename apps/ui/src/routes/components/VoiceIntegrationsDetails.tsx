import { StyledSearchOutlineIcon } from 'components/ChatSwitcher/ChatSwitcher'
import TypographyPrimary from 'components/Typography/Primary'
import { useModal } from 'hooks'
import { t } from 'i18next'
import { useAgentForm } from 'pages/Agents/AgentForm/useAgentForm'
import { StyledDetailsBox } from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import { useEditAgent } from 'pages/Agents/useEditAgent'

import { voiceLogos } from 'plugins/contact/pages/Voice/constants'

import IconButton from 'share-ui/components/IconButton/IconButton'
import Typography from 'share-ui/components/typography/Typography'

import {
  StyledCardsWrapper,
  StyledDetailHeader,
  StyledImg,
  StyledIntegrationCard,
} from './IntegrationsDetails'
import { FormikProvider } from 'formik'

const VoiceIntegrationsDetails = () => {
  const { openModal } = useModal()

  const {
    voiceSynthesizerOptions,
    voiceTranscriberOptions,

    voices: voicesData,
  } = useAgentForm({})

  const { agentById, formik } = useEditAgent()

  const synthesizerId = agentById?.configs?.synthesizer
  const transcriberId = agentById?.configs?.transcriber

  const synthesizer = voiceSynthesizerOptions?.find((option: any) => option.value === synthesizerId)
  const transcriber = voiceTranscriberOptions?.find((option: any) => option.value === transcriberId)

  const synthesizerLogo =
    voiceLogos?.find((voice: any) => voice.voiceName === synthesizer?.label)?.logoSrc || ''

  const transcriberLogo =
    voiceLogos?.find((voice: any) => voice.voiceName === transcriber?.label)?.logoSrc || ''

  const voiceSlugs = voicesData?.map((voice: any) => {
    return { slug: voice.slug, id: voice.id }
  })

  const handleOpenVoiceIntegrationModal = (id: string) => {
    const slug = voiceSlugs?.find((slug: any) => slug.id === id)?.slug
    openModal({ name: 'voice-modal', data: { voiceSlug: slug } })
  }

  return (
    <FormikProvider value={formik}>
      <StyledDetailsBox>
        <StyledDetailHeader>
          <TypographyPrimary
            value={`${t('voice')} ${t('integrations')}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />
          <IconButton
            //   onClick={() => openModal({ name: 'integration-list-modal' })}
            icon={() => <StyledSearchOutlineIcon size={26} />}
            kind={IconButton.kinds?.TERTIARY}
            size={IconButton.sizes?.SMALL}
          />
        </StyledDetailHeader>

        <StyledCardsWrapper>
          {synthesizer && (
            <StyledIntegrationCard
              onClick={() => handleOpenVoiceIntegrationModal(synthesizer.value)}
            >
              <StyledImg src={synthesizerLogo} />

              <TypographyPrimary
                value={synthesizer?.label}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
              />
            </StyledIntegrationCard>
          )}
          {transcriber && (
            <StyledIntegrationCard
              onClick={() => handleOpenVoiceIntegrationModal(transcriber.value)}
            >
              <StyledImg src={transcriberLogo} />

              <TypographyPrimary
                value={transcriber?.label}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
              />
            </StyledIntegrationCard>
          )}
        </StyledCardsWrapper>
      </StyledDetailsBox>
    </FormikProvider>
  )
}

export default VoiceIntegrationsDetails
