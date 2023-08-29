import { Controller } from 'react-hook-form'
import TextField from '@l3-lib/ui-core/dist/TextField'

type ITypes = {
  placeholder?: string
  field_name: string
  control: any
}

const TextFieldController = ({ field_name, control, placeholder }: ITypes) => {
  return (
    <Controller
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            placeholder={placeholder}
            validation={
              error
                ? {
                    status: 'error',
                    text: 'Please enter correct url',
                  }
                : {}
            }
          />
        )
      }}
      name={field_name}
      control={control}
    />
  )
}

export default TextFieldController
