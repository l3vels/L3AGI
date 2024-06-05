import styled from 'styled-components'
import { StyledWrapper } from '../../SubnetsStyles'

import TypographyPrimary from 'components/Typography/Primary'
import {
  StyledCardsContainer,
  StyledColumn,
  StyledLogsContainer,
  StyledLogsHeader,
} from './LogsPanelStyles'
import LogsCard from './LogsCard'
import { SUBNETS } from '../../constants'

const LogsPanel = () => {
  const apiData = SUBNETS[1].apis
  const tempTestingData = apiData[0]
  return (
    <StyledWrapper>
      <StyledLogsContainer>
        <StyledLogsHeader>
          <StyledColumn customWidth={294}>
            <TypographyPrimary size='small' value={'Service'} />
          </StyledColumn>

          <StyledColumn customWidth={400}>
            <TypographyPrimary size='small' value={'Path'} />
          </StyledColumn>
          <StyledColumn customWidth={150}>
            <TypographyPrimary size='small' value={'TimeStamp'} />
          </StyledColumn>
          <StyledColumn customWidth={100}>
            <TypographyPrimary size='small' value={'Status'} />
          </StyledColumn>
          <StyledColumn customWidth={120}>
            <TypographyPrimary size='small' value={'Consumer ID'} />
          </StyledColumn>
        </StyledLogsHeader>

        <StyledCardsContainer>
          <LogsCard
            service={{
              name: tempTestingData.name,
              subName: 'Subnet 18',
              logo: tempTestingData.logo,
            }}
            path={{
              method: 'GET',
              url: '/vault/consumers/test-consumer',
            }}
            timeStamp={{
              date: '5/31/2024',
              hours: '2:10:01 PM',
            }}
            requestStatus={'404'}
            consumerId={'test-consumer'}
          />
          <LogsCard
            service={{
              name: tempTestingData.name,
              subName: 'Subnet 18',
              logo: tempTestingData.logo,
            }}
            path={{
              method: 'GET',
              url: '/vault/consumers/test-consumer',
            }}
            timeStamp={{
              date: '5/31/2024',
              hours: '2:10:01 PM',
            }}
            requestStatus={'404'}
            consumerId={'test-consumer'}
          />
        </StyledCardsContainer>
      </StyledLogsContainer>
    </StyledWrapper>
  )
}

export default LogsPanel
