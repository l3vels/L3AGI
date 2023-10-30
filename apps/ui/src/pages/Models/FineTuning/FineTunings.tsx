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
import { useFineTuningForm } from './FineTuningForm/useFineTuningForm'

const FineTunings = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleAddFineTuning = () => {
    navigate('/models/create-fine-tuning')
  }

  const { fineTuningData, deleteFineTuningHandler } = useFineTuning()
  const { modelOptions } = useFineTuningForm()
  console.log('fineTuningData', fineTuningData)
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
            const handleDelete = () => {
              deleteFineTuningHandler(fineTuning.id)
            }

            const handleEdit = () => {
              navigate(`/models/${fineTuning.id}/edit-fine-tuning`)
            }

            const filteredModel = modelOptions?.filter(
              (model: any) => model.value === fineTuning.model_id,
            )?.[0]

            return (
              <TempCard
                key={index}
                name={fineTuning.name}
                description={filteredModel?.label || ''}
                onDeleteClick={handleDelete}
                onEditClick={handleEdit}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default FineTunings
