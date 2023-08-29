import { useTranslation } from 'react-i18next'

export const AddRowButton = (props: any) => {
  const { t } = useTranslation()

  if (props?.data?.type) {
    return <button onClick={() => props.addRow()}>{t('addNewRow')}</button>
  }
  return <span>{props.value}</span>
}
