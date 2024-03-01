import FormikTextField from 'components/TextFieldFormik'
import { useSettingView } from './useSettingView'
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
import { SETTINGS_FIELDS } from '../useSettings'

const SettingView = ({ settingSlug }: { settingSlug: string }) => {
  const { formik, isLoading } = useSettingView({ settingSlug })

  const settingLabel = SETTINGS_FIELDS?.find((field: any) => field.key === settingSlug)?.label

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledInnerWrapper>
          <StyledFieldsWrapper>
            <FormikTextField name={'configValue'} placeholder='' label={settingLabel} />
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
