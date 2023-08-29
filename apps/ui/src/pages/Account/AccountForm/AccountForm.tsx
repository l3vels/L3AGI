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
              <Typography
                value='Full Name'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor={'rgba(255, 255, 255, 0.6)'}
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
              <Typography
                value='Company name'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor={'rgba(255, 255, 255, 0.6)'}
              />
            </StyledTypographyWrapper>
            <TextField
              name='company_name'
              value={`${formik.values.company_name}`}
              placeholder={'value'}
              size={TextField.sizes.SMALL}
            />
          </StyledCustomTextField>

          <StyledCustomTextField>
            <StyledTypographyWrapper>
              <Typography
                value='Email'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor={'rgba(255, 255, 255, 0.6)'}
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
            <Button
              onClick={handleLogout}
              leftIcon={LogOut}
              kind={Button.kinds.TERTIARY}
              size={Button.sizes.SMALL}
            >
              <Typography
                value='Log out'
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor={'rgba(255, 255, 255, 0.8)'}
              />
            </Button>
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
