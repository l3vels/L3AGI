import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'

type RendererProps = {
  webhooks(data: string): string
  value: string
}

const TextCellRenderer = (props: RendererProps) => (
  <div>
    <TypographyPrimary
      value={props.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.sm}
    />
  </div>
)

export default TextCellRenderer
