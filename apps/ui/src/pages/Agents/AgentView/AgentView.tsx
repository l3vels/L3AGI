import { useParams } from 'react-router-dom'

import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { useAgentByIdService } from 'services/agent/useAgentByIdService'

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

import AgentVIewDetailBox from './components/AgentViewDetailBox'

const AgentView = ({ agentData }: { agentData?: any }) => {
  const { t } = useTranslation()
  const params = useParams()
  const { agentId } = params
  const { data: agentById } = useAgentByIdService({ id: agentId || '' })

  if (!agentById && !agentData) return <div />

  const { configs } = agentById || agentData

  const { tools, goals, constraints, instructions, datasources, suggestions, greeting, text } =
    configs

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        {!agentData && (
          <>
            <div>
              <>
                <StyledSectionTitle>{t('agent')}</StyledSectionTitle>
                <StyledSectionDescription>{t('agent-view-description')}</StyledSectionDescription>
              </>
            </div>

            <div>
              <BackButton />
            </div>
          </>
        )}
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding hideBox={agentData}>
        <StyledInnerWrapper noPadding={agentData}>
          <StyledLeftColumn>
            <AgentVIewDetailBox agentData={agentById || agentData} />
          </StyledLeftColumn>

          <StyledRightColumn>
            {tools?.length > 0 && <AgentToolkits tools={tools} />}

            {datasources?.length > 0 && <AgentDatasources datasources={datasources} />}

            {goals?.length > 0 && (
              <AdditionalInfoBox
                items={goals}
                title={goals.length === 1 ? '1 Goal' : `${goals.length} Goals`}
              />
            )}

            {constraints?.length > 0 && (
              <AdditionalInfoBox
                items={constraints}
                title={
                  constraints.length === 1 ? '1 Constraint' : `${constraints.length} Constraints`
                }
              />
            )}

            {instructions?.length > 0 && (
              <AdditionalInfoBox
                items={instructions}
                title={
                  instructions.length === 1
                    ? '1 Instruction'
                    : `${instructions.length} Instructions`
                }
              />
            )}

            {suggestions?.length > 0 && (
              <AdditionalInfoBox
                items={suggestions}
                title={
                  suggestions.length === 1 ? '1 Suggestion' : `${suggestions.length} Suggestions`
                }
              />
            )}

            {greeting?.length > 0 && <AdditionalInfoBox items={[greeting]} title={'Greeting'} />}

            {text?.length > 0 && <AdditionalInfoBox items={[text]} title={'Advanced'} />}
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
export const StyledInnerButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-right: 5px;
`
