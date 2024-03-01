import FormikTextField from 'components/TextFieldFormik'
import { SETTINGS_FIELDS, useSettingView } from './useSettingView'
import { FormikProvider } from 'formik'
import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import {
  StyledButtonWrapper,
  StyledFieldsWrapper,
  StyledInnerWrapper,
} from 'pages/Toolkit/ToolView/ToolView'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import { t } from 'i18next'

const SettingView = ({ settingSlug }: { settingSlug: string }) => {
  const fields = SETTINGS_FIELDS?.find((setting: any) => setting.slug === settingSlug)?.configs
  const { formik, isLoading } = useSettingView({ fields })

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledInnerWrapper>
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

          <StyledButtonWrapper>
            <ButtonPrimary
              onClick={formik.handleSubmit}
              disabled={isLoading}
              size={Button.sizes?.MEDIUM}
            >
              {isLoading ? <Loader size={22} /> : t('save')}
            </ButtonPrimary>
          </StyledButtonWrapper>
        </StyledInnerWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default SettingView
