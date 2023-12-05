import { FormikProvider } from 'formik'
import TextField from 'share-ui/components/TextField/TextField'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Typography from 'share-ui/components/typography/Typography'
import Button from 'share-ui/components/Button/Button'
import LogOut from 'share-ui/components/Icon/Icons/components/LogOut'
// import useAccount from '../useAccount'
import { useLogoutService } from 'services'
import { logout as logOutCookies } from 'helpers/authHelper'
import useAccount from 'pages/Account/useAccount'
import TypographyTertiary from 'components/Typography/Tertiary'
import TypographySecondary from 'components/Typography/Secondary'
import { ButtonTertiary } from 'components/Button/Button'

const AccountForm = () => {
  const { t } = useTranslation()
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
                value={t('full-name')}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledTypographyWrapper>
            <TextField
              name='first_name'
              value={`${formik.values.first_name} ${formik.values.last_name}`}
              placeholder={t('value')}
              size={TextField.sizes?.SMALL}
            />
          </StyledCustomTextField>
          <StyledCustomTextField>
            <StyledTypographyWrapper>
              <TypographyTertiary
                value={t('company-name')}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledTypographyWrapper>
            <TextField
              name='name'
              value={`${formik.values.name}`}
              placeholder={t('value')}
              size={TextField.sizes?.SMALL}
            />
          </StyledCustomTextField>

          <StyledCustomTextField>
            <StyledTypographyWrapper>
              <TypographyTertiary
                value={t('email')}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledTypographyWrapper>
            <TextField
              name='email'
              value={`${formik.values.email}`}
              placeholder={t('value')}
              size={TextField.sizes?.SMALL}
            />
          </StyledCustomTextField>

          <StyledButton>
            <ButtonTertiary onClick={handleLogout} leftIcon={LogOut} size={Button.sizes?.SMALL}>
              <TypographySecondary
                value={t('log-out')}
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
