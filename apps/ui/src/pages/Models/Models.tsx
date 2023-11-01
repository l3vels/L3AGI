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
import { StyledTabListSpan, StyledTabListWrapper, StyledTabRootWrapper } from 'styles/tabStyles.css'
import { useGetAccountModule } from 'utils/useGetAccountModule'

const Models = ({ isPublic }: { isPublic?: boolean }) => {
  const { t } = useTranslation()

  const { getModelModules } = useGetAccountModule()
  const modelModule = getModelModules('models')
  const fineTuningModule = getModelModules('fine-tuning')
  const isModel = modelModule.list
  const isFineTuning = fineTuningModule.list

  const [activeTab, setActiveTab] = useState(0)

  const { data: models } = useModelsService()

  return (
    <StyledTabRootWrapper>
      <StyledTabListWrapper>
        <TabList>
          <Tab onClick={() => setActiveTab(0)}>
            <StyledTabListSpan>{t('fine-tuning')}</StyledTabListSpan>
          </Tab>
          <Tab onClick={() => setActiveTab(1)}>
            <StyledTabListSpan>{`${t('model')}s`}</StyledTabListSpan>
          </Tab>
        </TabList>
      </StyledTabListWrapper>

      <TabsContext activeTabId={activeTab}>
        <TabPanels noAnimation>
          <TabPanel>{isFineTuning && <FineTunings />}</TabPanel>

          <TabPanel>
            {isModel && (
              <StyledSectionWrapper>
                <StyledHeaderGroup className='header_group'>
                  <div>
                    <StyledSectionTitle>{`${t('model')}s`}</StyledSectionTitle>
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
