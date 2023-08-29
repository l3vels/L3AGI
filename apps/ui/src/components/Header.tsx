import { useContext } from 'react'
import styled from 'styled-components'
import BurgerMenuIconSvg from 'assets/svgComponents/BurgerMenuIconSvg'
// import HomeIconSvg from "../assets/svgComponents/HomeIcon"
import NavigationButton from 'atoms/NavigationButton'
import { HEADER_DATA } from 'helpers/navigationHelper'
import AvatarDropDown from 'components/AvatarDropDown'
import Label from 'atoms/Label'
import { AuthContext } from 'contexts'

const Header = ({ setShowMenu }: any) => {
  const { user } = useContext(AuthContext)

  const fullName = user && `${user.first_name} ${user.last_name}`

  return (
    <StyledHeader>
      <StyledColumns>
        <StyledBurgerIcon onClick={() => setShowMenu((prevValue: boolean) => !prevValue)}>
          <BurgerMenuIconSvg />
        </StyledBurgerIcon>
        {HEADER_DATA.map(item => (
          <NavigationButton
            key={item.name}
            value={item.name}
            to={item.routeLink}
            icon={item.icon}
          />
        ))}
      </StyledColumns>
      <StyledRightContainer>
        <Label color={'white'}>{fullName}</Label>
        <AvatarDropDown />
      </StyledRightContainer>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`

const StyledColumns = styled.div`
  display: flex;
`

const StyledBurgerIcon = styled.div`
  align-self: center;
  padding: 0 15px;
  cursor: pointer;
`

const StyledRightContainer = styled.div`
  justify-self: end;
  align-items: center;
  display: flex;
  gap: 20px;
`
