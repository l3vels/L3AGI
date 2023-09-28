import { useMemo } from 'react'
import { FieldValues, UseFormReturn, useWatch } from 'react-hook-form'
import debounce from 'lodash/debounce'
import { useUpdateEffect } from 'usehooks-ts'

type UseFormAutoSaveProps<T extends FieldValues> = {
  form: UseFormReturn<T, any>
  debounceMs?: number
  onSave: () => Promise<void>
}

const useFormAutoSave = <T extends FieldValues>({
  form,
  debounceMs = 1000,
  onSave,
}: UseFormAutoSaveProps<T>) => {
  const values = useWatch({
    control: form.control,
  })

  const debouncedSave = useMemo(() => debounce(onSave, debounceMs), [debounceMs, onSave])

  useUpdateEffect(() => {
    debouncedSave()
  }, [values, debouncedSave, onSave])
}

export default useFormAutoSave
