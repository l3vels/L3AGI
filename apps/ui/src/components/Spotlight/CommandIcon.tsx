import styled, { css, useTheme } from 'styled-components'
import commandIcon from 'assets/icons/command.png'
import darkCommandIcon from 'assets/icons/darkCommand.png'

const CommandIcon = () => {
  const theme = useTheme()

  return (
    <StyledRightIcon>
      <StyledIcon
        src={
          theme.body.backgroundColorPrimary === 'rgb(253,252,250)' ? darkCommandIcon : commandIcon
        }
      />

      <StyledKeyIcon>K</StyledKeyIcon>
    </StyledRightIcon>
  )
}

export default CommandIcon

const StyledRightIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2px;
  margin-left: auto;

  width: fit-content;
`
const StyledIcon = styled.img<{ active?: boolean }>`
  ${props =>
    !props.active &&
    css`
      opacity: 0.4;
    `}
  border-radius: 4px;
  width: 20px;
  height: 20px;

  border: ${({ theme }) => theme.body.commandBorderColor};
`
const StyledKeyIcon = styled.span<{ active?: boolean }>`
  display: flex;
  width: 20px;
  height: 20px;
  padding: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: ${({ theme }) => theme.body.commandBorderColor};
  background: var(--basic-foreground-white-1, rgba(255, 255, 255, 0.1));
  color: ${({ theme }) => theme.body.textColorSecondary};

  ${props =>
    !props.active &&
    css`
      opacity: 0.4;
    `};
`
