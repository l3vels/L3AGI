import { memo } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Button from 'share-ui/components/Button/Button'

import Typography from 'share-ui/components/typography/Typography'

import FormikTextField from 'components/TextFieldFormik'
import { FieldArray, useFormikContext } from 'formik'
import TypographyPrimary from 'components/Typography/Primary'
import { ButtonSecondary, ButtonTertiary } from 'components/Button/Button'
import { StyledDeleteIcon } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import AgentDropdown from './AgentDropdown'
import { useAgentsService } from 'services/agent/useAgentsService'
import TextareaFormik from 'components/TextareaFormik'

type AgentRunnersProps = {
  formikField: string
  placeholder: string
}

const AgentRunners = ({ formikField, placeholder }: AgentRunnersProps) => {
  const { t } = useTranslation()
  const { values, setFieldValue } = useFormikContext<any>()

  const { data: agents } = useAgentsService()

  const agentOptions = agents?.map(({ agent }) => ({
    label: agent.name,
    value: agent.id,
  }))

  return (
    <FieldArray name={formikField}>
      {({ insert, remove }) => (
        <StyledFieldsWrapper>
          <TypographyPrimary
            value={`${placeholder}s`}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
          />
          {values[formikField]?.map((item: any, index: number) => (
            <>
              <StyledRunnerFieldsWrapper key={index}>
                <TextareaFormik
                  setFieldValue={setFieldValue}
                  label={t('task')}
                  value={item.task}
                  fieldName={`${formikField}.${index}.task`}
                  minHeight={90}
                />

                <AgentDropdown
                  label={t('Runner')}
                  fieldName={`${formikField}.${index}.runner`}
                  fieldValue={values[formikField][index].runner}
                  setFieldValue={setFieldValue}
                  options={agentOptions}
                />
                <StyledButtonTertiary onClick={() => remove(index)} size={Button.sizes?.SMALL}>
                  <StyledDeleteIcon size={32} />
                </StyledButtonTertiary>
              </StyledRunnerFieldsWrapper>
            </>
          ))}

          <StyledButtonWrapper>
            <ButtonSecondary
              onClick={() => insert(values[formikField].length, '')}
              size={Button.sizes?.SMALL}
            >
              + {t('add')}
            </ButtonSecondary>
          </StyledButtonWrapper>
        </StyledFieldsWrapper>
      )}
    </FieldArray>
  )
}

export default memo(AgentRunners)

const StyledFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`

const StyledButtonWrapper = styled.div`
  width: fit-content;
`
const StyledButtonTertiary = styled(ButtonTertiary)`
  padding: 0 4px;
  margin-bottom: 6px;

  margin-top: 38px;
  margin-left: -14px;
  width: 40px;
`
export const StyledRunnerFieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 0.1fr;
  gap: 15px;

  width: 100%;
`
