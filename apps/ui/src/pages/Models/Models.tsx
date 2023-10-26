import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useTranslation } from 'react-i18next'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { useModelsService } from 'services'
import ModelCard from './components/ModelCard'

import { MODEL_PROVIDER_LOGOS } from './constants'
import { StyledCardsWrapper } from 'pages/Agents/Agents'
import { ButtonPrimary } from 'components/Button/Button'
import Button from '@l3-lib/ui-core/dist/Button'

import { useFineTuningsService } from 'services/fineTuning/useFIneTuningsService'

import { useModal } from 'hooks'

const Models = ({ isPublic }: { isPublic?: boolean }) => {
  const { t } = useTranslation()

  const { openModal } = useModal()

  const { data: models } = useModelsService()

  const { data: fineTuningData } = useFineTuningsService()

  const handleAddFineTuning = () => {
    openModal({ name: 'create-fine-tuning-modal' })
  }
  console.log(fineTuningData)
  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{`${t('model')}`}</StyledSectionTitle>
          <StyledSectionDescription>{t('model-description')}</StyledSectionDescription>
        </div>
        <ButtonPrimary size={Button.sizes.SMALL} onClick={handleAddFineTuning}>
          {t('add-fine-tuning')}
        </ButtonPrimary>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {models?.map((model, index: number) => {
            const logo = MODEL_PROVIDER_LOGOS.find(logo => logo.provider === model.provider)
            const logoSrc = logo?.logoSrc || ''

            return (
              <ModelCard
                key={index}
                isReadOnly={isPublic}
                isDisabled={false}
                title={model.name}
                author={model.provider}
                logoSrc={logoSrc}
              />
            )
          })}
          {fineTuningData?.map((fineTuning: any, index: number) => {
            return (
              <ModelCard
                key={index}
                isReadOnly={isPublic}
                isDisabled={false}
                title={fineTuning.name}
                author={'levan'}
                logoSrc={''}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Models
