import Button from '@l3-lib/ui-core/dist/Button'
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
    <Button onClick={ClickHandler} kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>
      Back
    </Button>
  )
}

export default BackButton
