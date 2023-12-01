import { ButtonTertiary } from 'components/Button/Button'

import Play from '@l3-lib/ui-core/dist/icons/PlayOutline'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

const DemoButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ButtonTertiary onClick={onClick} size={Button.sizes.SMALL}>
      <Play size={18} color={'#E332E6'} />
      <Typography customColor={'#E332E6'} value={'Demo'} size={Button.sizes.SMALL} />
    </ButtonTertiary>
  )
}

export default DemoButton
