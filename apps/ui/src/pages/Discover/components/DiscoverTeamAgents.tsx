import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useModal } from 'hooks'

import { StyledCardsWrapper } from 'pages/Agents/Agents'
import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  // StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import TeamOfAgentsCard from 'pages/TeamOfAgents/TeamOfAgentsCard'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTeamOfAgentsPublicService } from 'services/team/useTeamOfAgentsPublicService'
import TypographySecondary from 'components/Typography/Secondary'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'
import HeadingPrimary from 'components/Heading/Primary'
import styled from 'styled-components'
import { AuthContext } from 'contexts'

const DiscoverTeamAgents = () => {
  const navigate = useNavigate()
  const { openModal } = useModal()

  const { data: publicTeamAgents } = useTeamOfAgentsPublicService()
  const location = useLocation()

  return (
    <StyledSectionWrapper>
      <StyledHeadingWrapper>
        <StyledHeadingPrimary type={Heading.types.h1} value={'Discover Team of AI Agents'} />
        <TypographySecondary
          value={'Create and manage your team of AI agents for interactive experiences'}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
        />
      </StyledHeadingWrapper>
      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {publicTeamAgents?.map((teamOfAgents: any) => {
            return (
              <TeamOfAgentsCard
                key={teamOfAgents.id}
                name={teamOfAgents.name}
                description={teamOfAgents.description}
                teamAgents={teamOfAgents.team_agents}
                onViewClick={() =>
                  openModal({
                    name: 'team-of-agent-view-modal',
                    data: { teamOfAgents: teamOfAgents },
                  })
                }
                onChatClick={() => navigate(`/chat/history?team=${teamOfAgents.id}`)}
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

export default DiscoverTeamAgents

const StyledHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 10px;
`
const StyledHeadingPrimary = styled(HeadingPrimary)`
  font-size: 40px;
`
