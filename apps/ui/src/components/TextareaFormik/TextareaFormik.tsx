import { Field } from 'formik'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

const TextareaFormik = ({
  field_name,
  placeholder,
  title,
  rows,
  cols,
  color,
}: {
  field_name: string
  placeholder?: string
  title?: string
  rows?: number
  cols?: number
  color?: string
}) => (
  <Field name={field_name}>
    {(formik: any) => {
      const { field, meta, form } = formik
      const onHandleChange = (e: any) => {
        form.setFieldValue(field.name, e)
      }

      return (
        <Textarea
          rows={rows}
          cols={cols}
          name={field.name}
          color={color}
          {...field}
          placeholder={placeholder ?? 'Please enter value'}
          label='Game name'
          onChange={onHandleChange}
          title={title}
          validation={{
            text: meta.error,
            status: meta.error && 'error',
          }}
        />
      )
    }}
  </Field>
)

export default TextareaFormik
