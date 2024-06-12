import styled from 'styled-components'

export const StyledLogsContainer = styled.div`
  padding: 5px;

  margin-top: 10px;

  display: flex;
  flex-direction: column;

  gap: 20px;

  width: fit-content;
`

export const StyledCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;

  background: ${({ theme }) => theme.body.cardBgColor};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

  border-radius: 22px;
`

export const StyledColumn = styled.div<{ customWidth?: number }>`
  display: flex;
  flex-direction: column;

  gap: 5px;

  width: ${({ customWidth }) => (customWidth ? `${customWidth}px` : 'fit-content')};
`

export const StyledLogsHeader = styled.div`
  display: flex;

  padding: 0 30px;

  font-weight: 500;

  width: fit-content;

  padding-top: 10px;
`
