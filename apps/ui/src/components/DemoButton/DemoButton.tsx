import { ButtonTertiary } from 'components/Button/Button'

import Typography from 'share-ui/components/typography/Typography'
import Button from 'share-ui/components/Button/Button'
import Play from 'share-ui/components/Icon/Icons/components/Play'

const DemoButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ButtonTertiary onClick={onClick} size={Button.sizes?.SMALL}>
      <Play size={18} color={'#E332E6'} />
      <Typography customColor={'#E332E6'} value={'Demo'} size={Typography.sizes?.sm} />
    </ButtonTertiary>
  )
}

export default DemoButton
