import FormikTextField from 'components/TextFieldFormik'
import { SETTINGS_FIELDS, useSettingView } from './useSettingView'
import { FormikProvider } from 'formik'
import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import {
  StyledButtonWrapper,
  StyledFieldsWrapper,
  StyledImg,
  StyledInnerWrapper,
  StyledMainTextWrapper,
  StyledTextWrapper,
} from 'pages/Toolkit/ToolView/ToolView'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import { t } from 'i18next'
import { settingLogos } from '../constants'
import TypographySecondary from 'components/Typography/Secondary'
import Typography from 'share-ui/components/typography/Typography'
import TypographyPrimary from 'components/Typography/Primary'
import { useModal } from 'hooks'

const SettingView = ({
  settingSlug,
  hideInfo,
  hideForm,
}: {
  settingSlug: string
  hideInfo?: boolean
  hideForm?: boolean
}) => {
  const { closeModal } = useModal()

  const fields = SETTINGS_FIELDS?.find((setting: any) => setting.slug === settingSlug)?.configs
  const name = SETTINGS_FIELDS?.find((setting: any) => setting.slug === settingSlug)?.title
  const description = SETTINGS_FIELDS?.find(
    (setting: any) => setting.slug === settingSlug,
  )?.description
  const { formik, isLoading, handleSubmit } = useSettingView({ fields })

  const filteredLogos = settingLogos.find((setting: any) => setting.settingName === name)
  const logoSrc = filteredLogos?.logoSrc || ''

  const onHandleSubmit = async () => {
    await handleSubmit(formik?.values)
    closeModal('llm-settings-modal')
  }
  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledInnerWrapper>
          {!hideInfo && (
            <>
              <StyledImg src={logoSrc} alt='' />
              <StyledTextWrapper>
                <TypographySecondary
                  value={t('by')}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                />

                <TypographySecondary
                  value={t('l3')}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  style={{ textDecoration: 'underline' }}
                />
              </StyledTextWrapper>
              <StyledMainTextWrapper>
                <TypographyPrimary
                  value={name}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                />
                <TypographySecondary
                  value={description}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                />
              </StyledMainTextWrapper>
            </>
          )}

          {!hideForm && (
            <StyledFieldsWrapper>
              {fields?.map((field: any) => {
                return (
                  <FormikTextField
                    key={field.key}
                    name={field.key}
                    placeholder=''
                    label={field.label}
                  />
                )
              })}
            </StyledFieldsWrapper>
          )}

          {!hideForm && (
            <StyledButtonWrapper>
              <ButtonPrimary
                onClick={onHandleSubmit}
                disabled={isLoading}
                size={Button.sizes?.MEDIUM}
              >
                {isLoading ? <Loader size={22} /> : t('save')}
              </ButtonPrimary>
            </StyledButtonWrapper>
          )}
        </StyledInnerWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default SettingView
