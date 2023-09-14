import { useNavigate, useParams } from 'react-router-dom'

import styled, { css } from 'styled-components'

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

import BackButton from 'components/BackButton'
import AgentToolkits from './components/AgentToolkits'
import AgentDatasources from './components/AgentDatasources'
import { useModal } from 'hooks'

const AgentView = ({ agentData }: { agentData?: any }) => {
  const navigate = useNavigate()

  const { closeModal } = useModal()

  const params = useParams()
  const { agentId } = params
  const { data: agentById } = useAgentByIdService({ id: agentId || '' })

  if (!agentById && !agentData) return <div />

  const { agent, configs } = agentById || agentData

  const { name, description, role, creator } = agent

  const {
    tools,
    model_version,
    model_provider,
    goals,
    constraints,
    instructions,
    temperature,
    datasources,
    suggestions,
    greeting,
  } = configs

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          {!agentData && (
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
            customOnClick={agentData ? () => closeModal('agent-view-modal') : undefined}
          />
        </div>
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding hideBox={agentData}>
        <StyledInnerWrapper noPadding={agentData}>
          <StyledLeftColumn>
            <StyledDetailsBox>
              <StyledWrapper>
                <Typography
                  value={name}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                  customColor={'#FFF'}
                />
                {creator && (
                  <Typography
                    value={`By ${creator.name}`}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.xss}
                    customColor={'rgba(255,255,255,0.6)'}
                  />
                )}
                <div>
                  <Button
                    size={Button.sizes.SMALL}
                    onClick={() => {
                      if (agentData) {
                        closeModal('agent-view-modal')
                      }
                      navigate(`/agents/create-agent?agentId=${agent.id}`)
                    }}
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
                {role && <TagsRow title='Role' items={[role]} />}

                {model_provider && <TagsRow title='Provider' items={[model_provider]} />}

                {model_version && <TagsRow title='Model' items={[model_version]} />}

                {temperature && <TagsRow title='Temperature' items={[temperature]} />}
              </StyledWrapper>
            </StyledDetailsBox>
          </StyledLeftColumn>

          <StyledRightColumn>
            {tools.length > 0 && <AgentToolkits tools={tools} />}

            {datasources.length > 0 && <AgentDatasources datasources={datasources} />}

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
            {suggestions.length > 0 && (
              <AdditionalInfoBox
                items={suggestions}
                title={
                  suggestions.length === 1 ? '1 Suggestion' : `${suggestions.length} Suggestions`
                }
              />
            )}
            {greeting.length > 0 && <AdditionalInfoBox items={[greeting]} title={'Greeting'} />}
          </StyledRightColumn>
        </StyledInnerWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default AgentView

export const StyledInnerWrapper = styled.div<{ noPadding?: boolean }>`
  /* background: grey; */

  width: 100%;
  max-height: calc(100vh - 325px);
  height: 100%;
  overflow-y: auto;
  display: flex;
  padding: 0 20px;
  gap: 10px;

  ${p =>
    p.noPadding &&
    css`
      padding: 0px;
    `};

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`
export const StyledLeftColumn = styled.div`
  position: sticky;
  top: 0;

  overflow-y: auto;
  min-width: fit-content;

  @media only screen and (max-width: 800px) {
    position: unset;
    top: unset;
    overflow-y: unset;
  }
`

export const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
`
export const StyledDetailsBox = styled.div`
  background: rgba(0, 0, 0, 0.2);

  width: 300px;
  height: fit-content;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`

export const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
`
export const StyledInnerButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-right: 5px;
`
