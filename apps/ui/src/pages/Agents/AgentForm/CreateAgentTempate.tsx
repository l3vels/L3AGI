import Typography from 'share-ui/components/typography/Typography'

import { StyledHeaderGroup, StyledSectionWrapper } from 'pages/Home/homeStyle.css'

import styled from 'styled-components'
import BackButton from 'components/BackButton'

import AgentCard from '../AgentCard'
import { useLocation, useNavigate } from 'react-router-dom'

import { StyledButtonWrapper } from './CreateAgentForm'
import CreateAgentButtonCard from './components/CreateAgentButtonCard'
import { useModal } from 'hooks'
import { useAgentTemplatesService } from 'services/discover/useAgentTemplatesService'
import TypographyPrimary from 'components/Typography/Primary'
import { useCreateAgent } from '../useCreateAgent'
import { t } from 'i18next'
import { StyledCombiner } from 'pages/Datasource/DatasourceForm/CreateDatasourceForm'
import AgentDemoButton from './components/AgentDemoButton'
import { AgentWithConfigs } from 'types'
import { isVoiceAgent } from 'utils/agentUtils'

const CreateAgentTemplate = () => {
  const { refetchAgent } = useCreateAgent()

  const { data: agentsData } = useAgentTemplatesService()

  const inboundAgentTemplates = agentsData?.filter(
    (agentData: AgentWithConfigs) => agentData.agent.agent_type === 'inbound',
  )

  const outboundAgentTemplates = agentsData?.filter(
    (agentData: AgentWithConfigs) => agentData.agent.agent_type === 'outbound',
  )

  const textAgentTemplates = agentsData?.filter(
    (agentData: AgentWithConfigs) => !isVoiceAgent(agentData.agent.agent_type),
  )

  const { openModal } = useModal()

  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const agentType = urlParams.get('type') || 'text'

  const handleNavigate = () => {
    navigate(`/agents/create-agent?type=${agentType}`)
  }

  let displayedAgents = textAgentTemplates

  if (agentType === 'inbound') displayedAgents = inboundAgentTemplates
  if (agentType === 'outbound') displayedAgents = outboundAgentTemplates

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledCombiner>
          <TypographyPrimary
            value={`${t('add-agent')}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
          />
          <AgentDemoButton />
        </StyledCombiner>
      </StyledHeaderGroup>

      <StyledTemplatesWrapper>
        <StyledTemplateHeader>
          <CreateAgentButtonCard onClick={handleNavigate} />

          {displayedAgents?.length > 0 && (
            <TypographyPrimary
              value={t('choose-template')}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
          )}
        </StyledTemplateHeader>
        <StyledCardsWrapper>
          {displayedAgents?.map((agentObj: any, index: number) => {
            const { agent } = agentObj

            return (
              <AgentCard
                key={index}
                name={agent.name}
                description={agent.description}
                onViewClick={() =>
                  openModal({ name: 'agent-view-modal', data: { agent: agentObj } })
                }
                headerTag={agent.role}
                onCreateClick={async () => {
                  await refetchAgent({ id: agent.id })
                  navigate(`/agents/create-agent?agentId=${agent.id}`)
                }}
                // creator={agent.creator}
                avatar={agent.avatar}
              />
            )
          })}
        </StyledCardsWrapper>
      </StyledTemplatesWrapper>

      <StyledButtonWrapper>
        <BackButton />
      </StyledButtonWrapper>
    </StyledSectionWrapper>
  )
}

export default CreateAgentTemplate

const StyledTemplatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  height: calc(100vh - 225px);

  max-height: 2500px;
  overflow-y: auto;
  padding: 0 20px;
  width: 100%;
  /* max-width: 600px; */
`
const StyledTemplateHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`
const StyledCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`
