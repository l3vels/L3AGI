import Tooltip from 'share-ui/components/Tooltip/Tooltip'
import Typography from 'share-ui/components/typography/Typography'
import styled from 'styled-components'
import TypographySecondary from 'components/Typography/Secondary'

// TODO: fix after services types

type AgentRendererProps = {
  params: any
  options: any
}

const AgentRenderer = ({ params, options }: AgentRendererProps) => {
  const { value: agentId } = params

  const agentWithConfigs = options.find((option: any) => option.agent.id === agentId)
  if (!agentWithConfigs) return null

  const { agent } = agentWithConfigs

  return (
    <Tooltip content={agent.name}>
      <TypographySecondary
        value={agent.role.length > 0 ? `${agent.name} - ${agent.role}` : agent.name}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
    </Tooltip>
  )
}

export default AgentRenderer

const StyledAgents = styled.div``
