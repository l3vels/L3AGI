import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useTranslation } from 'react-i18next'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { StyledCardsWrapper } from 'pages/Agents/Agents'
import { ButtonPrimary } from 'components/Button/Button'
import Button from '@l3-lib/ui-core/dist/Button'

import { useNavigate } from 'react-router-dom'
import TempCard from 'pages/Schedule/TempCard'
import { useFineTuning } from './useFineTuning'

const FineTunings = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleAddFineTuning = () => {
    navigate('/models/create-fine-tuning')
  }

  const { fineTuningData, deleteFineTuningHandler } = useFineTuning()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{`${t('fine-tuning')}`}</StyledSectionTitle>
          {/* <StyledSectionDescription>{t('model-description')}</StyledSectionDescription> */}
        </div>
        <ButtonPrimary size={Button.sizes.SMALL} onClick={handleAddFineTuning}>
          {t('add-fine-tuning')}
        </ButtonPrimary>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {fineTuningData?.map((fineTuning: any, index: number) => {
            const deleteHandler = () => {
              deleteFineTuningHandler(fineTuning.id)
            }

            return (
              <TempCard
                key={index}
                name={fineTuning.name}
                description={''}
                onDeleteClick={deleteHandler}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default FineTunings
