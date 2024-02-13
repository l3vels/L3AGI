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
  StyledLeftColumn,
  StyledMainWrapper,
  StyledRightColumn,
} from 'routes/ChatRouteLayout'
import ListHeader from 'routes/components/ListHeader'
import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { useFineTuning } from './FineTuning/useFineTuning'

const Models = ({ isPublic }: { isPublic?: boolean }) => {
  const { t } = useTranslation()

  const outlet = useOutlet()
  const params = useParams()

  const { fineTuningId } = params

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
  }, [fineTuningData])

  return (
    <>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>
            <StyledLeftColumn>
              <ListHeader
                title={t('models')}
                onAddClick={() => navigate('/models/create-fine-tuning')}
              />
              {fineTuningData?.map((fineTuning: any) => {
                return (
                  <MiniToolCard
                    key={fineTuning.id}
                    onClick={() => navigate(`/models/${fineTuning.id}/edit-fine-tuning`)}
                    name={fineTuning.name}
                    logo={''}
                    picked={fineTuning.id === fineTuningId}
                    onDeleteClick={() => deleteFineTuningHandler(fineTuning.id)}
                  />
                )
              })}

              {models
                ?.filter(model => !model.is_fine_tuned)
                ?.map((model, index: number) => {
                  const logo = MODEL_PROVIDER_LOGOS.find(logo => logo.provider === model.provider)
                  const logoSrc = logo?.logoSrc || ''

                  return (
                    <MiniToolCard key={index} onClick={() => {}} name={model.name} logo={logoSrc} />
                  )
                })}
            </StyledLeftColumn>

            <StyledChatWrapper>{outlet}</StyledChatWrapper>
          </StyledMainWrapper>

          <StyledRightColumn></StyledRightColumn>
        </StyledContainer>
      </StyledAppContainer>
      {/* <StyledTabRootWrapper>
      {isModel && isFineTuning && (
        <StyledTabListWrapper>
          <TabList activeTabId={activeTab}>
            <Tab onClick={() => handleTabClick(0, 'fine-tuning')} disabled={!isFineTuning}>
              {t('fine-tuning')}
            </Tab>
            <Tab onClick={() => handleTabClick(1, 'model')} disabled={!isModel}>
              {t('models')}
            </Tab>
          </TabList>
        </StyledTabListWrapper>
      )}

      <TabsContext activeTabId={activeTab}>
        <TabPanels noAnimation>
          <TabPanel>{isFineTuning && <FineTunings />}</TabPanel>

          <TabPanel>
            {isModel && (
              <StyledSectionWrapper>
                <StyledHeaderGroup className='header_group'>
                  <div>
                    <StyledSectionTitle>{t('models')}</StyledSectionTitle>
                    <StyledSectionDescription>{t('model-description')}</StyledSectionDescription>
                  </div>
                </StyledHeaderGroup>

                <ComponentsWrapper noPadding>
                  <StyledCardsWrapper>
                    {models
                      ?.filter(model => !model.is_fine_tuned)
                      ?.map((model, index: number) => {
                        const logo = MODEL_PROVIDER_LOGOS.find(
                          logo => logo.provider === model.provider,
                        )
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
            )}
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </StyledTabRootWrapper> */}
    </>
  )
}

export default Models
