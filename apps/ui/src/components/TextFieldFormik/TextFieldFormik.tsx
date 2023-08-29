import { Field } from 'formik'
import TextField from '@l3-lib/ui-core/dist/TextField'

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
  ...props
}: {
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
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (event: React.FocusEvent<HTMLInputElement>) => void
}) => {
  const input_name = field_name || name

  return (
    <Field name={input_name}>
      {(formik: any) => {
        const { field, meta, form } = formik
        const onHandleChange = (e: any) => {
          form.setFieldValue(field.name, e)
        }

        return (
          <TextField
            name={field.name}
            {...field}
            placeholder={placeholder ?? 'Please enter value'}
            size={size}
            onChange={onHandleChange}
            title={title || label}
            disabled={disabled}
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
