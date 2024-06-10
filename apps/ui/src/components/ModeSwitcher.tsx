import Integrations from 'share-ui/components/Icon/Icons/components/integrations'
import {
  StyledDropDownMenuItem,
  StyledDropDownMenuRoot,
  StyledDropDownMenuTrigger,
  StyledDropdownContent,
} from './AvatarDropDown'
import TypographyPrimary from './Typography/Primary'
import { Arrow } from '@radix-ui/react-dropdown-menu'
import { useAppModeContext } from 'context/AppModeContext'
import { Check } from 'share-ui/components/Icon/Icons'
import styled from 'styled-components'

const ModeSwitcher = () => {
  const { mode, setMode } = useAppModeContext()

  return (
    <StyledDropDownMenuRoot>
      <StyledDropDownMenuTrigger>
        <Integrations />
      </StyledDropDownMenuTrigger>
      <StyledDropdownContent>
        <StyledDropDownMenuItem onClick={() => setMode('Compute')}>
          <TypographyPrimary value='Compute' size={'small'} />
          {mode === 'Compute' && <StyledCheck />}
        </StyledDropDownMenuItem>
        <StyledDropDownMenuItem onClick={() => setMode('Subnet API')}>
          <TypographyPrimary value='Subnet API' size={'small'} />
          {mode === 'Subnet API' && <StyledCheck />}
        </StyledDropDownMenuItem>

        <Arrow className='text-white' fill='currentColor' />
      </StyledDropdownContent>
    </StyledDropDownMenuRoot>
  )
}

export default ModeSwitcher

const StyledCheck = styled(Check)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }

  margin-left: auto;
`
