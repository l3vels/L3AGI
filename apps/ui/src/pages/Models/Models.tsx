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
import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import { useCreateFineTuningService } from 'services/fineTuning/useCreateFineTuningService'
import { useFineTuningsService } from 'services/fineTuning/useFIneTuningsService'

const Models = ({ isPublic }: { isPublic?: boolean }) => {
  const { t } = useTranslation()
  const { data: models } = useModelsService()

  const [createFineTuningService] = useCreateFineTuningService()
  const { data: fineTuningData } = useFineTuningsService()

  const handleCreate = () => {
    createFineTuningService({
      name: 'Test',
      file_url:
        'https://l3-data-dev.s3.amazonaws.com/account_97651e69-b90d-4b13-beca-114daeb94488/files/dwsample1-json-88840543-05ff-41c3-8cda-eaa384a5e8d3.json',
    })
  }

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{`${t('model')}`}</StyledSectionTitle>
          <StyledSectionDescription>{t('model-description')}</StyledSectionDescription>
        </div>
        <ButtonPrimary size={Button.sizes.SMALL} onClick={handleCreate}>
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
