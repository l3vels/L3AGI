import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

type NavigationButtonProps = {
  value: string
  icon?: any
  to?: any
}
const NavigationButton = ({ value, icon, to, ...props }: NavigationButtonProps) => (
  <StyledHeaderLink
    active={({ isActive }: any) => (isActive ? 'active' : '')}
    end
    to={to}
    // {...props}
  >
    <StyledHeaderButton>
      {icon}
      <StyledSpan>{value}</StyledSpan>
    </StyledHeaderButton>
  </StyledHeaderLink>
)

const StyledHeaderLink = styled(NavLink)<{ active?: any }>`
  text-decoration: none;
  &.active {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    span {
      color: ${p => p.theme.body.textColor};
    }
    svg {
      path {
        stroke-opacity: 1;
        fill-opacity: 1;
      }
    }
  }
`

const StyledHeaderButton = styled.button`
  padding: 9px 8px 9px 13px;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 24px;
  letter-spacing: 0.0025em;
  color: rgba(255, 255, 255, 0.8);
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  column-gap: 9px;
  text-transform: capitalize;
`

const StyledSpan = styled.span`
  color: rgba(255, 255, 255, 0.6);
`

export default NavigationButton
