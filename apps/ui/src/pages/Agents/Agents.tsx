import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from 'share-ui/components/Button/Button'
import AgentCard from './AgentCard'
import { useAgents } from './useAgents'
import { ButtonPrimary } from 'components/Button/Button'

import HeadingPrimary from 'components/Heading/Primary'
import Heading from 'share-ui/components/Heading/Heading'
import { useGetAccountModule } from 'utils/useGetAccountModule'
import { AgentWithConfigs } from 'types'

const Agents = ({ isHome }: { isHome?: boolean }) => {
  const { t } = useTranslation()
  const { getChatModules } = useGetAccountModule()

  const agentModule = getChatModules('agent')
  const { agentsData, deleteAgentHandler } = useAgents()

  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledMainHeaderWrapper>
          <HeadingPrimary
            type={Heading.types?.h1}
            size='xss'
            value={`${t('agent').toUpperCase()}S`}
          />
          <StyledSectionDescription>{`${t('agent-description')}`}</StyledSectionDescription>
        </StyledMainHeaderWrapper>

        <div>
          {!isHome && (
            <ButtonPrimary
              onClick={() => navigate('/agents/create-agent-template')}
              size={Button.sizes?.SMALL}
            >
              {t('add-agent')}
            </ButtonPrimary>
          )}
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {agentsData?.map((agentWithConfigs: AgentWithConfigs, index: number) => {
            const { agent } = agentWithConfigs

            const handleEdit = () => {
              navigate(`/agents/${agent.id}/edit-agent`)
            }

            const handleDelete = () => {
              deleteAgentHandler(agent.id)
            }

            return (
              <AgentCard
                key={index}
                name={agent.name}
                description={agent.description}
                onEditClick={agentModule?.edit && handleEdit}
                onDeleteClick={agentModule?.delete && handleDelete}
                onViewClick={() => navigate(`/agents/${agent.id}`)}
                headerTag={agent.role}
                onChatClick={() => navigate(`/chat?agent=${agent.id}`)}
                creator={agent.creator}
                avatar={agent.avatar}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Agents

export const StyledCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  /* height: 100%; */

  padding: 5px 32px;
`

const StyledMainHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
