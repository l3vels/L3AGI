import { useParams } from 'react-router-dom'

import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import Tags from '@l3-lib/ui-core/dist/Tags'

import Download from '@l3-lib/ui-core/dist/icons/Download'

import { useAgentByIdService } from 'services/agent/useAgentByIdService'

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
            {tools.length > 0 && (
              <StyledRow>
                <Typography
                  value={'Tools'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor={'rgba(255,255,255,0.6)'}
                />
                <StyledToolsContainer>
                  {tools.map((tool: string, index: number) => {
                    return <Tags key={index} label={tool} readOnly size='small' outlined />
                  })}
                </StyledToolsContainer>
              </StyledRow>
            )}

            {role && (
              <StyledRow>
                <Typography
                  value={'Role'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor={'rgba(255,255,255,0.6)'}
                />
                <Tags label={role} readOnly size='small' outlined />
              </StyledRow>
            )}

            {model_version && (
              <StyledRow>
                <Typography
                  value={'Model'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor={'rgba(255,255,255,0.6)'}
                />
                <Tags label={model_version} readOnly size='small' outlined />
              </StyledRow>
            )}
          </StyledWrapper>
        </StyledDetailsBox>
      </StyledLeftColumn>

      <StyledRightColumn>
        {goals.length > 0 && (
          <StyledAdditionalInfo>
            <Typography
              value={goals.length === 1 ? '1 Goal' : `${goals.length} Goals`}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
              customColor={'#FFF'}
            />

            {goals.map((goal: string, index: number) => {
              return (
                <Typography
                  key={index}
                  value={goals.length === 1 ? goal : `${index + 1}. ${goal}`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor={'#FFF'}
                />
              )
            })}
          </StyledAdditionalInfo>
        )}

        {constraints.length > 0 && (
          <StyledAdditionalInfo>
            <Typography
              value={
                constraints.length === 1 ? '1 Constraint' : `${constraints.length} Constraints`
              }
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
              customColor={'#FFF'}
            />

            {constraints.map((constraint: string, index: number) => {
              return (
                <Typography
                  key={index}
                  value={constraints.length === 1 ? constraint : `${index + 1}. ${constraint}`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor={'#FFF'}
                />
              )
            })}
          </StyledAdditionalInfo>
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
const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const StyledToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`
const StyledAdditionalInfo = styled.div`
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 1440px;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledHeader = styled.div``
