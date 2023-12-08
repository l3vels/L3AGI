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
            size={Typography.sizes.md}
          />
          {values[formikField]?.map((item: any, index: number) => (
            <>
              <StyledCustomFieldWrapper key={index}>
                <FormikTextField label='Task' name={`${formikField}.${index}.task`} />

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
              </StyledCustomFieldWrapper>
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

  gap: 5px;
`
const StyledCustomFieldWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;
`
const StyledButtonWrapper = styled.div`
  width: fit-content;
`
const StyledButtonTertiary = styled(ButtonTertiary)`
  padding: 0 4px;
  margin-bottom: 6px;
`
