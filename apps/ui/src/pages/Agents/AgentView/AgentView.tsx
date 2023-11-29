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
import { AgentWithConfigs } from 'types'

const AgentView = ({ agentData }: { agentData?: AgentWithConfigs }) => {
  const { t } = useTranslation()
  const params = useParams()
  const { agentId } = params
  const { data: agentById } = useAgentByIdService({ id: agentId || '' })

  const agent = agentById || agentData
  if (!agent) return <div />

  const { configs, system_message } = agent

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
      <ComponentsWrapper noPadding hideBox={!!agentData}>
        <StyledInnerWrapper noPadding={!!agentData}>
          <StyledLeftColumn>
            <AgentVIewDetailBox agentData={agent} />
          </StyledLeftColumn>

          <StyledRightColumn>
            {system_message?.length ? (
              <AdditionalInfoBox items={[system_message]} title={t('system-message')} noCount />
            ) : null}

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
              <AdditionalInfoBox items={[greeting]} title={t('greeting')} noCount />
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
