import { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
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

import RadioButton from '@l3-lib/ui-core/dist/RadioButton'

import UploadAvatar from 'components/UploadAvatar'
import { StyledFormRoot, StyledFormInputWrapper } from 'styles/formStyles.css'
import { StyledTab } from 'styles/tabStyles.css'
import TextareaFormik from 'components/TextareaFormik'

type AgentFormProps = {
  formik: any
  isVoice?: boolean
}

const AgentForm = ({ formik, isVoice = true }: AgentFormProps) => {
  const { t } = useTranslation()

  const { setFieldValue, values, errors: validationError } = formik
  const {
    agent_name,
    agent_datasources,
    agent_model,
    agent_description,
    agent_is_memory,
    agent_tools,
    agent_greeting,
    agent_text,
    agent_temperature,
    agent_is_template,
    agent_avatar,
    agent_source_flow,
    agent_voice_synthesizer,
    agent_voice_transcriber,
    agent_voice_input_mode,
    agent_voice_response,
    agent_integrations,
  } = values

  const {
    modelOptions,
    datasourceOptions,
    toolOptions,
    voiceSynthesizerOptions,
    voiceTranscriberOptions,
    handleUploadAvatar,
    avatarIsLoading,
    integrationOptions,
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

  return (
    <StyledFormRoot>
      <StyledFormTabsWrapper>
        <StyledFormTabList size='small'>
          <StyledTab
            onClick={() => handleTabClick(0)}
            isError={validationError?.agent_name && activeTab !== 0}
          >
            <StyledSpan
              isActive={activeTab === 0}
              isError={validationError?.agent_name && activeTab !== 0}
            >
              General
            </StyledSpan>
          </StyledTab>
          <StyledTab onClick={() => handleTabClick(1)}>
            <StyledSpan isActive={activeTab === 1}>Configuration</StyledSpan>
          </StyledTab>
          <StyledTab onClick={() => handleTabClick(2)}>
            <StyledSpan isActive={activeTab === 2}>Training Details</StyledSpan>
          </StyledTab>
          <StyledTab onClick={() => handleTabClick(3)}>
            <StyledSpan isActive={activeTab === 3}>Onboarding</StyledSpan>
          </StyledTab>
          <StyledTab onClick={() => handleTabClick(4)} isDisabled={!isVoice}>
            <StyledSpan isActive={activeTab === 4}>Voice Preferences</StyledSpan>
          </StyledTab>
          {/* <StyledTab onClick={() => handleTabClick(5)}>
            <StyledSpan isActive={activeTab === 5}>Integrations</StyledSpan>
          </StyledTab> */}
        </StyledFormTabList>
      </StyledFormTabsWrapper>
      <StyledForm>
        <div ref={topRef} />
        <StyledInputWrapper>
          <TabsContext activeTabId={activeTab}>
            <TabPanels noAnimation>
              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  <FormikTextField name='agent_name' placeholder={t('name')} label={t('name')} />

                  <FormikTextField name='agent_role' placeholder={t('role')} label={t('role')} />

                  <TextareaFormik
                    setFieldValue={setFieldValue}
                    label={t('description')}
                    value={agent_description}
                    fieldName={'agent_description'}
                    triggerResize={activeTab}
                  />

                  <StyledCheckboxWrapper>
                    <Checkbox
                      label={t('template-label')}
                      kind='secondary'
                      name='agent_is_template'
                      checked={agent_is_template}
                      onChange={() => setFieldValue('agent_is_template', !agent_is_template)}
                    />
                  </StyledCheckboxWrapper>

                  <StyledAvatarWrapper>
                    <TypographyPrimary
                      value={t('avatar')}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                    />
                    <UploadAvatar
                      onChange={handleUploadAvatar}
                      isLoading={avatarIsLoading}
                      avatarSrc={agent_avatar}
                      name={agent_name}
                    />
                  </StyledAvatarWrapper>
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

                  <StyledCombinedFields>
                    <AgentDropdown
                      isMulti
                      label={t('datasources')}
                      fieldName={'agent_datasources'}
                      fieldValue={agent_datasources}
                      setFieldValue={setFieldValue}
                      options={datasourceOptions}
                    />

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
                  </StyledCombinedFields>

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

                  <TextareaFormik
                    setFieldValue={setFieldValue}
                    label={t('base-system-message')}
                    value={agent_text}
                    fieldName={'agent_text'}
                    triggerResize={activeTab}
                  />
                </StyledTabPanelInnerWrapper>
              </TabPanel>

              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  <CustomField
                    formik={formik}
                    formikField={'agent_suggestions'}
                    placeholder={t('suggestions')}
                  />

                  <TextareaFormik
                    setFieldValue={setFieldValue}
                    label={t('greeting')}
                    value={agent_greeting}
                    fieldName={'agent_greeting'}
                    triggerResize={activeTab}
                  />
                </StyledTabPanelInnerWrapper>
              </TabPanel>

              <TabPanel>
                <StyledTabPanelInnerWrapper>
                  <AgentDropdown
                    label={t('synthesizer')}
                    fieldName={'agent_voice_synthesizer'}
                    setFieldValue={setFieldValue}
                    fieldValue={agent_voice_synthesizer}
                    options={voiceSynthesizerOptions}
                    onChange={() => {
                      setFieldValue('agent_voice_synthesizer', '')
                    }}
                    optionSize={'small'}
                  />

                  <FormikTextField
                    name='agent_default_voice'
                    // placeholder={t('default-voice')}
                    label={t('default-voice')}
                  />
                  <FormikTextField
                    name='agent_voice_id'
                    // placeholder={t('voice-id')}
                    label={t('voice-id')}
                  />

                  <AgentDropdown
                    label={t('transcriber')}
                    fieldName={'agent_voice_transcriber'}
                    setFieldValue={setFieldValue}
                    fieldValue={agent_voice_transcriber}
                    options={voiceTranscriberOptions}
                    onChange={() => {
                      setFieldValue('agent_voice_transcriber', '')
                    }}
                    optionSize={'small'}
                  />

                  <StyledFormInputWrapper>
                    <TypographyPrimary
                      value={t('response-mode')}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                    />

                    <RadioButton
                      text={t('text')}
                      name='agent_voice_response'
                      onSelect={() => setFieldValue('agent_voice_response', ['Text'])}
                      checked={
                        agent_voice_response?.length === 1 && agent_voice_response?.includes('Text')
                      }
                    />
                    <RadioButton
                      text={t('voice')}
                      name='agent_voice_response'
                      onSelect={() => setFieldValue('agent_voice_response', ['Voice'])}
                      checked={
                        agent_voice_response?.length === 1 &&
                        agent_voice_response?.includes('Voice')
                      }
                    />
                    <RadioButton
                      text={`${t('text')} & ${t('voice')}`}
                      name='agent_voice_response'
                      onSelect={() => setFieldValue('agent_voice_response', ['Text', 'Voice'])}
                      checked={agent_voice_response?.length === 2}
                    />
                  </StyledFormInputWrapper>

                  <StyledFormInputWrapper>
                    <TypographyPrimary
                      value={t('input-mode')}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                    />
                    <StyledCheckboxWrapper>
                      <Checkbox
                        label={t('text')}
                        kind='secondary'
                        // name='agent_is_template'
                        checked={agent_voice_input_mode?.includes('Text')}
                        onChange={() => {
                          if (agent_voice_input_mode?.includes('Text')) {
                            const filteredInput = agent_voice_input_mode?.filter(
                              (input: string) => input !== 'Text',
                            )
                            setFieldValue('agent_voice_input_mode', filteredInput)
                          } else {
                            setFieldValue('agent_voice_input_mode', [
                              ...agent_voice_input_mode,
                              'Text',
                            ])
                          }
                        }}
                      />
                    </StyledCheckboxWrapper>
                    <StyledCheckboxWrapper>
                      <Checkbox
                        label={t('voice')}
                        kind='secondary'
                        // name='agent_is_template'
                        checked={agent_voice_input_mode?.includes('Voice')}
                        onChange={() => {
                          if (agent_voice_input_mode?.includes('Voice')) {
                            const filteredInput = agent_voice_input_mode?.filter(
                              (input: string) => input !== 'Voice',
                            )
                            setFieldValue('agent_voice_input_mode', filteredInput)
                          } else {
                            setFieldValue('agent_voice_input_mode', [
                              ...agent_voice_input_mode,
                              'Voice',
                            ])
                          }
                        }}
                      />
                    </StyledCheckboxWrapper>
                  </StyledFormInputWrapper>
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
  color: ${({ theme }) => theme.body.textColorSecondary};

  ${p =>
    p.isActive &&
    css`
      color: ${({ theme }) => theme.body.textColorPrimary};
    `};

  ${p =>
    p.isError &&
    css`
      color: #ef5533;
    `};
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
