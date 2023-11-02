import styled, { css } from 'styled-components'

import Tab from '@l3-lib/ui-core/dist/Tab'

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
export const StyledFormTab = styled(Tab)<{ isDisabled?: boolean }>`
  &.active .tab-inner {
    background-color: ${({ theme }) => theme.body.detailCardBackgroundColor};
  }

  ${p =>
    p.isDisabled &&
    css`
      position: absolute;
      z-index: -1;
      pointer-events: none;
      opacity: 0;
    `};
`
