import Button from '@l3-lib/ui-core/dist/Button'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import { StyledCardsWrapper } from 'pages/Agents/Agents'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useNavigate } from 'react-router-dom'

import TeamOfAgentsCard from './TeamOfAgentsCard'
import { useTeamOfAgents } from './useTeamOfAgents'
import { ButtonPrimary } from 'components/Button/Button'

const TeamOfAgents = ({ isHome }: { isHome?: boolean }) => {
  const { teamOfAgents: teamOfAgentsArray, deleteTeamOfAgentsHandler } = useTeamOfAgents()

  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Team Of Agents</StyledSectionTitle>
          <StyledSectionDescription>
            Create and manage your team of AI agents for interactive experiences
          </StyledSectionDescription>
        </div>
        <div>
          {!isHome && (
            <ButtonPrimary
              onClick={() => navigate('/team-of-agents/create-team')}
              size={Button.sizes.SMALL}
            >
              Add Team
            </ButtonPrimary>
          )}
        </div>
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {teamOfAgentsArray?.map((teamOfAgents: any) => {
            return (
              <TeamOfAgentsCard
                key={teamOfAgents.id}
                name={teamOfAgents.name}
                description={teamOfAgents.description}
                teamAgents={teamOfAgents.team_agents}
                onViewClick={() => navigate(`/team-of-agents/${teamOfAgents.id}`)}
                onEditClick={() => navigate(`/team-of-agents/${teamOfAgents.id}/edit-team`)}
                onDeleteClick={() => deleteTeamOfAgentsHandler(teamOfAgents.id)}
                onChatClick={() => navigate(`/chat?team=${teamOfAgents.id}`)}
                creator={teamOfAgents.creator}
                avatar={teamOfAgents.avatar}
                teamType={teamOfAgents.team_type}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default TeamOfAgents

// const StyledTeamOfAgentsCardsWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 16px;

//   height: calc(100vh - 325px);
//   overflow-y: auto;
//   padding: 0 20px;
// `
