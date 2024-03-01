import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useTranslation } from 'react-i18next'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import Typography from 'share-ui/components/typography/Typography'
import styled from 'styled-components'

import FormikTextField from 'components/TextFieldFormik'

import { FormikProvider } from 'formik'

import BackButton from 'components/BackButton'
import { useModal } from 'hooks'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'
import { ButtonPrimary } from 'components/Button/Button'
import { useVoiceView } from './useVoiceView'
import {
  StyledButtonWrapper,
  StyledFieldsWrapper,
  StyledImg,
  StyledInnerWrapper,
  StyledMainTextWrapper,
  StyledTextWrapper,
} from 'pages/Toolkit/ToolView/ToolView'
import { voiceLogos } from '../constants'

const VoiceView = ({
  voiceSlug,
  hideInfo,
  hideForm,
}: {
  voiceSlug?: string
  hideInfo?: boolean
  hideForm?: boolean
}) => {
  const { t } = useTranslation()
  const { voice, formik, handleSubmit, isLoading } = useVoiceView({
    voiceSlug: voiceSlug,
  })

  const { closeModal } = useModal()

  const name = voice?.name
  const description = voice?.description || ''
  const fields = voice?.fields

  const filteredLogos = voiceLogos.filter((toolLogo: any) => toolLogo.voiceName === voice.name)

  const logoSrc = filteredLogos?.[0]?.logoSrc || ''

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        {!voiceSlug && (
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>{t('voice')}</StyledSectionTitle>
              {/* <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription> */}
            </div>
            <StyledButtonWrapper>
              <BackButton />
              {fields?.length > 0 && (
                <ButtonPrimary
                  onClick={() => handleSubmit(formik?.values)}
                  disabled={isLoading}
                  size={Button.sizes?.SMALL}
                >
                  {isLoading ? <Loader size={22} /> : t('save')}
                </ButtonPrimary>
              )}
            </StyledButtonWrapper>
          </StyledHeaderGroup>
        )}
        <ComponentsWrapper hideBox={voiceSlug ? true : false}>
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
              <>
                <StyledFieldsWrapper>
                  {fields?.map((field: any, index: number) => {
                    return (
                      <FormikTextField
                        key={index}
                        name={field.key}
                        placeholder=''
                        label={field.label}
                        field_name={field.key}
                      />
                    )
                  })}
                </StyledFieldsWrapper>

                {voiceSlug && fields?.length > 0 && (
                  <StyledButtonWrapper>
                    <ButtonPrimary
                      onClick={async () => {
                        await handleSubmit(formik?.values)
                        closeModal('toolkit-modal')
                      }}
                      disabled={isLoading}
                      size={Button.sizes?.MEDIUM}
                    >
                      {isLoading ? <Loader size={22} /> : t('save')}
                    </ButtonPrimary>
                  </StyledButtonWrapper>
                )}
              </>
            )}
          </StyledInnerWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default VoiceView
