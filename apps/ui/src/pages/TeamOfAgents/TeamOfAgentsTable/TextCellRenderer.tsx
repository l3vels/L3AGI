import Typography from '@l3-lib/ui-core/dist/Typography'

type RendererProps = {
  webhooks(data: string): string
  value: string
}

const TextCellRenderer = (props: RendererProps) => (
  <div>
    <Typography
      value={props.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.sm}
      customColor='rgba(255, 255, 255, 1)'
    />
  </div>
)

export default TextCellRenderer
