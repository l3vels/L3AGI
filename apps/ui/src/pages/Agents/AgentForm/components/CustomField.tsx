import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Button from 'share-ui/components/Button/Button'

import Typography from 'share-ui/components/typography/Typography'

import Delete from 'share-ui/components/Icon/Icons/components/Delete'

import FormikTextField from 'components/TextFieldFormik'
import { FieldArray } from 'formik'
import TypographyPrimary from 'components/Typography/Primary'
import { ButtonSecondary, ButtonTertiary } from 'components/Button/Button'
import { StyledDeleteIcon } from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

type CustomFieldProps = {
  formik: any
  formikField: string
  placeholder: string
}

const CustomField = ({ formik, formikField, placeholder }: CustomFieldProps) => {
  const { t } = useTranslation()
  return (
    <FieldArray name={formikField}>
      {({ insert, remove }) => (
        <StyledFieldsWrapper>
          <TypographyPrimary
            value={`${placeholder}s`}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
          />
          {formik?.values[formikField]?.map((item: any, index: number) => (
            <>
              <StyledCustomFieldWrapper key={index}>
                <FormikTextField name={`${formikField}.${index}`} />

                <StyledButtonTertiary onClick={() => remove(index)} size={Button.sizes?.SMALL}>
                  <StyledDeleteIcon size={32} />
                </StyledButtonTertiary>
              </StyledCustomFieldWrapper>
            </>
          ))}

          <StyledButtonWrapper>
            <ButtonSecondary
              onClick={() => insert(formik?.values[formikField].length, '')}
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

export default CustomField

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
