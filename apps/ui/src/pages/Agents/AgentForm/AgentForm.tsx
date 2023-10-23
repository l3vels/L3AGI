import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import FormikTextField from 'components/TextFieldFormik'

import CustomField from './components/CustomField'
import AgentSlider from './components/AgentSlider'
import { useAgentForm } from './useAgentForm'
import AgentDropdown from './components/AgentDropdown'
import TypographyPrimary from 'components/Typography/Primary'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

type AgentFormProps = {
  formik: any
}

const AgentForm = ({ formik }: AgentFormProps) => {
  const { t } = useTranslation()

  const { setFieldValue, values } = formik
  const {
    agent_datasources,
    agent_model,
    agent_description,
    agent_is_memory,
    agent_tools,
    agent_greeting,
    agent_text,
    agent_temperature,
    agent_is_template,
  } = values

  const onTextareaChange = (field: string, value: string) => {
    formik.setFieldValue(field, value)
  }

  const { modelOptions, datasourceOptions, toolOptions } = useAgentForm(formik)

  useEffect(() => {
    if (agent_model === '' && modelOptions?.length > 0) {
      setFieldValue('agent_model', modelOptions[2].value)
    }
  }, [agent_model])

  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledRoot>
      <StyledTabsWrapper>
        <StyledTabList size='small'>
          <Tab onClick={() => setActiveTab(0)}>
            <StyledSpan>General</StyledSpan>
          </Tab>
          <Tab onClick={() => setActiveTab(1)}>
            <StyledSpan>Configuration</StyledSpan>
          </Tab>
          <Tab onClick={() => setActiveTab(2)}>
            <StyledSpan>Training Details</StyledSpan>
          </Tab>
          <Tab onClick={() => setActiveTab(3)}>
            <StyledSpan>Onboarding</StyledSpan>
          </Tab>
          {/* <Tab onClick={() => setActiveTab(4)}>
            <StyledSpan>Voice Preferences</StyledSpan>
          </Tab> */}
        </StyledTabList>
      </StyledTabsWrapper>
      <StyledForm>
        <StyledInputWrapper>
          <TabsContext activeTabId={activeTab}>
            <TabPanels noAnimation>
              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  <FormikTextField name='agent_name' placeholder={t('name')} label={t('name')} />

                  <FormikTextField name='agent_role' placeholder={t('role')} label={t('role')} />

                  <StyledTextareaWrapper>
                    <TypographyPrimary
                      value={t('description')}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                    />
                    <Textarea
                      hint=''
                      rows={6}
                      placeholder={t('description')}
                      value={agent_description}
                      name='agent_description'
                      onChange={(value: string) => onTextareaChange('agent_description', value)}
                    />
                  </StyledTextareaWrapper>

                  <StyledCheckboxWrapper>
                    <Checkbox
                      label={t('template-label')}
                      kind='secondary'
                      name='agent_is_template'
                      checked={agent_is_template}
                      onChange={() => setFieldValue('agent_is_template', !agent_is_template)}
                    />
                  </StyledCheckboxWrapper>
                </StyledTabPanelInnerWrapper>
              </TabPanel>

              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  <AgentDropdown
                    isMulti
                    label={t('tools')}
                    fieldName={'agent_tools'}
                    fieldValue={agent_tools}
                    setFieldValue={setFieldValue}
                    options={toolOptions}
                  />

                  <AgentDropdown
                    isMulti
                    label={t('data-source')}
                    fieldName={'agent_datasources'}
                    fieldValue={agent_datasources}
                    setFieldValue={setFieldValue}
                    options={datasourceOptions}
                  />

                  <StyledCombinedFields>
                    <AgentDropdown
                      label={t('model')}
                      fieldName={'agent_model'}
                      setFieldValue={setFieldValue}
                      fieldValue={agent_model}
                      options={modelOptions}
                      onChange={() => {
                        setFieldValue('agent_model', '')
                      }}
                      optionSize={'small'}
                    />

                    <AgentSlider
                      onChange={(value: number) => setFieldValue('agent_temperature', value / 10)}
                      value={agent_temperature}
                    />
                  </StyledCombinedFields>

                  <StyledCheckboxWrapper>
                    <Checkbox
                      label={t('memory')}
                      kind='secondary'
                      name='agent_is_memory'
                      checked={agent_is_memory}
                      onChange={() => setFieldValue('agent_is_memory', !agent_is_memory)}
                    />
                  </StyledCheckboxWrapper>
                </StyledTabPanelInnerWrapper>
              </TabPanel>

              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  <CustomField
                    formik={formik}
                    formikField={'agent_instructions'}
                    placeholder={t('instructions')}
                  />

                  <CustomField
                    formik={formik}
                    formikField={'agent_goals'}
                    placeholder={t('goals')}
                  />

                  <CustomField
                    formik={formik}
                    formikField={'agent_constraints'}
                    placeholder={t('constraints')}
                  />

                  <StyledTextareaWrapper>
                    <TypographyPrimary
                      value={t('base-system-message')}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                    />
                    <Textarea
                      hint=''
                      rows={6}
                      value={agent_text}
                      name='agent_text'
                      onChange={(value: string) => onTextareaChange('agent_text', value)}
                    />
                  </StyledTextareaWrapper>
                </StyledTabPanelInnerWrapper>
              </TabPanel>

              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  <CustomField
                    formik={formik}
                    formikField={'agent_suggestions'}
                    placeholder={t('suggestions')}
                  />

                  <StyledTextareaWrapper>
                    <TypographyPrimary
                      value={t('greeting')}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                    />
                    <Textarea
                      hint=''
                      rows={6}
                      placeholder={t('greeting')}
                      value={agent_greeting}
                      name='agent_greeting'
                      onChange={(value: string) => onTextareaChange('agent_greeting', value)}
                    />
                  </StyledTextareaWrapper>
                </StyledTabPanelInnerWrapper>
              </TabPanel>

              <TabPanel>5</TabPanel>
            </TabPanels>
          </TabsContext>
        </StyledInputWrapper>
      </StyledForm>
    </StyledRoot>
  )
}

