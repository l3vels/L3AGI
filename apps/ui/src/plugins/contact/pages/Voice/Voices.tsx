import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { t } from 'i18next'
import { StyledCardsWrapper } from 'pages/Agents/Agents'
import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ToolCard from 'pages/Toolkit/components/ToolCard'
import { useVoicesService } from 'plugins/contact/services/voice/useVoicesService'
import { useNavigate } from 'react-router-dom'
import { voiceLogos } from './constants'

const Voices = ({ isPublic }: { isPublic?: boolean }) => {
  const { data: voicesData } = useVoicesService()

  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{`${t('voices')}`}</StyledSectionTitle>
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {voicesData?.map((voice: any, index: number) => {
            const filteredLogos = voiceLogos.filter(
              (voiceLogo: any) => voiceLogo.voiceName === voice.name,
            )

            const logoSrc = filteredLogos?.[0]?.logoSrc || ''

            return (
              <ToolCard
                key={index}
                isReadOnly={isPublic}
                isDisabled={!voice.is_active && !isPublic}
                title={voice.name}
                subTitle={!voice.is_active && !isPublic ? `${t('comingSoon')}` : ''}
                onClick={() => {
                  if (isPublic) return
                  navigate(`/integrations/voice/${voice.slug}`)
                  // openModal({ name: 'toolkit-modal', data: { toolSlug: tool.slug } })
                }}
                logoSrc={logoSrc}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Voices
