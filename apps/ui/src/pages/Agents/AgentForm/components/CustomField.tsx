import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'

import Typography from '@l3-lib/ui-core/dist/Typography'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'

import FormikTextField from 'components/TextFieldFormik'
import { FieldArray } from 'formik'
import TypographyPrimary from 'components/Typography/Primary'

type CustomFieldProps = {
  formik: any
  formikField: string
  placeholder: string
}

const CustomField = ({ formik, formikField, placeholder }: CustomFieldProps) => {
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

                <StyledButton
                  onClick={() => remove(index)}
                  kind={Button.kinds.TERTIARY}
                  size={Button.sizes.SMALL}
                >
                  <Delete siz={50} />
                </StyledButton>
              </StyledCustomFieldWrapper>
            </>
          ))}

          <StyledButtonWrapper>
            <Button
              onClick={() => insert(formik?.values[formikField].length, '')}
              kind={Button.kinds.SECONDARY}
              size={Button.sizes.SMALL}
            >
              + Add
            </Button>
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

  gap: 10px;
`
const StyledCustomFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
const StyledButtonWrapper = styled.div`
  width: fit-content;
`
const StyledButton = styled(Button)`
  padding: 0 4px;
`
