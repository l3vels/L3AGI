import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TextField from 'share-ui/components/TextField/TextField'

type ITypes = {
  placeholder?: string
  field_name: string
  control: any
}

const TextFieldController = ({ field_name, control, placeholder }: ITypes) => {
  const { t } = useTranslation()
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
                    text: `${t('please-enter-correct-url')}`,
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
