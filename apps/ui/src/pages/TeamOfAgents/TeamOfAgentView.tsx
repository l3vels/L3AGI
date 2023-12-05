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

import Typography from 'share-ui/components/typography/Typography'
import Tags from 'share-ui/components/Tags/Tags'

import IconButton from 'share-ui/components/IconButton/IconButton'

import EyeOpen from 'share-ui/components/Icon/Icons/components/EyeOpen'

import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

import TeamOfAgentsDetailsBox from './components/TeamOfAgentsDetailsBox'
import { useModal } from 'hooks'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import { StyledEyeOpenIcon } from './TeamOfAgentsCard/TeamOfAgentsCard'
import AdditionalInfoBox from 'pages/Agents/AgentView/components/AdditionalInfoBox'
import AgentToolkits from 'pages/Agents/AgentView/components/AgentToolkits'
import AgentDatasources from 'pages/Agents/AgentView/components/AgentDatasources'
import { t } from 'i18next'

const TeamOfAgentView = ({ teamOfAgentsData }: { teamOfAgentsData?: any }) => {
  const { teamId } = useParams()
  const { data } = useTeamOfAgentsByIdService({ id: teamId })

  const { openModal } = useModal()

  if (!data && !teamOfAgentsData) return <div />

  const { team_agents, configs } = data || teamOfAgentsData

  const { tools, goals, constraints, instructions, datasources, suggestions, greeting, text } =
    configs

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
              <TypographyPrimary
                value={'Agents'}
                type={Typography.types.LABEL}
                size={Typography.sizes.lg}
              />

              {team_agents?.map((agentObj: any, index: number) => {
                const { agent, role } = agentObj

                return (
                  <StyledAgent key={index}>
                    <AvatarGenerator name={agent.name} size={40} avatar={agent.avatar} />

                    <StyledMainTextWrapper>
                      <TypographyPrimary
                        value={agent.name}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.sm}
                      />
                      <TypographySecondary
                        value={agent.role}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.xss}
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
                            <StyledEyeOpenIcon />
                          </StyledIconWrapper>
                        )}
                        size={IconButton.sizes?.SMALL}
                        kind={IconButton.kinds?.TERTIARY}
                        // ariaLabel='View'
                      />
                      <Tags
                        key={index}
                        label={
                          <TypographySecondary
                            value={role}
                            type={Typography.types.LABEL}
                            size={Typography.sizes.xss}
                          />
                        }
                        color='Tags.colors.gradient_dark_blue'
                        readOnly
                        size={Tags.sizes?.SMALL}
                        outlined
                      />
                    </StyledSecondInfoWrapper>
                  </StyledAgent>
                )
              })}
            </StyledAgentsWrapper>

            {tools?.length > 0 && <AgentToolkits tools={tools} />}

            {datasources?.length > 0 && <AgentDatasources datasources={datasources} />}

            {goals?.length > 0 && <AdditionalInfoBox items={goals} title={'goal'} />}

            {constraints?.length > 0 && (
              <AdditionalInfoBox items={constraints} title={'constraint'} />
            )}

            {instructions?.length > 0 && (
              <AdditionalInfoBox items={instructions} title={'instruction'} />
            )}

            {suggestions?.length > 0 && (
              <AdditionalInfoBox items={suggestions} title={'suggestion'} />
            )}

            {greeting?.length > 0 && (
              <AdditionalInfoBox items={[greeting]} title={'Greeting'} noCount />
            )}

            {text?.length > 0 && (
              <AdditionalInfoBox items={[text]} title={t('base-system-message')} noCount />
            )}
          </StyledRightColumn>
        </StyledInnerWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default TeamOfAgentView

const StyledAgentsWrapper = styled.div`
  background: ${({ theme }) => theme.body.cardBgColor};

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
