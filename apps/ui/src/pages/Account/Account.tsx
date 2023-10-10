import useAccount from 'pages/Account/useAccount'
import { FormikProvider } from 'formik'

import TextField from '@l3-lib/ui-core/dist/TextField'
import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'

import { FLexSpaceBetween, StyledHeaderGroup } from 'styles/globalStyle.css'
import profile from 'assets/images/large.png'

import ChangePassword from 'pages/ChangePassword'

import AccountForm from './AccountForm/AccountForm'
import useChangePassword from 'pages/ChangePassword/useChangePassword'
import { StyledGroupContainer } from 'components/Layout/LayoutStyle'
import TypographyPrimary from 'components/Typography/Primary'
import HeadingPrimary from 'components/Heading/Primary'
import { ButtonPrimary } from 'components/Button/Button'

const Account = () => {
  const { openCreateChangePasswordModal } = useChangePassword()

  return (
    <StyledGroupContainer mt='20'>
      <div id='header_group'>
        <StyledHeaderGroup>
          <StyledTextHeaderWrapper>
            <HeadingPrimary type={Heading.types.h1} size={Heading.sizes.lg} value='My Profile' />
          </StyledTextHeaderWrapper>
          <StyledButtonsContainer>
            <StyledChangePasswordButton
              onClick={openCreateChangePasswordModal}
              size={Button.sizes.MEDIUM}
            >
              <TypographyPrimary
                value='Change password'
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
              />
            </StyledChangePasswordButton>
          </StyledButtonsContainer>
        </StyledHeaderGroup>
      </div>
      <StyledContainerWrapper>
        <StyledImageWrapper>
          <img src={profile} alt='profile' />
        </StyledImageWrapper>

        {/* <StyledContainer></StyledContainer> */}
        <AccountForm />
      </StyledContainerWrapper>
      <ChangePassword />
    </StyledGroupContainer>
  )
}

export default Account

const StyledContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  justify-content: center;
`

const StyledImageWrapper = styled.div`
  width: 206px;
  height: 184px;
`

const StyledTextHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 180px;
  height: 40px;
  flex: 1;
`
const StyledChangePasswordButton = styled(ButtonPrimary)`
  padding: 10px 26px;
`

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`
