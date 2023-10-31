import styled from 'styled-components'

export const StyledTabRootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  gap: 20px;
`

export const StyledTabListWrapper = styled.div`
  border: ${({ theme }) => theme.body.secondaryBorder};
  border-radius: 30px;
  width: fit-content;
`
export const StyledTabListSpan = styled.span`
  color: ${({ theme }) => theme.body.textColorPrimary};
`
