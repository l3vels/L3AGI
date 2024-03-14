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
import { toolLogos } from '../constants'
import FormikTextField from 'components/TextFieldFormik'
import { useToolView } from './useToolView'
import { FormikProvider } from 'formik'
// import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import BackButton from 'components/BackButton'
import { useModal } from 'hooks'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'
import { ButtonPrimary } from 'components/Button/Button'

const ToolView = ({
  toolSlug,
  hideInfo,
  hideForm,
}: {
  toolSlug?: string
  hideInfo?: boolean
  hideForm?: boolean
}) => {
  const { t } = useTranslation()
  const { tool, formik, handleSubmit, isLoading } = useToolView({
    toolSlug: toolSlug,
  })

  const { closeModal } = useModal()

  const name = tool?.name
  const description = tool?.description || ''
  const fields = tool?.fields

  const toolLogo = toolLogos.filter((toolLogo: any) => toolLogo.toolName === name)

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        {!hideForm && !toolSlug && (
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>{t('toolkit')}</StyledSectionTitle>
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

        <StyledInnerWrapper>
          {!hideInfo && (
            <>
              <StyledImg src={toolLogo[0]?.logoSrc} alt='' />
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
          )}

          {!hideForm && toolSlug && fields?.length > 0 && (
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
        </StyledInnerWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default ToolView

export const StyledInnerWrapper = styled.div`
  padding: 0 20px;

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5px;
`
export const StyledImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
`
export const StyledTextWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  margin-bottom: 10px;
`
export const StyledMainTextWrapper = styled.div`
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;

  width: 100%;
  max-width: 400px;
`

export const StyledFieldsWrapper = styled.div`
  margin-top: 20px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 15px;

  height: 100%;
  overflow: auto;

  padding: 0 10px;

  max-width: 800px;
`
export const StyledButtonWrapper = styled.div`
  margin-left: auto;
  margin-top: auto;
`
