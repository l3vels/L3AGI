import { FormikProvider } from 'formik'
import {
    StyledHeaderGroup,
    StyledSectionTitle,
    StyledSectionWrapper,
  } from 'pages/Home/homeStyle.css'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledFormWrapper } from 'styles/formStyles.css'
import styled from 'styled-components'
import FormikTextField from 'components/TextFieldFormik'
import { useTranslation } from 'react-i18next'
import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import useInviteUsers from './useInviteUsers'


const CreateUserAccess = () => {
  const { t } = useTranslation()
  const { formik, create_access_loading } = useInviteUsers()

    return (
        <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
              <StyledSectionTitle>Invite user</StyledSectionTitle>

            <div>
              <BackButton />
              <ButtonPrimary
                onClick={formik.handleSubmit}
                size={Button.sizes?.SMALL}
                disabled={create_access_loading}
              >
                {create_access_loading ? <Loader size={32} /> : 'Save'}
              </ButtonPrimary>
            </div>
          </StyledHeaderGroup>

          <ComponentsWrapper noPadding>
            <StyledFormWrapper>
                <StyledFormContainer>
                    <StyledInputWrapper>
                        <FormikTextField name='email' placeholder={t('email')} label={t('email')} />
                    </StyledInputWrapper>
                </StyledFormContainer>
            </StyledFormWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    )
}

export default CreateUserAccess

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100%;
  width: 100%;
`
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  max-width: 800px;
  height: calc(100% - 100px);
  padding: 0 20px;
`