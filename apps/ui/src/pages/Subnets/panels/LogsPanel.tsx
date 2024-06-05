import styled from 'styled-components'
import { StyledWrapper } from '../SubnetsStyles'
import { SUBNETS } from '../constants'
import { StyledIcon, StyledImg } from '../ApiCardStyles'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import Tags from 'share-ui/components/Tags/Tags'

const LogsPanel = () => {
  const apiData = SUBNETS[1].apis
  const tempTestingData = apiData[0]

  return (
    <StyledWrapper>
      <StyledLogsContainer>
        <StyledLogsHeader>
          <StyledColumn customWidth={244}>
            <TypographyPrimary size='small' value={'Service'} />
          </StyledColumn>

          <StyledColumn customWidth={300}>
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
          <StyledCardWrapper>
            <StyledMainInfo>
              <StyledImg src={tempTestingData.logo} />
              <StyledColumn customWidth={200}>
                <TypographyPrimary size='small' value={'API NAME'} />
                <TypographySecondary size='small' value={'SUBNET NAME'} />
              </StyledColumn>
            </StyledMainInfo>

            <StyledColumn customWidth={300}>
              <TypographyPrimary size='small' value={'GET'} />
              <TypographySecondary size='small' value={'/vault/consumers/test-consumer'} />
            </StyledColumn>

            <StyledColumn customWidth={150}>
              <TypographyPrimary size='small' value={'5/31/2024'} />
              <TypographySecondary size='small' value={'2:10:01 PM'} />
            </StyledColumn>

            <StyledColumn customWidth={100}>
              <Tags label={404} readOnly color='#FCEAEC' size={Tags.sizes?.SMALL} />
            </StyledColumn>

            <StyledColumn customWidth={120}>
              <Tags label={'test-consumer'} readOnly color='#f9b3ff' size={Tags.sizes?.SMALL} />
            </StyledColumn>
          </StyledCardWrapper>
          <StyledCardWrapper>
            <StyledMainInfo>
              <StyledImg src={tempTestingData.logo} />
              <StyledColumn customWidth={200}>
                <TypographyPrimary size='small' value={'API NAME'} />
                <TypographySecondary size='small' value={'SUBNET NAME'} />
              </StyledColumn>
            </StyledMainInfo>

            <StyledColumn customWidth={300}>
              <TypographyPrimary size='small' value={'GET'} />
              <TypographySecondary size='small' value={'/vault/consumers/test-consumer'} />
            </StyledColumn>

            <StyledColumn customWidth={150}>
              <TypographyPrimary size='small' value={'5/31/2024'} />
              <TypographySecondary size='small' value={'2:10:01 PM'} />
            </StyledColumn>

            <StyledColumn customWidth={100}>
              <Tags label={404} readOnly color='#FCEAEC' size={Tags.sizes?.SMALL} />
            </StyledColumn>

            <StyledColumn customWidth={120}>
              <Tags label={'test-consumer'} readOnly color='#f9b3ff' size={Tags.sizes?.SMALL} />
            </StyledColumn>
          </StyledCardWrapper>
          <StyledCardWrapper>
            <StyledMainInfo>
              <StyledImg src={tempTestingData.logo} />
              <StyledColumn customWidth={200}>
                <TypographyPrimary size='small' value={'API NAME'} />
                <TypographySecondary size='small' value={'SUBNET NAME'} />
              </StyledColumn>
            </StyledMainInfo>

            <StyledColumn customWidth={300}>
              <TypographyPrimary size='small' value={'GET'} />
              <TypographySecondary size='small' value={'/vault/consumers/test-consumer'} />
            </StyledColumn>

            <StyledColumn customWidth={150}>
              <TypographyPrimary size='small' value={'5/31/2024'} />
              <TypographySecondary size='small' value={'2:10:01 PM'} />
            </StyledColumn>

            <StyledColumn customWidth={100}>
              <Tags label={404} readOnly color='#FCEAEC' size={Tags.sizes?.SMALL} />
            </StyledColumn>

            <StyledColumn customWidth={120}>
              <Tags label={'test-consumer'} readOnly color='#f9b3ff' size={Tags.sizes?.SMALL} />
            </StyledColumn>
          </StyledCardWrapper>
          <StyledCardWrapper>
            <StyledMainInfo>
              <StyledImg src={tempTestingData.logo} />
              <StyledColumn customWidth={200}>
                <TypographyPrimary size='small' value={'API NAME'} />
                <TypographySecondary size='small' value={'SUBNET NAME'} />
              </StyledColumn>
            </StyledMainInfo>

            <StyledColumn customWidth={300}>
              <TypographyPrimary size='small' value={'GET'} />
              <TypographySecondary size='small' value={'/vault/consumers/test-consumer'} />
            </StyledColumn>

            <StyledColumn customWidth={150}>
              <TypographyPrimary size='small' value={'5/31/2024'} />
              <TypographySecondary size='small' value={'2:10:01 PM'} />
            </StyledColumn>

            <StyledColumn customWidth={100}>
              <Tags label={404} readOnly color='#FCEAEC' size={Tags.sizes?.SMALL} />
            </StyledColumn>

            <StyledColumn customWidth={120}>
              <Tags label={'test-consumer'} readOnly color='#f9b3ff' size={Tags.sizes?.SMALL} />
            </StyledColumn>
          </StyledCardWrapper>
        </StyledCardsContainer>
      </StyledLogsContainer>
    </StyledWrapper>
  )
}

export default LogsPanel

const StyledLogsContainer = styled.div`
  padding: 5px;

  margin-top: 10px;

  display: flex;
  flex-direction: column;

  gap: 20px;
`

const StyledCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;

  background: ${({ theme }) => theme.body.cardBgColor};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

  border-radius: 22px;
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
const StyledColumn = styled.div<{ customWidth?: number }>`
  display: flex;
  flex-direction: column;

  gap: 5px;

  width: ${({ customWidth }) => (customWidth ? `${customWidth}px` : 'fit-content')};
`

const StyledMainInfo = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`
const StyledLogsHeader = styled.div`
  display: flex;

  padding: 0 30px;

  font-weight: 500;

  width: fit-content;
`
