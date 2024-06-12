import styled, { css } from 'styled-components'

const ComponentsWrapper = ({
  children,
  noPadding = false,
  hideBox = false,
}: {
  children: any
  noPadding?: boolean
  hideBox?: boolean
}) => {
  return (
    <StyledMainWrapper noPadding={noPadding} hideBox={hideBox}>
      {children}
    </StyledMainWrapper>
  )
}

export default ComponentsWrapper

const StyledMainWrapper = styled.div<{ noPadding: boolean; hideBox: boolean }>`
  background: ${({ theme }) => theme.body.componentsWrapperBg};
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);
  border-radius: 27.5px;

  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

  padding: 55px 35px;
  padding-top: 20px;

  position: relative;
  height: 100%;

  min-height: 200px;

  width: 100%;

  ${p =>
    p.noPadding &&
    css`
      padding: 15px 0;
    `}
  ${p =>
    p.hideBox &&
    css`
      background: transparent;
      border-color: transparent;
      box-shadow: unset;
      padding: 0;
    `};

  display: flex;
  justify-content: center;
`
