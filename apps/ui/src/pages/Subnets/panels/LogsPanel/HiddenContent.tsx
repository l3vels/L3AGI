import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import AiMessageMarkdown from 'modals/AIChatModal/components/ChatMessageList/components/AiMessageMarkdown'
import styled from 'styled-components'

const HiddenContent = () => {
  return (
    <StyledRoot>
      <StyledInfoContainer>
        <StyledInfoValue>
          <TypographySecondary size='small' value='API Style' semiBold />
          <TypographyPrimary size='small' value='REST' />
        </StyledInfoValue>
        <StyledInfoValue>
          <TypographySecondary size='small' value='Duration' semiBold />
          <TypographyPrimary size='small' value='22ms' />
        </StyledInfoValue>
        <StyledInfoValue>
          <TypographySecondary size='small' value='Epoch' semiBold />
          <TypographyPrimary size='small' value='1717150201577' />
        </StyledInfoValue>
        <StyledInfoValue>
          <TypographySecondary size='small' value='Latency' semiBold />
          <TypographyPrimary size='small' value='1 ms' />
        </StyledInfoValue>
        <StyledInfoValue>
          <TypographySecondary size='small' value='Request ID' semiBold />
          <TypographyPrimary size='small' value='7559735d-6688-4b23-9015-a2c4b5043369' />
        </StyledInfoValue>
        <StyledInfoValue>
          <TypographySecondary size='small' value='Error: 404' semiBold />
          <TypographyPrimary size='small' value='Not Found' />
        </StyledInfoValue>
        <StyledInfoValue>
          <TypographySecondary size='small' value='Full URL' semiBold />
          <TypographyPrimary
            size='small'
            value='https://unify.apideck.com/vault/consumers/test-consumer'
          />
        </StyledInfoValue>
      </StyledInfoContainer>

      <StyledRequestContainer>
        <StyledRequestCard>
          <StyledRequestCardHeader>
            <StyledInfoValue>
              <TypographyPrimary size='large' value='Request' bold />
              <TypographySecondary size='medium' value='Get consumer' />
            </StyledInfoValue>
          </StyledRequestCardHeader>

          <StyledRequestCardBody>
            <StyledInfoValue>
              <TypographySecondary size='small' value='accept' semiBold />
              <TypographyPrimary size='small' value='application/json, text/plain, */*' />
            </StyledInfoValue>

            <StyledInfoValue>
              <TypographySecondary size='small' value='accept-encoding' semiBold />
              <TypographyPrimary size='small' value='gzip, compress, deflate, br' />
            </StyledInfoValue>
          </StyledRequestCardBody>
        </StyledRequestCard>

        <StyledRequestCard>
          <StyledRequestCardHeader>
            <StyledInfoValue>
              <TypographyPrimary size='large' value='Response' bold />
              <TypographySecondary size='medium' value='Get consumer' />
            </StyledInfoValue>
          </StyledRequestCardHeader>

          <StyledRequestCardBody>
            <StyledInfoValue>
              <TypographySecondary size='small' value='access-control-allow-credentials' semiBold />
              <TypographyPrimary size='small' value='true' />
            </StyledInfoValue>

            <StyledInfoValue>
              <TypographySecondary size='small' value='access-control-allow-origin' semiBold />
              <TypographyPrimary size='small' value='*' />
            </StyledInfoValue>

            <StyledDivider />

            <TypographyPrimary size='medium' value='Body' bold />

            <AiMessageMarkdown
              children={`
    {
        "status_code": 404,
        "error": "Not Found",
        "type_name": "EntityNotFoundError",
        "message": "Unknown Consumer",
        "detail": "Could not find consumer with id: 'test-consumer'",
        "ref": "https://developers.apideck.com/errors#entitynotfounderror"
    }
            `}
            />
          </StyledRequestCardBody>
        </StyledRequestCard>
      </StyledRequestContainer>
    </StyledRoot>
  )
}

export default HiddenContent

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;

  padding: 20px 30px;

  gap: 30px;
`
const StyledRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;

  padding: 20px 30px;

  gap: 30px;
`

const StyledInfoValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const StyledRequestCard = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid #e2e2e2;
  border-radius: 10px;

  background: ${({ theme }) => theme.body.cardBgColor};

  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
`
const StyledRequestCardHeader = styled.div`
  border-bottom: 1px solid #e2e2e2;
  padding: 20px;
`
const StyledRequestCardBody = styled.div`
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e2e2e2;
`
