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
export const StyledTab = styled(Tab)<{ isDisabled?: boolean; isError?: boolean }>`
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

  ${p =>
    p.isError &&
    css`
      .tab-inner {
        outline: 2px solid #ef5533;
        border-radius: 60px;
      }
    `};
`
