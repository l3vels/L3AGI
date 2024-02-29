import { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'
import Typography from 'share-ui/components/typography/Typography'
import Checkbox from 'share-ui/components/Checkbox/Checkbox'

import FormikTextField from 'components/TextFieldFormik'

import CustomField from './components/CustomField'
import AgentSlider from './components/AgentSlider'
import { useAgentForm } from './useAgentForm'
import AgentDropdown from './components/AgentDropdown'
import TypographyPrimary from 'components/Typography/Primary'

import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'

import UploadAvatar from 'components/UploadAvatar'
import { StyledFormRoot, StyledFormInputWrapper } from 'styles/formStyles.css'

import TextareaFormik from 'components/TextareaFormik'
import { useLocation } from 'react-router-dom'

import AgentRunners, { StyledRunnerFieldsWrapper } from './components/AgentRunners'
import { isVoiceAgent } from 'utils/agentUtils'

import VoicePreferences from './FormSections/VoicePreferences'
import RadioButton from 'share-ui/components/RadioButton/RadioButton'

type AgentFormProps = {
  formik: any
  isVoice?: boolean
}

const AgentForm = ({ formik, isVoice = true }: AgentFormProps) => {
  const { t } = useTranslation()

  const { setFieldValue, values, errors: validationError } = formik
  const {
    agent_name,
    agent_model,
    agent_description,
    agent_is_memory,
    agent_greeting,
    agent_text,
    agent_temperature,
    agent_is_template,
    agent_avatar,
    agent_source_flow,
    agent_integrations,
    agent_type,
    agent_sentiment_analyzer,
    agent_voice_response,
    agent_voice_input_mode,
  } = values

  const {
    modelOptions,
    voiceSynthesizerOptions,
    voiceTranscriberOptions,
    handleUploadAvatar,
    avatarIsLoading,
    integrationOptions,
    agentOptions,
  } = useAgentForm(formik)

  useEffect(() => {
    if (agent_model === '' && modelOptions?.length > 0) {
      setFieldValue('agent_model', modelOptions[2].value)
    }
  }, [])

  const data_process_flow = [
    { label: 'Source Detection', value: 'source_detection' },
    { label: 'Pre-Execution Data Retrieval', value: 'pre_execution' },
  ]

  const agentIntegrationIds = agent_integrations?.map((integration: any) => integration.value)

  const onChangeIntegration = (id: string, item: any, index: number) => {
    if (agent_integrations?.length > 0 && agentIntegrationIds?.includes(id)) {
      const updatedIntegrations = agent_integrations.filter(
        (integration: any) => integration.value !== id,
      )
      setFieldValue('agent_integrations', updatedIntegrations)
    } else {
      const updatedIntegrations = [...agent_integrations]
      updatedIntegrations.splice(index, 0, item)
      setFieldValue('agent_integrations', updatedIntegrations)
    }
  }

  const [activeTab, setActiveTab] = useState(0)

  const topRef = useRef(null as any)

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({})
    }
  }

  const handleTabClick = (id: number) => {
    setActiveTab(id)
    scrollToTop()
  }

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const agentType = urlParams.get('type') || agent_type || 'text'

  useEffect(() => {
    setFieldValue('agent_type', agentType)
  }, [agentType])

  return (
    <StyledFormRoot>
      <StyledFormTabsWrapper>
        <TabList noBorder size='small' customWidth={200} activeTabId={activeTab}>
          <Tab
            onClick={() => handleTabClick(0)}
            isError={validationError?.agent_name && activeTab !== 0}
          >
            General
          </Tab>
          <Tab onClick={() => handleTabClick(1)}>Configuration</Tab>

          <Tab onClick={() => handleTabClick(2)} disabled={!isVoice}>
            Voice Preferences
          </Tab>
          <Tab onClick={() => handleTabClick(3)} disabled={!isVoice}>
            Flow
          </Tab>
        </TabList>
      </StyledFormTabsWrapper>
      <StyledForm>
        <div ref={topRef} />
        <StyledInputWrapper>
          <TabsContext activeTabId={activeTab}>
            <TabPanels noAnimation>
              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  <StyledCombinedFields>
                    <StyledAvatarWrapper>
                      <UploadAvatar
                        onChange={handleUploadAvatar}
                        isLoading={avatarIsLoading}
                        avatarSrc={agent_avatar}
                        name={agent_name}
                      />
                    </StyledAvatarWrapper>

                    <StyledCheckboxWrapper>
                      <Checkbox
                        label={t('template-label')}
                        kind='secondary'
                        name='agent_is_template'
                        checked={agent_is_template}
                        onChange={() => setFieldValue('agent_is_template', !agent_is_template)}
                      />
                    </StyledCheckboxWrapper>
                  </StyledCombinedFields>

                  <StyledCombinedFields>
                    <FormikTextField name='agent_name' placeholder={t('name')} label={t('name')} />
                    <FormikTextField name='agent_role' placeholder={t('role')} label={t('role')} />
                  </StyledCombinedFields>

                  <TextareaFormik
                    setFieldValue={setFieldValue}
                    label={t('description')}
                    value={agent_description}
                    fieldName={'agent_description'}
                    triggerResize={activeTab}
                  />

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
                  <TextareaFormik
                    setFieldValue={setFieldValue}
                    label={t('base-system-message')}
                    value={agent_text}
                    fieldName={'agent_text'}
                    triggerResize={activeTab}
                  />

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

                  {agentType === 'text' && (
                    <AgentDropdown
                      label={'Data Process Flow'}
                      fieldName={'agent_source_flow'}
                      setFieldValue={setFieldValue}
                      fieldValue={agent_source_flow}
                      options={data_process_flow}
                      onChange={() => {
                        setFieldValue('agent_source_flow', '')
                      }}
                      optionSize={'small'}
                    />
                  )}

                  <StyledCombinedFields>
                    <AgentSlider
                      onChange={(value: number) => setFieldValue('agent_temperature', value / 10)}
                      value={agent_temperature}
                    />
                  </StyledCombinedFields>

                  <TextareaFormik
                    setFieldValue={setFieldValue}
                    label={t('greeting')}
                    value={agent_greeting}
                    fieldName={'agent_greeting'}
                    triggerResize={activeTab}
                  />
                  {!isVoiceAgent(agentType) && (
                    <CustomField
                      formik={formik}
                      formikField={'agent_suggestions'}
                      placeholder={t('suggestions')}
                    />
                  )}
                </StyledTabPanelInnerWrapper>
              </TabPanel>

              <TabPanel>
                <>
                  <VoicePreferences
                    formik={formik}
                    voiceSynthesizerOptions={voiceSynthesizerOptions}
                    voiceTranscriberOptions={voiceTranscriberOptions}
                  />
                </>
              </TabPanel>

              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  <AgentRunners
                    formikField='agent_runners'
                    placeholder='Execute Runners After Call End'
                  />

                  <TypographyPrimary
                    value={`Sentiment Analysis`}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                  />

                  <StyledRunnerFieldsWrapper>
                    <TextareaFormik
                      setFieldValue={setFieldValue}
                      label={t('task')}
                      value={agent_sentiment_analyzer?.task}
                      fieldName={'agent_sentiment_analyzer.task'}
                      minHeight={90}
                    />

                    <AgentDropdown
                      label={t('Runner')}
                      fieldName={`agent_sentiment_analyzer.runner`}
                      fieldValue={agent_sentiment_analyzer?.runner}
                      setFieldValue={setFieldValue}
                      options={agentOptions}
                    />
                  </StyledRunnerFieldsWrapper>

                  {/* <AgentDropdown
                    label={'Call Sentiment Analyzer'}
                    fieldName={'agent_sentiment_analyzer'}
                    setFieldValue={setFieldValue}
                    fieldValue={agent_sentiment_analyzer}
                    options={agentOptions}
                    onChange={() => {
                      setFieldValue('agent_source_flow', '')
                    }}
                    optionSize={'small'}
                  /> */}
                </StyledTabPanelInnerWrapper>
              </TabPanel>

              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  {integrationOptions?.map((integration: any, index: number) => {
                    return (
                      <StyledFormInputWrapper key={integration.value}>
                        <StyledCheckboxWrapper>
                          <Checkbox
                            label={t(integration.label)}
                            kind='secondary'
                            name={integration.label}
                            checked={agentIntegrationIds?.includes(integration.value)}
                            onChange={() => {
                              onChangeIntegration(integration.value, integration, index)
                            }}
                          />
                        </StyledCheckboxWrapper>

                        {agentIntegrationIds?.includes(integration.value) &&
                          integration.fields.map((field: any, fieldIndex: number) => (
                            <div key={field.key}>
                              <FormikTextField
                                name={`agent_integrations[${index}].fields[${fieldIndex}].value`}
                                placeholder={t(`${field.label}`)}
                                label={t(`${field.label}`)}
                              />
                            </div>
                          ))}
                      </StyledFormInputWrapper>
                    )
                  })}
                </StyledTabPanelInnerWrapper>
              </TabPanel>
            </TabPanels>
          </TabsContext>
        </StyledInputWrapper>
      </StyledForm>
    </StyledFormRoot>
  )
}

export default AgentForm

const StyledForm = styled.div`
  width: 100%;
  /* max-width: 600px; */
  height: 100%;
  max-height: 100%;
  overflow-y: auto;

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
  /* max-width: 1000px; */
  /* margin: auto; */
  height: 100%;
  /* max-height: 800px; */
`
const StyledAvatarWrapper = styled.div`
  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 10px;
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
`
export const StyledFormTabsWrapper = styled.div`
  position: sticky;
  top: 0;

  margin-bottom: 20px;
`

export const StyledFormTabList = styled(TabList)`
  .tabs-list {
    display: flex;
    flex-direction: column;
    padding: 20px 5px;
    border-radius: 10px;
  }
`

export const StyledSpan = styled.span<{ isActive: boolean; isError?: boolean }>`
  width: 150px;
  /* 
  ${p =>
    p.isError &&
    css`
      color: #ef5533;
    `}; */
`
export const StyledTabPanelInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2px 0px;

  gap: 20px;
  width: 100%;
  /* max-width: 800px; */
  /* margin: auto; */
  height: 100%;
  /* max-height: 800px; */
`
