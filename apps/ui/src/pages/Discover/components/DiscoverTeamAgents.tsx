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
import { useNavigate } from 'react-router-dom'
import { useTeamOfAgentsPublicService } from 'services/team/useTeamOfAgentsPublicService'
import TypographySecondary from 'components/Typography/Secondary'
import Typography from 'share-ui/components/typography/Typography'
import Heading from 'share-ui/components/Heading/Heading'
import HeadingPrimary from 'components/Heading/Primary'
import styled from 'styled-components'
import { AgentWithConfigs } from 'types'
import { t } from 'i18next'
// import { AuthContext } from 'contexts'
type Agent = {
  id: string
  role: string
  agent: AgentWithConfigs
}

type TeamOfAgents = {
  id: string
  name: string
  description: string
  avatar: string
  creator: {
    avatar: string
    email: string
    id: string
    name: string
  }
  team_agents: Agent[]
  team_type: string
}

const DiscoverTeamAgents = () => {
  const navigate = useNavigate()
  const { openModal } = useModal()

  const { data: publicTeamAgents } = useTeamOfAgentsPublicService()
  // const location = useLocation()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'></StyledHeaderGroup>
      <StyledHeadingWrapper>
        <StyledHeadingPrimary type={Heading.types?.h1} value={t('discovery-description')} />
        <TypographySecondary
          value={t('create-team-description')}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
        />
      </StyledHeadingWrapper>
      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {publicTeamAgents?.map((teamOfAgents: TeamOfAgents) => {
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
