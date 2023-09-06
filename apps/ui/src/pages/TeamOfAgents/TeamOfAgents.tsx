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
import styled from 'styled-components'
import TeamOfAgentsCard from './TeamOfAgentsCard'
import { useTeamOfAgents } from './useTeamOfAgents'

const TeamOfAgents = () => {
  const { teamOfAgents, deleteTeamOfAgentsHandler } = useTeamOfAgents()

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
          <Button
            onClick={() => navigate('/team-of-agents/create-team')}
            size={Button.sizes.SMALL}
          >
            Add Team 
          </Button>
        </div>
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {teamOfAgents?.map((teamOfAgents: any, index: number) => {
            return (
              <TeamOfAgentsCard
                key={index}
                title={teamOfAgents.name}
                subTitle={teamOfAgents.team_type}
                onEditClick={() => navigate(`/team-of-agents/${teamOfAgents.id}/edit-team`)}
                onDeleteClick={() => deleteTeamOfAgentsHandler(teamOfAgents.id)}
              />
            )
          })}r
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
