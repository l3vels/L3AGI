import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
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

const Models = ({ isPublic }: { isPublic?: boolean }) => {
  const { data: models } = useModelsService()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Models</StyledSectionTitle>
          <StyledSectionDescription>
            Discover the complete range of models available for your agents and teams.
          </StyledSectionDescription>
        </div>
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
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Models
