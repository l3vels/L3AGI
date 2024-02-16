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

import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'

import { useEffect, useState } from 'react'
import { StyledTabListWrapper, StyledTabRootWrapper } from 'styles/tabStyles.css'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import {
  StyledChatWrapper,
  StyledContainer,
  StyledHorizontalDivider,
  StyledLeftColumn,
  StyledMainWrapper,
  StyledRightColumn,
} from 'routes/ChatRouteLayout'
import ListHeader from 'routes/components/ListHeader'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { useFineTuning } from './FineTuning/useFineTuning'

import tuningIcon from 'assets/icons/tuning.png'

const Models = ({ isPublic }: { isPublic?: boolean }) => {
  const { t } = useTranslation()

  const outlet = useOutlet()
  const params = useParams()

  const { fineTuningId, modelId } = params

  const { fineTuningData, deleteFineTuningHandler } = useFineTuning()

  const { data: models } = useModelsService()

  const { getModelModules } = useGetAccountModule()
  const modelModule = getModelModules('models')
  const fineTuningModule = getModelModules('fine-tuning')
  const isModel = modelModule.list
  const isFineTuning = fineTuningModule.list

  const navigate = useNavigate()

  useEffect(() => {
    if (fineTuningData?.length > 0) navigate(`/models/${fineTuningData?.[0]?.id}/edit-fine-tuning`)
    else if (models?.length > 0) navigate(`/models/${models?.[0]?.id}`)
  }, [fineTuningData])

  return (
    <>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>
            <StyledLeftColumn>
              {fineTuningData?.length > 0 && (
                <>
                  <ListHeader
                    title={t('fine-tuning')}
                    onAddClick={() => navigate('/models/create-fine-tuning')}
                  />

                  {fineTuningData?.map((fineTuning: any) => {
                    return (
                      <MiniToolCard
                        key={fineTuning.id}
                        onClick={() => {
                          navigate(`/models/${fineTuning.id}/edit-fine-tuning`)
                        }}
                        name={fineTuning.name}
                        logo={tuningIcon}
                        picked={fineTuning.id === fineTuningId}
                        onDeleteClick={() => deleteFineTuningHandler(fineTuning.id)}
                      />
                    )
                  })}
                  <StyledHorizontalDivider />
                </>
              )}

              <ListHeader
                title={t('models')}
                customLabel={t('add-fine-tuning')}
                onAddClick={
                  fineTuningData?.length === 0
                    ? () => navigate('/models/create-fine-tuning')
                    : undefined
                }
              />
              {models
                ?.filter(model => !model.is_fine_tuned)
                ?.map((model, index: number) => {
                  const logo = MODEL_PROVIDER_LOGOS.find(logo => logo.provider === model.provider)
                  const logoSrc = logo?.logoSrc || ''

                  return (
                    <MiniToolCard
                      key={index}
                      onClick={() => navigate(`/models/${model.id}`)}
                      picked={modelId === model.id}
                      name={model.name}
                      logo={logoSrc}
                    />
                  )
                })}
            </StyledLeftColumn>

            <StyledChatWrapper>{outlet}</StyledChatWrapper>
          </StyledMainWrapper>
        </StyledContainer>
      </StyledAppContainer>
    </>
  )
}

export default Models
