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
import { useEffect } from 'react'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import BackButton from 'components/BackButton'

const ToolView = () => {
  const { tool, formik, handleSubmit, isLoading } = useToolView()

  const name = tool[0]?.name
  const description = tool[0]?.tools[0]?.description || ''
  const fields = tool[0]?.fields

  const toolLogo = toolLogos.filter((toolLogo: any) => toolLogo.toolName === name)

  useEffect(() => {
    formik?.setFieldValue('tool_key', fields?.[0]?.key)
    formik?.setFieldValue('tool_key_type', fields?.[0]?.type)
    formik?.setFieldValue('tool_is_required', fields?.[0]?.is_required)
    formik?.setFieldValue('tool_is_secret', fields?.[0]?.is_secret)
  }, [formik?.values?.tool_value])

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Toolkit</StyledSectionTitle>
            {/* <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription> */}
          </div>
          <StyledButtonWrapper>
            {fields?.length > 0 && (
              <Button
                onClick={() => handleSubmit(formik?.values)}
                disabled={isLoading}
                size={Button.sizes.SMALL}
              >
                {isLoading ? <Loader size={22} /> : 'Save'}
              </Button>
            )}
            <BackButton />
          </StyledButtonWrapper>
        </StyledHeaderGroup>
        <ComponentsWrapper>
          <StyledInnerWrapper>
            <StyledImg src={toolLogo[0]?.logoSrc} alt='' />
            <StyledTextWrapper>
              <Typography
                value={`By`}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'rgba(255,255,255,0.8'}
              />

              <Typography
                value={`L3`}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'rgba(255,255,255,0.8'}
                style={{ textDecoration: 'underline' }}
              />
            </StyledTextWrapper>
            <StyledMainTextWrapper>
              <Typography
                value={name}
                type={Typography.types.LABEL}
                size={Typography.sizes.lg}
                customColor={'#FFF'}
              />
              <Typography
                value={description}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor={'rgba(255,255,255,0.8'}
              />
            </StyledMainTextWrapper>

            <StyledFieldsWrapper>
              {fields?.map((field: any, index: number) => {
                return (
                  <FormikTextField
                    key={index}
                    name='tool_value'
                    placeholder=''
                    label={field.label}
                    field_name={'tool_value'}
                  />
                )
              })}
            </StyledFieldsWrapper>
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
  gap: 10px;

  width: 100%;
  max-width: 400px;
`

const StyledFieldsWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`
