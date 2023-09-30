import Button from '@l3-lib/ui-core/dist/Button'
import { ButtonSecondary } from 'components/Button/Button'
import { useNavigate } from 'react-router-dom'

type BackButtonProps = {
  customOnClick?: () => void
}

const BackButton = ({ customOnClick }: BackButtonProps) => {
  const navigate = useNavigate()

  const ClickHandler = () => {
    if (customOnClick) {
      customOnClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <ButtonSecondary onClick={ClickHandler} size={Button.sizes.SMALL}>
      Back
    </ButtonSecondary>
  )
}

export default BackButton
