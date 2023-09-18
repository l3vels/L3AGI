import Typography from '@l3-lib/ui-core/dist/Typography'

import {
  StyledDetailsBox,
  StyledDivider,
  StyledWrapper,
} from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import TagsRow from 'pages/Agents/AgentView/components/TagsRow'

type TeamOfAgentsDetailsBoxProps = {
  teamData: any
  customButton?: any
}

const TeamOfAgentsDetailsBox = ({ teamData, customButton }: TeamOfAgentsDetailsBoxProps) => {
  const { name, description, team_type } = teamData

  return (
    <StyledDetailsBox>
      <StyledWrapper>
        <Typography
          value={name}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor={'#FFF'}
        />

        <div>{customButton}</div>
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
  )
}

export default TeamOfAgentsDetailsBox
