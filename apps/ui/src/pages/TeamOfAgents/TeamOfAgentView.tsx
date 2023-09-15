import BackButton from 'components/BackButton'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledDetailsBox,
  StyledDivider,
  StyledInnerButtonWrapper,
  StyledInnerWrapper,
  StyledLeftColumn,
  StyledRightColumn,
  StyledWrapper,
} from 'pages/Agents/AgentView/AgentView'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useTeamOfAgentsByIdService } from 'services/team/useTeamOfAgentsByIdService'

import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

import Download from '@l3-lib/ui-core/dist/icons/Download'
import AgentCard from 'pages/Agents/AgentCard'
import TagsRow from 'pages/Agents/AgentView/components/TagsRow'
import { useModal } from 'hooks'

const TeamOfAgentView = ({ teamOfAgentsData }: { teamOfAgentsData?: any }) => {
  const navigate = useNavigate()

  const { closeModal } = useModal()

  const { teamId } = useParams()
  const { data } = useTeamOfAgentsByIdService({ id: teamId })

  if (!data && !teamOfAgentsData) return <div />

  const { name, description, team_type, team_agents } = data || teamOfAgentsData

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          {!teamOfAgentsData && (
            <>
              <StyledSectionTitle>Agent</StyledSectionTitle>
              <StyledSectionDescription>
                Witness the growth of exceptional AI talents, nurtured by collective community
                contributions.
              </StyledSectionDescription>
            </>
          )}
        </div>

        <div>
          <BackButton
            customOnClick={
              teamOfAgentsData ? () => closeModal('team-of-agent-view-modal') : undefined
            }
          />
        </div>
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding hideBox={teamOfAgentsData}>
        <StyledInnerWrapper noPadding={teamOfAgentsData}>
          <StyledLeftColumn>
            <StyledDetailsBox>
              <StyledWrapper>
                <Typography
                  value={name}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                  customColor={'#FFF'}
                />

                <div>
                  <Button
                    size={Button.sizes.SMALL}
                    // onClick={() => navigate(`/agents/create-agent?agentId=${agentId}`)}
                  >
                    <StyledInnerButtonWrapper>
                      <Download size={28} />
                      Add
                    </StyledInnerButtonWrapper>
                  </Button>
                </div>
              </StyledWrapper>

              {description && (
                <>
                  <StyledDivider />

                  <StyledWrapper>
                    <Typography
                      value={description}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.sm}
                      customColor={'rgba(255,255,255,0.9)'}
                    />
                  </StyledWrapper>
                </>
              )}

              <StyledDivider />

              <StyledWrapper>
                {team_type && <TagsRow title='Team Type' items={[team_type]} />}
              </StyledWrapper>
            </StyledDetailsBox>
          </StyledLeftColumn>

          <StyledRightColumn>
            <StyledAgentsWrapper>
              {team_agents?.map((agentObj: any, index: number) => {
                const { agent, role } = agentObj

                return (
                  <AgentCard
                    key={index}
                    name={agent.name}
                    description={role}
                    onEditClick={() => navigate(`/agents/${agent.id}/edit-agent`)}
                    onViewClick={() => navigate(`/agents/${agent.id}`)}
                    headerTag={agent.role}
                    onChatClick={() => navigate(`/copilot?agent=${agent.id}`)}
                  />
                )
              })}
            </StyledAgentsWrapper>
          </StyledRightColumn>
        </StyledInnerWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default TeamOfAgentView

const StyledAgentsWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`
