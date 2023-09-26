import BackButton from 'components/BackButton'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledInnerWrapper,
  StyledLeftColumn,
  StyledRightColumn,
} from 'pages/Agents/AgentView/AgentView'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useParams } from 'react-router-dom'
import { useTeamOfAgentsByIdService } from 'services/team/useTeamOfAgentsByIdService'

import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import EyeOpen from '@l3-lib/ui-core/dist/icons/EyeOpen'

import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

import TeamOfAgentsDetailsBox from './components/TeamOfAgentsDetailsBox'
import { useModal } from 'hooks'

const TeamOfAgentView = ({ teamOfAgentsData }: { teamOfAgentsData?: any }) => {
  const { teamId } = useParams()
  const { data } = useTeamOfAgentsByIdService({ id: teamId })

  const { openModal } = useModal()

  if (!data && !teamOfAgentsData) return <div />

  const { team_agents } = data || teamOfAgentsData

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        {!teamOfAgentsData && (
          <>
            <div>
              <>
                <StyledSectionTitle>Team Of Agents</StyledSectionTitle>
                <StyledSectionDescription>
                  Witness the growth of exceptional AI talents, nurtured by collective community
                  contributions.
                </StyledSectionDescription>
              </>
            </div>

            <div>
              <BackButton />
            </div>
          </>
        )}
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding hideBox={teamOfAgentsData}>
        <StyledInnerWrapper noPadding={teamOfAgentsData}>
          <StyledLeftColumn>
            <TeamOfAgentsDetailsBox teamData={data || teamOfAgentsData} />
          </StyledLeftColumn>

          <StyledRightColumn>
            <StyledAgentsWrapper>
              <Typography
                value={'Agents'}
                type={Typography.types.LABEL}
                size={Typography.sizes.lg}
                customColor={'#FFF'}
              />

              {team_agents?.map((agentObj: any, index: number) => {
                const { agent, role } = agentObj

                return (
                  <StyledAgent key={index}>
                    <AvatarGenerator name={agent.name} size={40} avatar={agent.avatar} />

                    <StyledMainTextWrapper>
                      <Typography
                        value={agent.name}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.sm}
                        customColor={'#FFF'}
                      />
                      <Typography
                        value={agent.role}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.xss}
                        customColor={'rgba(255,255,255,0.8'}
                      />
                    </StyledMainTextWrapper>

                    <StyledSecondInfoWrapper>
                      <IconButton
                        onClick={() =>
                          openModal({
                            name: 'agent-view-modal',
                            data: {
                              id: agent.id,
                            },
                          })
                        }
                        icon={() => (
                          <StyledIconWrapper className='hiddenButton'>
                            <EyeOpen size={50} />
                          </StyledIconWrapper>
                        )}
                        size={IconButton.sizes.SMALL}
                        kind={IconButton.kinds.TERTIARY}
                        // ariaLabel='View'
                      />
                      <Tags label={role} readOnly size='small' outlined />
                    </StyledSecondInfoWrapper>
                  </StyledAgent>
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
  background: rgba(0, 0, 0, 0.2);

  width: 100%;
  max-width: 1440px;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  gap: 6px;
`
const StyledAgent = styled.div`
  display: flex;

  align-items: center;

  gap: 6px;

  padding: 5px 10px;
  border-radius: 8px;
  :hover {
    background: rgba(0, 0, 0, 0.1);

    .hiddenButton {
      opacity: 1;
    }
  }
`
const StyledMainTextWrapper = styled.div`
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* gap: 10px; */
  margin-right: auto;
  /* width: 100%; */
  /* max-width: 400px; */
`
const StyledSecondInfoWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;
`

const StyledIconWrapper = styled.div`
  /* color: #000; */
  color: transparent;

  opacity: 0;
`
