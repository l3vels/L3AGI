import Button from '@l3-lib/ui-core/dist/Button'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Button onClick={() => navigate(-1)} kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL}>
      Back
    </Button>
  )
}

export default BackButton
