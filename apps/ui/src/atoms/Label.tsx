import * as LabelPrimitive from '@radix-ui/react-label'
//todo jelo replace proptypes to Interface
//eslint-disable-next-line
import { LabelProps } from '@radix-ui/react-label'

const Label = ({ children, color }: LabelProps) => (
  <LabelPrimitive.Root style={{ color: color }}>{children}</LabelPrimitive.Root>
)

export default Label
