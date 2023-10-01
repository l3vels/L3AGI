import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import { toolLogos } from '../constants'
import FormikTextField from 'components/TextFieldFormik'
import { useToolView } from './useToolView'
import { FormikProvider } from 'formik'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import BackButton from 'components/BackButton'
import { useModal } from 'hooks'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyPrimary from 'components/Typography/Primary'
import { ButtonPrimary } from 'components/Button/Button'

const ToolView = ({ toolSlug }: { toolSlug?: string }) => {
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
        {!toolSlug && (
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>Toolkit</StyledSectionTitle>
              {/* <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription> */}
            </div>
            <StyledButtonWrapper>
              <BackButton />
              {fields?.length > 0 && (
                <ButtonPrimary
                  onClick={() => handleSubmit(formik?.values)}
                  disabled={isLoading}
                  size={Button.sizes.SMALL}
                >
                  {isLoading ? <Loader size={22} /> : 'Save'}
                </ButtonPrimary>
              )}
            </StyledButtonWrapper>
          </StyledHeaderGroup>
        )}
        <ComponentsWrapper hideBox={toolSlug ? true : false}>
          <StyledInnerWrapper>
            <StyledImg src={toolLogo[0]?.logoSrc} alt='' />
            <StyledTextWrapper>
              <TypographySecondary
                value={`By`}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
              />

              <TypographySecondary
                value={`L3`}
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

            {toolSlug && fields?.length > 0 && (
              <StyledModalButton>
                <ButtonPrimary
                  onClick={async () => {
                    await handleSubmit(formik?.values)
                    closeModal('toolkit-modal')
                  }}
                  disabled={isLoading}
                  size={Button.sizes.SMALL}
                >
                  {isLoading ? <Loader size={22} /> : 'Save'}
                </ButtonPrimary>
              </StyledModalButton>
            )}
          </StyledInnerWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default ToolView

const StyledInnerWrapper = styled.div`
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 5px;
`
const StyledImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
`
const StyledTextWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  margin-bottom: 10px;
`
const StyledMainTextWrapper = styled.div`
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;

  width: 100%;
  max-width: 400px;
`

const StyledFieldsWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const StyledModalButton = styled.div`
  margin-left: auto;
`
