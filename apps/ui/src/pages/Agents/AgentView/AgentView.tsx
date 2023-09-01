import { useParams } from 'react-router-dom'

import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

import Download from '@l3-lib/ui-core/dist/icons/Download'

import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import TagsRow from './components/TagsRow'
import AdditionalInfoBox from './components/AdditionalInfoBox'

const AgentView = () => {
  const params = useParams()
  const { agentId } = params
  const { data: agentById } = useAgentByIdService({ id: agentId || '' })
  console.log('agentById', agentById)

  if (!agentById) return

  const { agent, configs } = agentById

  const { name, description, role } = agent

  const { tools, model_version, mode_provider, goals, constraints } = configs

  return (
    <StyledRoot>
      <StyledLeftColumn>
        <StyledDetailsBox>
          <StyledWrapper>
            <Typography
              value={name}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
              customColor={'#FFF'}
            />
            {mode_provider && (
              <Typography
                value={`By ${mode_provider}`}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'rgba(255,255,255,0.6)'}
              />
            )}
            <div>
              <Button size={Button.sizes.MEDIUM}>
                <Download />
                Install
              </Button>
            </div>
          </StyledWrapper>

          <StyledDivider />

          <StyledWrapper>
            <Typography
              value={description}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'rgba(255,255,255,0.9)'}
            />
          </StyledWrapper>

          <StyledDivider />

          <StyledWrapper>
            {tools.length > 0 && <TagsRow title='Tools' items={tools} />}

            {role && <TagsRow title='Role' items={[role]} />}

            {model_version && <TagsRow title='Model' items={[model_version]} />}
          </StyledWrapper>
        </StyledDetailsBox>
      </StyledLeftColumn>

      <StyledRightColumn>
        {goals.length > 0 && (
          <AdditionalInfoBox
            items={goals}
            title={goals.length === 1 ? '1 Goal' : `${goals.length} Goals`}
          />
        )}

        {constraints.length > 0 && (
          <AdditionalInfoBox
            items={constraints}
            title={constraints.length === 1 ? '1 Constraint' : `${constraints.length} Constraints`}
          />
        )}
      </StyledRightColumn>
    </StyledRoot>
  )
}

export default AgentView

const StyledRoot = styled.div`
  /* background: grey; */
  padding-top: 50px;

  width: 100%;
  height: 100%;

  display: flex;

  gap: 10px;
`
const StyledLeftColumn = styled.div``

const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
`
const StyledDetailsBox = styled.div`
  background: rgba(0, 0, 0, 0.4);
  width: 300px;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 0;
`

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
`
