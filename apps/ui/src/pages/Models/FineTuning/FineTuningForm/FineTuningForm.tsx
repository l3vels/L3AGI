import {
  StyledForm,
  StyledInputWrapper,
  StyledRoot,
} from 'pages/Schedule/ScheduleFrom/ScheduleForm'

import FormikTextField from 'components/TextFieldFormik'
import ImportFile from 'components/ImportFile'
import TypographyPrimary from 'components/Typography/Primary'

import Typography from '@l3-lib/ui-core/dist/Typography'
import { useFineTuningForm } from './useFineTuningForm'
import { t } from 'i18next'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import { useState } from 'react'
import {
  StyledFormTabList,
  StyledFormTabsWrapper,
  StyledTab,
  StyledSpan,
  StyledTabPanelInnerWrapper,
} from 'pages/Agents/AgentForm/AgentForm'
import { StyledFormRoot } from 'styles/formStyles.css'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

const FineTuningForm = ({ formik }: { formik: any }) => {
  const { setFieldValue, values } = formik
  const { fine_tuning_model, fine_tuning_file_url } = values

  const { modelOptions } = useFineTuningForm()

  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledFormRoot>
      <StyledFormTabsWrapper>
        <StyledFormTabList size='small'>
          <StyledTab onClick={() => setActiveTab(0)}>
            <StyledSpan isActive={activeTab === 0}>General</StyledSpan>
          </StyledTab>
          <StyledTab onClick={() => setActiveTab(1)}>
            <StyledSpan isActive={activeTab === 1}>Data</StyledSpan>
          </StyledTab>
        </StyledFormTabList>
      </StyledFormTabsWrapper>

      <StyledForm>
        <StyledInputWrapper>
          <TabsContext activeTabId={activeTab}>
            <TabPanels noAnimation>
              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  <FormikTextField name='fine_tuning_name' placeholder='Name' label='Name' />

                  <AgentDropdown
                    label={t('model')}
                    fieldName={'fine_tuning_model'}
                    setFieldValue={setFieldValue}
                    fieldValue={fine_tuning_model}
                    options={modelOptions}
                    onChange={() => {
                      setFieldValue('fine_tuning_model', '')
                    }}
                    optionSize={'small'}
                  />
                </StyledTabPanelInnerWrapper>
              </TabPanel>
              <TabPanel>
                <ImportFile setFieldValue={formik?.setFieldValue} value={fine_tuning_file_url} />
              </TabPanel>
            </TabPanels>
          </TabsContext>
        </StyledInputWrapper>
      </StyledForm>
    </StyledFormRoot>
  )
}

export default FineTuningForm
