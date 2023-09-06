import { useNavigate, useParams } from 'react-router-dom'

import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

import Download from '@l3-lib/ui-core/dist/icons/Download'

import { useAgentByIdService } from 'services/agent/useAgentByIdService'
import TagsRow from './components/TagsRow'
import AdditionalInfoBox from './components/AdditionalInfoBox'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useToolsService } from 'services/tool/useToolsService'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'
import BackButton from 'components/BackButton'

const AgentView = () => {
  const navigate = useNavigate()

  const params = useParams()
  const { agentId } = params
  const { data: agentById } = useAgentByIdService({ id: agentId || '' })
  const { data: toolsData } = useToolsService()
  const { data: datasourcesData } = useDatasourcesService()

  if (!agentById) return <div />

  const { agent, configs } = agentById

  const { name, description, role } = agent

  const {
    tools,
    model_version,
    mode_provider,
    goals,
    constraints,
    instructions,
    temperature,
    datasources,
  } = configs

  const filteredTools = toolsData
    ?.filter((tool: any) => {
      if (tools?.includes(tool.toolkit_id)) {
        return tool
      } else {
        return
      }
    })
    .map((tool: any) => tool.name)

  const filteredDatasources = datasourcesData
    ?.filter((datasource: any) => {
      if (datasources?.includes(datasource.id)) {
        return datasource
      } else {
        return
      }
    })
    .map((tool: any) => tool.name)

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Agent</StyledSectionTitle>
          <StyledSectionDescription>
            Witness the growth of exceptional AI talents, nurtured by collective community
            contributions.
          </StyledSectionDescription>
        </div>

        <div>
          <BackButton />
        </div>
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding>
        <StyledInnerWrapper>
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
                  <Button
                    size={Button.sizes.SMALL}
                    onClick={() => navigate(`/agents/create-agent?agentId=${agentId}`)}
                  >
                    <StyledInnerButtonWrapper>
                      <Download size={28} />
                      Add
                    </StyledInnerButtonWrapper>
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
                {tools.length > 0 && <TagsRow title='Tools' items={filteredTools} />}

                {datasources.length > 0 && (
                  <TagsRow title='Datasources' items={filteredDatasources} />
                )}

                {role && <TagsRow title='Role' items={[role]} />}

                {model_version && <TagsRow title='Model' items={[model_version]} />}

                {temperature && <TagsRow title='Temperature' items={[temperature]} />}
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
                title={
                  constraints.length === 1 ? '1 Constraint' : `${constraints.length} Constraints`
                }
              />
            )}
            {instructions.length > 0 && (
              <AdditionalInfoBox
                items={instructions}
                title={
                  instructions.length === 1
                    ? '1 Instruction'
                    : `${instructions.length} Instructions`
                }
              />
            )}
          </StyledRightColumn>
        </StyledInnerWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default AgentView

const StyledInnerWrapper = styled.div`
  /* background: grey; */

  width: 100%;
  height: calc(100vh - 325px);
  overflow-y: auto;
  display: flex;
  padding: 0 20px;
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
  background: rgba(0, 0, 0, 0.2);

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
const StyledInnerButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-right: 5px;
`
