import React from 'react'
import { FormikProvider } from 'formik'
import TextField from '@l3-lib/ui-core/dist/TextField'
import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import LogOut from '@l3-lib/ui-core/dist/icons/LogOut'
// import useAccount from '../useAccount'
import { useLogoutService } from 'services'
import { logout as logOutCookies } from 'helpers/authHelper'
import useAccount from 'pages/Account/useAccount'
import TypographyTertiary from 'components/Typography/Tertiary'
import TypographySecondary from 'components/Typography/Secondary'
import { ButtonTertiary } from 'components/Button/Button'

const AccountForm = () => {
  const { formik } = useAccount()
  const [logout] = useLogoutService()

  const handleLogout = async () => {
    try {
      await logout()
      logOutCookies()
      localStorage.clear()
      window.location.href = '/'
    } catch (err) {
      logOutCookies()
      localStorage.clear()
      window.location.href = '/'
    }
  }

  return (
    <>
      <FormikProvider value={formik}>
        <StyledFormContainer>
          <StyledCustomTextField>
            <StyledTypographyWrapper>
              <TypographyTertiary
                value='Full Name'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledTypographyWrapper>
            <TextField
              name='first_name'
              value={`${formik.values.first_name} ${formik.values.last_name}`}
              placeholder={'value'}
              size={TextField.sizes.SMALL}
            />
          </StyledCustomTextField>
          <StyledCustomTextField>
            <StyledTypographyWrapper>
              <TypographyTertiary
                value='Company name'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledTypographyWrapper>
            <TextField
              name='name'
              value={`${formik.values.name}`}
              placeholder={'value'}
              size={TextField.sizes.SMALL}
            />
          </StyledCustomTextField>

          <StyledCustomTextField>
            <StyledTypographyWrapper>
              <TypographyTertiary
                value='Email'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledTypographyWrapper>
            <TextField
              name='email'
              value={`${formik.values.email}`}
              placeholder={'value'}
              size={TextField.sizes.SMALL}
            />
          </StyledCustomTextField>

          <StyledButton>
            <ButtonTertiary onClick={handleLogout} leftIcon={LogOut} size={Button.sizes.SMALL}>
              <TypographySecondary
                value='Log out'
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
              />
            </ButtonTertiary>
          </StyledButton>
        </StyledFormContainer>
      </FormikProvider>
    </>
  )
}

export default AccountForm

const StyledFormContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-row-gap: 20px;
  width: fit-content;
  height: 100%;
`

const StyledCustomTextField = styled.div`
  display: grid;
  margin-top: 12px;
  margin-bottom: 26px;
  gap: 12px;
  width: 375px;
  height: 44px;
`

const StyledTypographyWrapper = styled.div`
  display: flex;
  height: 20px;
  width: fit-content;
  align-items: center;
`

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 44.5px;
  justify-content: center;
  width: 375px;
  height: 40px;
`
