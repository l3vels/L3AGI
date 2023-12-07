import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Typography from 'share-ui/components/typography/Typography'
import Heading from 'share-ui/components/Heading/Heading'
import Button from 'share-ui/components/Button/Button'

import { StyledHeaderGroup } from 'styles/globalStyle.css'
import profile from 'assets/images/large.png'

import ChangePassword from 'pages/ChangePassword'

import AccountForm from './AccountForm/AccountForm'
import useChangePassword from 'pages/ChangePassword/useChangePassword'
import { StyledGroupContainer } from 'components/Layout/LayoutStyle'
import TypographyPrimary from 'components/Typography/Primary'
import HeadingPrimary from 'components/Heading/Primary'
import { ButtonPrimary } from 'components/Button/Button'
import {
  TypographySizes,
  TypographyTypes,
} from 'share-ui/components/typography/TypographyConstants'

const Account = () => {
  const { t } = useTranslation()
  const { openCreateChangePasswordModal } = useChangePassword()

  return (
    <StyledGroupContainer mt='20'>
      <div id='header_group'>
        <StyledHeaderGroup>
          <StyledTextHeaderWrapper>
            <HeadingPrimary
              type={Heading.types?.h1}
              size={Heading.sizes?.LARGE}
              value='My Profile'
            />
          </StyledTextHeaderWrapper>
          <StyledButtonsContainer>
            <StyledChangePasswordButton
              onClick={openCreateChangePasswordModal}
              size={Button.sizes?.MEDIUM}
            >
              <TypographyPrimary
                value={t('change-password')}
                type={TypographyTypes.LABEL}
                size={TypographySizes.sm}
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
