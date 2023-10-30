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

import FineTunings from './FineTuning/FineTunings'

import { StyledRoot } from 'pages/Discover/Discover'

const Models = ({ isPublic }: { isPublic?: boolean }) => {
  const { t } = useTranslation()

  const { data: models } = useModelsService()

  return (
    <StyledRoot>
      <FineTunings />

      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>{`${t('model')}`}</StyledSectionTitle>
            <StyledSectionDescription>{t('model-description')}</StyledSectionDescription>
          </div>
        </StyledHeaderGroup>

        <ComponentsWrapper noPadding>
          <StyledCardsWrapper>
            {models
              ?.filter(model => !model.is_fine_tuned)
              ?.map((model, index: number) => {
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
          </StyledCardsWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </StyledRoot>
  )
}

export default Models
