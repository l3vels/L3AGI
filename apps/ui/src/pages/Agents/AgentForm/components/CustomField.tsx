import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'

import FormikTextField from 'components/TextFieldFormik'
import { FieldArray } from 'formik'

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
          <Typography
            value={`${placeholder}s`}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          {formik?.values[formikField].map((item: any, index: number) => (
            <StyledCustomFieldWrapper key={index}>
              <FormikTextField name={`${formikField}.${index}`} />

              {index !== 0 && (
                <IconButton
                  onClick={() => remove(index)}
                  icon={() => <Delete />}
                  size={Button.sizes.SMALL}
                  kind={IconButton.kinds.TERTIARY}
                />
              )}
            </StyledCustomFieldWrapper>
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