export default AgentForm

const StyledRoot = styled.div`
  width: 100%;

  height: 100%;
  overflow-y: scroll;

  display: flex;
`

const StyledForm = styled.div`
  width: 100%;
  /* max-width: 600px; */
  height: 100%;
  max-height: 100%;
  /* overflow: scroll; */

  /* margin-top: 40px; */
  display: flex;
  justify-content: center;
`

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 20px;

  gap: 20px;
  width: 100%;
  max-width: 800px;
  /* margin: auto; */
  height: 100%;
  /* max-height: 800px; */
`

export const StyledTextareaWrapper = styled.div`
  font: var(--font-general-label);
  line-height: 22px;
  font-size: 10px;

  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 10px;

  .components-Textarea-Textarea-module__textarea--Qy3d2 {
    font-size: 14px;
    border: 3px solid ${({ theme }) => theme.body.textareaBorder};
    color: ${({ theme }) => theme.body.textColorPrimary};
    background: ${({ theme }) => theme.body.textAreaBgColor};
    &::placeholder {
      color: ${({ theme }) => theme.body.placeHolderColor};
    }
  }
`
const StyledCheckboxWrapper = styled.div`
  height: fit-content;
  padding-bottom: 5px;
  .l3-style-checkbox--kind-secondary .l3-style-checkbox__checkbox {
    border-color: ${({ theme }) => theme.typography.contentPrimary};
  }
  .l3-style-checkbox--kind-secondary .l3-style-checkbox__label {
    color: ${({ theme }) => theme.typography.contentPrimary};
  }
`
export const StyledCombinedFields = styled.div`
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;

  gap: 20px;
  .dropdown-wrapper.primary__wrapper.css-7xl64p-container {
    border: 3px solid ${({ theme }) => theme.body.textareaBorder};
    height: auto;
  }
  .css-ugu73m-placeholder {
    color: ${({ theme }) => theme.body.textColorPrimary};
  }
`
const StyledTabsWrapper = styled.div`
  position: sticky;
  top: 0;
`

const StyledTabList = styled(TabList)`
  .tabs-list {
    display: flex;
    flex-direction: column;
    /* border: ${({ theme }) => theme.body.secondaryBorder}; */
  }
`

const StyledSpan = styled.span`
  width: 150px;
  color: ${({ theme }) => theme.body.textColorPrimary};
`
const StyledTabPanelInnerWrapper = styled(TabPanel)`
  display: flex;
  flex-direction: column;

  /* padding: 0 20px; */

  gap: 20px;
  width: 100%;
  /* max-width: 800px; */
  /* margin: auto; */
  height: 100%;
  /* max-height: 800px; */
`
