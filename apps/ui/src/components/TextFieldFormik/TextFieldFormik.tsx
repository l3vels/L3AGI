import { Field } from 'formik'
import TextField from '@l3-lib/ui-core/dist/TextField'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'

const FormikTextField = ({
  field_name,
  placeholder,
  title,
  size = 'small',
  type,
  label,
  name,
  disabled,
  onBlur,
  onChange,
  value,
  focus,
  ...props
}: {
  value?: string
  field_name?: string
  placeholder?: string
  title?: string
  size?: 'large' | 'medium' | 'small'
  type?: string
  label?: string
  name?: string
  iconName?: any
  onIconClick?: any
  disabled?: boolean
  focus?: boolean
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.FocusEvent<HTMLInputElement>) => void
}) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const input_name = field_name || name
  const theme = useTheme()

  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 1)
    }
  }, [])

  return (
    <Field name={input_name}>
      {(formik: any) => {
        const { field, meta, form } = formik
        const onHandleChange = (e: any) => {
          form.setFieldValue(field.name, e)
        }

        return (
          <TextField
            ref={inputRef}
            value={value}
            name={field.name}
            {...field}
            placeholder={placeholder ?? `${t('please-enter-value')}`}
            size={size}
            onChange={onHandleChange}
            title={<StyledTitle>{title || label}</StyledTitle>}
            disabled={disabled}
            color={theme.textFiled.primary}
            validation={{
              text: meta.error,
              status: meta.error && 'error',
            }}
            type={type}
            {...props}
          />
        )
      }}
    </Field>
  )
}

export default FormikTextField

const StyledTitle = styled.div`
  color: ${({ theme }) => theme.typography.contentPrimary};
`
