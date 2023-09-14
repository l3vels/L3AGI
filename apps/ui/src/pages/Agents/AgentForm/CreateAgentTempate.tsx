import { FormikProvider } from 'formik'

import { useAgents } from '../useAgents'
import AgentForm from './AgentForm'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Typography from '@l3-lib/ui-core/dist/Typography'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import styled from 'styled-components'
import BackButton from 'components/BackButton'

import AgentCard from '../AgentCard'
import { useNavigate } from 'react-router-dom'

import { StyledButtonWrapper } from './CreateAgentForm'
import CreateAgentButtonCard from './components/CreateAgentButtonCard'

const CreateAgentTemplate = () => {
  const { agentsData, refetchAgent } = useAgents()

  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Create Agent</StyledSectionTitle>
          <StyledSectionDescription>
            Here are all your agents, managing tasks and operations.
          </StyledSectionDescription>
        </div>

        <StyledButtonWrapper>
          <BackButton />
        </StyledButtonWrapper>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledTemplatesWrapper>
          <StyledTemplateHeader>
            <CreateAgentButtonCard onClick={() => navigate('/agents/create-agent')} />

            <Typography
              value='Choose Template'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
              customColor={'#FFF'}
            />
          </StyledTemplateHeader>
          <StyledCardsWrapper>
            {agentsData?.map((agentObj: any, index: number) => {
              const { agent } = agentObj

              return (
                <AgentCard
                  key={index}
                  name={agent.name}
                  description={agent.description}
                  onViewClick={() => navigate(`/agents/${agent.id}`)}
                  headerTag={agent.role}
                  onChatClick={() => navigate(`/copilot?agent=${agent.id}`)}
                  onCreateClick={async () => {
                    await refetchAgent({ id: agent.id })
                    navigate(`/agents/create-agent?agentId=${agent.id}`)
                  }}
                />
              )
            })}
          </StyledCardsWrapper>
        </StyledTemplatesWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default CreateAgentTemplate

const StyledTemplatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  max-height: calc(100vh - 325px);
  height: 100%;
  overflow-y: auto;
  padding: 0 20px;
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
