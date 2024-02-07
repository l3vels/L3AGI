import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'
import Dropdown from 'share-ui/components/Dropdown/Dropdown'

import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import { Field } from 'formik'

type AgentDropdownProps = {
  label?: string
  fieldName: string
  fieldValue: string | string[]
  options: any
  setFieldValue: any
  onChange?: (option: any) => void
  optionSize?: 'large' | 'medium' | 'small'
  isMulti?: boolean
  size?: 'large' | 'medium' | 'small'
}

const AgentDropdown = ({
  fieldValue,
  fieldName,
  options,
  setFieldValue,
  onChange = () => {},
  label,
  isMulti,
  optionSize = 'medium',
  size = 'medium',
}: AgentDropdownProps) => {
  const { t } = useTranslation()
  let value = fieldValue

  let onChangeFunction = (option: any) => {
    onChange(option)
    setFieldValue(fieldName, option.value)
  }

  if (isMulti) {
    value = options?.filter((option: any) => fieldValue?.includes(option.value))

    onChangeFunction = (option: any) => {
      onChange(option)
      if (option === null) {
        setFieldValue(fieldName, [])
      } else {
        const values = option?.map((option: any) => {
          return option.value
        })
        setFieldValue(fieldName, [...values])
      }
    }
  } else {
    value = options?.find((option: any) => option.value === fieldValue)?.label
  }

  const onOptionRemove = (removedValue: any) => {
    if (Array.isArray(fieldValue)) {
      const newValues = fieldValue?.filter((oldValues: any) => oldValues !== removedValue.value)
      setFieldValue(fieldName, [...newValues])
    }
  }

  const OptionRenderer = ({ label }: { label: string }) => {
    return <TypographyPrimary value={label} type={Typography.types.LABEL} size={optionSize} />
  }

  return (
    <Field name={fieldName}>
      {(formik: any) => {
        const { meta } = formik

        return (
          <StyledWrapper isValidationError={meta?.error}>
            {label && (
              <TypographyPrimary
                value={label}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            )}
            <Dropdown
              multi={isMulti}
              // menuPlacement={'top'}
              insideOverflow
              multiline
              size={size}
              value={value}
              placeholder={value?.length >= 1 ? value : `${t('please-enter-value')}`}
              options={options}
              onChange={onChangeFunction}
              onOptionRemove={onOptionRemove}
              OptionRenderer={OptionRenderer}
              // menuIsOpen={true}
            />

            {meta?.error && <StyledError>{meta?.error}</StyledError>}
          </StyledWrapper>
        )
      }}
    </Field>
  )
}

export default AgentDropdown

//todo update dropdown styles in storybook
const StyledWrapper = styled.div<{ isValidationError: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  ${p =>
    p.isValidationError &&
    css`
      .dropdown-wrapper.primary__wrapper.css-7xl64p-container {
        border: 4px solid #ef5533;
      }
    `};
`

//todo we need dropdown validation styles in storybook
const StyledError = styled.div`
  color: #e44258;
  font-size: 14px;
`
