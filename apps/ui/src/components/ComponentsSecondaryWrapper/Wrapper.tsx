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
    <StyledSecondaryWrapper id='components_wrapper' noPadding={noPadding} hideBox={hideBox}>
      {children}
    </StyledSecondaryWrapper>
  )
}

export default ComponentsWrapper

const StyledSecondaryWrapper = styled.div<{ noPadding: boolean; hideBox: boolean }>`
  background: ${({ theme }) => theme.body.componentsSecondaryWrapperBg};
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);
  border-radius: 27.5px;
  border: ${({ theme }) => theme.body.border};
  padding: 55px 35px;
  padding-top: 20px;
  // padding-bottom: 90px;
  position: relative;
  height: 100%;
  /* max-height: fit-content; */
  min-height: 200px;
  width: 100%;
  ${p =>
    p.noPadding &&
    css`
      padding: 15px 0;
    `};
  ${p =>
    p.hideBox &&
    css`
      background: transparent;
      border-color: transparent;
      box-shadow: unset;
      padding: 0;
    `};
`
