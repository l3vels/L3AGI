import styled from 'styled-components'

export const StyledCardsWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 24px;
  padding: 20px;

  height: 100%;
  width: 100%;

  padding-bottom: 50px;
`
export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding-right: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  overflow: auto;

  padding-bottom: 100px;
`

export const StyledForm = styled.div`
  width: 100%;
  /* max-width: 800px; */
  max-width: 80rem;

  margin-top: 20px;

  background: ${({ theme }) => theme.body.cardBgColor};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;

  border-radius: 22px;

  padding: 20px;

  display: flex;
  flex-direction: row;
  gap: 16px;
  /* justify-content: center; */
`

export const StyledTextFieldWrapper = styled.div`
  width: 100%;
  /* max-width: 800px; */

  display: flex;
  flex-direction: column;
  gap: 8px;

  font-weight: 500;
`
export const StyledInnerFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
