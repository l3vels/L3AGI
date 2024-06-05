import styled from 'styled-components'

import TypographySecondary from 'components/Typography/Secondary'
import Tags from 'share-ui/components/Tags/Tags'

import { StyledIcon, StyledImg } from './ApiCardStyles'
import { StyledColumn } from './panels/LogsPanelStyles'
import TypographyPrimary from 'components/Typography/Primary'

interface LogsCardProps {
  service: { name: string; subName: string; logo: string }
  path: { method: string; url: string }
  timeStamp: { date: string; hours: string }
  requestStatus: string
  consumerId: string
}

const LogsCard = ({ service, path, timeStamp, requestStatus, consumerId }: LogsCardProps) => {
  const { name, subName, logo } = service
  const { method, url } = path
  const { date, hours } = timeStamp

  return (
    <StyledCardWrapper>
      <StyledMainInfo>
        <StyledImg src={logo} />
        <StyledColumn customWidth={250}>
          <TypographyPrimary size='small' value={name} />
          <TypographySecondary size='small' value={subName} />
        </StyledColumn>
      </StyledMainInfo>

      <StyledColumn customWidth={400}>
        <TypographyPrimary size='small' value={method} />
        <TypographySecondary size='small' value={url} />
      </StyledColumn>

      <StyledColumn customWidth={150}>
        <TypographyPrimary size='small' value={date} />
        <TypographySecondary size='small' value={hours} />
      </StyledColumn>

      <StyledColumn customWidth={100}>
        <Tags label={requestStatus} readOnly color='#FCEAEC' size={Tags.sizes?.SMALL} />
      </StyledColumn>

      <StyledColumn customWidth={120}>
        <Tags label={consumerId} readOnly color='#f9b3ff' size={Tags.sizes?.SMALL} />
      </StyledColumn>
    </StyledCardWrapper>
  )
}

export default LogsCard

const StyledMainInfo = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`

const StyledCardWrapper = styled.div`
  min-height: 100px;
  width: fit-content;

  display: flex;
  align-items: center;

  padding: 0 30px;

  border-bottom: 1px solid;
  border-color: #e4e4e4;
`
