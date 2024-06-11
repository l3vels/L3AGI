import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledAppContainer = styled.div`
  background: ${({ theme }) => theme.body.backgroundColorPrimary};
  height: 100vh;
  width: 100%;
  display: flex;

  flex-direction: column;

  padding: 28px 0;
`

const StyledMainLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  // min-height: 100vh;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
`
const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 72px;
  min-height: 72px;
  padding: 0 32px;
  grid-row: 1;
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 102030;
`

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  grid-row: 3;
  min-height: 72px;
  position: sticky;
  width: 100%;
  bottom: 0;
  padding: 0 32px;
  align-items: center;
  margin-bottom: 8px;
  margin-top: auto;
`

const StyledMainContainer = styled.main<{ expand?: boolean }>`
  width: 100%;
  height: 100%;

  grid-auto-rows: max-content;

  ::-webkit-scrollbar {
    display: none;
  }
`

const StyledInnerWrapper = styled.div``

const StyledAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.2);
  }
`

const StyledGroupContainer = styled.div<{ mb?: string; mt?: string; hideNavbar?: boolean }>`
  padding-bottom: ${p => p.mb && p.mb}px;
  padding-top: ${p => p.mt && p.mt}px;
  display: ${p => (p.hideNavbar ? 'none' : 'block')};
`

const StyledTableValue = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
`

const StyledTableHeaderGroup = styled.div``

const StyledTableActionBtn = styled.button`
  all: unset;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(255, 255, 255, 1);
  padding: 10px 26px;
`
const StyledLogoContainer = styled.div`
  width: 48px;
  height: 48px;
`

const StyledNavigationColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const StyledLogoWrapper = styled(Link)`
  display: flex;
  /* align-items: center; */

  text-decoration: none;
`

export {
  StyledAppContainer,
  StyledMainLayout,
  StyledHeader,
  StyledMainContainer,
  StyledInnerWrapper,
  StyledFooter,
  StyledAvatarContainer,
  StyledGroupContainer,
  StyledTableValue,
  StyledTableHeaderGroup,
  StyledTableActionBtn,
  StyledLogoContainer,
  StyledNavigationColumn,
  StyledLogoWrapper,
}
