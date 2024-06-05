import styled from 'styled-components'

import TypographySecondary from 'components/Typography/Secondary'
import Tags from 'share-ui/components/Tags/Tags'

import { StyledIcon, StyledImg } from '../../ApiCardStyles'
import { StyledColumn } from './LogsPanelStyles'
import TypographyPrimary from 'components/Typography/Primary'
import { useState } from 'react'
import HiddenContent from './HiddenContent'

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

  const [toggle, setToggle] = useState(false)

  return (
    <StyledRoot>
      <StyledCardWrapper onClick={() => setToggle(!toggle)}>
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
      {toggle && (
        <StyledHiddenContent>
          <HiddenContent />
        </StyledHiddenContent>
      )}
    </StyledRoot>
  )
}

export default LogsCard

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
`

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

  cursor: pointer;
`
const StyledHiddenContent = styled.div`
  width: 100%;
  height: fit-content;
  /* background-color: rgba(0, 0, 0, 0.04); */
  opacity: 0.9;
  box-shadow: inset 0 10px 5px -5px rgba(0, 0, 0, 0.05), inset 0 -10px 5px -5px rgba(0, 0, 0, 0.05);

  background-color: rgb(248 250 252);
`
