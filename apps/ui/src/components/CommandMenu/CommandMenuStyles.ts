import { Command } from 'cmdk'
import styled from 'styled-components'

const StyledCommandInput = styled(Command.Input)`
  all: unset;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  outline: 0;
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid rgba(0, 0, 0, 0);
  font-weight: 500;
  border-radius: 4px;
  transition: border-color var(--motion-productive-medium) ease-in;
  padding: 8px 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // color: #fff !important;
  // color: !important;
  // background-color: rgba(255, 255, 255, 0.2);
  // background: rgba(255, 255, 255, 0.2);
  // border-radius: 100px;
  color: ${({ theme }) => theme.body.textColorPrimary};
  ::placeholder {
    color: ${({ theme }) => theme.body.textColorPrimary};
  }
`

const StyleEnterGroup = styled.div`
  visibility: hidden;
  display: flex;
  align-items: center;
  gap: 16px;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
`

const StyledCommandItem = styled(Command.Item)`
  &[aria-selected='true'] {
    background: ${({ theme }) => theme.body.cardBgColor};

    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 6px;

    ${StyleEnterGroup} {
      visibility: visible;
    }
  }
  margin-top: 2px;
  border: 1px solid transparent;
  // border: 1px solid rgba(255, 255, 255, 0.4);
  // border-radius: 6px;
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  padding: 10px 16px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  max-height: 60px;
  cursor: pointer;
`

const StyledCommandItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  color: ${({ theme }) => theme.body.textColorPrimary};
  svg {
    width: 27px;
  }
`

const StyledCommandList = styled(Command.List)`
  // margin-top: 38px;
  max-height: calc(100vh - 220px);
  overflow: scroll;
  padding: 10px 15px;
  border-top: ${({ theme }) => theme.body.commandBorderColor};
  ::-webkit-scrollbar {
    display: none;
  }
`

const StyledCommandWrapper = styled(Command)`
  // overflow: scroll;
`

const StyledCommandItemHeader = styled.div<{ marginTop?: any }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  margin-top: ${p => (p.marginTop ? p.marginTop : 0)}px;
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.8);
  }
`
const StyledSvgContainer = styled.div<{ type?: string }>`
  background: rgba(246, 247, 207, 0.6);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  ${({ type }) =>
    type === 'go_to' &&
    `
  background: rgba(246, 247, 207, 0.6);
  svg{ path { fill: linear-gradient(180deg, #FDFE53 0%, #EB9B3A 100%);; }}
  `}
  ${({ type }) =>
    type === 'create' &&
    `
  background: #1A3140;
  svg{ path { fill: #00AAFF; }}
  
  `}
  ${({ type }) =>
    type === 'ai' &&
    `
  background: #2E2740;
  svg{ path { fill: rgba(136, 85, 255, 1); }}
  
  `}
  ${({ type }) =>
    type === 'games' &&
    `
  background: transparent;
  
  `}
`

const StyledCommandListInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const StyledCommandDialog = styled(Command.Dialog)`
  background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.1));
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);
  position: fixed;
  z-index: 10000100;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 82%;
  max-height: 1000px;
  // overflow: scroll;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  // min-height: 500px;
  ::-webkit-scrollbar {
    display: none;
  }
`

export {
  StyledCommandInput,
  StyledCommandItem,
  StyledCommandList,
  StyledCommandWrapper,
  StyledCommandItemHeader,
  StyledSvgContainer,
  StyledCommandListInner,
  StyleEnterGroup,
  StyledCommandItemName,
  StyledCommandDialog,
}

// linear-gradient border

// &::after {
// content: '';
// position: absolute;
// inset: 0;
// border-radius: 6px;
// padding: 1px; /* control the border thickness */
// background: linear-gradient(180deg, #73fafd 0%, #50b1d7 100%);
// -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
// -webkit-mask-composite: xor;
// mask-composite: exclude;
// pointer-events: none;
// border: none;
// }
