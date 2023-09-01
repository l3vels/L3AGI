import styled, { css } from 'styled-components'

import MultiStepIndicator from '@l3-lib/ui-core/dist/MultiStepIndicator'

import Typography from '@l3-lib/ui-core/dist/Typography'

import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'

import Textarea from '@l3-lib/ui-core/dist/Textarea'

import UploadedFile from 'components/UploadedFile'

import { StyledTextareaWrapper } from 'pages/Agents/AgentForm/AgentForm'
import { useDatasourceForm } from './useDatasourceForm'
import UploadButton from './components/UploadButton'
import { useEffect, useState } from 'react'

import DataLoaderCard from './components/DataLoaderCard'

type DatasourceFormProps = {
  formik: any
  isLoading?: boolean
  handleSubmit: (values: any) => void
  isEdit?: boolean
}

const DatasourceForm = ({ formik, isLoading }: DatasourceFormProps) => {
  const { dataLoaderOptions, pickedLoaderFields, handleUploadFile, fileLoading } =
    useDatasourceForm(formik)

  const { category, fields } = pickedLoaderFields

  const { values, setFieldValue } = formik
  const { datasource_source_type, config_value, datasource_description, datasource_name } = values

  const onDescriptionChange = (value: string) => {
    formik.setFieldValue('datasource_description', value)
  }

  useEffect(() => {
    if (datasource_source_type.length > 0 && !isLoading && fields) {
      setFieldValue('config_key', pickedLoaderFields?.fields[0]?.key)
      setFieldValue('config_key_type', pickedLoaderFields?.fields[0]?.type)
    }
  }, [datasource_source_type])

  const [stepStatus, setStepStatus] = useState<any>({
    source_type: 'active',
    description: 'pending',
  })

  const [startEdit, setStartEdit] = useState(true)

  return (
    <StyledFormContainer>
      <StyledInputWrapper>
        <StyledEditableHeadingWrapper>
          <StyledEditableHeading
            editing={startEdit}
            value={datasource_name}
            placeholder={`Enter your contract name`}
            onCancelEditing={close}
            type={EditableHeading.types.h1}
            onFinishEditing={(value: string) => {
              setFieldValue('datasource_name', value)

              setStartEdit(false)
            }}
          />
        </StyledEditableHeadingWrapper>
        <StyledStepperContainer>
          <StyledWizardWrapper>
            <StyledMultiStepIndicatorWrapper>
              <StyledMultiStepIndicator
                type={stepStatus.source_type === 'fulfilled' ? 'positive' : 'primary'}
                onClick={() =>
                  setStepStatus({
                    source_type: 'active',
                    description: 'pending',
                  })
                }
                steps={[
                  {
                    status: stepStatus.source_type,
                    subtitleText: '',
                    titleText: 'Source Type',
                    stepNumber: '1',
                  },
                ]}
              />
              <StyledLine />
            </StyledMultiStepIndicatorWrapper>
            <StyledTransitionDiv show={stepStatus.source_type === 'active'}>
              <StyledSourceTypeWrapper>
                <StyledCardWrapper>
                  {dataLoaderOptions?.map((option: any, index: number) => {
                    return (
                      <DataLoaderCard
                        isActive={option.value === datasource_source_type}
                        key={index}
                        title={option.label}
                        onClick={() => {
                          setFieldValue('datasource_source_type', option.value)
                          setFieldValue('config_value', '')
                        }}
                      />
                    )
                  })}
                </StyledCardWrapper>

                {category?.length > 0 && (
                  <>
                    <>
                      {category === 'File' && (
                        <StyledUploadFileWrapper>
                          <UploadButton
                            onChange={handleUploadFile}
                            isLoading={fileLoading}
                            hasValue={config_value}
                          />

                          {config_value && (
                            <UploadedFile
                              onClick={() => setFieldValue('config_value', null)}
                              name={'file'}
                            />
                          )}
                        </StyledUploadFileWrapper>
                      )}
                    </>
                    <>{category === 'Database' && <StyledText>Coming Soon</StyledText>}</>
                    <>
                      {category === 'Text' && (
                        <StyledTextareaWrapper>
                          <Textarea
                            hint=''
                            placeholder='Text'
                            name='config_value'
                            value={config_value}
                            onChange={(text: string) => {
                              formik.setFieldValue('config_value', text)
                            }}
                          />
                        </StyledTextareaWrapper>
                      )}
                    </>
                    <>{category === 'Social' && <StyledText>Coming Soon</StyledText>}</>
                    <>{category === 'Web Page' && <StyledText>Coming Soon</StyledText>}</>
                    <>{category === 'Application' && <StyledText>Coming Soon</StyledText>}</>
                  </>
                )}
              </StyledSourceTypeWrapper>
            </StyledTransitionDiv>
          </StyledWizardWrapper>
        </StyledStepperContainer>

        <StyledStepperContainer>
          <StyledWizardWrapper>
            <StyledMultiStepIndicatorWrapper>
              <StyledMultiStepIndicator
                type={stepStatus.description === 'fulfilled' ? 'positive' : 'primary'}
                onClick={() =>
                  setStepStatus({
                    source_type: 'pending',
                    description: 'active',
                  })
                }
                steps={[
                  {
                    status: stepStatus.description,
                    subtitleText: '',
                    titleText: 'Description',
                    stepNumber: '2',
                  },
                ]}
              />
              {stepStatus.description === 'active' && <StyledLine />}
            </StyledMultiStepIndicatorWrapper>
            <StyledTransitionDiv show={stepStatus.description === 'active'}>
              <StyledTextareaWrapper>
                <Typography
                  value='Description'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'#FFF'}
                />
                <Textarea
                  hint=''
                  placeholder='Description'
                  name='datasource_description'
                  value={datasource_description}
                  onChange={onDescriptionChange}
                />
              </StyledTextareaWrapper>
            </StyledTransitionDiv>
          </StyledWizardWrapper>
        </StyledStepperContainer>
      </StyledInputWrapper>
    </StyledFormContainer>
  )
}

export default DatasourceForm

const StyledCardWrapper = styled.div`
  display: flex;

  align-items: center;
  gap: 12px;
  width: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`
const StyledText = styled.span`
  color: #fff;
`
const StyledUploadFileWrapper = styled.div`
  display: flex;
  gap: 10px;
`
const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  overflow-y: auto;
  height: 100%;
  width: 100%;

  padding-top: 50px;
  padding: 20px;
`

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* gap: 35px; */

  width: 100%;
  max-width: 800px;
  /* max-width: 600px; */
  /* margin: auto; */
  height: calc(100% - 100px);
  /* max-height: 800px; */
  padding-top: 50px;
`
const StyledSourceTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const StyledEditableHeadingWrapper = styled.div`
  margin-bottom: 50px;
`

const StyledEditableHeading = styled(EditableHeading)`
  width: 60%;
  color: rgba(255, 255, 255, 0.6);
`
const StyledMultiStepIndicator = styled(MultiStepIndicator)`
  /* width: fit-content;
  height: fit-content; */
  margin-bottom: 0px;
  padding-left: 0px;
`

const StyledWizardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const StyledTransitionDiv = styled.div<{ show?: boolean }>`
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  margin-bottom: 0;
  width: 100%;
  transition: max-height 0.3s, opacity 0.3s, overflow 0s;
  ${p =>
    p.show &&
    css`
      max-height: 1000px;
      opacity: 1;
      margin-bottom: 50px;
    `};
`
const StyledStepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
`
const StyledLine = styled.div`
  height: 38px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  width: 0px;

  margin-left: 27px;
`
const StyledMultiStepIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
