import { SDK_DATA } from './constants'
import { useState } from 'react'
import styled from 'styled-components'

import TypographyPrimary from 'components/Typography/Primary'
import Typography from 'share-ui/components/typography/Typography'

import AiMessageMarkdown from 'modals/AIChatModal/components/ChatMessageList/components/AiMessageMarkdown'
import { StyledForm, StyledInnerFormWrapper } from './SubnetsStyles'

const SDKs = () => {
  const [pickedData, setPickedData] = useState(SDK_DATA[0])

  return (
    <>
      <StyledForm>
        <StyledInnerFormWrapper style={{ width: '50%' }}>
          <TypographyPrimary
            style={{ fontWeight: 500 }}
            value={`SDKs`}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
          />
          <StyledCardsWrapper>
            {SDK_DATA.map(data => {
              return (
                <StyledCard
                  picked={data === pickedData}
                  key={data.name}
                  onClick={() => setPickedData(data)}
                >
                  <StyledImg src={data.logo} />

                  <TypographyPrimary
                    style={{ fontWeight: 500 }}
                    value={data.name}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.md}
                  />
                </StyledCard>
              )
            })}
          </StyledCardsWrapper>
        </StyledInnerFormWrapper>

        <StyledInnerFormWrapper style={{ width: '50%', marginTop: '30px' }}>
          <AiMessageMarkdown children={pickedData.code} />
        </StyledInnerFormWrapper>
      </StyledForm>
    </>
  )
}

export default SDKs

const StyledCard = styled.div<{ picked: boolean }>`
  width: 150px;
  height: 100px;

  border-radius: 10px;
  border: 1px solid #d4d4d479;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: ${({ picked }) => (picked ? '0px 4px 4px 0px rgba(0, 0, 0, 0.2)' : 'none')};

  &:hover {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  }

  cursor: pointer;
`
const StyledCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`
const StyledImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`
