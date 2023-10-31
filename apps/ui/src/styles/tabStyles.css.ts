import styled from 'styled-components'

export const StyledTabRootWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 20px;
`

export const StyledTabListWrapper = styled.div`
  border: ${({ theme }) => theme.body.secondaryBorder};
  border-radius: 30px;
  width: fit-content;
  margin: 0 auto;
`
export const StyledTabListSpan = styled.span`
  color: ${({ theme }) => theme.body.textColorPrimary};
`
