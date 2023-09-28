import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import 'react-pro-sidebar/dist/css/styles.css'

import includes from 'lodash/includes'

import Menu from '@l3-lib/ui-core/dist/Menu'
import MenuItem from '@l3-lib/ui-core/dist/MenuItem'
import MenuTitle from '@l3-lib/ui-core/dist/MenuTitle'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import Loader from '@l3-lib/ui-core/dist/Loader'

import DialogContentContainer from '@l3-lib/ui-core/dist/DialogContentContainer'
import { useNavigate, useLocation } from 'react-router-dom'
import BurgerMenuIconSvg from 'assets/svgComponents/BurgerMenuIconSvg'

import AvatarDropDown from 'components/AvatarDropDown'
import { AuthContext } from 'contexts'

import { StyledFlex } from 'styles/globalStyle.css'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import LeftArrowIconSvg from 'assets/svgComponents/LeftArrowIconSvg'

import defaultLogo from '../assets/icons/defaultLogo.svg'

type NavbarProps = {
  showMenu: boolean
  setShowMenu: any
  navbarTitle?: any
  navbarItems?: any
  showHeader?: boolean
  updateHeader?: any
  logo?: string
  uploadLogoHandler?: (event: any) => void
  uploadingLogo?: boolean
  onClickGoBack?: any
  backText?: string
  currentRouteName?: string
}

const Navbar = ({
  showMenu,
  setShowMenu,
  navbarTitle = null,
  navbarItems,
  showHeader = true,
  updateHeader,
  logo,
  uploadLogoHandler,
  uploadingLogo,
  onClickGoBack,
  backText = 'back',
  currentRouteName,
}: NavbarProps) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const fullName = user && `${user.first_name} ${user.last_name}`

  const { pathname } = useLocation()

  const [path, setPath] = useState<string[]>([])

  useEffect(() => {
    const pathArr = pathname ? pathname.split('/') : []
    if (pathname === '/') {
      return setPath(['home'])
    }
    setPath(pathArr)
  }, [pathname])

  const inputFile = useRef(null as any)

  const onButtonClick = async () => {
    inputFile.current.click()
  }

  const onClickNavigate = (route: string) => {
    navigate(route)
  }

  return (
    <>
      {showMenu ? (
        <StyledBurgerIconOpen onClick={() => setShowMenu((prevValue: boolean) => !prevValue)}>
          {<BurgerMenuIconSvg />}
        </StyledBurgerIconOpen>
      ) : (
        <StyledNavBar showMenu={showMenu}>
          <StyledTopColumn showMenu={showMenu}>
            {!showMenu && showHeader && (
              <StyledHeaderBtn onClick={onClickGoBack}>
                <>
                  <LeftArrowIconSvg /> {backText}
                </>
              </StyledHeaderBtn>
            )}
            {currentRouteName && <StyledHeaderBtn>{currentRouteName}</StyledHeaderBtn>}
            <StyledBurgerIcon onClick={() => setShowMenu((prevValue: boolean) => !prevValue)}>
              {<CloseIconSvg />}
            </StyledBurgerIcon>
          </StyledTopColumn>

          <DialogContentContainer collapsed={showMenu}>
            <StyledMenu
              size='large'
              collapsed={showMenu}
              // useDocumentEventListeners={true}
              className='navbar__menu'
            >
              {navbarTitle && (
                <StyledMenuTitle
                  imageSrc={logo || defaultLogo}
                  onImageClick={() => onButtonClick()}
                  size='bg'
                  collapsed={showMenu}
                >
                  {uploadingLogo && (
                    <StyledLoaderWrapper>
                      <Loader />
                    </StyledLoaderWrapper>
                  )}
                  {!showMenu && (
                    <StyledEditableHeading
                      value={navbarTitle}
                      placeholder={'Name'}
                      type={EditableHeading.types.h1}
                      onCancelEditing={() => navigate(-1)}
                      onFinishEditing={(value: any) => {
                        if (value === '') {
                          updateHeader('Untitled')
                        } else {
                          updateHeader(value)
                        }
                      }}
                    />
                  )}
                </StyledMenuTitle>
              )}
              {navbarItems &&
                navbarItems?.map((item: any) => {
                  const findIndex = includes(path, item.active)
                  return (
                    <MenuItem
                      className='navbar_menu_item'
                      key={item.name}
                      collapsed={showMenu}
                      icon={item.icon}
                      title={item.name}
                      onClick={() => {
                        if (item.active === 'new tab') {
                          window.open(`${item.routeLink}`, '_blank')
                        } else {
                          onClickNavigate(item.routeLink)
                        }
                      }}
                      // description={item.description ? item.description : `${item.name} description`}
                      active={findIndex}
                    />
                  )
                })}
            </StyledMenu>
          </DialogContentContainer>

          <StyledAvatarColumn showMenu={showMenu}>
            {/* <AvatarDropDown /> */}
            {!showMenu && <span>{fullName}</span>}
          </StyledAvatarColumn>
          {uploadLogoHandler && (
            <input
              type='file'
              ref={inputFile}
              style={{ display: 'none' }}
              onChange={(event: any) => uploadLogoHandler(event)}
            />
          )}
        </StyledNavBar>
      )}
    </>
  )
}

export default Navbar

const StyledNavBar = styled.nav<{ showMenu?: boolean }>`
  padding: ${p => (p.showMenu ? '28px 16px' : '46px 32px')};
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto 1fr auto;
  max-height: 100vh;
  overflow: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

const StyledBurgerIcon = styled.div`
  align-self: center;
  cursor: pointer;
`
const StyledBurgerIconOpen = styled(StyledBurgerIcon)`
  cursor: pointer;
  padding-top: 46px;
  align-self: start;
  height: -webkit-fill-available;
  background: rgba(255, 255, 255, 0.1);
  padding-left: 24px;
`

export const StyledHeaderBtn = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #fff;
  display: flex;
  gap: 25px;
  align-items: center;
  cursor: pointer;
  svg {
    path {
      fill: #fff;
      fill-opacity: 1;
    }
  }
`

const StyledTopColumn = styled(StyledFlex)<{ showMenu?: boolean }>`
  margin-bottom: 24px;
  justify-content: ${p => (p.showMenu ? 'center' : null)};
  padding: 0 23px;
`

const StyledAvatarColumn = styled.div<{ showMenu?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  justify-content: ${p => (p.showMenu ? 'center' : null)};
  margin-top: 40px;
`

const StyledMenu = styled(Menu)`
  width: -webkit-fill-available;
  min-width: 100%;
`

const StyledMenuTitle = styled(MenuTitle)<{ collapsed?: boolean }>`
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0px;
  ${({ collapsed }) =>
    collapsed &&
    `
    justify-content: center;
  `}
  label {
    color: #fff !important;
  }
`
const StyledEditableHeading = styled(EditableHeading)`
  width: 250px;
  color: #fff;
  margin-bottom: 15px;
`
const StyledLoaderWrapper = styled.div`
  position: absolute;
  width: 40px;

  margin-bottom: 20px;
  margin-left: 5px;
`
