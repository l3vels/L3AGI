import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import CardWrapper from 'components/wrappers/CardWrapper'
import Button from 'share-ui/components/Button/Button'
import TextField from 'share-ui/components/TextField/TextField'
import styled from 'styled-components'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { StyledHorizontalDivider } from 'routes/ChatRouteLayout'
import { CreditCard, Dollar } from 'share-ui/components/Icon/Icons'

const General = () => {
  return (
    <StyledRoot>
      <CardWrapper>
        <StyledContentContainer>
          <StyledHeader>
            <TypographyPrimary size='x-large' value='Balance: $0.000' />
          </StyledHeader>

          <StyledBody>
            <TypographySecondary size='small' value='Spend Limit: $40 / hr' />
            <TypographySecondary size='small' value='Current GPU Cloud Spend: $0.000 / hr' />
          </StyledBody>

          <StyledHorizontalDivider />

          <StyledBody>
            <TypographyPrimary size='medium' semiBold value='Add Credit' />

            <StyledRow>
              <TextField placeholder='$0.000' />
            </StyledRow>
            <StyledRow>
              <ToggleButtonGroup
                color='primary'
                value={''}
                exclusive
                onChange={() => {}}
                aria-label='Platform'
              >
                <ToggleButton
                  value='gpu'
                  size='small'
                  sx={{
                    background: '#000',
                    // border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    fontWeight: 600,
                    color: '#FFF',
                    '&:hover': {
                      backgroundColor: '#000',
                    },
                  }}
                >
                  <CreditCard size={30} />
                </ToggleButton>

                <ToggleButton
                  value='cpu'
                  size='small'
                  sx={{
                    color: '#000',
                    background: 'transparent',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                    fontWeight: 600,
                    '&:hover': {
                      background: '#000',
                      color: '#FFF',
                    },
                  }}
                >
                  <StyledBitcoin>₿</StyledBitcoin>
                </ToggleButton>
              </ToggleButtonGroup>
              <Button>Pay with Card</Button>
            </StyledRow>
          </StyledBody>
        </StyledContentContainer>
      </CardWrapper>

      <CardWrapper>
        <StyledContentContainer>
          <StyledHeader>
            <TypographyPrimary value='Automatic Payments' semiBold />
          </StyledHeader>

          <StyledBody>
            <TypographySecondary
              size='small'
              value='Configure automatic billing by adding a card to your account. When your balance nears your Auto-Pay threshold, we will attempt to reload RunPod credits by billing your saved card max once per hour for the Auto-Pay amount that is configured below.'
            />

            <StyledRow>
              <StyledImg src='https://cdn-icons-png.freepik.com/512/4341/4341764.png' />

              <Button disabled size='small'>
                Add Card
              </Button>
            </StyledRow>
          </StyledBody>
        </StyledContentContainer>
      </CardWrapper>
    </StyledRoot>
  )
}
export default General

const StyledRoot = styled.div`
  padding-right: 24px;

  display: flex;
  flex-direction: column;

  gap: 50px;

  overflow: auto;

  height: 100%;
  width: 100%;
`
const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;
`
const StyledHeader = styled.div``

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  max-width: 800px;
`
const StyledRow = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  width: 300px;
`
const StyledBitcoin = styled.div`
  width: 30px;

  height: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  font-size: 16px;

  margin-top: 2px;
`
const StyledImg = styled.img`
  object-fit: cover;

  margin-top: 10px;

  width: 150px;
  height: 100px;
`
