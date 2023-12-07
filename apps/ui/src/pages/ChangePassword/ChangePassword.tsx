import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Typography from 'share-ui/components/typography/Typography'
import Heading from 'share-ui/components/Heading/Heading'
import useChangePassword from 'pages/ChangePassword/useChangePassword'
import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/CloseOutline'
import Button from 'share-ui/components/Button/Button'
// import Button from 'oldComponents/atoms/Button'

import { StyledHeaderGroup } from 'styles/globalStyle.css'

import TextField from 'share-ui/components/TextField/TextField'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import Modal from 'share-ui/components/Modal/Modal'
import TypographySecondary from 'components/Typography/Secondary'
import HeadingPrimary from 'components/Heading/Primary'
import { ButtonPrimary } from 'components/Button/Button'

type CreateChangePasswordModalProps = {
  closeModal: () => void
}

const ChangePassword = ({ closeModal }: CreateChangePasswordModalProps) => {
  const { t } = useTranslation()
  const { formik } = useChangePassword()

  return (
    <Modal fullscreen show isClean>
      <StyledHeaderGroup>
        <StyledCloseButton>
          <IconButton
            onClick={closeModal}
            icon={Close}
            kind={IconButton.kinds?.TERTIARY}
            size={IconButton.sizes?.LARGE}
          />
        </StyledCloseButton>
      </StyledHeaderGroup>
      <StyledContainerWrapper>
        <StyledContainer1>
          <StyledTextWrapper>
            {/* <Typography
                value='Change password'
                type={Typography.types.HEADING}
                size={Typography.sizes.lg}
                customColor={'#FFFFFF'}
              /> */}
            <HeadingPrimary
              type={Heading.types?.h1}
              size={Heading.sizes?.MEDIUM}
              value={t('change-password')}
            />
          </StyledTextWrapper>
          <StyledPasswordDetailsWrapper>
            <StyledPassword>
              <TypographySecondary
                value={t('password-must-contain')}
                type={Typography.types.LABEL}
                size={Typography.sizes.lg}
              />
            </StyledPassword>
            <StyledPasswordDetails>
              <StyledPasswordRequirementsList>
                <StyledPasswordRequirement>
                  <TypographySecondary
                    value={t('at-least-6-characters')}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                  />
                </StyledPasswordRequirement>
                <StyledPasswordRequirement>
                  <TypographySecondary
                    value={t('at-least-1-upper-case-letter')}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                  />
                </StyledPasswordRequirement>
                <StyledPasswordRequirement>
                  <TypographySecondary
                    value={t('at-least-1-lower-case-letter')}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                  />
                </StyledPasswordRequirement>
                <StyledPasswordRequirement>
                  <TypographySecondary
                    value={t('at-least-1-number')}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                  />
                </StyledPasswordRequirement>
              </StyledPasswordRequirementsList>
            </StyledPasswordDetails>
          </StyledPasswordDetailsWrapper>
        </StyledContainer1>
        <StyledContainer2>
          <FormikProvider value={formik}>
            <StyledContainer>
              <FormikTextField
                field_name='current_password'
                type={Typography.types.LABEL}
                placeholder={t('current-password')}
                size={Typography.sizes.sm}
              />

              <FormikTextField
                field_name='new_password'
                type={Typography.types.LABEL}
                placeholder={t('create-password')}
                size={Typography.sizes.sm}
              />

              <FormikTextField
                field_name='confirm_password'
                type={Typography.types.LABEL}
                placeholder={t('confirm-password')}
                size={Typography.sizes.sm}
              />

              <StyledButtonWrapper>
                <ButtonPrimary onClick={() => formik.handleSubmit()} size={Button.sizes?.MEDIUM}>
                  <TypographySecondary
                    value={t('update-password')}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.sm}
                  />
                </ButtonPrimary>
              </StyledButtonWrapper>
            </StyledContainer>
          </FormikProvider>
        </StyledContainer2>
      </StyledContainerWrapper>
    </Modal>
  )
}

export default withRenderModal('create-change-password-modal')(ChangePassword)

const StyledContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-row-gap: 20px;
  // max-width: 25%;
  margin-top: 95px;
  width: 376px;
`

const StyledCloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
`
const StyledContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // margin-top: 100px;
  align-items: center;
  justify-content: center;
`
const StyledTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 285px;
  height: 44px;
`
const StyledContainer1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 100%;
  margin: 0 10px;
`
const StyledContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 100%;
  margin: 0 10px;
`
const StyledPasswordDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 32px;
  justify-content: flex-start;
  width: 335px;
  height: 164px;
`
const StyledPassword = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 250px;
  height: auto;
`

const StyledPasswordDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  justify-content: flex-start;
  width: 335px;
  height: auto;
`
const StyledButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  justify-content: flex-end;
  align-items: center;
  width: 375px;
  height: 56px;
`

const StyledPasswordRequirementsList = styled.ul`
  list-style-type: none; /* Remove default bullet styles */
`

const StyledPasswordRequirement = styled.li`
  position: relative;
  padding-left: 20px; /* Add some padding to create space for the marker */

  /* Custom bullet marker styles */
  &:before {
    content: '•'; /* Use a custom symbol as the marker, e.g., a bullet • */
    position: absolute;
    left: 0;
    color: rgba(255, 255, 255, 0.8); /* Change the color to your desired color */
  }
`
