import styled, { css } from 'styled-components'
import { StyledInnerWrapper } from 'styles/globalStyle.css'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'

const StyledSectionTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  font-size: 18px;
  color: ${({ theme }) => theme.body.textColorPrimary};
`

const StyledSectionDescription = styled.h2`
  font-style: normal;
  font-weight: 450;
  font-size: 12px;
  line-height: 24px;
  color: ${({ theme }) => theme.body.textColorSecondary};
`

const StyledInnerWrapperEdit = styled(StyledInnerWrapper)`
  gap: 40px;
`

const StyledFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-left: 8px;
  &::first-child {
    margin-right: 10px;
  }
  div {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;
  }
`

const StyledInnerGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 16px;
  margin-top: 27px;
  .grid_column_positioning {
    grid-column-start: 3;
    grid-row-start: 2;
    grid-row-end: 4;
  }
`

const StyledMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  height: 100%;
`

const StyledHeaderGroup = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: flex-end;
  gap: 15px;
  /* margin-bottom: 10px; */

  padding: 0 20px;
`
const StyledTabList = styled(TabList)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(50px);

  border-radius: 100px;

  .inner_tab {
    min-width: 80px;
  }
  .tab_plus {
    cursor: pointer;
    &.tab--wrapper .tab-inner {
      background: none;
    }
    min-width: 40px;
    a {
      &:hover {
        background-color: inherit !important;
      }
    }
  }
`

const StyledWrapperGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`
const StyledTabContext = styled(TabsContext)`
  max-height: 600px;
  overflow: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

export {
  StyledSectionTitle,
  StyledInnerWrapperEdit,
  StyledHeaderGroup,
  StyledFilterGroup,
  StyledInnerGroup,
  StyledMainWrapper,
  StyledSectionDescription,
  StyledSectionWrapper,
  StyledTabList,
  StyledWrapperGroup,
  StyledTabContext,
}
