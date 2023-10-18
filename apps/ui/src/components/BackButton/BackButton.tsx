import Button from '@l3-lib/ui-core/dist/Button'
import { useTranslation } from 'react-i18next'
import { ButtonTertiary } from 'components/Button/Button'
import { useNavigate } from 'react-router-dom'

type BackButtonProps = {
  customOnClick?: () => void
}

const BackButton = ({ customOnClick }: BackButtonProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const ClickHandler = () => {
    if (customOnClick) {
      customOnClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <ButtonTertiary onClick={ClickHandler} size={Button.sizes.SMALL}>
      {t('back')}
    </ButtonTertiary>
  )
}

export default BackButton
