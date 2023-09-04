import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { StyledButtonWrapper } from 'pages/Agents/Agents'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import { toolLogos } from '../constants'
import FormikTextField from 'components/TextFieldFormik'
import { useToolView } from './useToolView'

const ToolView = () => {
  const { tool } = useToolView()

  if (!tool) return <div />

  console.log('View PAge', tool)

  const name = tool[0]?.name
  const description = tool[0]?.tools[0]?.description || ''
  const fields = tool[0]?.fields

  const toolLogo = toolLogos.filter((toolLogo: any) => toolLogo.toolName === name)

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Toolkit</StyledSectionTitle>
          {/* <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription> */}
        </div>

        <StyledButtonWrapper>
          <Button onClick={() => {}}>Save</Button>
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

          {fields?.map((field: any, index: number) => {
            // return <FormikTextField key={index} field_name='name' label={field.label} />
          })}
        </StyledInnerWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default ToolView

const StyledInnerWrapper = styled.div`
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
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
