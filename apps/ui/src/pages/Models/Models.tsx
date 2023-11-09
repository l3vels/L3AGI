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

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import { useState } from 'react'
import {
  StyledTab,
  StyledTabListSpan,
  StyledTabListWrapper,
  StyledTabRootWrapper,
} from 'styles/tabStyles.css'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { useLocation, useNavigate } from 'react-router-dom'

const Models = ({ isPublic }: { isPublic?: boolean }) => {
  const { t } = useTranslation()

  const { data: models } = useModelsService()

  const { getModelModules } = useGetAccountModule()
  const modelModule = getModelModules('models')
  const fineTuningModule = getModelModules('fine-tuning')
  const isModel = modelModule.list
  const isFineTuning = fineTuningModule.list

  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const tabQuery = urlParams.get('tab')

  const defaultActiveTab = () => {
    if (!isFineTuning) return 1

    if (tabQuery === 'fine-tuning') return 0
    if (tabQuery === 'model') return 1
  }

  const [activeTab, setActiveTab] = useState(defaultActiveTab || 0)
  const handleTabClick = (tabId: number, tabName: string) => {
    setActiveTab(tabId)
    navigate(`/models?tab=${tabName}`)
  }

  return (
    <StyledTabRootWrapper>
      {isModel && isFineTuning && (
        <StyledTabListWrapper>
          <TabList activeTabId={activeTab}>
            <StyledTab onClick={() => handleTabClick(0, 'fine-tuning')} isDisabled={!isFineTuning}>
              <StyledTabListSpan>{t('fine-tuning')}</StyledTabListSpan>
            </StyledTab>
            <StyledTab onClick={() => handleTabClick(1, 'model')} isDisabled={!isModel}>
              <StyledTabListSpan>{t('models')}</StyledTabListSpan>
            </StyledTab>
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
    </StyledTabRootWrapper>
  )
}

export default Models
