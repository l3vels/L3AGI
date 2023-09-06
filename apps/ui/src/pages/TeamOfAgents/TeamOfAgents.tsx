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
          <StyledSectionTitle>TeamOfAgents</StyledSectionTitle>
          <StyledSectionDescription>
            Here is your teamOfAgents, a collection of databases, APIs, files, and more.
          </StyledSectionDescription>
        </div>
        <div>
          <Button
            onClick={() => navigate('/teamOfAgents/create-team-of-agents')}
            size={Button.sizes.SMALL}
          >
            Add TeamOfAgents
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
                subTitle={teamOfAgents.source_type}
                onEditClick={() => navigate(`/teamOfAgents/${teamOfAgents.id}/edit-team-of-agents`)}
                onDeleteClick={() => deleteTeamOfAgentsHandler(teamOfAgents.id)}
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
